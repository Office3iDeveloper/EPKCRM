import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import styles from "./style";
import { useSelector } from "react-redux";
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const AddLeavePermissionHalfDay = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const [Reason, setReason] = useState('');
    const [ReasonErr, setReasonErr] = useState('');
    const [shiftId, setShiftId] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [load, setLoad] = useState(false);

    // Department

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');

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

                // console.log(responseData,"responseData")

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
        setSelectedMemberId('');
        setSelectedMember('');
    };

    // Member

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [selectedMemberErr, setSelectedMemberErr] = useState('');


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

    // Type

    const [TypeDropdown, setTypeDropdown] = useState([]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedTypeErr, setSelectedTypeErr] = useState('');

    useEffect(() => {
        const apiUrl = 'https://office3i.com/development/api/public/api/leave_type_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setTypeDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectType = (item) => {
        setSelectedType(item.leave_type_name);
        setSelectedTypeId(item.id);
        setShowTypeDropdown(false);
    };

    // Category

    const [CategoryDropdown, setCategoryDropdown] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryErr, setSelectedCategoryErr] = useState('');
    console.log(selectedCategory, "selectedCategory")

    useEffect(() => {
        const apiUrl = 'https://office3i.com/development/api/public/api/leave_category_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setCategoryDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectCategory = (item) => {
        setSelectedCategory(item.leave_category_name);
        setSelectedCategoryId(item.id);
        setShowCategoryDropdown(false);
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedStartDate, "formattedStartDate");

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // 

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [date, setDate] = useState(null);
    const [dateErr, setdateErr] = useState('');

    const formatteddate = date ?
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` :
        "";
    console.log(formatteddate, "formatteddate")

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setDate(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    // 

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [endDateErr, setEndDateErr] = useState(null);
    const formattedendDate = endDate ?
        `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedendDate, "formattedendDate");

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // From Time 

    const [slotfromTime, setSlotfromTime] = useState(null);
    const [slotfromTimeErr, setSlotfromTimeErr] = useState(null);
    const [showSlotFromTimePicker, setShowSlotFromTimePicker] = useState(false);

    const handleSlotFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotfromTime(formattedTime);
        }
        setShowSlotFromTimePicker(false);
    };

    const showSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // To Time 

    const [slotToTime, setSlotToTime] = useState(null);
    const [slotToTimeErr, setSlotToTimeErr] = useState(null);
    const [showSlotToTimePicker, setShowSlotToTimePicker] = useState(false);

    const handleSlotToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotToTime(formattedTime);
        }
        setShowSlotToTimePicker(false);
    };

    const showSlotToTimepicker = () => {
        setShowSlotToTimePicker(true);
    };

    // 

    const AppendedData = async () => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/shift_slot_checking`;

            const response = await axios.post(apiUrl, {
                emp_id: selectedMemberId,
                request_type: selectedCategoryId,
                from_date: formatteddate,
                to_date: formattedendDate,
                date: formattedStartDate,
                from_time: slotfromTime,
                to_time: slotToTime
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const ResData = response.data;
            console.log(ResData, "ResData");

            if (ResData.status === "success") {
                setShiftId(ResData.shift_id);
                setShiftName(ResData.shift_name);
            } else {
                console.log("Error")
            }

            console.log(response.data, "response vantaan paa")

        } catch (error) {
            console.log(error, "error")
        }
    }

    useEffect(() => {
        AppendedData();
    }, [slotToTime, formattedendDate])

    // 

    // Function to handle document selection

    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    const validateFields = () => {
        let isValid = true;
    
        if (!selectedDepartments) {
            setSelectedDepartmentsErr('Select Department Name');
            isValid = false;
        } else {
            setSelectedDepartmentsErr('');
        }
    
        if (!selectedMember) {
            setSelectedMemberErr('Select Member Name');
            isValid = false;
        } else {
            setSelectedMemberErr('');
        }
    
        if (!selectedType) {
            setSelectedTypeErr('Select Type');
            isValid = false;
        } else {
            setSelectedTypeErr('');
        }
    
        if (!selectedCategory) {
            setSelectedCategoryErr('Select Category');
            isValid = false;
        } else {
            setSelectedCategoryErr('');
        }
    
        if (selectedCategory === "Leave" || selectedCategory === "Absent") {
            if (!date) {
                setdateErr('Select From Date');
                isValid = false;
            } else {
                setdateErr('');
            }
    
            if (!endDate) {
                setEndDateErr('Select To Date');
                isValid = false;
            } else {
                setEndDateErr('');
            }
        }
    
        if (selectedCategory === "Permission" || selectedCategory === "Half Day") {
            if (!startDate) {
                setStartDateErr('Select Date');
                isValid = false;
            } else {
                setStartDateErr('');
            }
    
            if (!slotfromTime) {
                setSlotfromTimeErr('Select From Time');
                isValid = false;
            } else {
                setSlotfromTimeErr('');
            }
    
            if (!slotToTime) {
                setSlotToTimeErr('Select To Time');
                isValid = false;
            } else {
                setSlotToTimeErr('');
            }
        }
    
        if (!Reason) {
            setReasonErr('Enter Reason');
            isValid = false;
        } else {
            setReasonErr('');
        }
    
        return isValid;
    };
    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        if (!validateFields()) {
            setLoad(false);
            return;
        }

        try {

            formData.append('emp_id', selectedMemberId);
            formData.append('hr_id', data.userempid);
            formData.append('request_type', selectedCategoryId);
            formData.append('request_category', selectedTypeId);
            formData.append('leave_reason', Reason);
            formData.append('slot_id', shiftId);
            formData.append('from_date', formatteddate);
            formData.append('to_date', formattedendDate);
            formData.append('permission_date', formattedStartDate);
            formData.append('permission_timefrom', slotfromTime);
            formData.append('permission_timeto', slotToTime);

            if (docFile) {
                if (docFile.length > 0) {
                    docFile.map((docFile, index) => {
                        formData.append(`leave_document`, {
                            uri: docFile.uri,
                            name: docFile.name,
                            type: docFile.type,
                        });
                    });
                }
            } else {
                formData.append('leave_document', docFile);
            }


            const response = await fetch('https://office3i.com/development/api/public/api/add_menualentry', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "appended")

            if (responsedata.status === 'success') {
                setLoad(false);
                // Alert.alert('Success', responsedata.message);
                handleShowAlert(responsedata.message);
            } else {
                // console.log('Error')
                handleShowAlert1(responsedata.message);
                setLoad(false);
            }

        } catch (error) {
            setLoad(false);
            // console.log('error', error)
            handleShowAlert2();
        }

    }

    const onRefresh = () => {
        setSelectedMemberId('');
        setSelectedMember('');
        setSelectedDepartments('');
        setSelectedType('');
        setSelectedTypeId('');
        setSelectedCategory('');
        setSelectedCategoryId('');
        setStartDate(null);
        setDate(null);
        setEndDate(null);
        setSlotfromTime(null);
        setSlotToTime(null);
        setReason('');
        setDocFile('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Approvals List');
            onRefresh();
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

    // const filteredCategoryDropdown = CategoryDropdown.filter(item => item.leave_category_name !== "Absent");

    return (

        <ScrollView>

            <View style={styles.InputContainer}>

                <Text style={styles.subHeading}>
                    Select Department
                </Text>

                <TouchableOpacity
                    style={styles.StatusTouchable}
                    onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                >
                    <Text style={styles.StatusTouchableText}>
                        {selectedDepartments || 'Select Department'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showDepartmentNameDropdown && (
                    <View style={styles.dropdown}>
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
                )}

                <Text style={styles.errorText}>
                    {selectedDepartmentsErr}
                </Text>

                <Text style={styles.subHeading}>
                    Select Member
                </Text>

                <TouchableOpacity
                    onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedMember || 'Select Member'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showEmployeeDropdown && (
                    <View style={styles.dropdown}>
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
                )}

                <Text style={styles.errorText}>
                    {selectedMemberErr}
                </Text>

                <Text style={styles.subHeading}>
                    Select Type
                </Text>

                <TouchableOpacity
                    onPress={() => setShowTypeDropdown(!showTypeDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedType || 'Select Type'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showTypeDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {TypeDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectType(item)}
                                >
                                    <Text>{item.leave_type_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.errorText}>
                    {selectedTypeErr}
                </Text>

                <Text style={styles.subHeading}>
                    Select Category
                </Text>

                <TouchableOpacity
                    onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedCategory || 'Select Category'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showCategoryDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {CategoryDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectCategory(item)}
                                >
                                    <Text>{item.leave_category_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.errorText}>
                    {selectedCategoryErr}
                </Text>

                {
                    selectedCategory === "Permission" || selectedCategory === "Half Day" ?
                        <>
                            <Text style={styles.subHeading}>
                                Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker}>
                                    {startDate ? startDate.toDateString() : "Select a start date"} &nbsp;
                                </Text>
                                {/* {showDatePicker && (
                                    <DateTimePicker
                                        value={startDate || new Date()}
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

                            <Text style={styles.errorText}>
                                {startDateErr}
                            </Text>

                            <Text style={styles.subHeading}>
                                From Time
                            </Text>

                            <View style={styles.inputs}>
                                <Text onPress={showSlotFromTimepicker}>
                                    {slotfromTime ? slotfromTime : "Select a time"} &nbsp;
                                </Text>
                                {/* {showSlotFromTimePicker && (
                                    <DateTimePicker
                                        value={slotfromTime ? parse(slotfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotFromTimeChange}
                                    />
                                )} */}
                                  {Platform.OS === 'android' && showSlotFromTimePicker && (
                                    <DateTimePicker
                                        value={slotfromTime ? parse(slotfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showSlotFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    value={slotfromTime ? parse(slotfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="default"
                                                    onChange={handleSlotFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowSlotFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {slotfromTimeErr}
                            </Text>

                            <Text style={styles.subHeading}>
                                To Time
                            </Text>

                            <View style={styles.inputs}>
                                <Text onPress={showSlotToTimepicker}>
                                    {slotToTime ? slotToTime : "Select a time"} &nbsp;
                                </Text>
                                {/* {showSlotToTimePicker && (
                                    <DateTimePicker
                                        value={slotToTime ? parse(slotToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotToTimeChange}
                                    />
                                )} */}
                                 {Platform.OS === 'android' && showSlotToTimePicker && (
                                    <DateTimePicker
                                        value={slotToTime ? parse(slotToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showSlotToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    value={slotToTime ? parse(slotToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="default"
                                                    onChange={handleSlotToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowSlotToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {slotToTimeErr}
                            </Text>
                        </> : null
                }

                {
                    selectedCategory === "Leave" || selectedCategory === "Absent" ?
                        <>
                            <Text style={styles.subHeading}>
                                From Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker2}>
                                    {date ? date.toDateString() : "Select a date"} &nbsp;
                                </Text>
                                {/* {showDatePicker2 && (
                                    <DateTimePicker
                                        value={date || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange2}
                                    />
                                )} */}
                                  {Platform.OS === 'android' && showDatePicker2 && (
                                    <DateTimePicker
                                        value={date || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange2}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showDatePicker2} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    value={date || new Date()}
                                                    mode="date"
                                                    display="default"
                                                    onChange={handleDateChange2}
                                                />
                                                <Button title="Cancel" onPress={() => setShowDatePicker2(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {dateErr}
                            </Text>

                            <Text style={styles.subHeading}>
                                To Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker1}>
                                    {endDate ? endDate.toDateString() : "Select an end date"} &nbsp;
                                </Text>
                                {/* {showDatePicker1 && (
                                    <DateTimePicker
                                        value={endDate || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange1}
                                    />
                                )} */}
                                 {Platform.OS === 'android' && showDatePicker1 && (
                                    <DateTimePicker
                                        value={endDate || new Date()}
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
                                                    value={endDate || new Date()}
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

                            <Text style={styles.errorText}>
                                {endDateErr}
                            </Text>
                        </> : null
                }

                <Text style={styles.subHeading}>
                    Reason
                </Text>

                <TextInput
                    value={Reason}
                    onChangeText={(text) => setReason(text)}
                    style={styles.Reason}
                    multiline={true}
                    textAlignVertical="top"
                />

                <Text style={styles.errorText}>
                    {ReasonErr}
                </Text>

                <Text style={styles.subHeading}>
                    Select File
                </Text>

                <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                    {docFile ? docFile[0].name : 'Select The Document'}
                </Text>

                <View style={styles.fullWidth}>
                    <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                        <Text style={styles.UploadButtonText}>
                            Select Document
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.errorText}>
                    {docFileErr}
                </Text>

                <View style={[styles.fullWidth, styles.Row, styles.Left]}>

                    <TouchableOpacity style={styles.NextButton}
                        onPress={HandleSubmit}
                    >
                        {load ? <ActivityIndicator size={"small"} color={"#fff"} /> : <Text style={styles.NextButtonText}>
                            Submit
                        </Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PrevButton}
                        onPress={() => onRefresh()}
                    >
                        <Text style={styles.PrevButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>

                <LottieAlertSucess
                    visible={isAlertVisible}
                    animationSource={require('../../../../../../Assets/Alerts/tick.json')}
                    title={resMessage}
                />

                <LottieAlertError
                    visible={isAlertVisible1}
                    animationSource={require('../../../../../../Assets/Alerts/Close.json')}
                    title={resMessageFail}
                />

                <LottieCatchError
                    visible={isAlertVisible2}
                    animationSource={require('../../../../../../Assets/Alerts/Catch.json')}
                    title="Error While Fetching Data"
                />

            </View>

        </ScrollView>

    )

}

export default AddLeavePermissionHalfDay;