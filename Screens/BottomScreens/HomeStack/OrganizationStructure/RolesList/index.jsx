import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const RoleList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states 

    const [loadData, setLoadData] = useState(false);
    const [Datalist, setDatalist] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Reason, setReason] = useState('');
    const [ReasonError, setReasonError] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Api call for list Data

    const fetchData = async () => {

        setLoadData(true)

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/view_addrole';

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            setLoadData(false);
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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_role`;

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
                    handleShowAlert(response.data)
                    // Alert.alert("SuccessFull", response.data.message);
                } else {
                    handleShowAlert1(response.data);
                    // Alert.alert("Failed", response.data.message);
                    setDelData(false)
                }
            } catch (error) {
                handleShowAlert2();
                // Alert.alert("Error", "Error while deleting shift slot");
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // Handlenavigate

    const Handlenavigate = (slot) => {
        navigation.navigate('Edit Role', { Id: slot.id })
    }

    // 

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

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

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.RolelistContainer}>

                <View style={styles.listContainer}>

                    {
                        loadData ?
                            <ActivityIndicator size={"small"} color={"#20DDFE"} style={styles.Activeindicator} /> :
                            <>
                                <View style={styles.listHeader}>
                                    <Text style={styles.sno}>S.No</Text>
                                    <Text style={styles.RoleName}>Role Name</Text>
                                    <Text style={styles.Action}>Action</Text>
                                </View>

                                {Datalist.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: '3%' }}>No data available</Text>
                                ) : (
                                    Datalist.map((slot, index) => (
                                        <View style={styles.listcontent} key={index}>
                                            <Text style={styles.listcontentsno}>{index + 1}</Text>
                                            <Text style={styles.listcontentRoleName}>{slot.role_name}</Text>

                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton} onPress={() => Handlenavigate(slot)}>
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.listcontentdelbutton} onPress={() => HandleDelete(slot.id)}>
                                                    <DeleteIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                )}

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

        </ScrollView>
    )
}

export default RoleList;