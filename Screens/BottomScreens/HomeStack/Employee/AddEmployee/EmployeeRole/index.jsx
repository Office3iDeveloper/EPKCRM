import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EmployeeRole = ({ onBankDetails, onprevEmpDetails, validation }) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);

    const [supervisorDropdown, setSupervisorDropdown] = useState([]);
    const [showSupervisorDropdown, setShowSupervisorDropdown] = useState(false);

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

    const handleSelectDepartment = (departmentName) => {
        handleFieldsChange('userRole', departmentName.role_name);
        handleFieldsChange('selectedRoleId', departmentName.id);
        setShowDepartmentNameDropdown(false);
    };

     // Api call for Supervisor

     const [departmentNameDropdown1, setDepartmentNameDropdown1] = useState([]);
     const [selectedDepartment1, setSelectedDepartment1] = useState(null);
     const [showDepartmentNameDropdown1, setShowDepartmentNameDropdown1] = useState(false);
 
     const [supervisorDropdown1, setSupervisorDropdown1] = useState([]);
     const [showSupervisorDropdown1, setShowSupervisorDropdown1] = useState(false);
 
     useEffect(() => {
 
         const apiUrl = 'https://office3i.com/development/api/public/api/supervisor_userrole';
 
         const fetchData = async () => {
 
             try {
                 const response = await axios.get(apiUrl, {
                     headers: {
                         Authorization: `Bearer ${data.token}`
                     }
                 });
 
                 const responseData = response.data.data;
 
                 setDepartmentNameDropdown1(responseData);
 
 
             } catch (error) {
                 console.error('Error fetching data:', error);
             }
         };
 
         fetchData();
 
     }, []);
 
     const handleSelectDepartment1 = (departmentName) => {
        fetchSupervisorDropdown(departmentName.id);
        handleFieldsChange('supervisorRole', departmentName.role_name);
        handleFieldsChange('selectedsupervisorRoleId', departmentName.id);
        handleFieldsChange('supervisor', []);
        handleFieldsChange('selectedsupervisorId', '');
        setShowDepartmentNameDropdown1(false);
     };

    // Api call for supervisor list

    const selectSupervisor = (shift) => {
        handleFieldsChange('supervisor', shift.supervisor_name);
        handleFieldsChange('selectedsupervisorId', shift.id);
        setShowSupervisorDropdown(false);
    };

    const fetchSupervisorDropdown = async (index) => {

        const apiUrl = `https://office3i.com/development/api/public/api/supervisor_list/${index}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            console.log(responseData, "responseData")

            setSupervisorDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    // 

    const [showPunch, setShowPunch] = useState(false);

    const toggleDropdownPucnh = () => {
        setShowPunch(!showPunch);
    };

    const selectPunch = (Punch, index) => {
        setShowPunch(false);
        handleFieldsChange('checkinCheckout', Punch);
        handleFieldsChange('checkinCheckoutId', index);
    };

    // 

    const [showOvertime, setShowOvertime] = useState(false);

    const toggleDropdownOvertime = () => {
        setShowOvertime(!showOvertime);
    };

    const selectOvertime = (Overtime) => {
        handleFieldsChange('overtime', Overtime);
        setShowOvertime(false);
    };

    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Role
            </Text>

            <Text style={styles.subHeading}>
                Select User Role
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                <Text style={styles.StatusTouchableText}>
                    {Employee.userRole && Employee.userRole.length > 0 ? Employee.userRole : "Select userRole"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {showDepartmentNameDropdown && (
                <View style={styles.dropdown}>
                    {departmentNameDropdown.map((department, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dropdownOption,
                                selectedDepartment === department.role_name && styles.selectedOption
                            ]}
                            onPress={() => handleSelectDepartment(department)}
                        >
                            <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.errorText}>
                {validation ? (Employee.userRole.length == "0" ? "User Role Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Designation
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.designation}
                onChangeText={(text) => handleFieldsChange('designation', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.designation ? "Designation Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Select Supervisor Role
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown1(!showDepartmentNameDropdown1)}>
                <Text style={styles.StatusTouchableText}>
                    {Employee.supervisorRole && Employee.supervisorRole.length > 0 ? Employee.supervisorRole : "Select SupervisorRole"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {showDepartmentNameDropdown1 && (
                <View style={styles.dropdown}>
                    {departmentNameDropdown1.map((department, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dropdownOption,
                                selectedDepartment1 === department.role_name && styles.selectedOption
                            ]}
                            onPress={() => handleSelectDepartment1(department)}
                        >
                            <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.errorText}>
                {validation ? (Employee.supervisorRole.length == "0" ? "Supervisor Role Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Select Supervisor Name
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => {
                setShowSupervisorDropdown(!showSupervisorDropdown);
            }}>
                <Text style={styles.selectedays}>
                    {Employee.supervisor && Employee.supervisor.length > 0 ? Employee.supervisor : "Select supervisor"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {
                showSupervisorDropdown && (
                    <View style={styles.dropdown}>
                        {supervisorDropdown.map((shift, index) => (

                            <TouchableOpacity key={index} onPress={() => selectSupervisor(shift)} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>{shift.supervisor_name}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                )
            }

            <Text style={styles.errorText}>
                {validation ? (Employee.supervisor.length == "0" ? "Supervisor Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Official Email ID
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.officialEmail}
                onChangeText={(text) => handleFieldsChange('officialEmail', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.officialEmail ? "Official Email Required": !emailRegex.test(Employee.officialEmail) ? "Enter Valid E-mail" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Password
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.password}
                onChangeText={(text) => handleFieldsChange('password', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.password ? "Password Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Check-in / Check-out
            </Text>

            <TouchableOpacity onPress={toggleDropdownPucnh} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.checkinCheckout && Employee.checkinCheckout.length > 0 ? Employee.checkinCheckout : "Select Field"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showPunch && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectPunch("Check-in", "1")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Check-in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPunch("Check-in/Check-out", "2")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Check-in/Check-out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPunch("None", "3")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>None</Text>
                    </TouchableOpacity>

                </View>
            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.checkinCheckout ? "Check-In Check-Out Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Overtime
            </Text>

            <TouchableOpacity onPress={toggleDropdownOvertime} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.overtime && Employee.overtime.length > 0 ? Employee.overtime : "Select Field"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showOvertime && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectOvertime("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectOvertime("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {/* {!Employee.overtime ? "overtime Required" : null} */}
            </Text>

            <Text style={styles.subHeading}>
                Late Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.lateAllowed}
                onChangeText={(text) => handleFieldsChange('lateAllowed', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {/* {!Employee.lateAllowed ? "lateAllowed Required" : null} */}
            </Text>

            <Text style={styles.subHeading}>
                Permission Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.permissionAllowed}
                onChangeText={(text) => handleFieldsChange('permissionAllowed', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {/* {!Employee.permissionAllowed ? "permissionAllowed Required" : null} */}
            </Text>

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevEmpDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Prev
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onBankDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeRole;