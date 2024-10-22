import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../RaiseTicket/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import DocumentPicker from 'react-native-document-picker';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditRaiseAssign = ({ route, navigation }) => {

    // 

    const SpecId = route.params.Id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [tickTitle, setTickTitle] = useState('');
    const [description, setDescription] = useState('');
    const [load, SetLoad] = useState(false);

    // Function to handle document selection


    const [docFile, setDocFile] = useState();

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

    // status

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');

    const [departmentNameDropdown1, setDepartmentNameDropdown1] = useState([]);
    const [showDepartmentNameDropdown1, setShowDepartmentNameDropdown1] = useState(false);
    const [selectedDepartments1, setSelectedDepartments1] = useState('');
    const [selectedDepartmentsId1, setSelectedDepartmentsId1] = useState('');

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

                setDepartmentNameDropdown(responseData);
                setDepartmentNameDropdown1(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setSelectedDepartmentsId(item.id);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
    };

    const handleSelectDepartment1 = (item) => {
        setSelectedDepartments1(item.role_name);
        setSelectedDepartmentsId1(item.id);
        setShowDepartmentNameDropdown1(false);
        fetchEmployeeDropdown1(item.id);
    };

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const [employeeDropdown1, setEmployeeDropdown1] = useState([]);
    const [showEmployeeDropdown1, setShowEmployeeDropdown1] = useState(false);
    const [selectedMember1, setSelectedMember1] = useState('');
    const [selectedMemberId1, setSelectedMemberId1] = useState('');

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

    const fetchEmployeeDropdown1 = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://office3i.com/development/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown(responseData);
            setEmployeeDropdown1(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    const handleSelectMember1 = (item) => {
        setSelectedMember1(item.emp_name);
        setSelectedMemberId1(item.emp_id)
        setShowEmployeeDropdown1(false);
    };

    // 

    const [issType, setIssType] = useState();
    const [showIssTypeDropdown, setShowIssTypeDropdown] = useState(false);
    const [selectedIssType, setSelectedIssType] = useState('');
    const [selectedIssTypeId, setSelectedIssTypeId] = useState('');

    useEffect(() => {
        const issType = async () => {

            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/issue_type_list';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setIssType(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        issType();
    }, [])

    const handleissType = (item) => {
        setSelectedIssType(item.ot_type_name);
        setSelectedIssTypeId(item.id);
        setShowIssTypeDropdown(false);
    };

    // 

    const [datalist, setDatalist] = useState([]);

    useEffect(() => {

        const EditRaisetick = async () => {

            try {
                const apiUrl = `https://office3i.com/development/api/public/api/editview_raiselist/${SpecId.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data;
                const resp = response.data.data;

                if (responseData.status === 'success') {
                    setDatalist(resp);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        EditRaisetick();

    }, [SpecId])

    useEffect(() => {
        setSelectedStatus(datalist.status);
        setSelectedMemberId1(datalist.assign_empid);
        setSelectedDepartmentsId1(datalist.assign_dep);
        setDocFile(datalist.attachment);
        setDescription(datalist.description);
        setSelectedIssTypeId(datalist.issue_type);
        setTickTitle(datalist.ticket_title);
        setSelectedMemberId(datalist.emp_id);
        setSelectedDepartmentsId(datalist.department);
        setSelectedMember1(SpecId.Assigned_empname);
        setSelectedMember(SpecId.emp_name);
        setSelectedIssType(SpecId.issue_type_name);
        setSelectedDepartments1(SpecId.role_name);
    }, [datalist])

    useEffect(() => {
        const selectedDepartment = departmentNameDropdown.find(department => department.id === selectedDepartmentsId);
        if (selectedDepartment) {
            setSelectedDepartments(selectedDepartment.role_name);
        } else {
            setSelectedDepartments('');
        }
    }, [selectedDepartmentsId, departmentNameDropdown]);

    // 

    const [EditLoad, setEditLoad] = useState(false)

    const AddTick = async () => {

        setEditLoad(true);

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/update_raiseticket';

            const response = await axios.put(apiUrl, {
                id: SpecId.id,
                emp_id: selectedMemberId,
                assign_dep: selectedDepartmentsId1,
                assign_empid: selectedMemberId1,
                status: selectedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                // Alert.alert("Successfull", response.data.message);
                handleShowAlert(response.data.message);
                setEditLoad(false);
            } else {
                setEditLoad(false);
                // Alert.alert("Failed", response.data.message);
                handleShowAlert1(response.data.message);
                console.error('Failed To Update:', response.data.error);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

    }

    const onRefresh = () => {

    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Assigned List')
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

                    <Text style={styles.ShiftSlotText}>
                        Department
                    </Text>

                    <View
                        // onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDepartments ? selectedDepartments : 'Select Department'}
                        </Text>
                        {/* <DropdownIcon width={14} height={14} color={"#000"} /> */}

                    </View>

                    {/* {showDepartmentNameDropdown && (
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
                    )} */}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Employee Name
                    </Text>

                    <View
                        // onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedMember ? selectedMember : 'Select Member'}
                        </Text>
                        {/* <DropdownIcon width={14} height={14} color={"#000"} /> */}

                    </View>

                    {/* {showEmployeeDropdown && (
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
                    )} */}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Ticket ID
                    </Text>

                    <TextInput
                        value={SpecId.ticket_id}
                        editable={false}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Ticket Title
                    </Text>

                    <TextInput
                        value={tickTitle}
                        editable={false}
                        onChangeText={(txt) => setTickTitle(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Issue Type
                    </Text>

                    <View
                        // onPress={() => setShowIssTypeDropdown(!showIssTypeDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedIssType || "Select Issue Type"}</Text>
                        {/* <DropdownIcon width={14} height={14} color={"#000"} /> */}

                    </View>

                    {/* {showIssTypeDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {issType.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleissType(item)}
                                    >
                                        <Text>{item.ot_type_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )} */}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        editable={false}
                        onChangeText={(txt) => setDescription(txt)}
                        style={styles.ShiftSlotTextInput1}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Assign Department
                    </Text>

                    <View
                        // onPress={() => setShowDepartmentNameDropdown1(!showDepartmentNameDropdown1)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDepartments1 ? selectedDepartments1 : 'Select Department'}
                        </Text>
                        {/* <DropdownIcon width={14} height={14} color={"#000"} /> */}

                    </View>

                    {/* {showDepartmentNameDropdown1 && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {departmentNameDropdown1.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectDepartment1(item)}
                                    >
                                        <Text>{item.role_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )} */}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Assign Employee
                    </Text>

                    <View
                        // onPress={() => setShowEmployeeDropdown1(!showEmployeeDropdown1)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedMember1 ? selectedMember1 : 'Select Member'}
                        </Text>
                        {/* <DropdownIcon width={14} height={14} color={"#000"} /> */}

                    </View>

                    {/* {showEmployeeDropdown1 && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {employeeDropdown1.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectMember1(item)}
                                    >
                                        <Text>{item.emp_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )} */}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity
                        onPress={toggleDropdownstatus}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Pending")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Pending</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Assigned")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Assigned</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Solved")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Solved</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={AddTick}
                        >
                            {
                                EditLoad ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Dashboard')}
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

export default EditRaiseAssign;