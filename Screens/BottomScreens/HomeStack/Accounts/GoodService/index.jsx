import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const GoodService = ({ navigation }) => {

    const [load, SetLoad] = useState(false);

    const { data } = useSelector((state) => state.login);

    const [gsn, setGsn] = useState('');
    const [hsn, setHsn] = useState('');
    const [description, setDescription] = useState('');
    const [gsnEdit, setGsnEdit] = useState('');
    const [hsnEdit, setHsnEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [gsnErr, setGsnErr] = useState('');
    const [hsnErr, setHsnErr] = useState('');
    const [gsnEditErr, setGsnEditErr] = useState('');
    const [hsnEditErr, setHsnEditErr] = useState('');

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 5;

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/view_goodservice';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Good & Services Name', 'HSN/SAC', 'Description', 'Status', 'Created By', 'Update By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.good_service_name,
            rowData.hsn_sac,
            rowData.description,
            rowData.status,
            rowData.created_name,
            rowData.updated_name,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Goods_and_services_list.xlsx';

            await RNFS.writeFile(fileUri, wbout, 'base64');

            // Check if file is correctly written
            console.log('File written to:', fileUri);

            // Share the file
            const options = {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                url: 'file://' + fileUri,
                title: 'Share Excel File',
            };
            await Share.open(options);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    // Export-PDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Good & Services Name', 'HSN/SAC', 'Description', 'Status', 'Created By', 'Update By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.good_service_name,
            rowData.hsn_sac,
            rowData.description,
            rowData.status,
            rowData.created_name,
            rowData.updated_name,
        ]);

        const htmlContent = `
                    <html>
                        <head>
                            <style>
                                @page {
                                    size: landscape; /* Set the page to landscape mode */
                                }
                                table {
                                    border-collapse: collapse;
                                    width: 100%;
                                }
                                th, td {
                                    border: 1px solid black;
                                    padding: 8px;
                                    text-align: center;
                                }
                            </style>
                        </head>
                        <body>
                            <table>
                                <thead>
                                    <tr>
                                        ${tableHead.map(column => `<th>${column}</th>`).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableData1.map(row => `<tr>${row.map((cell, index) =>
            `<td style="${index === 1 ? 'text-align: left;' : ''}">${cell}</td>`).join('')}</tr>`).join('')}
                                </tbody>
                            </table>
                        </body>
                    </html>
                `;

        try {
            const { filePath } = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: 'Goods_and_services_list',
                directory: RNFS.DocumentDirectoryPath,
            });

            Share.open({
                url: `file://${filePath}`,
                type: 'application/pdf',
                title: 'Export to PDF',
            });
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }
    };


    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

    // Api call for Delete

    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')
    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const HandleDelete = (slotId) => {
        setSlotToDelete(slotId);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
        setDelData(false);
    }

    const confirmDelete = async () => {

        setDelData(true)

        if (slotToDelete) {

            try {

                if (!Reason) {
                    setReasonError('Reason Required');
                    setDelData(false);
                    return;
                } else {
                    setReasonError('');
                    setReason('');
                }

                const apiUrl = `https://epkgroup.in/crm/api/public/api/delete_goodservice`;

                const response = await axios.post(apiUrl, {
                    id: slotToDelete,
                    updated_by: data.userempid,
                    reason: Reason,
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                if (response.data.status === "success") {
                    const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    handleShowAlert(response.data.message);
                } else {
                    handleShowAlert1(response.data.message);
                    setDelData(false)
                }
            } catch (error) {
                handleShowAlert2();
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // 

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // 



    const [editModalVisible, setEditModalVisible] = useState(false);
    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [editedStatus, setEditedStatus] = useState(null);
    const [EditLoad, setEditLoad] = useState(false);
    const [id, setId] = useState("");
    console.log(id)

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    const openEditModal = (slot) => {
        setId(slot.id)
        setGsnEdit(slot.good_service_name);
        setHsnEdit(slot.hsn_sac);
        setDescriptionEdit(slot.description);
        setEditedStatus(slot.status);
        setEditModalVisible(true);
    };

    const handleEditSubmit = async () => {

        setEditLoad(true);

        try {
            if (!gsnEdit) {
                setGsnEditErr('');
                setEditLoad(false);
                return;
            } else {
                setGsnEditErr('');
            }

            if (!hsnEdit) {
                setHsnEditErr('');
                setEditLoad(false);
                return;
            } else {
                setHsnEditErr('');
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/update_goodservice';

            const response = await axios.put(apiUrl, {
                id: id,
                good_service_name: gsnEdit,
                hsn_sac: hsnEdit,
                description: descriptionEdit,
                status: editedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                fetchData();
                handleShowAlert(response.data.message);
            } else {
                setEditLoad(false);
                handleShowAlert1(response.data.message);
            }

        } catch (error) {
            setEditLoad(false);
            handleShowAlert2();
        }

        closeEditModal();
    }

    // 

    const validateFields = () => {

        let isValid = true;

        if (!gsn) {
            setGsnErr('Enter Good & Services Name');
            isValid = false;
        } else {
            setGsnErr('');
        }

        if (!hsn) {
            setHsnErr('Enter HSN/SAC');
            isValid = false;
        } else {
            setHsnErr('');
        }

        if (!selectedStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        SetLoad(false);

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/addgood_service';

            const response = await axios.post(apiUrl, {
                good_service_name: gsn,
                hsn_sac: hsn,
                description: description || "-",
                status: selectedStatus,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                SetLoad(false);
                onRefresh();
                fetchData();
            } else {
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const onRefresh = () => {
        setGsn('');
        setHsn('');
        setDescription('');
        setSelectedStatus(null);
        setSelectedStatusErr(null);
        setGsnErr('');
        setHsnErr('');
    }

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Personal Information</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Goods & Services Name
                    </Text>

                    <TextInput
                        value={gsn}
                        onChangeText={(txt) => setGsn(txt)}

                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {gsnErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        HSN / SAC
                    </Text>

                    <TextInput
                        value={hsn}
                        onChangeText={(txt) => setHsn(txt)}

                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {hsnErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        onChangeText={(txt) => setDescription(txt)}
                        multiline={true}
                        textAlignVertical="top"
                        style={styles.inputs1}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#0A60F1"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdown && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr}
                    </Text>

                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton} onPress={onRefresh}>
                    <Text style={styles.HeaderButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.PolicyContainer}>
                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Goods & Services List</Text>
                </View>



            </View>

            <View style={styles.Container}>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity style={[styles.Button, { marginRight: '5%' }]}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.ButtonText}>
                            Export to Excel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button}
                        onPress={exportToPDF}
                    >
                        <Text style={styles.ButtonText}>
                            Export to PDF
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.Input}
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />

                    <View style={styles.IconBg}>
                        <SearchIcon color={'#474747'} width={24} height={24} />
                    </View>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Good & Services Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>HSN/SAC</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate, { textAlign: 'left' }]}>Description</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Created By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Update By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {paginatedData.length == 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.good_service_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.hsn_sac}</Text>
                                            <Text style={[styles.cell, styles.EndDate, { textAlign: 'left' }]}>{item.description}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.status}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.updated_name}</Text>
                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => openEditModal(item)}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.listcontentdelbutton}
                                                    onPress={() => HandleDelete(item.id)}
                                                >
                                                    <DeleteIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.pagination}>

                        <TouchableOpacity style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>
                                Prev
                            </Text>
                        </TouchableOpacity>

                        {pages.map((page, index) => (
                            <View key={index} style={[currentPage === page ? styles.PageActive : null, { width: 26, height: 26, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }]}>
                                <Text
                                    style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                    onPress={() => onPageChange(page)}
                                >
                                    {page}
                                </Text>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>
                                Next
                            </Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../../../Assets/Alerts/tick.json')}
                title={resMessage}
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../../../Assets/Alerts/Close.json')}
                title={resMessageFail}
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data"
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                        <Text style={styles.modalText}>Reason:</Text>
                        <TextInput
                            value={Reason}
                            onChangeText={(text) => setReason(text)}
                            style={styles.Reason}
                        />
                        <Text style={styles.errorTextDelete}>
                            {ReasonError}
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete}>
                                <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>
                                {
                                    DelData ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                }


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>

                        <Text style={styles.Heading}>Edit Goods & Services</Text>

                        <Text style={styles.modalLabelText}>Goods & Services Name</Text>

                        <TextInput
                            value={gsnEdit}
                            onChangeText={(txt) => setGsnEdit(txt)}
                            style={styles.modalInput}
                        />

                        <Text style={styles.ModalerrorText}>
                            {gsnEditErr}
                        </Text>

                        <Text style={styles.modalLabelText}>HSN / SAC</Text>

                        <TextInput
                            value={hsnEdit}
                            onChangeText={(txt) => setHsnEdit(txt)}
                            style={styles.modalInput}
                        />

                        <Text style={styles.ModalerrorText}>
                            {hsnEditErr}
                        </Text>

                        <Text style={styles.modalLabelText}>Description</Text>

                        <TextInput
                            value={descriptionEdit}
                            onChangeText={(txt) => descriptionEdit(txt)}
                            style={styles.modalInput1}
                            textAlignVertical="top"
                            multiline={true}
                        />

                        <Text style={styles.ModalerrorText}>
                            { }
                        </Text>

                        <Text style={styles.modalLabelText}>Status</Text>

                        <TouchableOpacity style={styles.modalInput} onPress={toggleModalDropdown}>

                            <Text style={styles.StatusTouchableText}>{editedStatus}</Text>
                            <DropdownIcon width={14} height={14} color={"#000"} />

                        </TouchableOpacity>

                        {/* Dropdown to show the options */}

                        {showModalDropdown && (

                            <View style={styles.modaldropdown}>

                                <TouchableOpacity onPress={() => selecModaltStatus("Active")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>Active</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => selecModaltStatus("In-Active")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>In-Active</Text>
                                </TouchableOpacity>

                            </View>

                        )}

                        <Text style={styles.ModalerrorText}>
                            { }
                        </Text>

                        <View style={styles.buttoncontainer}>

                            <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                {
                                    EditLoad ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                }
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </ScrollView>

    )
}

export default GoodService; 