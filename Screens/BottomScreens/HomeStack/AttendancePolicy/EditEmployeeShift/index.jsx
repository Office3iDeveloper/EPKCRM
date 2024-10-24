import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditEmployeeShift = ({ navigation, route }) => {

    // route

    const {
        Id,
        Slot,
        DepartmentName,
        Employee,
        EmployeeId,
        DepartmentId,
        SlotId,
        WeekOffId } = route.params;

    // useRef

    const ref = useRef(null);

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [WeekoffError, setWeekoffError] = useState('');

    const [load, SetLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [selectedID, setSelectedID] = useState();

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedShiftError, setSelectedShiftError] = useState('');

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [statusError, setStatusError] = useState('');

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds;

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds;

    const [showWeekoff, setShowWeekoff] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDaysIds, setSelectedDaysIds] = useState([]);

    const handleToggleDay = (day, index) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
            setSelectedDaysIds(selectedDaysIds.filter(id => id !== index.toString()));
        } else {
            setSelectedDays([...selectedDays, day]);
            setSelectedDaysIds([...selectedDaysIds, index.toString()]);
        }
    };

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

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    // Api call for shift slot dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/shiftslotlist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setShiftSlotList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectShift = (shift) => {
        setSelectedShift(shift.shift_slot);
        setSelectedShiftId(shift.id);
        setShowDropdown(false);
    };


    // Date Formatter 

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;


    const HandleSubmit = async () => {

        SetLoad(true);

        try {

            if (!selectedDays.length) {
                setWeekoffError('Week off Required');
                SetLoad(false)
                return;
            } else {
                setWeekoffError('');
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/update_employeeshift';

            const response = await axios.put(apiUrl, {
                id: selectedID,
                department_id: selectedDepartmentIdsAsNumbers,
                emp_id: selectedEmployeesIdsAsNumbers,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                shift_slotid: selectedShiftId,
                week_off: selectedDaysIds.toString(),
                shift_status: selectedStatus,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                SetLoad(false);
                handleShowAlert(response.data);
            } else {
                // Alert.alert("Failed To Add");
                handleShowAlert1(response.data);
                SetLoad(false);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
            SetLoad(false);
        }
    }

    // Api call for datalist

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://epkgroup.in/crm/api/public/api/editview_employeeshift/${Id}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                if (responseData) {
                    setDatalist(responseData);
                    setSelectedID(responseData.id);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [Id]);

    // Declaring an array to map day IDs to their corresponding names

    const daysMap = {
        '1': 'Sunday',
        '2': 'Monday',
        '3': 'Tuesday',
        '4': 'Wednesday',
        '5': 'Thursday',
        '6': 'Friday',
        '7': 'Saturday'
    };

    // Declaring Data

    useEffect(() => {

        setSelectedShift(Slot);
        setSelectedDepartments([DepartmentName]);
        setSelectedEmployees([Employee]);
        setSelectedShiftId(SlotId);
        setSelectedDepartmentIds(DepartmentId);
        setSelectedEmployeesIds(EmployeeId);
        const WeekOffIds = WeekOffId.split(',');
        setSelectedDaysIds(WeekOffIds);

        if (datalist) {
            setSelectedStatus(datalist.status);
            setStartDate(new Date(datalist.start_date));
            setEndDate(new Date(datalist.end_date));

            if (datalist.week_off) {
                const weekOffDays = datalist.week_off.split(',');
                const selectedDaysNames = weekOffDays.map(dayId => daysMap[dayId]);
                setSelectedDays(selectedDaysNames.filter(Boolean));
            }

        }

    }, [datalist, Slot, DepartmentName, Employee]);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Assign Employee shift')
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
                    <Text style={styles.PolicyContainerTitleText}>Edit Employee Shift</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Department Name
                    </Text>

                    <View style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
                        </View>
                    </View>


                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employee Name
                    </Text>

                    <View style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                    </View>

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

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

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

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

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.TimeSlotText}>
                        Shift Slot
                    </Text>

                    <TouchableOpacity style={styles.TimeSlotTouchable} onPress={toggleDropdown}>

                        <Text style={styles.TimeSlotTouchableText}>{selectedShift ? selectedShift : "Select Shift"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {shiftSlotList.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectShift(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.shift_slot}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Week Off
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowWeekoff(!showWeekoff)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDays.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDays.length === 0 && <Text>Select Days</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showWeekoff && (
                        <View style={styles.dropdown}>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Sunday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Sunday', 1)}
                            >
                                <Text style={styles.dropdownOptionText}>Sunday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Monday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Monday', 2)}>
                                <Text style={styles.dropdownOptionText}>Monday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Tuesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Tuesday', 3)}>
                                <Text style={styles.dropdownOptionText}>Tuesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Wednesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Wednesday', 4)}>
                                <Text style={styles.dropdownOptionText}>Wednesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Thursday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Thursday', 5)}>
                                <Text style={styles.dropdownOptionText}>Thursday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Friday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Friday', 6)}>
                                <Text style={styles.dropdownOptionText}>Friday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Saturday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Saturday', 7)}>
                                <Text style={styles.dropdownOptionText}>Saturday</Text>
                            </TouchableOpacity>

                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {WeekoffError}
                    </Text>

                    <Text style={styles.TimeSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdownstatus && (

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
                        {statusError}
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

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.navigate('Assign Employee shift')}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
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

        </ScrollView>

    )
}

export default EditEmployeeShift; 