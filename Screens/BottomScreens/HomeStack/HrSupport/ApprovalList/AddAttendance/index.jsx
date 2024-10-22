import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../AddLeavePermissionHalfDay/style";
import { Alert } from "react-native";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";


const AddAttendance = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const [Reason, setReason] = useState('');
    const [ReasonErr, setReasonErr] = useState('');
    const [load, setLoad] = useState(false);
    const [shiftId, setShiftId] = useState('');
    const [shiftName, setShiftName] = useState('');

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
        const apiUrl = 'https://office3i.com/development/api/public/api/attendance_type_list';

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
        setSelectedType(item.attendance_type_name);
        setSelectedTypeId(item.id);
        setShowTypeDropdown(false);
    };

    // Location

    const [LocationDropdown, setLocationDropdown] = useState([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState('');
    const [selectedLocationErr, setSelectedLocationErr] = useState('');

    useEffect(() => {
        const apiUrl = 'https://office3i.com/development/api/public/api/attendance_location_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setLocationDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectLocation = (item) => {
        setSelectedLocation(item.attendance_location_name);
        setSelectedLocationId(item.id);
        setShowLocationDropdown(false);
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startDateErr, setStartDateErr] = useState(null);

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // From Time 

    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
    const [slotfromTimeErr, setSlotfromTimeErr] = useState(null);
    const [showSlotFromTimePicker, setShowSlotFromTimePicker] = useState(false);

    const handleSlotFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotFromTime(formattedTime);
        }
        setShowSlotFromTimePicker(false);
    };

    const showSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // To Time 

    const [slotToTime, setSlotToTime] = useState('00:00:00');
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

    // Api call for shift slot dropdown

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedShiftErr, setSelectedShiftErr] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/shiftslotlist';
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

        if (!selectedLocation) {
            setSelectedLocationErr('Select Location');
            isValid = false;
        } else {
            setSelectedLocationErr('');
        }

        // if (!selectedShift) {
        //     setSelectedShiftErr('Select Shift');
        //     isValid = false;
        // } else {
        //     setSelectedShiftErr('');
        // }

        if (!startDate) {
            setStartDateErr('Select Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        if (slotfromTime === '00:00:00') {
            setSlotfromTimeErr('Select From Time');
            isValid = false;
        } else {
            setSlotfromTimeErr('');
        }

        if (slotToTime === '00:00:00') {
            setSlotToTimeErr('Select To Time');
            isValid = false;
        } else {
            setSlotToTimeErr('');
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

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/add_attendancemenualentry';

            const response = await axios.post(apiUrl, {
                emp_id: String(selectedMemberId),
                hr_id: String(data.userempid),
                request_date: formattedStartDate,
                request_fromtime: slotfromTime,
                request_totime: slotToTime,
                request_type: String(selectedTypeId),
                request_location: String(selectedLocationId),
                // shiftslot_id: String(selectedShiftId),
                request_reason: Reason
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const ResData = response.data;

            if (ResData.status === 'success') {
                // Alert.alert('Success', ResData.message);
                handleShowAlert(ResData.message);
                setLoad(false);
            } else {
                // console.log("Error")
                handleShowAlert1(ResData.message);
                setLoad(false);
            }
        } catch (error) {
            // console.log(error);
            handleShowAlert2();
            setLoad(true);
        }
    }

    const Onrefresh = () => {
        setSelectedDepartments('');
        setSelectedMember('');
        setSelectedMemberId('');
        setSelectedTypeId('');
        setSelectedType('');
        setSelectedLocationId('');
        setSelectedLocation('');
        // setSelectedShiftId(null);
        // setSelectedShift(null);
        setStartDate(new Date());
        setSlotFromTime('00:00:00');
        setSlotToTime('00:00:00');
        setReason('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Approvals List');
        }, 2500);
        Onrefresh();
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

            <View style={styles.InputContainer}>

                <Text style={styles.subHeading}>
                    Select Department
                </Text>

                <TouchableOpacity
                    onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedDepartments ? selectedDepartments : 'Select Department'}
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
                        {selectedMember ? selectedMember : 'Select Member'}
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
                        {selectedType ? selectedType : 'Select Type'}
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
                                    <Text>{item.attendance_type_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.errorText}>
                    {selectedTypeErr}
                </Text>


                <Text style={styles.subHeading}>
                    Location
                </Text>

                <TouchableOpacity
                    onPress={() => setShowLocationDropdown(!showLocationDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedLocation ? selectedLocation : 'Select Location'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showLocationDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {LocationDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectLocation(item)}
                                >
                                    <Text>{item.attendance_location_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.errorText}>
                    {selectedLocationErr}
                </Text>

                {/* <Text style={styles.subHeading}>
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
                    {selectedShiftErr}
                </Text> */}

                <Text style={styles.subHeading}>
                    Date
                </Text>

                <View style={styles.inputs} >
                    <Text onPress={showDatepicker}>
                        {startDate.toDateString()} &nbsp;
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

                <Text style={styles.errorText}>
                    {startDateErr}
                </Text>

                <Text style={styles.subHeading}>
                    From Time
                </Text>

                <View style={styles.inputs}>
                    <Text onPress={showSlotFromTimepicker}>
                        {slotfromTime} &nbsp;
                    </Text>
                    {/* {showSlotFromTimePicker && (
                        <DateTimePicker
                            value={parse(slotfromTime, 'HH:mm:ss', new Date())}
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
                        {slotToTime} &nbsp;
                    </Text>
                    {/* {showSlotToTimePicker && (
                        <DateTimePicker
                            value={parse(slotToTime, 'HH:mm:ss', new Date())}
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

                <View style={[styles.fullWidth, styles.Row, styles.Left]}>

                    <TouchableOpacity style={styles.NextButton}
                        onPress={HandleSubmit}
                    >
                        {load ? <ActivityIndicator size={"small"} color={'#fff'} /> : <Text style={styles.NextButtonText}>
                            Submit
                        </Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PrevButton}
                        onPress={() => Onrefresh()}
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

export default AddAttendance;