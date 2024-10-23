import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg"
import styles from "./style";
import axios from 'axios';
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';

const EditDailyAttendance = ({ route, navigation }) => {


    const SpecId = route.params.Id.attendance_id;
    const Id = route.params.Id.id;

    console.log(Id, "Id")


    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [rolename, setRolename] = useState('');
    const [empname, setEmpname] = useState('');
    const [load, setload] = useState(false)

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Category

    const [CategoryDropdown, setCategoryDropdown] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryErr, setSelectedCategoryErr] = useState('');
    console.log(CategoryDropdown, "CategoryDropdown")


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

                setCategoryDropdown([{ "id": "0", "leave_category_name": "Attendance" }, ...responseData]);


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

    // Select Status

    const [showStatus, setShowStatus] = useState(false);
    const [selectededStatus, setSelectedStatus] = useState('');
    const [selectededStatusId, setSelectedStatusId] = useState('');
    const [selectededStatusErr, setSelectedStatusErr] = useState('');

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status, id) => {
        setShowStatus(false);
        setSelectedStatus(Status);
        setSelectedStatusId(id)
    };

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

    // totalcount --------------

    const [res, setRes] = useState('');

    const CApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/attendance_edit_listview/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;
            console.log(responseData, "responseData")
            setRes(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        CApi();
    }, [SpecId])


    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Daily Attendance')
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

    useEffect(() => {
        if (res && res.data && CategoryDropdown.length > 0) {
            setRolename(res.data.role_name);
            setEmpname(res.data.employee_name);
            setSelectedCategoryId(res.data.request_category);
            setSelectedStatusId(res.data.request_type);
            setStartDate(new Date(res.data.checkin_date));
            setSlotFromTime(res.data.checkin_time);
            setSlotToTime(res.data.checkout_time);

            // Set selectedCategory based on the selectedCategoryId
            const selectedCategoryItem = CategoryDropdown.find(
                (category) => category.id.toString() === res.data.request_category.toString()
            );

            if (selectedCategoryItem) {
                setSelectedCategory(selectedCategoryItem.leave_category_name);
            }

            // Set selectedStatus based on the selectedStatusId
            const statusOptions = [
                { id: '1', name: 'Casual' },
                { id: '2', name: 'Sick' },
            ];

            const selectedStatusItem = statusOptions.find(
                (status) => status.id.toString() === res.data.request_type.toString()
            );

            if (selectedStatusItem) {
                setSelectedStatus(selectedStatusItem.name);
            }
        }
    }, [res, SpecId, CategoryDropdown]);



    const handlesubmit = async () => {

        setload(true);

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/dailyattendance_update';

            const response = await axios.put(apiUrl, {
                id: Id,
                category: selectededStatusId,
                type: selectedCategoryId,
                check_intime: slotfromTime,
                check_outtime: slotToTime,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response,"response")

            if (response.data.status === "success") {
                setload(false);
                handleShowAlert(response.data.message);
            } else {
                setload(false);
                handleShowAlert1(response.data.message);
            }

        } catch (error) {
            setload(false);
            handleShowAlert2();
        }

    }

    return (

        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Edit Daily Attendance</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Role
                    </Text>

                    <TextInput
                        value={rolename}
                        editable={false}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatusText}>
                        Employee Name
                    </Text>

                    <TextInput
                        value={empname}
                        editable={false}
                        onChangeText={(txt) => setEmpname(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatusText}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatusText}>
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
                        (selectedCategory === '' || selectedCategory === 'Attendance' || selectedCategory === 'Permission' || selectedCategory === 'Half Day') && (
                            <>
                                {(selectedCategory === 'Permission' || selectedCategory === 'Half Day') && (
                                    <>
                                        <Text style={styles.StatusText}>
                                            Select Type
                                        </Text>
                                        <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>
                                            <Text style={styles.StatusTouchableText}>{selectededStatus || "Select Status"}</Text>
                                            <DropdownIcon width={14} height={14} color={"#000"} />
                                        </TouchableOpacity>
                                        {showStatus && (
                                            <View style={styles.dropdown}>
                                                <TouchableOpacity onPress={() => selectStatus("Casual", '1')} style={styles.dropdownOption}>
                                                    <Text style={styles.dropdownOptionText}>Casual</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => selectStatus("Sick", '2')} style={styles.dropdownOption}>
                                                    <Text style={styles.dropdownOptionText}>Sick</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <Text style={styles.errorText}>
                                            {selectededStatusErr}
                                        </Text>
                                    </>
                                )}

                                <Text style={styles.StatusText}>
                                    Check-In Time
                                </Text>
                                <View style={styles.inputs}>
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

                                <Text style={styles.StatusText}>
                                    Check-Out Time
                                </Text>
                                <View style={styles.inputs}>
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
                            </>
                        )
                    }

                    {
                        (selectedCategory === 'Leave' || selectedCategory === 'Absent') && (
                            <>
                                <Text style={styles.StatusText}>
                                    Select Type
                                </Text>
                                <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>
                                    <Text style={styles.StatusTouchableText}>{selectededStatus || "Select Status"}</Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>
                                {showStatus && (
                                    <View style={styles.dropdown}>
                                        <TouchableOpacity onPress={() => selectStatus("Casual", "1")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Casual</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectStatus("Sick", "2")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Sick</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <Text style={styles.errorText}>
                                    {selectededStatusErr}
                                </Text>
                            </>
                        )
                    }



                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton} onPress={handlesubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.goBack()}>
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

export default EditDailyAttendance;