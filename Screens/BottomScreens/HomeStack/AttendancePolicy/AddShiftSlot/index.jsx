import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg"
import styles from "./style";
import axios from 'axios';
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddShiftSlot = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [shiftError, setShiftError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [editedshiftError, setEditedShiftError] = useState('');
    const [editedstatusError, setEditedstatusError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [shiftSlot, setShiftSlot] = useState('');
    const [Datalist, setDatalist] = useState([]);
    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [DelData, setDelData] = useState(false);
    const [EditLoad, setEditLoad] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [Reason, setReason] = useState('')
    const [ReasonError, setReasonError] = useState('')
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedShiftSlot, setEditedShiftSlot] = useState('');
    const [editedStatus, setEditedStatus] = useState(null);
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Api Call For Add Shift 

    const validateFields = () => {
        let isValid = true;
    
        if (!shiftSlot) {
            setShiftError('Shift Slot Required');
            isValid = false;
        } else {
            setShiftError('');
        }
    
        if (!selectedStatus) {
            setStatusError('Status is required');
            isValid = false;
        } else {
            setStatusError('');
        }
    
        return isValid;
    };

    const HandleSubmit = async () => {

        setLoad(true)

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/shiftslotinsert';

            const response = await axios.post(apiUrl, {
                shiftslot_name: shiftSlot,
                shiftslot_status: selectedStatus,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setLoad(false);
                setShiftSlot('');
                setSelectedStatus(null);
                fetchData();
                handleShowAlert(response.data);
            } else {
                setLoad(false);
                // Alert.alert("Failed To Add");
                handleShowAlert1(response.data);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    }

    const HandleCancel = () => {
        setShiftSlot('');
        setStatusError('');
        setShiftError('');
        setSelectedStatus(null);
    }

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/view_shiftslot';
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

    useEffect(() => {
        fetchData();
    }, []);


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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_shiftslot`;
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
                    const updatedDataList = Datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    handleShowAlert(response.data);
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data);
                    setDelData(false);
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

    // Api call For EditButton

    // Function to open edit modal and populate data

    const openEditModal = (slot) => {
        setEditedShiftSlot(slot.shift_slot);
        setEditedStatus(slot.status);
        setEditModalVisible(true);
        setSelectedSlotId(slot.id);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditedShiftError('');
        setEditedstatusError('');
        setEditedStatus(null);
    };

    // Function to handle edit submission

    const handleEditSubmit = async () => {
        setEditLoad(true);
        try {
            if (!editedShiftSlot) {
                setEditedShiftError('Shift Slot is required');
                setEditLoad(false);
                return;
            } else {
                setEditedShiftError('');
            }

            if (!editedStatus) {
                setEditedstatusError('Status is required');
                setEditLoad(false);
                return;
            } else {
                setEditedstatusError('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/update_shiftslot';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                shiftslot_name: editedShiftSlot,
                shiftslot_status: editedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                setEditedShiftSlot('');
                setEditedStatus(null);
                fetchData();
                handleShowAlert(response.data);
            } else {
                setEditLoad(false);
                Alert.alert("Failed To Update");
                console.error('Failed To Update:', response.data.error);
                handleShowAlert1(response.data);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

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
            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Shift Slot Form</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Shift Slot
                    </Text>

                    <TextInput
                        value={shiftSlot}
                        onChangeText={(text) => setShiftSlot(text)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {shiftError}
                    </Text>

                    <Text style={styles.StatusText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

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

                        <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <>

                    <View style={styles.ShiftSlotContainerTitle}>
                        <Text style={styles.ShiftSlotContainerTitleText}>Shift Slot List</Text>
                    </View>

                    <View style={styles.container}>

                        {
                            loadData ?
                                <ActivityIndicator size={"small"} color={"#20DDFE"} style={styles.Activeindicator} /> :
                                <>
                                    <View>

                                        <View style={[styles.row, styles.listHeader]}>
                                            <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                            <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Shift</Text>
                                            <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                            <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                        </View>

                                        {Datalist.length === 0 ? (
                                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                        ) : (
                                            Datalist.map((item, index) => (
                                                <View key={index} style={[styles.row, styles.listBody]}>
                                                    <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                                    <Text style={[styles.cell, styles.DepartmentName]}>{item.shift_slot}</Text>
                                                    <Text style={[styles.cell, styles.Status]}>{item.status}</Text>
                                                    <View style={[styles.listcontentButtonview]}>
                                                        <TouchableOpacity style={[styles.listcontenteditbutton]}
                                                            onPress={() => openEditModal(item)}>
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
                                </>
                        }
                    </View>

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

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={closeEditModal}
                    >
                        <View style={styles.modalContainer}>

                            <View style={styles.modalContent}>

                                <Text style={styles.Heading}>Edit Shift Slot</Text>
                                <Text style={styles.modalLabelText}>Shift Slot</Text>

                                <TextInput
                                    value={editedShiftSlot}
                                    onChangeText={setEditedShiftSlot}
                                    style={styles.modalInput}
                                />

                                <Text style={styles.ModalerrorText}>
                                    {editedshiftError}
                                </Text>

                                <Text style={styles.modalLabelText}>Status</Text>

                                <TouchableOpacity onPress={toggleModalDropdown} style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>{editedStatus}</Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                                {/* Dropdown to show the options */}

                                {showModalDropdown && (

                                    <View style={styles.modaldropdown}>

                                        <TouchableOpacity onPress={() => selecModaltStatus("Active")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Active</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => selecModaltStatus("In-Active")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>In-Active</Text>
                                        </TouchableOpacity>

                                    </View>

                                )}

                                <Text style={styles.ModalerrorText}>
                                    {editedstatusError}
                                </Text>

                                <View style={styles.buttoncontainer}>

                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                        {
                                            EditLoad ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                        }
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>
                </>

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

export default AddShiftSlot;