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

const AssetType = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [shiftError, setShiftError] = useState('');
    const [shiftError1, setShiftError1] = useState('');
    const [editedshiftError, setEditedShiftError] = useState('');
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
    const [selectedSlotId, setSelectedSlotId] = useState('');


    // Api Call For Add Shift 

    const HandleSubmit = async () => {

        setLoad(true)

        try {
            if (!shiftSlot) {
                setShiftError('Asset type is required');
                setLoad(false);
                return;
            } else {
                setShiftError('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/add_asset_type';

            const response = await axios.post(apiUrl, {
                created_by: data.userempid,
                asset_id: assetsId,
                asset_type_name: shiftSlot,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setLoad(false);
                setShiftSlot('');
                fetchData();
                handleShowAlert(response.data.message);
            } else {
                setLoad(false);
                // Alert.alert("Failed", response.data.message);
                handleShowAlert1(response.data.message);
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
        setShiftError('');
    }

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/asset_type_list';
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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_asset_type`;
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
                    // Alert.alert("SuccessFull", response.data.message);
                    handleShowAlert(response.data.message);
                    setDelData(false)
                } else {
                    // Alert.alert("Failed", response.data.message);
                    handleShowAlert1(response.data.message);
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

    // Api call For EditButton

    // Function to open edit modal and populate data

    const openEditModal = (slot) => {
        setEditedShiftSlot(slot.asset_type_name);
        setEditModalVisible(true);
        setSelectedSlotId(slot.id);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditedShiftError('');
    };

    // Function to handle edit submission

    const handleEditSubmit = async () => {

        setEditLoad(true);

        try {

            if (!editedShiftSlot) {
                setShiftError1('Asset type is required');
                setEditLoad(false);
                return;
            } else {
                setShiftError1('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/update_asset_type';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                asset_type_name: editedShiftSlot,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                setEditedShiftSlot('');
                fetchData();
                handleShowAlert(response.data.message);
            } else {
                setEditLoad(false);
                // Alert.alert("Failed To Update");
                handleShowAlert1(response.data.message);
                console.error('Failed To Update:', response.data.error);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

    // 

    const [assetsId, setAssetsId] = useState('');

    const CountApi = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/asset_id';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setAssetsId(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        CountApi();
    }, [])


    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
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

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Add Asset Type</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Asset ID
                    </Text>

                    <TextInput
                        editable={false}
                        value={assetsId}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatusText}>
                        Asset Type
                    </Text>

                    <TextInput
                        value={shiftSlot}
                        onChangeText={(text) => setShiftSlot(text)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {shiftError}
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
                        <Text style={styles.ShiftSlotContainerTitleText}>Asset Type List</Text>
                    </View>

                    {/* <View style={styles.container}>

                        {
                            loadData ?
                                <ActivityIndicator size={"small"} color={"#20DDFE"} style={styles.Activeindicator} /> :
                                <>
                                    <View>

                                        <View style={[styles.row, styles.listHeader]}>
                                            <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                            <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Asset ID</Text>
                                            <Text style={[styles.header, styles.cell, styles.Status]}>Asset Type</Text>
                                            <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                        </View>

                                        {Datalist.length === 0 ? (
                                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                        ) : (
                                            Datalist.map((item, index) => (
                                                <View key={index} style={[styles.row, styles.listBody]}>
                                                    <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                                    <Text style={[styles.cell, styles.DepartmentName]}>{item.asset_id}</Text>
                                                    <Text style={[styles.cell, styles.Status]}>{item.asset_type_name}</Text>
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

                    </View> */}

                    <ScrollView horizontal={true}>
                        <View style={styles.Tablecontainer}>
                            {loadData ? (
                                <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                            ) : (
                                <View>

                                    <View style={[styles.row, styles.listHeader]}>
                                        <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                        <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Asset ID</Text>
                                        <Text style={[styles.header, styles.cell, styles.Status]}>Asset Type</Text>
                                        <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                    </View>

                                    {Datalist.length === 0 ? (
                                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                    ) : (
                                        Datalist.map((item, index) => (
                                            <View key={index} style={[styles.row, styles.listBody]}>
                                                <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                                <Text style={[styles.cell, styles.DepartmentName]}>{item.asset_id}</Text>
                                                <Text style={[styles.cell, styles.Status]}>{item.asset_type_name}</Text>
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

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={closeEditModal}
                    >
                        <View style={styles.modalContainer}>

                            <View style={styles.modalContent}>

                                <Text style={styles.Heading}>Edit Asset Type</Text>
                                <Text style={styles.modalLabelText}>Asset ID</Text>

                                <TextInput
                                    editable={false}
                                    value={assetsId}
                                    style={styles.modalInput}
                                />

                                <Text style={styles.modalLabelText}>Asset Type</Text>

                                <TextInput
                                    value={editedShiftSlot}
                                    onChangeText={(text) => setEditedShiftSlot(text)}
                                    style={styles.modalInput}
                                />

                                <Text style={styles.errorText}>
                                    {shiftError1}
                                </Text>

                                <View style={styles.buttoncontainer}>

                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                        {
                                            EditLoad ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalSubmitButtonText}>Update</Text>
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

export default AssetType;