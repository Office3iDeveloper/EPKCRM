import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import EyeOpenIcon from '../../../../../Assets/Icons/eyeopen.svg';
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg"
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import { useFocusEffect } from "@react-navigation/native";

const EmpConfirmation = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedStatus, setEditedStatus] = useState(null);
    const [EditLoad, setEditLoad] = useState(false)
    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    const [selectedCatID, setSelectedCatID] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [NofDays, setNofDays] = useState('');
    const [reason, setReason] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [confirmedate, setConfirmedate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [reasonError, setReasonError] = useState('');
    const [NofDaysError, setNofDaysError] = useState('');

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    const openEditModal = (item) => {
        setEditedStatus(item.con_status);
        setSelectedId(item.id);
        setConfirmedate(item.confirmation_date);
        setSelectedCat(item.employee_category);
        setReason(item.conf_reason);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    // search filter

    const [filterText, setFilterText] = useState('');

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // Api call for Category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/employee_categorylist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setCategoryList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectCategory = (File) => {
        setSelectedCat(File.employee_category);
        setSelectedCatID(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/employee_confirmation_list';
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

    const handleEditSubmit = async () => {

        console.log(
            'id', selectedId,
            'confirmation_status', editedStatus,
            'no_of_days', NofDays,
            'confirmed_date', confirmedate,
            'employee_category', selectedCatID,
            'reason', reason,
            'updated_by', data.userempid
        );

        setEditLoad(true);

        try {

            if (!reason) {
                setReasonError('Reason is required');
                setEditLoad(false);
                return;
            } else {
                setReasonError('');
            }

            if (editedStatus === "Extended") {
                if (!NofDays) {
                    setNofDaysError('NofDays is required');
                    setEditLoad(false);
                    return;
                } else {
                    setNofDaysError('');
                }
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/employee_confirmation_update';

            const response = await axios.put(apiUrl, {
                id: selectedId,
                confirmation_status: editedStatus,
                no_of_days: NofDays,
                confirmed_date: confirmedate,
                employee_category: selectedCatID,
                reason: reason,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response.data, "response")

            if (response.data.status === "success") {
                setEditLoad(false);
                fetchData();
                handleShowAlert(response.data);
            } else {
                setEditLoad(false);
                // Alert.alert("Failed To Update");
                handleShowAlert1(response.data);
                console.error('Failed To Update:', response.data.message);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Employee ID', 'Employee Name', 'Designation', 'Date Of Joining', 'Confirmation', 'Status', 'Reason'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_id,
            rowData.emp_name,
            rowData.department_name,
            rowData.doj,
            rowData.confirmation_date,
            rowData.con_status,
            rowData.conf_reason,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Employee_Confirmation.xlsx';

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
        const tableHead = ['S.No', 'Employee ID', 'Employee Name', 'Designation', 'Date Of Joining', 'Confirmation', 'Status', 'Reason'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_id,
            rowData.emp_name,
            rowData.department_name,
            rowData.doj,
            rowData.confirmation_date,
            rowData.con_status,
            rowData.conf_reason,
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
                fileName: 'Employee_Confirmation',
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

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const totalItems = datalist.length;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [...Array(totalPages).keys()].map(num => num + 1);

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
                    <TouchableOpacity style={[styles.Button, { marginRight: '5%' }]} onPress={exportToExcel}>
                        <Text style={styles.ButtonText}>
                            Export to Excel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={exportToPDF}>
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
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Employee
                                        ID</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Employee
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Designation</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Date Of Joining</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Confirmation</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Reason</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text>
                                </View>

                                {filteredData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.emp_id}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.emp_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.department_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.doj}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.confirmation_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.con_status}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.conf_reason}</Text>
                                            <TouchableOpacity style={[styles.cell, styles.Status, { alignItems: 'center' }]}
                                                onPress={() => openEditModal(item)}
                                            >
                                                <EyeOpenIcon color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                )}


                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={editModalVisible}
                                    onRequestClose={closeEditModal}
                                >
                                    <View style={styles.modalContainer}>

                                        <View style={styles.modalContent}>

                                            <Text style={styles.Heading}>View Status</Text>

                                            <Text style={styles.modalLabelText}>Status</Text>

                                            <TouchableOpacity onPress={toggleModalDropdown} style={styles.modalInput}>

                                                <Text style={styles.StatusTouchableText}>{editedStatus}</Text>
                                                <DropdownIcon width={14} height={14} color={"#000"} />

                                            </TouchableOpacity>

                                            {/* Dropdown to show the options */}

                                            {showModalDropdown && (

                                                <View style={styles.dropdown}>

                                                    <TouchableOpacity onPress={() => selecModaltStatus("Pending")} style={styles.dropdownOption}>
                                                        <Text style={styles.dropdownOptionText}>Pending</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => selecModaltStatus("Confirmed")} style={styles.dropdownOption}>
                                                        <Text style={styles.dropdownOptionText}>Confirmed</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => selecModaltStatus("Extended")} style={styles.dropdownOption}>
                                                        <Text style={styles.dropdownOptionText}>Extended</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => selecModaltStatus("Withdrawn")} style={styles.dropdownOption}>
                                                        <Text style={styles.dropdownOptionText}>Withdrawn</Text>
                                                    </TouchableOpacity>

                                                </View>

                                            )}

                                            {
                                                editedStatus === "Confirmed" ?
                                                    <>
                                                        <Text style={styles.modalLabelText}>Employee Category</Text>

                                                        <TouchableOpacity onPress={toggleDropdown} style={styles.modalInput}>

                                                            <Text style={styles.StatusTouchableText}>
                                                                {selectedCat || "Selected Category Type"}
                                                            </Text>
                                                            <DropdownIcon width={14} height={14} color={"#000"} />

                                                        </TouchableOpacity>

                                                        {showDropdown && (
                                                            <View style={styles.dropdown}>
                                                                {categoryList.map((File, index) => (

                                                                    <TouchableOpacity key={index} onPress={() => selectCategory(File)} style={styles.dropdownOption}>
                                                                        <Text style={styles.dropdownOptionText}>{File.employee_category}</Text>
                                                                    </TouchableOpacity>

                                                                ))}
                                                            </View>
                                                        )}
                                                    </> : null
                                            }

                                            {
                                                editedStatus === "Extended" ?
                                                    <>
                                                        <Text style={styles.modalLabelText}>No. of Days</Text>
                                                        <TextInput
                                                            value={NofDays}
                                                            onChangeText={(txt) => setNofDays(txt)}
                                                            style={styles.modalInput} />
                                                        <Text style={styles.errorText}>
                                                            {NofDaysError}
                                                        </Text>
                                                    </> : null
                                            }


                                            <Text style={styles.modalLabelText}>Reason</Text>

                                            <TextInput
                                                style={styles.modalReasonInput}
                                                value={reason}
                                                onChangeText={(txt) => setReason(txt)}
                                                multiline={true}
                                                textAlignVertical="top"
                                            />

                                            <Text style={styles.errorText}>
                                                {reasonError}
                                            </Text>

                                            <View style={styles.buttoncontainer}>

                                                <TouchableOpacity style={styles.modalSubmitButton}
                                                    onPress={handleEditSubmit}
                                                >
                                                    {
                                                        EditLoad ?
                                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                            <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                                    }
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                    </View>
                                </Modal>
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

                </View>
            </View>
        </ScrollView>
    )
}

export default EmpConfirmation;