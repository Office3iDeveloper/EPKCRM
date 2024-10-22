import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, Platform, Button } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg"
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../ProjectList/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from "@react-navigation/native";
import { Linking } from 'react-native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const TaskList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [filtLoad, setFiltLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 8;

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
            const apiUrl = 'https://office3i.com/development/api/public/api/view_task_list';
            const response = await axios.post(apiUrl, {
                user_roleid: data.userrole,
                emp_id: data.userempid,
            }, {
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
        const tableHead = ['S.No', 'Task ID', 'Task Name', 'Project Name', 'Project Work Type', 'Department', 'Assigned To', 'Created By', 'Start Date', 'End Date', 'Task Status', 'Priority'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.ticket_id,
            rowData.task_name,
            rowData.project_name,
            rowData.project_worktype,
            rowData.department,
            rowData.assign_to,
            rowData.created_by,
            rowData.start_date,
            rowData.end_date,
            rowData.task_status,
            rowData.priority,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Task_List.xlsx';

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
        const tableHead = ['S.No', 'Task ID', 'Task Name', 'Project Name', 'Project Work Type', 'Department', 'Assigned To', 'Created By', 'Start Date', 'End Date', 'Task Status', 'Priority'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.ticket_id,
            rowData.task_name,
            rowData.project_name,
            rowData.project_worktype,
            rowData.department,
            rowData.assign_to,
            rowData.created_by,
            rowData.start_date,
            rowData.end_date,
            rowData.task_status,
            rowData.priority,
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
                fileName: 'Task_List',
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

    // Api call for Delete

    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')
    const [ReasonError1, setReasonError1] = useState('')
    const [Reason, setReason] = useState('');
    const [Reason1, setReason1] = useState('');
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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_task`;

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
                    handleShowAlert(response.data.message);
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data.message);
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

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedStatus, setEditedStatus] = useState(null);

    const openEditModal = () => {
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    // 

    const [isStartDateSelected, setIsStartDateSelected] = useState(false);
    const [isEndDateSelected, setIsEndDateSelected] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
            setIsStartDateSelected(true);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
            setIsEndDateSelected(true);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // 

    const [showModalDropdown, setShowModalDropdown] = useState(false);

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://office3i.com/development/api/public/api/userrolelist';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setSelectedDepartmentsId(item.id);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
    };

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://office3i.com/development/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    // 

    const handleEditSubmit = async () => {
        setFiltLoad(true);

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/filter_tasklist`;

            // Construct the request payload
            const payload = {
                department_id: selectedDepartmentsId,
                emp_id: selectedMemberId || data.userempid,
                status: editedStatus
            };

            // Add dates only if they are selected
            if (isStartDateSelected) {
                payload.from_date = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
            }
            if (isEndDateSelected) {
                payload.to_date = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
            }

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responsedata = response.data;
            console.log(responsedata, "responsedata");

            if (responsedata.status === "success") {
                setFiltLoad(false);
                setDatalist(responsedata.data);
            } else {
                setFiltLoad(false);
            }
        } catch (error) {
            setFiltLoad(false);
            console.error('Error:', error);
        }

        closeEditModal();
    };

    // 

    const [departmentNameDropdown1, setDepartmentNameDropdown1] = useState([]);
    const [showDepartmentNameDropdown1, setShowDepartmentNameDropdown1] = useState(false);
    const [selectedDepartments1, setSelectedDepartments1] = useState('');
    const [selectedDepartmentsId1, setSelectedDepartmentsId1] = useState('');

    useEffect(() => {
        const apiUrl = `https://office3i.com/development/api/public/api/supervisor_department_list/${data.userrole}`;

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setDepartmentNameDropdown1(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment1 = (item) => {
        setSelectedDepartments1(item.role_name);
        setSelectedDepartmentsId1(item.id);
        setShowDepartmentNameDropdown1(false);
        fetchEmployeeDropdown1(item.id);
    };

    const [employeeDropdown1, setEmployeeDropdown1] = useState([]);
    const [showEmployeeDropdown1, setShowEmployeeDropdown1] = useState(false);
    const [selectedMember1, setSelectedMember1] = useState('');
    const [selectedMemberId1, setSelectedMemberId1] = useState('');

    const fetchEmployeeDropdown1 = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://office3i.com/development/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown1(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleSelectMember1 = (item) => {
        setSelectedMember1(item.emp_name);
        setSelectedMemberId1(item.emp_id)
        setShowEmployeeDropdown1(false);
    };

    // 

    const [editModalVisible1, setEditModalVisible1] = useState(false);
    const [editedStatus1, setEditedStatus1] = useState();
    const [EditLoad, setEditLoad] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const [showModalDropdown1, setShowModalDropdown1] = useState(false);

    const toggleModalDropdown1 = () => {
        setShowModalDropdown1(!showModalDropdown1);
    };

    const selecModaltStatus1 = (status) => {
        setEditedStatus1(status);
        setShowModalDropdown1(false);
    };

    // Function to open edit modal and populate data

    const openEditModal1 = (item) => {
        setEditedStatus1(item.task_status);
        setSelectedSlotId(item.id);
        setEditModalVisible1(true);
    };

    // Function to close edit modal

    const closeEditModal1 = () => {
        setEditModalVisible1(false);
    };

    // Function to handle edit submission

    const handleEditSubmit1 = async () => {

        setEditLoad(true);

        try {

            if (editedStatus1 === "Hold") {
                if (!Reason1) {
                    setReasonError1('Reason Required');
                    setEditLoad(false);
                    return;
                } else {
                    setReasonError1('');
                    setReason1('');
                }
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/task_update_status';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                status: editedStatus1,
                reason: Reason1,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                fetchData();
                Alert.alert("Successfull", response.data.message);
            } else {
                setEditLoad(false);
                Alert.alert("Failed To Update", response.data.message);
                console.error('Failed To Update:', response.data.error);
            }

        } catch (error) {
            setEditLoad(false);
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }

        closeEditModal1();
    };

    const handlePreview = (UrlLink) => {

        const baseUrl = 'https://office3i.com/development/api/storage/app/';
        const filePath = UrlLink;
        const url = `${baseUrl}${filePath}`;

        if (filePath && filePath !== "-") {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        } else {
            Alert.alert('No File Located')
        }
    }

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

                <View style={{ margin: '5%' }}>
                    <TouchableOpacity
                        onPress={() => openEditModal()}
                        style={{ backgroundColor: '#0A62F1', width: '25%', height: 41, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                            Filter
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Task ID</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Task Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Project Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Project Work Type</Text>
                                    {(data.userrole == 1 || data.userrole == 2) ? null : <Text style={[styles.header, styles.cell, styles.Status]}>Description</Text>}
                                    {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.header, styles.cell, styles.WeekOff]}>Department</Text> : null}
                                    {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.header, styles.cell, styles.Status]}>Assigned To</Text> : null}
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Created By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Attachment</Text>
                                    {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.header, styles.cell, styles.Status]}>Task Status</Text> : null}
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Priority</Text>
                                    {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text> : null}
                                    {(data.userrole == 1 || data.userrole == 2) ? null : <Text style={[styles.header, styles.cell, styles.StatusT]}>Task Status</Text>}
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.ticket_id}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.task_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.project_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.project_worktype}</Text>
                                            {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.cell, styles.ShiftSlot]}>{item.department}</Text> : null}
                                            {(data.userrole == 1 || data.userrole == 2) ? <Text style={[styles.cell, styles.WeekOff]}>{item.assign_to}</Text> : null}
                                            {(data.userrole == 1 || data.userrole == 2) ? null : <Text style={[styles.cell, styles.WeekOff]}>{item.description}</Text>}
                                            <Text style={[styles.cell, styles.Status]}>{item.created_by}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.start_date}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.end_date}</Text>

                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity
                                                    onPress={() => handlePreview(item.attachment)}
                                                    style={styles.listcontentviewbutton}>
                                                    <ViewIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View>

                                            {(data.userrole == 1 || data.userrole == 2) ? (
                                                <TouchableOpacity
                                                    style={[styles.cell, styles.Status]}
                                                    onPress={item.task_status === "Hold" ? () => Alert.alert(item.hold_reason) : null}
                                                >
                                                    <Text style={item.task_status === "Hold" ? { color: 'red' } : {}}>{item.task_status}</Text>
                                                </TouchableOpacity>
                                            ) : null}

                                            <View style={[styles.Status11]}>
                                                <Text style={[styles.cell, item.priority === "Low" ? styles.PriorityLow : item.priority === "Medium" ? styles.PriorityMedium : item.priority === "High" ? styles.PriorityHigh : null]}>{item.priority}</Text>
                                            </View>

                                            {(data.userrole == 1 || data.userrole == 2) ? <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => navigation.navigate('Edit Task', { Id: item })}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.listcontentdelbutton}
                                                    onPress={() => HandleDelete(item.id)}
                                                >
                                                    <DeleteIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View> : null}
                                            {(data.userrole == 1 || data.userrole == 2) ? null :
                                                <TouchableOpacity style={[styles.Status2, styles.Taskdrop]} onPress={() => openEditModal1(item)}>
                                                    <Text style={[styles.cell]}>{item.task_status}</Text>
                                                    <DropdownIcon width={14} height={14} color={"#0879F6"} />
                                                </TouchableOpacity>}
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

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

                            {(data.userrole == 1 || data.userrole == 2) ? <View style={styles.FilterView}>
                                <Text style={styles.modalLabelText}>Department</Text>
                                <TouchableOpacity
                                    onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                                    style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedDepartments ? selectedDepartments : 'Select Department'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                            </View> : null}

                            {showDepartmentNameDropdown && (
                                <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                                    <View style={styles.modaldropdown}>
                                        <ScrollView>
                                            {departmentNameDropdown.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => handleSelectDepartment(item)}
                                                >
                                                    <Text>{item.role_name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            {(data.userrole == 1 || data.userrole == 2) ? <View style={styles.FilterView}>
                                <Text style={styles.modalLabelText}>Assigned To</Text>
                                <TouchableOpacity
                                    onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                                    style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedMember ? selectedMember : 'Select Member'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>


                            </View> : null}

                            {showEmployeeDropdown && (
                                <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                                    <View style={styles.modaldropdown}>
                                        <ScrollView>
                                            {employeeDropdown.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => handleSelectMember(item)}
                                                >
                                                    <Text>{item.emp_name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            {(data.userrole == 3) ? <View style={styles.FilterView}>
                                <Text style={styles.modalLabelText}>Department</Text>
                                <TouchableOpacity
                                    onPress={() => setShowDepartmentNameDropdown1(!showDepartmentNameDropdown1)}
                                    style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedDepartments1 ? selectedDepartments1 : 'Select Department'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                            </View> : null}

                            {showDepartmentNameDropdown1 && (
                                <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                                    <View style={styles.modaldropdown}>
                                        <ScrollView>
                                            {departmentNameDropdown1.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => handleSelectDepartment1(item)}
                                                >
                                                    <Text>{item.role_name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            {(data.userrole == 3) ? <View style={styles.FilterView}>
                                <Text style={styles.modalLabelText}>Assigned To</Text>
                                <TouchableOpacity
                                    onPress={() => setShowEmployeeDropdown1(!showEmployeeDropdown1)}
                                    style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedMember1 ? selectedMember1 : 'Select Member'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>


                            </View> : null}

                            {showEmployeeDropdown1 && (
                                <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                                    <View style={styles.modaldropdown}>
                                        <ScrollView>
                                            {employeeDropdown1.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => handleSelectMember1(item)}
                                                >
                                                    <Text>{item.emp_name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            <View style={styles.FilterView}>

                                <Text style={styles.modalLabelText}>From Date</Text>

                                <View style={styles.modalInput1} >
                                    <Text onPress={showDatepicker}>
                                        {isStartDateSelected ? startDate.toDateString() : "Select Start Date"} &nbsp;
                                    </Text>
                                    {/* {showDatePicker && (
                                        <DateTimePicker
                                            value={startDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange}
                                        />
                                    )} */}
                                     {Platform.OS === 'android' && showDatePicker && (
                                        <DateTimePicker
                                            value={startDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange}
                                        />
                                    )}

                                    {Platform.OS === 'ios' && (
                                        <Modal visible={showDatePicker} transparent={true} animationType="fade">
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent1}>
                                                    <DateTimePicker
                                                        value={startDate || new Date()}
                                                        mode="date"
                                                        display="default"
                                                        onChange={handleDateChange}
                                                    />
                                                    <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
                                                </View>
                                            </View>
                                        </Modal>
                                    )}
                                </View>

                            </View>

                            <View style={styles.FilterView}>

                                <Text style={styles.modalLabelText}>To Date</Text>

                                <View style={styles.modalInput1} >
                                    <Text onPress={showDatepicker1}>
                                        {isEndDateSelected ? endDate.toDateString() : "Select End Date"} &nbsp;
                                    </Text>
                                    {/* {showDatePicker1 && (
                                        <DateTimePicker
                                            value={endDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange1}
                                        />
                                    )} */}
                                      {Platform.OS === 'android' && showDatePicker1 && (
                                        <DateTimePicker
                                            value={endDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange1}
                                        />
                                    )}

                                    {Platform.OS === 'ios' && (
                                        <Modal visible={showDatePicker1} transparent={true} animationType="fade">
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent1}>
                                                    <DateTimePicker
                                                        value={endDate}
                                                        mode="date"
                                                        display="default"
                                                        onChange={handleDateChange1}
                                                    />
                                                    <Button title="Cancel" onPress={() => setShowDatePicker1(false)} />
                                                </View>
                                            </View>
                                        </Modal>
                                    )}
                                </View>

                            </View>

                            <View style={styles.FilterView}>

                                <Text style={styles.modalLabelText}>Status</Text>

                                <TouchableOpacity onPress={toggleModalDropdown} style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>{editedStatus ? editedStatus : "Select Status"}</Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                            </View>

                            {/* Dropdown to show the options */}

                            {showModalDropdown && (
                                <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                                    <View style={styles.modaldropdown}>

                                        <TouchableOpacity onPress={() => selecModaltStatus("Not Yet Start")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Not Yet Start</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => selecModaltStatus("In-Progress")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>In-Progress</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => selecModaltStatus("Hold")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Hold</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => selecModaltStatus("Completed")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Completed</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )}

                            <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.modalSubmitButton}
                                    onPress={handleEditSubmit}
                                >
                                    {
                                        filtLoad ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalSubmitButtonText}>Apply Filter</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={editModalVisible1}
                    onRequestClose={closeEditModal1}
                >
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>

                            <Text style={styles.Heading}>Status Update</Text>

                            <Text style={styles.modalLabelText}>Status</Text>

                            <TouchableOpacity onPress={toggleModalDropdown1} style={styles.modalInput2}>

                                <Text style={styles.StatusTouchableText}>{editedStatus1}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {/* Dropdown to show the options */}

                            {showModalDropdown1 && (

                                <View style={styles.dropdown}>

                                    <TouchableOpacity onPress={() => selecModaltStatus1("Not Yet Start")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Not Yet Start</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus1("In-Progress")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>In-Progress</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus1("Hold")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Hold</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus1("Completed")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Completed</Text>
                                    </TouchableOpacity>

                                </View>

                            )}

                            {editedStatus1 === "Hold" ?
                                <>
                                    <Text style={styles.ModalerrorText}>
                                        { }
                                    </Text>

                                    <Text style={styles.modalLabelText}>Reason:</Text>

                                    <TextInput
                                        value={Reason1}
                                        onChangeText={(text) => setReason1(text)}
                                        style={styles.Reason1}
                                    />

                                    <Text style={styles.errorTextDelete}>
                                        {ReasonError1}
                                    </Text>
                                </> : null
                            }

                            <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit1}>
                                    {
                                        EditLoad ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCancelButton} onPress={closeEditModal1}>
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>

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
        </ScrollView>
    )
}

export default TaskList;