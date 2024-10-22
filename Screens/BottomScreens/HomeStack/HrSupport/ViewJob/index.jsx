import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const ViewJob = ({ navigation, route }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [modalVisible, setModalVisible] = useState(false);
    const [Reason, setReason] = useState('');
    const [ReasonError, setReasonError] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [EditLoad, setEditLoad] = useState(false);
    const [editedVacancies, setEditedVacancies] = useState('');
    const [editedDesignation, setEditedDesignation] = useState('');
    const [editedDes, setEditedDes] = useState('');
    const [designationEditErr, setDesignationEditErr] = useState('');
    const [descriptionEditErr, setDescriptionEditErr] = useState('');
    const [nofVacanciesEditError, setNofVacanciesEditError] = useState('');


    // 

    const handleEditSubmit = async () => {

        setEditLoad(true);

        if (!editedDesignation) {
            setDesignationEditErr('Enter designation');
            setEditLoad(false);
            return;
        } else {
            setDesignationEditErr('');
        }

        if (!editedVacancies) {
            setNofVacanciesEditError('Enter Vacancies');
            setEditLoad(false);
            return;
        } else {
            setNofVacanciesEditError('');
        }

        if (!editedDes) {
            setDescriptionEditErr('Enter Description');
            setEditLoad(false);
            return;
        } else {
            setDescriptionEditErr('');
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/update_job_opening';

            const response = await axios.put(apiUrl, {
                id: Item.id,
                designation: editedDesignation,
                no_of_vacancies: editedVacancies,
                description: editedDes,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                // Alert.alert("Successfull", response.data.message);
                handleShowAlert(response.data.message);
            } else {
                setEditLoad(false);
                // Alert.alert("Failed To Update", response.data.message);
                handleShowAlert1(response.data.message);
                // console.error('Failed To Update:', response.data.error);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", error);
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    const openEditModal = (Item) => {
        setEditedDesignation(Item.designation);
        setEditedVacancies(Item.no_of_vacancies);
        const plainText = Item.description.replace(/<\/?[^>]+(>|$)/g, ""); 
        setEditedDes(plainText);
        setEditModalVisible(true);
    };

    // 

    const HandleDelete = (Item) => {
        setSlotToDelete(Item.id);
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

        setDelData(true);
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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_job_opening`;
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
                    // Alert.alert("Successfull", response.data.message);
                    handleShowAlert(response.data.message);
                    setDelData(false)
                } else {
                    // Alert.alert("Failed", response.data.message);
                    handleShowAlert1(response.data.message);
                    setDelData(false)
                }
            } catch (error) {
                // Alert.alert("Error", response.data.message);
                handleShowAlert2();
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // route

    const { Item } = route.params;

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Job Openings');
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
            <View style={styles.Card}>

                <View style={styles.Header}>

                    <View>
                        <Text style={styles.Designation}>{Item.designation}</Text>
                        <Text style={styles.Vaccancies}>No. of vacancies: {Item.no_of_vacancies}</Text>
                    </View>
                    {
                        (data.userrole == 1 || data.userrole == 2) ?
                            <View style={styles.EditDel}>
                                <TouchableOpacity
                                    style={styles.listcontenteditbutton}
                                    onPress={() => openEditModal(Item)}
                                >
                                    <EditIcon width={24} height={24} color={"#000"} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.listcontentdelbutton}
                                    onPress={() => HandleDelete(Item)}
                                >
                                    <DeleteIcon width={20} height={20} color={"#000"} />
                                </TouchableOpacity>
                            </View> : null
                    }


                </View>

                <Text style={styles.Description}>Description</Text>

                <Text style={styles.Des}>
                    {Item.description.replace(/<[^>]+>/g, '')}
                </Text>

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
                                <TouchableOpacity style={styles.modalCancelButton1}
                                    onPress={cancelDelete}
                                >
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}
                                >


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

                            <Text style={styles.Heading}>Edit Job</Text>

                            <Text style={styles.modalLabelText}>Designation</Text>

                            <TextInput
                                value={editedDesignation}
                                onChangeText={(text) => setEditedDesignation(text)}
                                style={styles.modalInput}
                            />

                            <Text style={styles.errorText}>
                                {designationEditErr}
                            </Text>

                            <Text style={styles.modalLabelText}>No. of Vacancies</Text>

                            <TextInput
                                value={editedVacancies}
                                onChangeText={(text) => setEditedVacancies(text)}
                                style={styles.modalInput}
                            />

                            <Text style={styles.errorText}>
                                {nofVacanciesEditError}
                            </Text>

                            <Text style={styles.modalLabelText}>Description</Text>

                            <TextInput
                                value={editedDes}
                                onChangeText={(text) => setEditedDes(text)}
                                style={styles.modalInput1}
                                multiline={true}
                                textAlignVertical="top"
                            />

                            <Text style={styles.errorText}>
                                {descriptionEditErr}
                            </Text>

                            <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                    {
                                        EditLoad ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
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

export default ViewJob;