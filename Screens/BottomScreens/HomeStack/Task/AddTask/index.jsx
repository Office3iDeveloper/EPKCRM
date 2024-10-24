import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddProject/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const AddTask = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [tname, setTname] = useState('');
    const [tnameErr, setTnameErr] = useState('');
    const [pworktype, setPworktype] = useState('');
    const [pworktypeErr, setPworktypeErr] = useState('');
    const [des, setDes] = useState('');
    const [desErr, setDesErr] = useState('');
    const [TaskId, setTaskId] = useState('');
    const [prolist, setProlist] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjectErr, setSelectedProjectErr] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchTask = async () => {
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/task_id';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            });

            const responseData = response.data.data;
            setTaskId(responseData);

        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    };

    const fetchProList = async () => {
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/project_name_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            });

            const responseData = response.data.data;
            setProlist(responseData);

        } catch (error) {
            console.error('Error fetching project list data:', error);
        }
    };

    useEffect(() => {
        if (data?.token) {
            fetchTask();
            fetchProList();
        } else {
            console.error('Token is missing');
        }
    }, [data?.token]);

    const [load, setLoad] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedMemberErr, setSelectedMemberErr] = useState('');
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
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');
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

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [editedStatus, setEditedStatus] = useState(null);
    const [editedStatusErr, setEditedStatusErr] = useState(null);

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    // 

    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();
    const [showModalDropdown1, setShowModalDropdown1] = useState(false);
    const [editedStatus1, setEditedStatus1] = useState(null);
    const [editedStatus1Err, setEditedStatus1Err] = useState(null);

    const toggleModalDropdown1 = () => {
        setShowModalDropdown1(!showModalDropdown1);
    };

    const selecModaltStatus1 = (status) => {
        setEditedStatus1(status);
        setShowModalDropdown1(false);
    };

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

    // 

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectProject = (project) => {
        setSelectedProject(project.project_name);
        setSelectedProjectId(project.id);
        setShowDropdown(false);
    };

    // Api call for Handle Submit

    const validateTaskFields = () => {
        let isValid = true;

        if (!tname) {
            setTnameErr('Enter Task Name');
            isValid = false;
        } else {
            setTnameErr('');
        }

        if (!selectedProject) {
            setSelectedProjectErr('Select Project Name');
            isValid = false;
        } else {
            setSelectedProjectErr('');
        }

        if (!pworktype) {
            setPworktypeErr('Enter Project Work Type');
            isValid = false;
        } else {
            setPworktypeErr('');
        }

        if (selectedDepartments.length === 0) {
            setSelectedDepartmentsErr('Select Department Name');
            isValid = false;
        } else {
            setSelectedDepartmentsErr('');
        }

        if (selectedEmployees.length === 0) {
            setSelectedMemberErr('Select Member Name');
            isValid = false;
        } else {
            setSelectedMemberErr('');
        }

        if (!editedStatus) {
            setEditedStatusErr('Select Task Status');
            isValid = false;
        } else {
            setEditedStatusErr('');
        }

        if (!editedStatus1) {
            setEditedStatus1Err('Select Priority');
            isValid = false;
        } else {
            setEditedStatus1Err('');
        }

        if (!des) {
            setDesErr('Enter Description');
            isValid = false;
        } else {
            setDesErr('');
        }

        return isValid;
    };


    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        if (!validateTaskFields()) {
            setLoad(false);
            return;
        }

        try {

            formData.append('t_id', TaskId);
            formData.append('t_name', tname);
            formData.append('p_name', selectedProjectId);
            formData.append('p_work_type', pworktype);
            formData.append('department', selectedDepartmentIdsAsNumbers);
            formData.append('assign_to', selectedEmployeesIdsAsNumbers);
            formData.append('start_date', formattedStartDate);
            formData.append('end_date', formattedEndDate);
            formData.append('priority', editedStatus1);
            formData.append('description', des);
            formData.append('status', editedStatus);
            formData.append('created_by', data.userempid);

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
            }
            else {
                formData.append('attachment', docFile);
            }

            const response = await fetch('https://epkgroup.in/crm/api/public/api/add_task', {
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
                setLoad(false);
                // Alert.alert("Successfull", responsedata.message);
                handleShowAlert(responsedata.message);
                Handlerefresh();
            } else {
                // Alert.alert("Failed To Add", responsedata.message);
                handleShowAlert1(responsedata.message);
                setLoad(false);
                console.error('Failed To Add:', responsedata.error);
            }

        } catch (error) {
            // console.log(error, "error");
            handleShowAlert2();
            setLoad(false);
        }

    }

    const Handlerefresh = () => {
        setTname('');
        setProlist('Select Project');
        setPworktype('');
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedDepartments([]);
        setSelectedEmployees([]);
        setEditedStatus("Select Status");
        setEditedStatus1("Select Priority");
        setDes('');
        setDocFile('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Task List')
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
                    <Text style={styles.PolicyContainerTitleText}>Add Task </Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Task ID
                    </Text>

                    <TextInput
                        value={TaskId}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Task Name
                    </Text>

                    <TextInput
                        value={tname}
                        onChangeText={(txt) => setTname(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {tnameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Project Name
                    </Text>

                    <TouchableOpacity style={[styles.Input, { height: 50 }]} onPress={toggleDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedProject ? selectedProject : "Select Project"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {prolist.map((project) => (
                                <TouchableOpacity
                                    key={project.id}
                                    onPress={() => selectProject(project)}
                                    style={styles.dropdownOption}
                                >
                                    <Text style={styles.dropdownOptionText}>{project.project_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedProjectErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Project Work Type
                    </Text>

                    <TextInput
                        value={pworktype}
                        onChangeText={(txt) => setPworktype(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {pworktypeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Department
                    </Text>

                    <TouchableOpacity style={[styles.Input, { paddingVertical: selectedDepartments.length == 0 ? "5%" : "3%" }]} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
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
                        {selectedDepartmentsErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Assigned To
                    </Text>

                    <TouchableOpacity style={[styles.Input, { paddingVertical: selectedEmployees.length == 0 ? "5%" : "3%" }]} onPress={() => {
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
                        {selectedMemberErr}
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
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        End Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {endDate.toDateString()} &nbsp;
                        </Text>
                        {/* {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
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
                                            display="default"
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

                    <Text style={styles.StatDateText}>
                        Task Status
                    </Text>

                    <TouchableOpacity onPress={toggleModalDropdown} style={[styles.Input, { height: 50 }]}>

                        <Text style={styles.StatusTouchableText}>{editedStatus ? editedStatus : "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showModalDropdown && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selecModaltStatus("Not Yet Start")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Not Yet Start</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selecModaltStatus("In-Progress")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Progress</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selecModaltStatus("Hold")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Hold</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selecModaltStatus("Completed")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Completed</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {editedStatusErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Priority
                    </Text>

                    <TouchableOpacity onPress={toggleModalDropdown1} style={[styles.Input, { height: 50 }]}>

                        <Text style={styles.StatusTouchableText}>{editedStatus1 ? editedStatus1 : "Select Priority"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showModalDropdown1 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selecModaltStatus1("High")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>High</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selecModaltStatus1("Medium")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Medium</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selecModaltStatus1("Low")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Low</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {editedStatus1Err}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Description
                    </Text>

                    <TextInput
                        value={des}
                        onChangeText={(txt) => setDes(txt)}
                        style={styles.inputs1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {desErr}
                    </Text>

                    <Text style={styles.StatDateText}>
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
                                Choose File
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr}
                    </Text>

                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton}
                            onPress={HandleSubmit}
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
                            onPress={Handlerefresh}
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

export default AddTask;