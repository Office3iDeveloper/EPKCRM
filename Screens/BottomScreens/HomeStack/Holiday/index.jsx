import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../Assets/Icons/Search.svg";
import ArrowRightIcon from "../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../Assets/Icons/Edit.svg";
import DropdownIcon from "../../../../Assets/Icons/Dropdowndownarrow.svg";
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


const AttendanceRequest = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    console.log(datalist, "datalist")
    const [currentPage, setCurrentPage] = useState(1);
    const [EditLoad, setEditLoad] = useState(false);
    const [holidayname, setHolidayname] = useState('');
    const [holidaynameErr, setHolidaynameErr] = useState('');
    const [Addholidayname, setAddHolidayname] = useState('');
    const [AddholidaynameErr, setAddHolidaynameErr] = useState('');
    const [WeekoffError, setWeekoffError] = useState('');
    const [showWeekoff, setShowWeekoff] = useState(false);
    const [showWeekoff1, setShowWeekoff1] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDayErr, setSelectedDayErr] = useState('');
    const [AddselectedDay, setAddSelectedDay] = useState('');
    const [AddselectedDayErr, setAddSelectedDayErr] = useState('');
    const [selectedDayId, setSelectedDayId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState(null);
    const [selectedStatus1, setSelectedStatus1] = useState(null);
    const [selectedStatus1Err, setSelectedStatus1Err] = useState('');
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [showDropdownstatus1, setShowDropdownstatus1] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [DelData, setDelData] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [Reason, setReason] = useState('')
    const [ReasonError, setReasonError] = useState('')
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const itemsPerPage = 6;

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
            const apiUrl = 'https://office3i.com/development/api/public/api/viewholidaylist';
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
        const tableHead = ['S.No', 'Holiday', 'Date', 'Day', 'Type'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.h_name,
            rowData.h_date,
            rowData.h_day,
            rowData.h_type,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/holidaylist.xlsx';

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
        const tableHead = ['S.No', 'Holiday', 'Date', 'Day', 'Type'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.h_name,
            rowData.h_date,
            rowData.h_day,
            rowData.h_type,
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
                fileName: 'HolidayList',
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

    // Handler for Add holiday

    const [isModalVisible, setIsModalVisible] = useState(false);

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    // 

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setStartDate1(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const formattedStartDate1 = `${startDate1.getFullYear()}-${startDate1.getMonth() + 1}-${startDate1.getDate()}`;

    // 

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const validateHolidayFields = () => {
        let isValid = true;

        // Define the fields and their corresponding error setters and messages
        const fieldsToValidate = [
            {
                value: Addholidayname,
                errorSetter: setAddHolidaynameErr,
                errorMessage: 'Enter Holiday Name',
            },
            {
                value: AddselectedDay,
                errorSetter: setAddSelectedDayErr,
                errorMessage: 'Select Day',
            },
            {
                value: selectedStatus1,
                errorSetter: setSelectedStatus1Err,
                errorMessage: 'Select Holiday Type',
            }
        ];

        // Iterate over the fields and perform validation
        fieldsToValidate.forEach(field => {
            if (!field.value) {
                field.errorSetter(field.errorMessage);
                isValid = false;
            } else {
                field.errorSetter('');
            }
        });

        return isValid;
    };

    const handleEditSubmit = async () => {

        setEditLoad(true);

        const formData = new FormData();

        if (!validateHolidayFields()) {
            setEditLoad(false);
            return;
        }

        formData.append('h_name', Addholidayname);
        formData.append('h_date', formattedStartDate1);
        formData.append('h_day', AddselectedDay);
        formData.append('created_by', data.userempid);
        formData.append('h_type', selectedStatus1);


        try {
            const response = await fetch('https://office3i.com/development/api/public/api/add_holiday', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${data.token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setEditLoad(false);
                // Alert.alert("Successfull", responsedata.message);
                handleShowAlert(responsedata);
                setIsModalVisible(false);
                setAddHolidayname('');
                setStartDate1(new Date());
                setAddSelectedDay('');
                setSelectedStatus1(null);
                fetchData();
            } else {
                setEditLoad(false);
                // Alert.alert("Failed", responsedata.message);
                handleShowAlert1(responsedata);
            }

        } catch (error) {
            // Alert.alert("Failed", responsedata.error);
            handleShowAlert2();
        }
    };

    const HandleCancel = () => {
        setIsModalVisible(!isModalVisible);
    }

    // 

    const handleToggleDay = (day, id) => {
        if (selectedDay === day) {
            setSelectedDay('');
            setSelectedDayId('');
        } else {
            setSelectedDay(day);
            setSelectedDayId(id);
        }
        setShowWeekoff(false);
    };

    const ADDhandleToggleDay = (day, id) => {
        if (selectedDay === day) {
            setAddSelectedDay('');
        } else {
            setAddSelectedDay(day);
        }
        setShowWeekoff1(false);
    };

    // 

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    const toggleDropdownstatus1 = () => {
        setShowDropdownstatus1(!showDropdownstatus1);
    };

    const selectStatus1 = (status) => {
        setSelectedStatus1(status);
        setShowDropdownstatus1(false);
    };

    // 

    // Api call for Delete

    const HandleDelete = (item) => {
        setSlotToDelete(item.id);
        setModalVisible(true);
    }

    const cancelDelete = () => {

        setModalVisible(false);

        setDelData(false);
    }

    const confirmDelete = async () => {

        setDelData(true)

        try {

            if (!Reason) {
                setReasonError('Reason Required');
                setDelData(false);
                return;
            } else {
                setReasonError('');
                setReason('');
            }

            const apiUrl = `https://office3i.com/development/api/public/api/delete_holiday`;
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
                fetchData();
                setReason('');
                setDelData(false);
                handleShowAlert(response.data);
            } else {
                // Alert.alert("Failed", response.data.message);
                handleShowAlert1(response.data);
                setDelData(false)
            }
        } catch (error) {
            // Alert.alert("Error", response.data.message);
            handleShowAlert2();
            setDelData(false)
        }
        setSlotToDelete(null);
        setModalVisible(false);

    }

    // Function to open edit modal and populate data

    const openEditModal = (item) => {
        setHolidayname(item.h_name);
        setSelectedStatus(item.h_type);
        setSelectedDay(item.h_day);
        setEditModalVisible(true);
        setSelectedSlotId(item.id);
        const parsedDate = new Date(item.h_date.split('-').reverse().join('-'));
        setStartDate(parsedDate);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        // setEditedShiftError('');
        // setEditedstatusError('');
        // setEditedStatus(null);
    };

    // Function to handle edit submission

    const handleEdit = async () => {

        setEditLoad(true);

        if (!holidayname) {
            setHolidaynameErr('Enter Holiday Name');
            setEditLoad(false);
            return;
        } else {
            setHolidaynameErr('');
        }

        if (!selectedDay) {
            setSelectedDayErr('Select Day');
            setEditLoad(false);
            return;
        } else {
            setSelectedDayErr('');
        }

        if (!selectedStatus) {
            setSelectedStatusErr('Select Holiday Type');
            setEditLoad(false);
            return;
        } else {
            setSelectedStatusErr('');
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/edit_holiday';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                h_name: holidayname,
                h_date: formattedStartDate,
                h_day: selectedDay,
                h_type: selectedStatus,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                // Alert.alert("Successfull", response.data.message);
                setEditLoad(false);
                setHolidayname('');
                setStartDate(new Date());
                setSelectedDay('');
                setSelectedStatus(null);
                fetchData();
                handleShowAlert(response.data);
            } else {
                setEditLoad(false);
                // Alert.alert("Failed To Update", response.data.message);
                handleShowAlert1(response.data);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", error);
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

                {(data.userrole == 1 || data.userrole == 2) ? <View style={styles.AddHoliday}>
                    <TouchableOpacity style={styles.AddHolidayButton}
                        onPress={toggleModal}
                    >
                        <Text style={styles.AddHolidayText}>
                            + Add Holiday
                        </Text>
                    </TouchableOpacity>
                </View> : null}

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Holiday</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Day</Text>
                                    {(data.userrole == 1 || data.userrole == 2) ?
                                        <Text style={[styles.header, styles.cell, styles.EndDate]}>Action</Text> : null
                                    }
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[
                                            styles.row,
                                            styles.listBody,
                                        ]}>
                                            <Text style={[styles.cell, styles.sno, , { color: item.h_type == "Declared Holiday" ? "#0A62F1" : "#000" }]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName, { color: item.h_type == "Declared Holiday" ? "#0A62F1" : "#000" }]}>{item.h_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName, { color: item.h_type == "Declared Holiday" ? "#0A62F1" : "#000" }]}>{item.h_date}</Text>
                                            <Text style={[styles.cell, styles.StartDate, { color: item.h_type == "Declared Holiday" ? "#0A62F1" : "#000" }]}>{item.h_day}</Text>
                                            {(data.userrole == 1 || data.userrole == 2) ? <View style={[styles.listcontentButtonview, styles.EndDate]}>
                                                <TouchableOpacity
                                                    onPress={() => openEditModal(item)}
                                                    style={styles.listcontenteditbutton}>
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => HandleDelete(item)}
                                                    style={styles.listcontentdelbutton}>
                                                    <DeleteIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>

                                            </View> : null}
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                {/* Add Modal */}

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isModalVisible}
                    onRequestClose={toggleModal}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>

                            <Text style={styles.Heading}>Add Holiday</Text>
                            <Text style={styles.modalLabelText}>Holiday</Text>

                            <TextInput
                                value={Addholidayname}
                                onChangeText={(txt) => setAddHolidayname(txt)}
                                placeholder="Holiday Name"
                                style={styles.modalInput}
                            />

                            <Text style={styles.ModalerrorText}>
                                {AddholidaynameErr}
                            </Text>

                            <Text style={styles.modalLabelText}>Date</Text>

                            <View style={styles.modalInput} >
                                <Text onPress={showDatepicker1}>
                                    {startDate1.toDateString()} &nbsp;
                                </Text>
                                {showDatePicker1 && (
                                    <DateTimePicker
                                        value={startDate1}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange1}
                                    />
                                )}
                            </View>

                            <Text style={styles.ModalerrorText}>
                                { }
                            </Text>

                            <Text style={styles.modalLabelText}>Day</Text>

                            <TouchableOpacity style={styles.modalInput} onPress={() => setShowWeekoff1(!showWeekoff1)}>
                                <View>
                                    {AddselectedDay ? (
                                        <Text style={styles.selectedays}>{AddselectedDay}</Text>
                                    ) : (
                                        <Text>Select Day</Text>
                                    )}
                                </View>
                                <DropdownIcon width={14} height={14} color={"#000"} />
                            </TouchableOpacity>

                            {showWeekoff1 && (
                                <View style={styles.dropdown}>
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Sunday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Sunday', '1')}
                                    >
                                        <Text style={styles.dropdownOptionText}>Sunday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Monday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Monday', '2')}>
                                        <Text style={styles.dropdownOptionText}>Monday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Tuesday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Tuesday', '3')}>
                                        <Text style={styles.dropdownOptionText}>Tuesday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Wednesday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Wednesday', '4')}>
                                        <Text style={styles.dropdownOptionText}>Wednesday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Thursday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Thursday', '5')}>
                                        <Text style={styles.dropdownOptionText}>Thursday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Friday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Friday', '6')}>
                                        <Text style={styles.dropdownOptionText}>Friday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            AddselectedDay === 'Saturday'
                                        ]}
                                        onPress={() => ADDhandleToggleDay('Saturday', '7')}>
                                        <Text style={styles.dropdownOptionText}>Saturday</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            <Text style={styles.errorText}>
                                {AddselectedDayErr}
                            </Text>

                            <Text style={styles.modalLabelText}>Select Holiday Type</Text>

                            <TouchableOpacity onPress={toggleDropdownstatus1} style={styles.modalInput}>

                                <Text style={styles.StatusTouchableText}>{selectedStatus1 || "Select Type"}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {/* Dropdown to show the options */}

                            {showDropdownstatus1 && (

                                <View style={styles.dropdown}>

                                    <TouchableOpacity onPress={() => selectStatus1("Public Holiday")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Public Holiday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectStatus1("Declared Holiday")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Declared Holiday</Text>
                                    </TouchableOpacity>

                                </View>

                            )}

                            <Text style={styles.errorText}>
                                {selectedStatus1Err}
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

                                <TouchableOpacity style={styles.modalCancelButton1}
                                    onPress={HandleCancel}
                                >
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>

                {/*  */}

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

                {/*  */}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={closeEditModal}
                >
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>

                            <Text style={styles.Heading}>Edit Holiday</Text>
                            <Text style={styles.modalLabelText}>Holiday</Text>

                            <TextInput
                                value={holidayname}
                                onChangeText={(txt) => setHolidayname(txt)}
                                style={styles.modalInput}
                            />

                            <Text style={styles.ModalerrorText}>
                                {holidaynameErr}
                            </Text>

                            <Text style={styles.modalLabelText}>Date</Text>

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
                                    />
                                )}
                            </View>

                            <Text style={styles.ModalerrorText}>
                                { }
                            </Text>

                            <Text style={styles.modalLabelText}>Day</Text>

                            <TouchableOpacity style={styles.modalInput} onPress={() => setShowWeekoff(!showWeekoff)}>
                                <View>
                                    {selectedDay ? (
                                        <Text style={styles.selectedays}>{selectedDay}</Text>
                                    ) : (
                                        <Text>Select Day</Text>
                                    )}
                                </View>
                                <DropdownIcon width={14} height={14} color={"#000"} />
                            </TouchableOpacity>

                            {showWeekoff && (
                                <View style={styles.dropdown}>
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Sunday'
                                        ]}
                                        onPress={() => handleToggleDay('Sunday', '1')}
                                    >
                                        <Text style={styles.dropdownOptionText}>Sunday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Monday'
                                        ]}
                                        onPress={() => handleToggleDay('Monday', '2')}>
                                        <Text style={styles.dropdownOptionText}>Monday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Tuesday'
                                        ]}
                                        onPress={() => handleToggleDay('Tuesday', '3')}>
                                        <Text style={styles.dropdownOptionText}>Tuesday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Wednesday'
                                        ]}
                                        onPress={() => handleToggleDay('Wednesday', '4')}>
                                        <Text style={styles.dropdownOptionText}>Wednesday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Thursday'
                                        ]}
                                        onPress={() => handleToggleDay('Thursday', '5')}>
                                        <Text style={styles.dropdownOptionText}>Thursday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Friday'
                                        ]}
                                        onPress={() => handleToggleDay('Friday', '6')}>
                                        <Text style={styles.dropdownOptionText}>Friday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownOption,
                                            selectedDay === 'Saturday'
                                        ]}
                                        onPress={() => handleToggleDay('Saturday', '7')}>
                                        <Text style={styles.dropdownOptionText}>Saturday</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            <Text style={styles.errorText}>
                                {selectedDayErr}
                            </Text>

                            <Text style={styles.modalLabelText}>Select Holiday Type</Text>

                            <TouchableOpacity onPress={toggleDropdownstatus} style={styles.modalInput}>

                                <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Type"}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {/* Dropdown to show the options */}

                            {showDropdownstatus && (

                                <View style={styles.dropdown}>

                                    <TouchableOpacity onPress={() => selectStatus("Public Holiday")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Public Holiday</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectStatus("Declared Holiday")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Declared Holiday</Text>
                                    </TouchableOpacity>

                                </View>

                            )}

                            <Text style={styles.errorText}>
                                {selectedStatusErr}
                            </Text>

                            <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.modalSubmitButton}
                                    onPress={handleEdit}
                                >
                                    {
                                        EditLoad ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalSubmitButtonText}>Update</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCancelButton1}
                                    onPress={closeEditModal}
                                >
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
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

            </View>
        </ScrollView>
    )
}

export default AttendanceRequest;