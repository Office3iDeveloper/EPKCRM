import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const EditOtCalculation = ({ route, navigation }) => {

    // 

    const SpecId = route.params.Id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [otRate, setOtRate] = useState('');
    const [otRateErr, setOtRateErr] = useState('');
    const [otAmount, setOtAmount] = useState('');
    const [otAmountErr, setOtAmountErr] = useState('');
    const [load, setLoad] = useState(false);

    // Department

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds.join(',');

    const handleToggleDepartment = async (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));

            // Clear selected employees when department is deselected
            setSelectedEmployees([]);

        } else {
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);
            // Fetch employee dropdown when department is selected
            setSelectedDepartmentIds(selectedDepartmentIds => {
                const selectedIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));
                fetchEmployeeDropdown(selectedIdsAsNumbers);
                return selectedDepartmentIds;
            });
        }
    };

    useEffect(() => {

        const apiUrl = 'https://epkgroup.in/crm/api/public/api/userrolelist';

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

    }, []);


    // Member

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [EmployeeError, setEmployeeError] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds.join(',');


    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://epkgroup.in/crm/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

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

    // 

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

    // slotfromTime

    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
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

    // slotToTime

    const [slotToTime, setSlotToTime] = useState('00:00:00');
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

    // Api call for shift slot dropdown

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

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

    // Type

    const [TypeDropdown, setTypeDropdown] = useState([]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://epkgroup.in/crm/api/public/api/attendance_type_list';

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

    useEffect(() => {
        const apiUrl = 'https://epkgroup.in/crm/api/public/api/attendance_location_list';

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

    // 

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/view_overtime/${SpecId.id}`;
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
    }, [SpecId])

    useEffect(() => {
        setSelectedShift(SpecId.shift_name);
        setSelectedLocation(SpecId.ot_location_name);
        setSelectedType(SpecId.ot_type);
        setSlotFromTime(datalist.ot_fromtime);
        setSlotToTime(datalist.ot_totime);
        setOtRate(datalist.overtime_rate);
        setOtAmount(datalist.ot_amount);
        setStartDate(new Date(datalist.ot_date));
        setSelectedEmployees(SpecId.employee_name.split(','))
        setSelectedDepartments(SpecId.department_name.split(','))
    }, [datalist, SpecId])

    // 

    const meetingAdd = async () => {

        setLoad(true);

        if (!otRate) {
            setOtRateErr('Enter OT Rate');
            setLoad(false);
            return;
        } else {
            setOtRateErr('');
        }

        if (!otAmount) {
            setOtAmountErr('Enter OT Amount');
            setLoad(false);
            return;
        } else {
            setOtAmountErr('');
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/update_overtime';

            const response = await axios.post(apiUrl, {
                id: SpecId.id,
                overtime_perday: otRate,
                ot_amount: otAmount,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                // Alert.alert("Successfull", responseData.message);
                handleShowAlert(responseData.message);
                setLoad(false);
            } else {
                // Alert.alert("Failed", responseData.message)
                handleShowAlert1(responseData.message);
                setLoad(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            handleShowAlert2();
            setLoad(false);
        }

    }


    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Overtime Calculation')
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

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.Inputcontainer}>

                    <View style={styles.PolicyContainerTitleHeader}>
                        <Text style={styles.PolicyContainerTitleText}>Edit Overtime Calculation</Text>
                    </View>

                    <Text style={styles.ShiftSlotText}>
                        Select Department
                    </Text>

                    <TouchableOpacity style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatusText}>
                        Select Members
                    </Text>

                    <TouchableOpacity style={styles.Input}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Select Shift Slot
                    </Text>

                    <TouchableOpacity style={styles.Input}>

                        <Text style={styles.TimeSlotTouchableText}>{selectedShift ? selectedShift : "Select Shift"}</Text>

                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Select Type
                    </Text>

                    <TouchableOpacity
                        style={styles.StatusTouchable}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedType ? selectedType : 'Select Type'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Location
                    </Text>

                    <TouchableOpacity
                        style={styles.StatusTouchable}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedLocation ? selectedLocation : 'Select Location'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text>
                            {startDate.toDateString()} &nbsp;
                        </Text>
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        From Time
                    </Text>

                    <View style={styles.input}>
                        <Text>
                            {slotfromTime} &nbsp;
                        </Text>
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        To Time
                    </Text>

                    <View style={styles.input}>
                        <Text>
                            {slotToTime} &nbsp;
                        </Text>
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        OT Rate
                    </Text>

                    <TextInput
                        value={otRate}
                        onChangeText={(txt) => setOtRate(txt)}
                        style={styles.input}
                    />

                    <Text style={styles.errorText}>
                        {otRateErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        OT Amount
                    </Text>

                    <TextInput
                        value={otAmount}
                        onChangeText={(txt) => setOtAmount(txt)}
                        style={styles.input}
                    />

                    <Text style={styles.errorText}>
                        {otAmountErr}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={meetingAdd}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Update
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Overtime Calculation')}
                        >
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

export default EditOtCalculation;