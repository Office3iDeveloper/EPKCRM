import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddProject/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const EditTask = ({ route, navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // route

    const SpecId = route.params.Id;

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

    const fetchProList = async () => {
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/project_name_list';
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


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    // Api call for employeelist

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

    // handleDateChange

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

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
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

    useEffect(() => {
        if (typeof docFile === 'string') {
            setDocFile([{ name: docFile.split('/').pop() }]);
        }
    }, [docFile]);

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

    // 

    const [datalist, setDatalist] = useState([]);
    const [dataload, setDataload] = useState(false);

    // console.log(datalist, "datalist")

    useEffect(() => {

        const EditRaisetick = async () => {

            setDataload(true);

            try {
                const apiUrl = `https://office3i.com/development/api/public/api/edit_tasklist/${SpecId.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data;
                const resp = response.data.data;

                if (responseData.status === 'success') {
                    setDatalist(resp);
                    setDataload(false);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        EditRaisetick();

    }, [SpecId])

    // 

    useEffect(() => {
        setTname(datalist.t_name);
        setTaskId(datalist.t_id);
        setSelectedProjectId(datalist.p_name);
        setSelectedProject(SpecId.project_name);
        setPworktype(datalist.p_work_type);
        setStartDate(new Date(SpecId.start_date));
        setEndDate(new Date(SpecId.end_date));
        setSelectedDepartments(SpecId.department.split(','));
        setSelectedEmployees(SpecId.assign_to.split(','));
        setSelectedDepartmentIds([datalist.department]);
        setSelectedEmployeesIds([datalist.assign_to]);
        setEditedStatus(SpecId.task_status);
        setEditedStatus1(SpecId.priority);
        setDes(datalist.description);
        seteditedocFile(datalist.attachment);
    }, [SpecId, datalist])

    // Api call for Handle Submit

    // 
    const [EdocFile, setEdocFile] = useState([]);
    // console.log(EdocFile, "EdocFile")

    const [EditedocFile, seteditedocFile] = useState([]);
    // console.log(EditedocFile, "EditedocFile")

    const [selectedId, setSelectedId] = useState();

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();
    // console.log(fileName, "fileName")

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    const HandleSubmit = async () => {

        setLoad(true);

        if (!tname) {
            setTnameErr('Enter Task Name');
            Alert.alert('Missing', "Check The Task Field");
            setLoad(false);
            return;
        } else {
            setTnameErr('');
        }

        if (!selectedProject) {
            setSelectedProjectErr('Select Project Name');
            Alert.alert('Missing', "Check The Project Field");
            setLoad(false);
            return;
        } else {
            setSelectedProjectErr('');
        }

        if (!pworktype) {
            setPworktypeErr('Enter Project Work Type');
            Alert.alert('Missing', "Check The Project Work Type Field");
            setLoad(false);
            return;
        } else {
            setPworktypeErr('');
        }

        if (selectedDepartments.length == "0") {
            setSelectedDepartmentsErr('Select Department Name');
            Alert.alert('Missing', "Check The Department Field");
            setLoad(false);
            return;
        } else {
            setSelectedDepartmentsErr('');
        }

        if (selectedEmployees.length == "0") {
            setSelectedMemberErr('Select Member Name');
            Alert.alert('Missing', "Check The Member Field");
            setLoad(false);
            return;
        } else {
            setSelectedMemberErr('');
        }

        if (!editedStatus) {
            setEditedStatusErr('Select Task Status');
            Alert.alert('Missing', "Check The Task Status Field");
            setLoad(false);
            return;
        } else {
            setEditedStatusErr('');
        }

        if (!editedStatus1) {
            setEditedStatus1Err('Select Priority');
            Alert.alert('Missing', "Check The Priority Field");
            setLoad(false);
            return;
        } else {
            setEditedStatus1Err('');
        }

        if (!des) {
            setDesErr('Enter Description');
            Alert.alert('Missing', "Check The Description Field");
            setLoad(false);
            return;
        } else {
            setDesErr('');
        }

        const formData = new FormData();

        try {
            formData.append('id', SpecId.id);
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
            formData.append('updated_by', data.userempid);
            formData.append('oldimg_path', datalist.attachment);
            formData.append('p_reason', "-");

            if (EdocFile) {
                if (EdocFile.length > 0) {
                    EdocFile.map((file, index) => {
                        formData.append(`attachment`, {
                            uri: file.uri,
                            name: file.name,
                            type: 'image/jpeg',
                        });
                    });
                }
            } else {
                formData.append('attachment', datalist.attachment);
            }

            const response = await fetch('https://office3i.com/development/api/public/api/update_task_list', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const responsedata = await response.json();
                console.log(responsedata, "responsedata");

                if (responsedata.status === "success") {
                    setLoad(false);
                    handleShowAlert(responsedata.message);
                } else {
                    handleShowAlert1(responsedata.message);
                    setLoad(false);
                }
            } else {
                const errorMessage = `Failed with status code: ${response.status}`;
                console.error(errorMessage);
                handleShowAlert1(errorMessage);
                setLoad(false);
            }

        } catch (error) {
            console.error("Error in HandleSubmit:", error);
            handleShowAlert2();
            setLoad(false);
        } finally {
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
                    <Text style={styles.PolicyContainerTitleText}>Edit Task</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Task ID
                    </Text>

                    <TextInput
                        value={SpecId.ticket_id}
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

                    <TouchableOpacity style={styles.Input} onPress={toggleDropdown}>
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
                        {selectedDepartmentsErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Assigned To
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
                        {selectedMemberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Start Date
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
                            />
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
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Task Status
                    </Text>

                    <TouchableOpacity onPress={toggleModalDropdown} style={styles.Input}>

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

                    <TouchableOpacity onPress={toggleModalDropdown1} style={styles.Input}>

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
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {desErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attachment
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {EdocFile && EdocFile.length > 0 ? EdocFile[0]?.name : fileName}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleEditDocumentSelection}
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
                                        Update
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Task List')}
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

export default EditTask;