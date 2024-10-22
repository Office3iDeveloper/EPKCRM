import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import DocumentPicker from 'react-native-document-picker';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const RaiseTicket = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [tickTitle, setTickTitle] = useState('');
    const [tickTitleErr, setTickTitleErr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [load, SetLoad] = useState(false);

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

    // status

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState(null);
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
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');


    const [departmentNameDropdown1, setDepartmentNameDropdown1] = useState([]);
    const [showDepartmentNameDropdown1, setShowDepartmentNameDropdown1] = useState(false);
    const [selectedDepartments1, setSelectedDepartments1] = useState('');
    const [selectedDepartmentsId1, setSelectedDepartmentsId1] = useState('');
    const [selectedDepartmentsErr1, setSelectedDepartmentsErr1] = useState('');


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
    const [selectedMemberErr, setSelectedMemberErr] = useState('');

    const [employeeDropdown1, setEmployeeDropdown1] = useState([]);
    const [showEmployeeDropdown1, setShowEmployeeDropdown1] = useState(false);
    const [selectedMember1, setSelectedMember1] = useState('');
    const [selectedMemberId1, setSelectedMemberId1] = useState('');
    const [selectedMemberErr1, setSelectedMemberErr1] = useState('');


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

    const [tickId, setTickId] = useState();

    useEffect(() => {
        const TickId = async () => {

            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/ticket_id';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setTickId(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        TickId();
    }, [])

    // 

    const [issType, setIssType] = useState();
    const [showIssTypeDropdown, setShowIssTypeDropdown] = useState(false);
    const [selectedIssType, setSelectedIssType] = useState('');
    const [selectedIssTypeId, setSelectedIssTypeId] = useState('');
    const [selectedIssTypeErr, setSelectedIssTypeErr] = useState('');

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

    const validateFields = () => {
        let isValid = true;

        if (!selectedDepartments) {
            setSelectedDepartmentsErr('Select Department Name')
            isValid = false;
        } else {
            setSelectedDepartmentsErr('');
        }

        if (!selectedMember) {
            setSelectedMemberErr('Select Member Name')
            isValid = false;
        } else {
            setSelectedMemberErr('');
        }

        if (!tickTitle) {
            setTickTitleErr('Enter Title')
            isValid = false;
        } else {
            setTickTitleErr('');
        }

        if (!selectedIssType) {
            setSelectedIssTypeErr('Select Issue Type');
            isValid = false;
        } else {
            setSelectedIssTypeErr('');
        }

        if (!description) {
            setDescriptionErr('Enter Description');
            isValid = false;
        } else {
            setDescriptionErr('');
        }

        if (!selectedDepartments1) {
            setSelectedDepartmentsErr1('Select Department Name');
            isValid = false;
        } else {
            setSelectedDepartmentsErr1('');
        }

        if (!selectedMember1) {
            setSelectedMemberErr1('Select Member Name');
            isValid = false;
        } else {
            setSelectedMemberErr1('');
        }

        if (!selectedStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }

        return isValid;
    };

    const AddTick = async () => {

        SetLoad(true);

        const formData = new FormData();

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            formData.append('emp_id', selectedMemberId);
            formData.append('ticket_id', tickId);
            formData.append('ticket_title', tickTitle);
            formData.append('issue_type', selectedIssTypeId);
            formData.append('description', description);
            formData.append('created_by', data.userempid);
            formData.append('assign_dep', selectedDepartmentsId1);
            formData.append('assign_empid', selectedMemberId1);
            formData.append('status', selectedStatus);

            if (docFile) {
                if (docFile.length > 0) {
                    docFile.map((docFile, index) => {
                        formData.append(`attachment`, {
                            uri: docFile.uri,
                            name: docFile.name,
                            type: docFile.type,
                        });
                    });
                }
                else {
                    formData.append('attachment', docFile);
                }
            }


            const response = await fetch('https://office3i.com/development/api/public/api/manual_raiseticket', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                // Alert.alert('Successfull', responsedata.message);
                handleShowAlert(responsedata.message)
                onRefresh();
                SetLoad(false);
            } else {
                // Alert.alert('Failed', responsedata.message)
                handleShowAlert1(responsedata.message);
                SetLoad(false);
            }

        } catch (error) {
            // Alert.alert('Error:', 'Connect With Office Wifi And Check');
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const onRefresh = () => {
        setSelectedDepartmentsId('');
        setSelectedDepartments('');
        setSelectedDepartments1('');
        setSelectedDepartmentsId1('');
        setSelectedMemberId('');
        setSelectedMemberId1('');
        setSelectedMember('');
        setSelectedMember1('');
        setTickTitle('');
        setSelectedIssTypeId('');
        setSelectedIssType('');
        setDescription('');
        setDocFile('');
        setSelectedStatus(null);
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Assigned List');
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

                    <TouchableOpacity
                        onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                        style={styles.StatusTouchable}>

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

                    <Text style={styles.ShiftSlotText}>
                        Employee Name
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

                    <Text style={styles.ShiftSlotText}>
                        Ticket ID
                    </Text>

                    <TextInput
                        value={tickId}
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
                        onChangeText={(txt) => setTickTitle(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {tickTitleErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Issue Type
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowIssTypeDropdown(!showIssTypeDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedIssType || "Select Issue Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showIssTypeDropdown && (
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
                    )}

                    <Text style={styles.errorText}>
                        {selectedIssTypeErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        onChangeText={(txt) => setDescription(txt)}
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {descriptionErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Attachment
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile ? docFile[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleDocumentSelection}
                        >
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Assign Department
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowDepartmentNameDropdown1(!showDepartmentNameDropdown1)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDepartments1 ? selectedDepartments1 : 'Select Department'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDepartmentNameDropdown1 && (
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
                    )}

                    <Text style={styles.errorText}>
                        {selectedDepartmentsErr1}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Assign Employee
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowEmployeeDropdown1(!showEmployeeDropdown1)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedMember1 ? selectedMember1 : 'Select Member'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showEmployeeDropdown1 && (
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
                    )}

                    <Text style={styles.errorText}>
                        {selectedMemberErr1}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity
                        onPress={toggleDropdownstatus}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
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
                        {selectedStatusErr}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={AddTick}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => onRefresh()}
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

export default RaiseTicket;