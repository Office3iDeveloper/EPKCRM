import React from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import DocumentPicker from 'react-native-document-picker';

const HeaderandFooter = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);

    // 

    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [cmpName, setCmpName] = useState('');

    const [docFile, setDocFile] = useState();
    const [docFile1, setDocFile1] = useState();

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/headerFooter_templatelist';
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

    const validateFields = () => {
        let isValid = true;

        return isValid;
    };

    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        try {

            // if (!validateFields()) {
            //     setLoad(false);
            //     return;
            // }

            formData.append('title', cmpName);
            formData.append('created_by', data.userempid);

            if (docFile.length > 0) {
                docFile.map((item, index) => {
                    formData.append(`header_attached`, {
                        uri: item.uri,
                        name: item.name,
                        type: item.type,
                    });
                });
            }
            else {
                formData.append('header_attached', docFile);
            }

            if (docFile1.length > 0) {
                docFile1.map((item, index) => {
                    formData.append(`footer_attached`, {
                        uri: item.uri,
                        name: item.name,
                        type: item.type,
                    });
                });
            }
            else {
                formData.append('footer_attached', docFile);
            }


            const response = await fetch('https://office3i.com/development/api/public/api/add_header_footer', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();
            console.log(responsedata,"re")

            if (responsedata.status === "success") {
                fetchData();
                handleShowAlert(responsedata.message);
                setLoad(false);
                Handlerefresh();
            } else {
                handleShowAlert1(responsedata.message);
                setLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            setLoad(false);
        }
    }

    // 

    const Handlerefresh = () => {
        setDocFile('');
        setDocFile1('');
        setCmpName('');
    }

    // 

    const handlenavigation = (item) => {
        navigation.navigate('Edit Header and Footer',
            {
                Id: item,
            })
    }

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


    // 

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            res.forEach(file => {
                file.name = file.name.replace(/\s+/g, '_');
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

    const handleDocumentSelection1 = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            res.forEach(file => {
                file.name = file.name.replace(/\s+/g, '_');
            });
            setDocFile1(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };


    return (

        <ScrollView>

            <View style={styles.SupervisorContainer}>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}>Add Header Footer</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.DepartmentText}>
                        Company Name
                    </Text>

                    <TextInput
                        style={styles.inputs}
                        placeholder="Enter Company Name"
                        value={cmpName}
                        onChangeText={(val) => setCmpName(val)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.DepartmentText}>
                        Insert Header
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
                        { }
                    </Text>

                    <Text style={styles.DepartmentText}>
                        Insert Footer
                    </Text>

                    <Text style={docFile1 ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile1 ? docFile1[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleDocumentSelection1}
                        >
                            <Text style={styles.UploadButtonText}>
                                Choose File
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        { }
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
                    <Text style={styles.SupervisorContainerTitleText}> List</Text>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.container}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Company
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {datalist.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    datalist.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.company_title}</Text>
                                            <View style={[styles.listcontentButtonview]}>
                                                <TouchableOpacity style={[styles.listcontentviewbutton]} onPress={() => navigation.navigate('View Header and Footer', { Id: item })}
                                                >
                                                    <ViewIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.listcontenteditbutton]}
                                                    onPress={() => handlenavigation(item)}>
                                                    <EditIcon width={14} height={14} color="#000" />
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

export default HeaderandFooter;