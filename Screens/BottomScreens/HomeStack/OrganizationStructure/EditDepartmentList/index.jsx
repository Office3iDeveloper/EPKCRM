import React from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../DepartmentList/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditDepList = ({ navigation, route }) => {

    // 

    const { DepName, EmpName, st, Id } = route.params;

    console.log(Id, "Id");

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);
    const [selectedID, setSelectedID] = useState();

    // 

    const [load, setLoad] = useState(false);

    // 

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);

    const [supervisorNameDropdown, setSupervisorNameDropdown] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedNameId, setSelectedNameId] = useState(null);
    const [showSupervisorNameDropdown, setShowSupervisorNameDropdown] = useState(false);

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
                setSupervisorNameDropdown(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSelectDepartment = (departmentName) => {
        setSelectedDepartment(departmentName.role_name);
        setSelectedDepartmentId(departmentName.id)
        setShowDepartmentNameDropdown(false);
    };

    const handleSelectName = (name) => {
        setSelectedName(name.role_name);
        setSelectedNameId(name.id)
        setShowSupervisorNameDropdown(false);
    };

    // Api call for datalist

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://epkgroup.in/crm/api/public/api/editview_department/${Id.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                if (responseData) {
                    setDatalist(responseData);
                    setSelectedID(responseData.id);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [Id]);

    // 

    useEffect(() => {
        setSelectedDepartment(Id.depart_name);
        setSelectedName(Id.departmentsup_name);
        setSelectedStatus(Id.status);

        if (datalist) {
            // setSelectedDepartmentId(datalist.departmentrole_id);
            setSelectedNameId(datalist.sup_id);
        }
    }, [datalist, Id]);

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/update_department';

            const response = await axios.put(apiUrl, {
                id: Id.id,
                depart_name: selectedDepartment,
                sup_id: selectedNameId,
                status: selectedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data)
            } else {
                setLoad(false);
                handleShowAlert1(response.data);
            }

        } catch (error) {
            handleShowAlert2();
            console.error('Error during submit:', error);
            setLoad(false);
        }

    }

    // 

    const Handlecancel = () => {
        navigation.navigate('Department List')
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Department List');
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

            <View style={styles.SupervisorContainer}>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}>Edit Supervisor</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.DepartmentText}>
                        Department Name
                    </Text>

                    <View style={styles.Input}>
                        <Text style={styles.selectedays}>{selectedDepartment ? selectedDepartment : 'Select Department Name'}</Text>
                    </View>

                    <Text style={styles.DepartmentText}>
                        Supervisor Name
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowSupervisorNameDropdown(!showSupervisorNameDropdown)}>
                        <Text style={styles.selectedays}>{selectedName ? selectedName : 'Select Name'}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showSupervisorNameDropdown && (
                        <View style={styles.dropdown}>
                            {supervisorNameDropdown
                                .filter(department => department.role_name !== selectedDepartment)
                                .map((department, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dropdownOption,
                                            selectedName === department.role_name && styles.selectedOption
                                        ]}
                                        onPress={() => handleSelectName(department)}
                                    >
                                        <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    )}

                    <Text style={styles.StatusText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

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

                        <TouchableOpacity style={styles.cancelbutton} onPress={Handlecancel}>
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

export default EditDepList;