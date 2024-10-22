import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EmpAttendReq = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [load, setLoad] = useState(false);
    const [Reason, setReason] = useState('');
    const [ReasonErr, setReasonErr] = useState('');
    const [refreshing, setRefreshing] = useState(false);

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

    // Category

    const [CategoryDropdown, setCategoryDropdown] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

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

    // Location

    const [LocationDropdown, setLocationDropdown] = useState([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedLocationErr, setSelectedLocationErr] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState('');

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

    // Api call for shift slot dropdown

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedShiftErr, setSelectedShiftErr] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

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

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // From Time 

    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
    const [slotfromTimeErr, setSlotFromTimeErr] = useState('');
    const [showSlotFromTimePicker, setShowSlotFromTimePicker] = useState(false);

    const handleSlotFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotFromTime(formattedTime);
        }
        setShowSlotFromTimePicker(Platform.OS === 'ios');
    };

    const showSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // To Time 

    const [slotToTime, setSlotToTime] = useState('00:00:00');
    const [slotToTimeErr, setSlotToTimeErr] = useState('');
    const [showSlotToTimePicker, setShowSlotToTimePicker] = useState(false);

    const handleSlotToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotToTime(formattedTime);
        }
        setShowSlotToTimePicker(Platform.OS === 'ios');
    };

    const showSlotToTimepicker = () => {
        setShowSlotToTimePicker(true);
    };

    // 

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

    // 
    const Handlerefresh = () => {
        setSelectedleaveType(null);
        setSelectedLocation(null);
        // setSelectedShift(null);
        setStartDate(new Date());
        setSlotFromTime('00:00:00');
        setSlotToTime('00:00:00');
        setReason('');
    }

    // Api call for Handle Submit

    const HandleSubmit = async () => {

        setLoad(true);

        if (!selectedType) {
            setSelectedTypeErr('Select Request Type');
            Alert.alert('Missing', "Check The Request Type Field");
            setLoad(false);
            return;
        } else {
            setSelectedTypeErr('');
        }

        if (!selectedLocation) {
            setSelectedLocationErr('Select Location');
            Alert.alert('Missing', "Check The Location Field");
            setLoad(false);
            return;
        } else {
            setSelectedLocationErr('');
        }

        // if (!selectedShift) {
        //     setSelectedShiftErr('Select Shift Slot');
        //     Alert.alert('Missing', "Check The Shift Slot Field");
        //     setLoad(false);
        //     return;
        // } else {
        //     setSelectedShiftErr('');
        // }

        if (selectedType !== "Check-Out Time Only") {
            if (slotfromTime == "00:00:00") {
                setSlotFromTimeErr('Select From Time');
                Alert.alert('Missing', "Check The From Time Field");
                setLoad(false);
                return;
            } else {
                setSlotFromTimeErr('');
            }
        }


        if (selectedType !== "Check-In Time Only") {
            if (slotToTime == "00:00:00") {
                setSlotToTimeErr('Select To Time');
                Alert.alert('Missing', "Check The To Time Field");
                setLoad(false);
                return;
            } else {
                setSlotToTimeErr('');
            }
        }


        if (!Reason) {
            setReasonErr('Select Reason');
            Alert.alert('Missing', "Check The Reason Field");
            setLoad(false);
            return;
        } else {
            setReasonErr('');
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/add_employee_attendance_request';

            const response = await axios.post(apiUrl, {
                emp_id: data.userempid,
                emp_name: data.username,
                emp_email: data.useremail,
                request_type: selectedTypeId,
                request_location: selectedLocationId,
                request_date: formattedStartDate,
                request_fromtime: slotfromTime,
                request_totime: slotToTime,
                request_reason: Reason,
                // shift_slot: selectedShiftId
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const ResData = response.data;

            if (ResData.status === 'success') {
                // Alert.alert('Success', ResData.message);
                navigation.navigate('Monthly List');
                handleShowAlert(ResData.message);
                setLoad(false);
            } else {
                // console.log("Error")
                handleShowAlert1(ResData.message);
                setLoad(false);
            }
        } catch (error) {
            console.log(error)
            handleShowAlert2();
            setLoad(true);
        }
    }


    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            Handlerefresh();
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

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Attendance Request</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Request Type
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
                                        <Text>{item.attendance_type_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}


                    <Text style={styles.errorText}>
                        {selectedTypeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Location
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowLocationDropdown(!showLocationDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedLocation || 'Select Location'}
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

                    {/* <Text style={styles.StatDateText}>
                        Shift Slot
                    </Text>

                    <TouchableOpacity style={styles.TimeSlotTouchable} onPress={toggleDropdown}>

                        <Text style={styles.TimeSlotTouchableText}>{selectedShift || "Select Shift"}</Text>
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

                    <Text style={styles.StatDateText}>
                        Date
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
                                // maximumDate={new Date()}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    {
                        selectedType === "Check-Out Time Only" ? null :
                            <>
                                <Text style={styles.StatDateText}>
                                    From Time
                                </Text>

                                <View style={styles.inputs}>
                                    <Text onPress={showSlotFromTimepicker}>
                                        {slotfromTime} &nbsp;
                                    </Text>
                                    {showSlotFromTimePicker && (
                                        <DateTimePicker
                                            value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                                            mode="time"
                                            display="default"
                                            onChange={handleSlotFromTimeChange}
                                        />
                                    )}
                                </View>

                                <Text style={styles.errorText}>
                                    {slotfromTimeErr}
                                </Text>
                            </>
                    }

                    {selectedType === "Check-In Time Only" ? null :
                        <>
                            <Text style={styles.StatDateText}>
                                To Time
                            </Text>

                            <View style={styles.inputs}>
                                <Text onPress={showSlotToTimepicker}>
                                    {slotToTime} &nbsp;
                                </Text>
                                {showSlotToTimePicker && (
                                    <DateTimePicker
                                        value={parse(slotToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotToTimeChange}
                                    />
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {slotToTimeErr}
                            </Text>
                        </>
                    }

                    <Text style={styles.StatDateText}>
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

                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={Handlerefresh}>
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

export default EmpAttendReq; 