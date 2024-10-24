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

const RaiseTicketEmp = ({ navigation }) => {

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

    const fetchEmployeeDropdown1 = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://epkgroup.in/crm/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

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

    // const handleSelectMember = (item) => {
    //     setSelectedMember(item.emp_name);
    //     setSelectedMemberId(item.emp_id)
    //     setShowEmployeeDropdown(false);
    // };

    // const handleSelectMember1 = (item) => {
    //     setSelectedMember1(item.emp_name);
    //     setSelectedMemberId1(item.emp_id)
    //     setShowEmployeeDropdown1(false);
    // };

    // 

    const [tickId, setTickId] = useState();

    useEffect(() => {
        const TickId = async () => {

            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/ticket_id';
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
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/issue_type_list';
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

    const AddTick = async () => {

        SetLoad(true);

        const formData = new FormData();

        if (!tickTitle) {
            setTickTitleErr('Enter Title');
            Alert.alert('Missing', "Check The Title Field");
            SetLoad(false);
            return;
        } else {
            setTickTitleErr('');
        }

        if (!selectedIssType) {
            setSelectedIssTypeErr('Select Issue Type');
            Alert.alert('Missing', "Check The Issue Type Field");
            SetLoad(false);
            return;
        } else {
            setSelectedIssTypeErr('');
        }

        if (!description) {
            setDescriptionErr('Enter Description');
            Alert.alert('Missing', "Check The Description Field");
            SetLoad(false);
            return;
        } else {
            setDescriptionErr('');
        }

        // if (!docFile) {
        //     setDocFileErr('choose File');
        //     Alert.alert('Missing', "Check The Attachment Field");
        //     SetLoad(false);
        //     return;
        // } else {
        //     setDocFileErr('');
        // }

        try {

            formData.append('emp_id', data.userempid);
            formData.append('ticket_id', tickId);
            formData.append('ticket_title', tickTitle);
            formData.append('issue_type', selectedIssTypeId);
            formData.append('description', description);
            formData.append('created_by', data.userempid);

            if (docFile) {
                if (docFile.length > 0) {
                    docFile.map((file, index) => {
                        formData.append(`attachment`, {
                            uri: file.uri,
                            name: file.name,
                            type: file.type,
                        });
                    });
                }
                else {
                    formData.append('attachment', docFile);
                }
            }

            const response = await fetch('https://epkgroup.in/crm/api/public/api/addemployee_raise_ticket', {
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
                handleShowAlert(responsedata.message);
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
        setTickTitle('');
        setSelectedIssType('');
        setSelectedIssTypeId('');
        setDescription('');
        setDocFile('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Tickets List');
            onRefresh();
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

export default RaiseTicketEmp;