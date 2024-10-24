import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const EditPolicy = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id;
    const SpecName = route.params.name;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    //  Api Call

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://epkgroup.in/crm/api/public/api/editview_attendancepolicy/${SpecId}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setDatalist(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [SpecId]);

    // states

    const [load, SetLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [selectedID, setSelectedID] = useState();
    const [Activity, setActivity] = useState();

    // slotfromTime

    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
    const [slotfromTimeErr, setSlotFromTimeErr] = useState('');
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

    // slotToTime

    const [slotToTime, setSlotToTime] = useState('00:00:00');
    const [slotToTimeErr, setSlotToTimeErr] = useState('');
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

    // slotTotalTime

    const [slotTotalTime, setSlotTotalTime] = useState('00:00:00');
    const [slotTotalTimeErr, setSlotTotalTimeErr] = useState('');
    const [showSlotTotalTimePicker, setShowSlotTotalTimePicker] = useState(false);

    const handleSlotTotalTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotTotalTime(formattedTime);
        }
        setShowSlotTotalTimePicker(false);
    };

    const showSlotTotalTimepicker = () => {
        setShowSlotTotalTimePicker(true);
    };

    // latefromTime

    const [latefromTime, setLateFromTime] = useState('00:00:00');
    const [latefromTimeErr, setLateFromTimeErr] = useState('');
    const [showLateFromTimePicker, setShowLateFromTimePicker] = useState(false);

    const handleLateFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setLateFromTime(formattedTime);
        }
        setShowLateFromTimePicker(false);
    };

    const showLateFromTimepicker = () => {
        setShowLateFromTimePicker(true);
    };

    // lateToTime

    const [lateToTime, setLateToTime] = useState('00:00:00');
    const [lateToTimeErr, setLateToTimeErr] = useState('');
    const [showLateToTimePicker, setShowLateToTimePicker] = useState(false);

    const handleLateToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setLateToTime(formattedTime);
        }
        setShowLateToTimePicker(false);
    };

    const showLateToTimepicker = () => {
        setShowLateToTimePicker(true);
    };

    // PAMfromTime

    const [PAMfromTime, setPAMFromTime] = useState('00:00:00');
    const [PAMfromTimeErr, setPAMFromTimeErr] = useState('');
    const [showPAMFromTimePicker, setShowPAMFromTimePicker] = useState(false);

    const handlePAMFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setPAMFromTime(formattedTime);
        }
        setShowPAMFromTimePicker(false);
    };

    const showPAMFromTimepicker = () => {
        setShowPAMFromTimePicker(true);
    };

    // PAMToTime

    const [PAMToTime, setPAMToTime] = useState('00:00:00');
    const [PAMToTimeErr, setPAMToTimeErr] = useState('');
    const [showPAMToTimePicker, setShowPAMToTimePicker] = useState(false);

    const handlePAMToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setPAMToTime(formattedTime);
        }
        setShowPAMToTimePicker(false);
    };

    const showPAMToTimepicker = () => {
        setShowPAMToTimePicker(true);
    };

    // PPMfromTime

    const [PPMfromTime, setPPMFromTime] = useState('00:00:00');
    const [PPMfromTimeErr, setPPMFromTimeErr] = useState('');
    const [showPPMFromTimePicker, setShowPPMFromTimePicker] = useState(false);

    const handlePPMFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setPPMFromTime(formattedTime);
        }
        setShowPPMFromTimePicker(false);
    };

    const showPPMFromTimepicker = () => {
        setShowPPMFromTimePicker(true);
    };

    // PPMToTime

    const [PPMToTime, setPPMToTime] = useState('00:00:00');
    const [PPMToTimeErr, setPPMToTimeErr] = useState('');
    const [showPPMToTimePicker, setShowPPMToTimePicker] = useState(false);

    const handlePPMToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setPPMToTime(formattedTime);
        }
        setShowPPMToTimePicker(false);
    };

    const showPPMToTimepicker = () => {
        setShowPPMToTimePicker(true);
    };

    // HAMfromTime

    const [HAMfromTime, setHAMFromTime] = useState('00:00:00');
    const [HAMfromTimeErr, setHAMFromTimeErr] = useState('');
    const [showHAMFromTimePicker, setShowHAMFromTimePicker] = useState(false);

    const handleHAMFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setHAMFromTime(formattedTime);
        }
        setShowHAMFromTimePicker(false);
    };

    const showHAMFromTimepicker = () => {
        setShowHAMFromTimePicker(true);
    };

    // HAMToTime

    const [HAMToTime, setHAMToTime] = useState('00:00:00');
    const [HAMToTimeErr, setHAMToTimeErr] = useState('');
    const [showHAMToTimePicker, setShowHAMToTimePicker] = useState(false);

    const handleHAMToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setHAMToTime(formattedTime);
        }
        setShowHAMToTimePicker(false);
    };

    const showHAMToTimepicker = () => {
        setShowHAMToTimePicker(true);
    };

    // HPMfromTime

    const [HPMfromTime, setHPMFromTime] = useState('00:00:00');
    const [HPMfromTimeErr, setHPMFromTimeErr] = useState('');
    const [showHPMFromTimePicker, setShowHPMFromTimePicker] = useState(false);

    const handleHPMFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setHPMFromTime(formattedTime);
        }
        setShowHPMFromTimePicker(false);
    };

    const showHPMFromTimepicker = () => {
        setShowHPMFromTimePicker(true);
    };

    // HPMToTime

    const [HPMToTime, setHPMToTime] = useState('00:00:00');
    const [HPMToTimeErr, setHPMToTimeErr] = useState('');
    const [showHPMToTimePicker, setShowHPMToTimePicker] = useState(false);

    const handleHPMToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setHPMToTime(formattedTime);
        }
        setShowHPMToTimePicker(false);
    };

    const showHPMToTimepicker = () => {
        setShowHPMToTimePicker(true);
    };

    const [late1, setLate1] = useState();
    const [late1Error, setlate1Error] = useState();
    const [lateDeduction1, setLateDeduction1] = useState();
    const [lateDeduction1Error, setLateDeduction1Error] = useState();
    const [late2, setLate2] = useState();
    const [late2Error, setlate2Error] = useState();
    const [lateDeduction2, setLateDeduction2] = useState();
    const [lateDeduction2Error, setLateDeduction2Error] = useState();
    const [late3, setLate3] = useState();
    const [late3Error, setlate3Error] = useState();
    const [lateDeduction3, setLateDeduction3] = useState();
    const [lateDeduction3Error, setLateDeduction3Error] = useState();

    const [selectedShiftError, setSelectedShiftError] = useState('');
    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

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

    // Api call for Handle Submit

    const HandleSubmit = async () => {

        SetLoad(true);

        try {

            if (!selectedShift) {
                setSelectedShiftError('Shift is Required');
                SetLoad(false);
                return;
            } else {
                setSelectedShiftError('');
            }

            if (!late1) {
                setlate1Error('Late1 Field is Required');
                Alert.alert('Missing', "Check The Late1 Field");
                SetLoad(false);
                return;
            } else {
                setlate1Error('')
            }

            if (!late2) {
                setlate2Error('Late2 Field is Required');
                Alert.alert('Missing', "Check The Late2 Field");
                SetLoad(false);
                return;
            } else {
                setlate2Error('');
            }

            if (!late3) {
                setlate3Error('Late3 Field is Required');
                Alert.alert('Missing', "Check The Late3 Field");
                SetLoad(false);
                return;
            } else {
                setlate3Error('');
            }

            if (!lateDeduction1) {
                setLateDeduction1Error('Late Deduction1 Field is Required');
                Alert.alert('Missing', "Check The Late Deduction1 Field");
                SetLoad(false);
                return;
            } else {
                setLateDeduction1Error('')
            }

            if (!lateDeduction2) {
                setLateDeduction2Error('Late Deduction2 Field is Required');
                Alert.alert('Missing', "Check The Late Deduction2 Field");
                SetLoad(false);
                return;
            } else {
                setLateDeduction2Error('');
            }

            if (!lateDeduction3) {
                setLateDeduction3Error('Late Deduction3 Field is Required');
                Alert.alert('Missing', "Check The Late Deduction3 Field");
                SetLoad(false);
                return;
            } else {
                setLateDeduction3Error('');
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/update_attendancepolicy';

            const response = await axios.put(apiUrl, {
                id: selectedID,
                shift_slot: selectedShiftId,
                form_time: slotfromTime,
                to_time: slotToTime,
                total_hrs: slotTotalTime,
                late_form_time: latefromTime,
                late_to_time: lateToTime,
                fp_form_time: PAMfromTime,
                fp_to_time: PAMToTime,
                ap_form_time: PPMfromTime,
                ap_to_time: PPMToTime,
                fhalf_day_form_time: HAMfromTime,
                fhalf_day_to_time: HAMToTime,
                ahalf_day_form_time: HPMfromTime,
                ahalf_day_to_time: HPMToTime,
                late1: late1,
                late2: late2,
                late3: late3,
                late1_deduction: lateDeduction1,
                late2_deduction: lateDeduction2,
                late3_deduction: lateDeduction3,
                policy_status: Activity,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data);
                SetLoad(false);
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

    // Declaring Data

    useEffect(() => {
        setSelectedShift(SpecName);
        if (datalist) {
            setSelectedShiftId(datalist.shift_slot);
            setSelectedID(datalist.id);
            setActivity(datalist.status);
            setSlotFromTime(datalist.form_time);
            setSlotToTime(datalist.to_time);
            setSlotTotalTime(datalist.total_hrs);
            setLateFromTime(datalist.late_form_time);
            setLateToTime(datalist.late_to_time);
            setPAMFromTime(datalist.fp_form_time);
            setPAMToTime(datalist.fp_to_time);
            setPPMFromTime(datalist.ap_form_time);
            setPPMToTime(datalist.ap_to_time);
            setHAMFromTime(datalist.fhalf_day_form_time);
            setHAMToTime(datalist.fhalf_day_to_time);
            setHPMFromTime(datalist.ahalf_day_form_time);
            setHPMToTime(datalist.ahalf_day_to_time);
            setLate1(datalist.late1);
            setLateDeduction1(datalist.late1_deduction);
            setLate2(datalist.late2);
            setLateDeduction2(datalist.late2_deduction);
            setLate3(datalist.late3);
            setLateDeduction3(datalist.late3_deduction);
        }
    }, [datalist]);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Attendance Policy')
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
                    <Text style={styles.PolicyContainerTitleText}>Edit Attendance Slot</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.TimeSlotText}>
                        Add Time Slot
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
                        {selectedShiftError}
                    </Text>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From Time
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showSlotFromTimepicker}>
                                    {slotfromTime} &nbsp;
                                </Text>
                                {Platform.OS === 'android' && showSlotFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(slotfromTime, 'HH:mm:ss', new Date())}
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
                                                    // value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                                                    value={slotfromTime ? parse(slotfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
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

                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To Time
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showSlotToTimepicker}>
                                    {slotToTime} &nbsp;
                                </Text>
                                {Platform.OS === 'android' && showSlotToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(slotToTime, 'HH:mm:ss', new Date())}
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
                                                    // value={parse(slotToTime, 'HH:mm:ss', new Date())}
                                                    value={slotToTime ? parse(slotToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
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
                        </View>
                    </View>

                    <View style={styles.averageWidth}>
                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                Total Hours
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showSlotTotalTimepicker}>
                                    {slotTotalTime} &nbsp;
                                </Text>
                                {/* {showSlotTotalTimePicker && (
                                    <DateTimePicker
                                        value={parse(slotTotalTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotTotalTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showSlotTotalTimePicker && (
                                    <DateTimePicker
                                        // value={parse(slotTotalTime, 'HH:mm:ss', new Date())}
                                        value={slotTotalTime ? parse(slotTotalTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotTotalTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showSlotTotalTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(slotTotalTime, 'HH:mm:ss', new Date())}
                                                    value={slotTotalTime ? parse(slotTotalTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleSlotTotalTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowSlotTotalTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {slotTotalTimeErr}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showLateFromTimepicker}>
                                    {latefromTime} &nbsp;
                                </Text>
                                {/* {showLateFromTimePicker && (
                                    <DateTimePicker
                                        value={parse(latefromTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleLateFromTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showLateFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(latefromTime, 'HH:mm:ss', new Date())}
                                        value={latefromTime ? parse(latefromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleLateFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showLateFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(latefromTime, 'HH:mm:ss', new Date())}
                                                    value={latefromTime ? parse(latefromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleLateFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowLateFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {latefromTimeErr}
                            </Text>
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showLateToTimepicker}>
                                    {lateToTime} &nbsp;
                                </Text>
                                {/* {showLateToTimePicker && (
                                    <DateTimePicker
                                        value={parse(lateToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleLateToTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showLateToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(lateToTime, 'HH:mm:ss', new Date())}
                                        value={lateToTime ? parse(lateToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleLateToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showLateToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(lateToTime, 'HH:mm:ss', new Date())}
                                                    value={lateToTime ? parse(lateToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleLateToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowLateToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {lateToTimeErr}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Permission ( 1st Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showPAMFromTimepicker}>
                                    {PAMfromTime} &nbsp;
                                </Text>
                                {/* {showPAMFromTimePicker && (
                                    <DateTimePicker
                                        value={parse(PAMfromTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handlePAMFromTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showPAMFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(PAMfromTime, 'HH:mm:ss', new Date())}
                                        value={PAMfromTime ? parse(PAMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handlePAMFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showPAMFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(PAMfromTime, 'HH:mm:ss', new Date())}
                                                    value={PAMfromTime ? parse(PAMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handlePAMFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowPAMFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {PAMfromTimeErr}
                            </Text>
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showPAMToTimepicker}>
                                    {PAMToTime} &nbsp;
                                </Text>
                                {/* {showPAMToTimePicker && (
                                    <DateTimePicker
                                        value={parse(PAMToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handlePAMToTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showPAMToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(PAMToTime, 'HH:mm:ss', new Date())}
                                        value={PAMToTime ? parse(PAMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handlePAMToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showPAMToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(PAMToTime, 'HH:mm:ss', new Date())}
                                                    value={PAMToTime ? parse(PAMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handlePAMToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowPAMToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <Text style={styles.errorText}>
                                {PAMToTimeErr}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Permission ( 2nd Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>

                            <View style={styles.input}>
                                <Text onPress={showPPMFromTimepicker}>
                                    {PPMfromTime} &nbsp;
                                </Text>
                                {/* {showPPMFromTimePicker && (
                                    <DateTimePicker
                                        value={parse(PPMfromTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handlePPMFromTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showPPMFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(PPMfromTime, 'HH:mm:ss', new Date())}
                                        value={PPMfromTime ? parse(PPMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handlePPMFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showPPMFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(PPMfromTime, 'HH:mm:ss', new Date())}
                                                    value={PPMfromTime ? parse(PPMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handlePPMFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowPPMFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {PPMfromTimeErr}
                            </Text>

                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showPPMToTimepicker}>
                                    {PPMToTime} &nbsp;
                                </Text>
                                {/* {showPPMToTimePicker && (
                                    <DateTimePicker
                                        value={parse(PPMToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handlePPMToTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showPPMToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(PPMToTime, 'HH:mm:ss', new Date())}
                                        value={PPMToTime ? parse(PPMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handlePPMToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showPPMToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(PPMToTime, 'HH:mm:ss', new Date())}
                                                    value={PPMToTime ? parse(PPMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handlePPMToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowPPMToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {PPMToTimeErr}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Half Day ( 1st Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showHAMFromTimepicker}>
                                    {HAMfromTime} &nbsp;
                                </Text>
                                {/* {showHAMFromTimePicker && (
                                    <DateTimePicker
                                        value={parse(HAMfromTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleHAMFromTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showHAMFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(HAMfromTime, 'HH:mm:ss', new Date())}
                                        value={HAMfromTime ? parse(HAMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleHAMFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showHAMFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(HAMfromTime, 'HH:mm:ss', new Date())}
                                                    value={HAMfromTime ? parse(HAMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleHAMFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowHAMFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {HAMfromTimeErr}
                            </Text>

                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showHAMToTimepicker}>
                                    {HAMToTime} &nbsp;
                                </Text>
                                {/* {showHAMToTimePicker && (
                                    <DateTimePicker
                                        value={parse(HAMToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleHAMToTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showHAMToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(HAMToTime, 'HH:mm:ss', new Date())}
                                        value={HAMToTime ? parse(HAMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleHAMToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showHAMToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(HAMToTime, 'HH:mm:ss', new Date())}
                                                    value={HAMToTime ? parse(HAMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleHAMToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowHAMToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {HAMToTimeErr}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Half Day ( 2nd Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showHPMFromTimepicker}>
                                    {HPMfromTime} &nbsp;
                                </Text>
                                {/* {showHPMFromTimePicker && (
                                    <DateTimePicker
                                        value={parse(HPMfromTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleHPMFromTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showHPMFromTimePicker && (
                                    <DateTimePicker
                                        // value={parse(HPMfromTime, 'HH:mm:ss', new Date())}
                                        value={HPMfromTime ? parse(HPMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleHPMFromTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showHPMFromTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(HPMfromTime, 'HH:mm:ss', new Date())}
                                                    value={HPMfromTime ? parse(HPMfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleHPMFromTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowHPMFromTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {HPMfromTimeErr}
                            </Text>

                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <View style={styles.input}>
                                <Text onPress={showHPMToTimepicker}>
                                    {HPMToTime} &nbsp;
                                </Text>
                                {/* {showHPMToTimePicker && (
                                    <DateTimePicker
                                        value={parse(HPMToTime, 'HH:mm:ss', new Date())}
                                        mode="time"
                                        display="default"
                                        onChange={handleHPMToTimeChange}
                                    />
                                )} */}
                                {Platform.OS === 'android' && showHPMToTimePicker && (
                                    <DateTimePicker
                                        // value={parse(HPMToTime, 'HH:mm:ss', new Date())}
                                        value={HPMToTime ? parse(HPMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleHPMToTimeChange}
                                    />
                                )}

                                {Platform.OS === 'ios' && (
                                    <Modal visible={showHPMToTimePicker} transparent={true} animationType="fade">
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent1}>
                                                <DateTimePicker
                                                    // value={parse(HPMToTime, 'HH:mm:ss', new Date())}
                                                    value={HPMToTime ? parse(HPMToTime, 'HH:mm:ss', new Date()) : new Date()}
                                                    mode="time"
                                                    display="clock"
                                                    onChange={handleHPMToTimeChange}
                                                />
                                                <Button title="Cancel" onPress={() => setShowHPMToTimePicker(false)} />
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                {HPMToTimeErr}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 1</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={late1}
                        onChangeText={(val) => setLate1(val)}
                    />

                    <Text style={styles.errorText}>
                        {late1Error}
                    </Text>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 1 Deduction</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={lateDeduction1}
                        onChangeText={(val) => setLateDeduction1(val)}
                    />

                    <Text style={styles.errorText}>
                        {lateDeduction1Error}
                    </Text>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 2</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={late2}
                        onChangeText={(val) => setLate2(val)}
                    />

                    <Text style={styles.errorText}>
                        {late2Error}
                    </Text>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 2 Deduction</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={lateDeduction2}
                        onChangeText={(val) => setLateDeduction2(val)}
                    />

                    <Text style={styles.errorText}>
                        {lateDeduction2Error}
                    </Text>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 3</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={late3}
                        onChangeText={(val) => setLate3(val)}
                    />

                    <Text style={styles.errorText}>
                        {late3Error}
                    </Text>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 3 Deduction</Text>
                    </View>

                    <TextInput
                        style={styles.inputs}
                        keyboardType="number-pad"
                        value={lateDeduction3}
                        onChangeText={(val) => setLateDeduction3(val)}
                    />

                    <Text style={styles.errorText}>
                        {lateDeduction3Error}
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

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.navigate('Attendance Policy')}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
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

export default EditPolicy;