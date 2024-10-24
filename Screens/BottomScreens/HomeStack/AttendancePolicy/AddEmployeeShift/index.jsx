import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddEmployeeShift = ({ navigation }) => {

    // useRef

    const ref = useRef(null);

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [loadData, setLoadData] = useState(false);
    const [load, SetLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [slotError, setSlotError] = useState('');
    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedShiftError, setSelectedShiftError] = useState('');

    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [EmployeeError, setEmployeeError] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds.join(',');

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

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
            setSelectedEmployeesIds([]);
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

    const [WeekoffError, setWeekoffError] = useState('');
    const [showWeekoff, setShowWeekoff] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDaysIds, setSelectedDaysIds] = useState([]);
    const selectedDaysIdsAsNumbers = selectedDaysIds.join(',');

    const handleToggleDay = (day, index) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
            setSelectedDaysIds(selectedDaysIds.filter(id => id !== index));
        } else {
            setSelectedDays([...selectedDays, day]);
            setSelectedDaysIds([...selectedDaysIds, index]);
        }
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
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
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // Date Formatter 

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/view_employeeshift';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;

            if (!responseData) {
                setDatalist([]);
            } else {
                setDatalist(responseData);
            }
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

    // Api call for Delete

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

                const apiUrl = `https://epkgroup.in/crm/api/public/api/delete_employeeshift`;
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
                    handleShowAlert(response.data);
                    const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    // Alert.alert("Deleted", "Deleted Successfully");
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data);
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

    // Api call for userrolelist

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

    // Api call for employeelist

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

    const Handlerefresh = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedDepartments([]);
        setSelectedDepartmentIds([]);
        setSelectedEmployees([]);
        setSelectedEmployeesIds([]);
        setSelectedShift(null);
        setSelectedShiftId(null);
        setSelectedDays([]);
        setSelectedDaysIds([]);
        setSelectedStatus(null);
        setStatusError('');
        setWeekoffError('');
        setSlotError('');
        setEmployeeError('');
        setSelectedShiftError('');
    }

    // 

    const mapNumberToWeekday = (numbers) => {
        const numbersArray = numbers.split(',');
        return numbersArray.map(number => {
            switch (number) {
                case '1':
                    return 'Sunday';
                case '2':
                    return 'Monday';
                case '3':
                    return 'Tuesday';
                case '4':
                    return 'Wednesday';
                case '5':
                    return 'Thursday';
                case '6':
                    return 'Friday';
                case '7':
                    return 'Saturday';
                default:
                    return '';
            }
        }).join(', ');
    };

    // Api call for Handle Submit

    const validateFields = () => {
        let isValid = true;

        if (!selectedDepartments.length) {
            setSelectedShiftError('Select Department Name');
            isValid = false;
        } else {
            setSelectedShiftError('');
        }

        if (!selectedEmployees.length) {
            setEmployeeError('Select Employee Name');
            isValid = false;
        } else {
            setEmployeeError('');
        }

        if (!selectedShift) {
            setSlotError('Select Shift Slot');
            isValid = false;
        } else {
            setSlotError('');
        }

        if (!selectedDays.length) {
            setWeekoffError('Week off Required');
            isValid = false;
        } else {
            setWeekoffError('');
        }

        if (!selectedStatus) {
            setStatusError('Status Required');
            isValid = false;
        } else {
            setStatusError('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        SetLoad(true);

        try {

            if (!validateFields()) {
                SetLoad(false);
                return;
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/employeeshiftinsert';

            const response = await axios.post(apiUrl, {
                department_id: selectedDepartmentIdsAsNumbers,
                emp_id: selectedEmployeesIdsAsNumbers,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                shift_slotid: selectedShiftId,
                week_off: selectedDaysIdsAsNumbers,
                shift_status: selectedStatus,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                SetLoad(false);
                handleShowAlert(response.data);
                setTimeout(() => {
                    fetchData();
                    Handlerefresh();
                }, 2500);
            } else {
                handleShowAlert1(response.data);
                SetLoad(false);
            }
        } catch (error) {
            handleShowAlert2();
            console.error('Error during submit:', error);
            SetLoad(false);
        }

    }

    const handlenavigate = (item) => {
        navigation.navigate('Edit Employee shift',
            {
                Id: item.id,
                Slot: item.shift_slot,
                SlotId: item.shift_slot_id,
                DepartmentName: item.department_name,
                DepartmentId: item.department_id,
                Employee: item.first_name,
                EmployeeId: item.emp_id,
                WeekOffId: item.week_off,
            })
    }

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

    useEffect(() => {
        console.log(selectedStatus, "selectedStatus")
    }, [selectedStatus])

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Assign Employee Shift </Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Department Name
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showDepartmentNameDropdown && (
                        <View style={styles.dropdown}>
                            {departmentNameDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedDepartments.includes(department.role_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleDepartment(department.role_name, department.id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employee Name
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => {
                        setShowEmployeeDropdown(!showEmployeeDropdown);
                    }}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showEmployeeDropdown && (
                        <View style={styles.dropdown}>
                            {employeeDropdown.map((employee, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedEmployees.includes(employee.emp_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleEmployee(employee.emp_name, employee.emp_id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{employee.emp_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {EmployeeError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Start Date
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
                                onClose={() => setShowDatePicker(false)}
                            />
                        )} */}
                        {Platform.OS === 'android' && showDatePicker && (
                            <DateTimePicker
                                value={startDate}
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
                                            value={startDate}
                                            mode="date"
                                            display="clock"
                                            onChange={handleDateChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        End Date
                    </Text>

                    <View style={styles.inputs}>
                        <Text onPress={showDatepicker1}>
                            {endDate.toDateString()} &nbsp;
                        </Text>
                        {/* {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                                onClose={() => setShowDatePicker1(false)}
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
                                            display="clock"
                                            onChange={handleDateChange1}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker1(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
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
                        {slotError}
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
                                onPress={() => handleToggleDay('Sunday', '1')}
                            >
                                <Text style={styles.dropdownOptionText}>Sunday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Monday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Monday', '2')}>
                                <Text style={styles.dropdownOptionText}>Monday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Tuesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Tuesday', '3')}>
                                <Text style={styles.dropdownOptionText}>Tuesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Wednesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Wednesday', '4')}>
                                <Text style={styles.dropdownOptionText}>Wednesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Thursday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Thursday', '5')}>
                                <Text style={styles.dropdownOptionText}>Thursday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Friday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Friday', '6')}>
                                <Text style={styles.dropdownOptionText}>Friday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Saturday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Saturday', '7')}>
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

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
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
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => Handlerefresh()}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                {/*  */}

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Employee Shift List</Text>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.container}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Department
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Employee
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Shift Slot</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Week Off</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {datalist.length == 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    datalist.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.department_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.first_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.start_date}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.end_date}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.shift_slot}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{mapNumberToWeekday(item.week_off)}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.status}</Text>
                                            <View style={[styles.listcontentButtonview]}>
                                                <TouchableOpacity style={[styles.listcontenteditbutton]} onPress={() => handlenavigate(item)}>
                                                    <EditIcon width={14} height={14} color="#000" />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.listcontentdelbutton]}
                                                    onPress={() => HandleDelete(item.id)}>
                                                    <DeleteIcon width={14} height={14} color="#000" />
                                                </TouchableOpacity>
                                            </View>
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

export default AddEmployeeShift; 