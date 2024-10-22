import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../Assets/Icons/Delete.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import LottieAlertSucess from "../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../Assets/Alerts/Catch";

const Announcement = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

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
            const apiUrl = 'https://office3i.com/development/api/public/api/view_announcement';
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

    useEffect(() => {
        fetchData();
    }, [])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Title', 'Description', 'Date', 'Created By', 'Status', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.a_title,
            rowData.a_description,
            rowData.a_validdate,
            rowData.created_name,
            rowData.status,
            rowData.updated_name,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Announcements.xlsx';

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
        const tableHead = ['S.No', 'Title', 'Description', 'Date', 'Created By', 'Status', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.a_title,
            rowData.a_description,
            rowData.a_validdate,
            rowData.created_name,
            rowData.status,
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
                fileName: 'Announcements',
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

    // 

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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_announcement`;

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
                    // Alert.alert("Deleted", "Deleted Successfully");
                    handleShowAlert(response.data);
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data);
                    setDelData(false)
                }
            } catch (error) {
                // Alert.alert("Error", "Error while deleting shift slot");
                handleShowAlert2();
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // 

    const [selectedSlotId, setSelectedSlotId] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [EditLoad, setEditLoad] = useState(false);
    const [AnnounceMentTitle, setAnnounceMentTitle] = useState('');
    const [AnnounceMentdes, setAnnounceMentdes] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [AnnouncementErr, setAnnouncementErr] = useState('');
    const [AnnounceMentdesErr, setAnnounceMentdesErr] = useState('');

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;


    const openEditModal = (slot) => {
        setEditModalVisible(true);
        setSelectedSlotId(slot.id);
        setStartDate(new Date(slot.a_validdate));
        setAnnounceMentTitle(slot.a_title);
        setAnnounceMentdes(slot.a_description);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    const handleEditSubmit = async () => {

        setEditLoad(true);

        try {

            if (!AnnounceMentTitle) {
                setAnnouncementErr(' Announcement Title Required ');
                setEditLoad(false);
                return;
            } else {
                setAnnouncementErr('');
            }

            if (!AnnounceMentdes) {
                setAnnounceMentdesErr(' Announcement Description Required ');
                setEditLoad(false);
                return;
            } else {
                setAnnounceMentdesErr('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/update_announcement';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                validdate: formattedStartDate,
                title: AnnounceMentTitle,
                description: AnnounceMentdes,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                // Alert.alert("Successfull", response.data.message);
                handleShowAlert(response.data);
                setEditModalVisible(false);
                setStartDate(new Date());
                fetchData();
            } else {
                setEditLoad(false);
                // Alert.alert("Failed", response.data.message);
                handleShowAlert1(response.data);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Failed", error);
            handleShowAlert2();
        }

        closeEditModal();
    };

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res.message);
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

    return (
        <ScrollView>
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
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Title</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Description</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Created By</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Updated By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.a_title}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.a_description}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.a_validdate}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.status}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.updated_name}</Text>
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

                            <Text style={styles.Heading}>Edit Announcement</Text>

                            <Text style={styles.modalLabelText}>Date :</Text>

                            <View style={styles.modalInput} >
                                <Text onPress={showDatepicker}>
                                    {startDate.toDateString()} &nbsp;
                                </Text>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={startDate}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                        minimumDate={new Date()}
                                    />
                                )}
                            </View>

                            <Text style={styles.ModalerrorText}>
                                { }
                            </Text>

                            <Text style={styles.modalLabelText}>Title :</Text>

                            <TextInput
                                value={AnnounceMentTitle}
                                onChangeText={(txt) => setAnnounceMentTitle(txt)}
                                style={styles.modalInput}
                            />

                            <Text style={styles.errorText}>
                                {AnnouncementErr}
                            </Text>

                            <Text style={styles.modalLabelText}>Description :</Text>

                            <TextInput
                                value={AnnounceMentdes}
                                onChangeText={(txt) => setAnnounceMentdes(txt)}
                                style={styles.modalInput1}
                                multiline={true}
                                textAlignVertical="top"
                            />

                            <Text style={styles.errorText}>
                                {AnnounceMentdesErr}
                            </Text>

                            <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalSubmitButton}
                                    onPress={handleEditSubmit}
                                >
                                    {
                                        EditLoad ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalSubmitButtonText}>Update</Text>
                                    }
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>

                <LottieAlertSucess
                    visible={isAlertVisible}
                    animationSource={require('../../../../Assets/Alerts/tick.json')}
                    title={resMessage}
                />

                <LottieAlertError
                    visible={isAlertVisible1}
                    animationSource={require('../../../../Assets/Alerts/Close.json')}
                    title={resMessageFail}
                />

                <LottieCatchError
                    visible={isAlertVisible2}
                    animationSource={require('../../../../Assets/Alerts/Catch.json')}
                    title="Error While Fetching Data"
                />

            </View>
        </ScrollView>
    )
}

export default Announcement;