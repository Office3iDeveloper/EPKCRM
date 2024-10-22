import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const EditLeavePolicy = ({ navigation, route }) => {

    // route

    const { Id, Name, Role, LeaveType, StartDate, EndDate, LeaveCount, MonthlyCount } = route.params;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [selectedID, setSelectedID] = useState();

    // 

    const [Leavecount, setLeavecount] = useState();
    const [Monthlycount, setMonthlycount] = useState();
    const [LeavecountError, setLeavecountError] = useState('');
    const [MonthlycountError, setMonthlycountError] = useState('');

    // 

    const [load, setLoad] = useState(false);

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

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // Date Formatter 

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    // Api call for userrolelist

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);

    // Leave Type

    const [leaveTypeDropdown, setLeaveTypeDropdown] = useState([]);
    const [selectedleaveType, setSelectedleaveType] = useState(null);
    const [selectedleaveTypeId, setSelectedleaveTypeId] = useState(null);
    const [showleaveTypeDropdown, setShowleaveTypeDropdown] = useState(false);

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

                setLeaveTypeDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSelectLeave = (departmentName) => {
        setSelectedleaveType(departmentName.leave_type_name);
        setSelectedleaveTypeId(departmentName.id)
        setShowleaveTypeDropdown(false);
    };

    // Api call for employeelist

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!Leavecount) {
                setLeavecountError('Enter Leave Count');
                setLoad(false);
                return;
            } else {
                setLeavecountError('');
            }

            if (!Monthlycount) {
                setMonthlycountError('Enter Monthly Leave Count');
                setLoad(false);
                return;
            } else {
                setMonthlycountError('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/update_leavepolicy';

            const response = await axios.put(apiUrl, {
                id: selectedID,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                role_type: selectedDepartmentIds.toString(),
                emp_id: selectedEmployeesIds.toString(),
                leave_type: selectedleaveTypeId,
                leave_count: Leavecount,
                monthly_count: Monthlycount,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setLoad(false);
                // navigation.navigate('Leave Policy')
                handleShowAlert(response.data);
            } else {
                setLoad(false);
                // Alert.alert('Failed To Add:', response.data.message);
                handleShowAlert1(response.data);
            }

        } catch (error) {
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
            setLoad(false);
        }
    }

    // Api call for datalist

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://office3i.com/development/api/public/api/editview_leavepolicy/${Id}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                if (responseData) {
                    setSelectedEmployeesIds(responseData.emp_id);
                    setSelectedDepartmentIds([responseData.role_type]);
                    setSelectedleaveTypeId(responseData.leave_type);
                    setSelectedID(responseData.id);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [Id]);

    useEffect(() => {
        setSelectedleaveType(LeaveType);
        setSelectedDepartments([Role]);
        setSelectedEmployees([Name]);
        setMonthlycount(MonthlyCount);
        setLeavecount(LeaveCount);
        const startDateObj = new Date(StartDate);
        const endDateObj = new Date(EndDate);
        setStartDate(startDateObj);
        setEndDate(endDateObj);
    }, [LeaveType, Role, Name, MonthlyCount, LeaveCount, StartDate, EndDate])

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Leave Policy')
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

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Edit Leave Policy</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Start Date
                    </Text>

                    <View style={styles.inputs} >
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

                    <Text style={styles.StatDateText}>
                        End Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {endDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.StatDateText}>
                        Leave Type
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowleaveTypeDropdown(!showleaveTypeDropdown)}>
                        <Text>{selectedleaveType || 'Select Leave Type'}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showleaveTypeDropdown && (
                        <View style={styles.dropdown}>
                            {leaveTypeDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedleaveType === department.leave_type_name && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelectLeave(department)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.leave_type_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.StatDateText}>
                        Role
                    </Text>

                    <View style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Role</Text>}
                        </View>
                    </View>

                    <Text style={styles.StatDateText}>
                        Select Employee
                    </Text>

                    <View style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                    </View>

                    <Text style={styles.StatDateText}>
                        Total Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Leavecount}
                        onChangeText={(text) => setLeavecount(text)}
                        style={styles.TextInput}
                    />

                    <Text style={styles.errorText}>
                        {LeavecountError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Monthly Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Monthlycount}
                        onChangeText={(text) => setMonthlycount(text)}
                        style={styles.TextInput}
                    />

                    <Text style={styles.errorText}>
                        {MonthlycountError}
                    </Text>

                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Update
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.navigate('Leave Policy')}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
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

export default EditLeavePolicy;