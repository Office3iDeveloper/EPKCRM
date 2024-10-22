import React, { useCallback, useEffect, useState, useRef } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const JobOpenings = ({ navigation }) => {

    const richText = useRef();

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [load, setload] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [designation, setDesignation] = useState('');
    const [designationErr, setDesignationErr] = useState('');
    const [nofVacancies, setNofVacancies] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [nofVacanciesError, setNofVacanciesError] = useState('');
    const [datalist, setDatalist] = useState([]);

    // 

    const OnRefresh = () => {
        setDesignation('');
        setNofVacancies('');
        setDescription('');

        if (richText.current) {
            richText.current.setContentHTML('');
        }
    }

    // Add

    const validateFields = () => {
        let isValid = true;

        if (!designation) {
            setDesignationErr('Enter designation');
            isValid = false;
        } else {
            setDesignationErr('');
        }

        if (!nofVacancies) {
            setNofVacanciesError('Enter Vacancies');
            isValid = false;
        } else {
            setNofVacanciesError('');
        }

        if (!description) {
            setDescriptionErr('Enter Description');
            isValid = false;
        } else {
            setDescriptionErr('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        setload(true);

        try {

            if (!validateFields()) {
                setload(false);
                return;
            }


            const apiUrl = 'https://office3i.com/development/api/public/api/add_jobopening';

            const response = await axios.post(apiUrl, {
                designation: designation,
                no_of_vacancies: nofVacancies,
                description: description,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const ResData = response.data;
            console.log(ResData, "ResData")

            if (ResData.status === "success") {
                // Alert.alert("Successfull", ResData.message)
                handleShowAlert(ResData.message);
                fetchData();
                setDesignation('');
                richText.current?.setContentHTML('');
                setNofVacancies('');
                setDescription('');
                setload(false);
            } else {
                // Alert.alert("Successfull", ResData.message)
                handleShowAlert1(ResData.message);
                setload(false);
            }

        } catch (error) {
            // console.log(error)
            handleShowAlert2();
            setload(false);
        }
    }

    // list 

    const fetchData = async () => {
        setLoadData(true);
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/jobopening_list`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDatalist(responseData);
            setLoadData(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const renderJobCards = () => {
        return datalist.map((job, index) => (
            <View key={index} style={styles.Card}>
                <Text style={styles.Designation}>{job.designation}</Text>
                <Text style={styles.Vaccancies}>No. of vacancies: {job.no_of_vacancies}</Text>
                <View>
                    <Text style={styles.Description}>Description</Text>
                    <Text style={styles.Des}>
                        {/* Remove HTML tags from description */}
                        {job.description.replace(/<[^>]+>/g, '').slice(0, 300)}
                    </Text>
                </View>
                <View style={styles.ButtonView}>
                    <TouchableOpacity style={styles.Button}
                        onPress={() => navigation.navigate('View Job', {
                            Item: job
                        })}
                    >
                        <Text style={styles.ButtonText}>View Job</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    // 

    const handleChangeText = (text) => {
        setDescription(text);
    };

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
                {
                    (data.userrole == 1 || data.userrole == 2) ?
                        <>
                            <View style={styles.ShiftSlotContainerTitle}>
                                <Text style={styles.ShiftSlotContainerTitleText}>Add Job</Text>
                            </View>

                            <View style={styles.Inputcontainer}>

                                <Text style={styles.ShiftSlotText}>
                                    Designation
                                </Text>

                                <TextInput
                                    value={designation}
                                    onChangeText={(txt) => setDesignation(txt)}
                                    style={styles.ShiftSlotTextInput}
                                />

                                <Text style={styles.errorText}>
                                    {designationErr}
                                </Text>

                                <Text style={styles.ShiftSlotText}>
                                    No. of Vacancies
                                </Text>

                                <TextInput
                                    value={nofVacancies}
                                    onChangeText={(txt) => setNofVacancies(txt)}
                                    style={styles.ShiftSlotTextInput}
                                    keyboardType="number-pad"
                                />

                                <Text style={styles.errorText}>
                                    {nofVacanciesError}
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

                                {/* react-native-pell-rich-editor */}

                                {/* <SafeAreaView style={styles.container1}>

                                    <RichEditor
                                        ref={richText}
                                        style={styles.richTextEditor1}
                                        placeholder="Start writing here..."
                                        onChange={(text) => handleChangeText(text)}
                                        initialContentHTML={description}
                                    />

                                    <RichToolbar
                                        editor={richText}
                                        actions={[
                                            actions.setBold,
                                            actions.setItalic,
                                            actions.setUnderline,
                                            actions.heading1,
                                            actions.insertBulletsList,
                                            actions.insertOrderedList,
                                        ]}
                                        iconMap={{
                                            [actions.setBold]: ({ tintColor }) => <Text style={[styles.toolbarButton1, { color: tintColor }]}>B</Text>,
                                            [actions.setItalic]: ({ tintColor }) => <Text style={[styles.toolbarButton1, { color: tintColor }]}>I</Text>,
                                            [actions.setUnderline]: ({ tintColor }) => <Text style={[styles.toolbarButton1, { color: tintColor }]}>U</Text>,
                                            [actions.heading1]: ({ tintColor }) => <Text style={[styles.toolbarButton1, { color: tintColor }]}>H1</Text>,
                                        }}
                                    />
                                </SafeAreaView> */}

                                <Text style={styles.errorText}>
                                    {descriptionErr}
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
                                        onPress={() => OnRefresh()}
                                    >
                                        <Text style={styles.cancelbuttontext}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </> : null
                }


                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Jobs</Text>
                </View>

                {loadData ? (
                    <ActivityIndicator size="large" color="#0879F6" style={styles.activityIndicator} />
                ) : (
                    renderJobCards()
                )}

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

export default JobOpenings;
