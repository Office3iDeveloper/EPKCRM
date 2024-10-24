import React from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const DepartmentList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);

    // 

    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);

    const [dep, setDep] = useState('');
    const [depErr, setDepErr] = useState('');

    // 

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [statusError, setStatusError] = useState('');

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/view_department';
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

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [depError, setDepError] = useState('');

    const [supervisorNameDropdown, setSupervisorNameDropdown] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedNameId, setSelectedNameId] = useState(null);
    const [showSupervisorNameDropdown, setShowSupervisorNameDropdown] = useState(false);
    const [memError, setMemError] = useState('');


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

    const validateFields = () => {
        let isValid = true;

        if (!dep) {
            setDepErr('Department Required');
            isValid = false;
        } else {
            setDepErr('');
        }

        if (!selectedName) {
            setMemError('Supervisor Required');
            isValid = false;
        } else {
            setMemError('');
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

        setLoad(true);

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/add_department';

            const response = await axios.post(apiUrl, {
                depart_name: dep,
                sup_id: selectedNameId,
                created_by: data.userempid,
                status: selectedStatus
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                fetchData();
                handleShowAlert(response.data);
                setLoad(false);
                Handlerefresh();
            } else {
                handleShowAlert1(response.data);
                setLoad(false);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            handleShowAlert2();
            console.error('Error during submit:', error);
            setLoad(false);
        }

    }

    // 

    const Handlerefresh = () => {
        setSelectedName(null);
        setSelectedStatus(null);
        setSelectedNameId(null);
        setSelectedDepartmentId(null);
        setDep('');
        setDepErr('');
        setMemError('');
        setStatusError('');
    }

    // Api call for Delete

    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')

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

                const apiUrl = `https://epkgroup.in/crm/api/public/api/delete_department`;
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
                    const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    // Alert.alert("Deleted", response.data.message);
                    handleShowAlert(response.data);
                } else {
                    // Alert.alert("Failed", response.data.message);
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

    // 

    const handlenavigation = (item) => {
        navigation.navigate('Edit Department List',
            {
                Id: item,
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


    return (

        <ScrollView>

            <View style={styles.SupervisorContainer}>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}>Add Department</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.DepartmentText}>
                        Department Name
                    </Text>

                    <TextInput
                        style={styles.inputs}
                        value={dep}
                        onChangeText={(val) => setDep(val)}
                    />

                    <Text style={styles.errorText}>
                        {depErr}
                    </Text>

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

                    <Text style={styles.errorText}>
                        {memError}
                    </Text>

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

                        <TouchableOpacity style={styles.cancelbutton} onPress={Handlerefresh}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}> Department List</Text>
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
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Supervisor
                                        Name</Text>
                                        <Text style={[styles.header, styles.cell, styles.Status]}>Created By</Text>
                                        <Text style={[styles.header, styles.cell, styles.Status]}>Updated By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {datalist.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    datalist.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.depart_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.departmentsup_name}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.updated_name}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.status}</Text>
                                            <View style={[styles.listcontentButtonview]}>
                                                <TouchableOpacity style={[styles.listcontenteditbutton]}
                                                    onPress={() => handlenavigation(item)}>
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

export default DepartmentList;