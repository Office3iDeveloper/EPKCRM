import React, { useEffect } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../HeaderandFooter/style";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import DocumentPicker from 'react-native-document-picker';

const EditHeadFoot = ({ navigation, route }) => {

    // 

    const { Id } = route.params;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);
    const [selectedID, setSelectedID] = useState();
    console.log('selectedID', selectedID)

    const [cmpName, setCmpName] = useState('');

    const [EdocFile, setEdocFile] = useState([]);
    console.log(EdocFile, "EdocFile")

    const [EdocFile1, setEdocFile1] = useState([]);
    console.log(EdocFile1, "EdocFile1")

    const [EditedocFile, seteditedocFile] = useState('');
    console.log(EditedocFile, "EditedocFile")

    const [EditedocFile1, seteditedocFile1] = useState('');
    console.log(EditedocFile1, "EditedocFile1")

    // 

    const [load, setLoad] = useState(false);


    // 

    useEffect(() => {
        setSelectedID(Id.id)
        setCmpName(Id.company_title)
        const fileName = Id?.header_layout.split('/').pop();
        const fileName1 = Id?.footer_layout.split('/').pop();
        seteditedocFile(fileName);
        seteditedocFile1(fileName1);
    }, [Id]);

    // 

    const Handlecancel = () => {
        navigation.navigate('Header and Footer')
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Header and Footer');
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

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            seteditedocFile(res[0].name)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };



    const handleEditDocumentSelection1 = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            seteditedocFile1(res[0].name)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    // console.log(
    //     "selectedID", selectedID,
    //     "cmpName", cmpName,
    //     "EdocFile", EdocFile,
    //     "EdocFile1", EdocFile1,
    // )

    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        try {

            formData.append('id', selectedID);
            formData.append('title', cmpName);
            // formData.append('updated_by', data.userempid);

            if (EdocFile && EdocFile.length > 0) {
                EdocFile.forEach((file) => {
                    formData.append('header_attached', {
                        uri: file.uri,
                        name: file.name,
                        type: 'image/jpeg',
                    });
                });
            }
            
            if (EdocFile1 && EdocFile1.length > 0) {
                EdocFile1.forEach((file) => {
                    formData.append('header_attached', {
                        uri: file.uri,
                        name: file.name,
                        type: 'image/jpeg',
                    });
                });
            }

            const response = await fetch('https://office3i.com/development/api/public/api/update_header_footer', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();
            console.log(responsedata, "re")

            if (responsedata.status === "success") {
                handleShowAlert(responsedata.message);
                setLoad(false);
            } else {
                handleShowAlert1(responsedata.message);
                setLoad(false);
            }

        } catch (error) {
            console.log(error);
            handleShowAlert2();
            setLoad(false);
        }
    }

    return (

        <ScrollView>

            <View style={styles.SupervisorContainer}>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}>Edit Supervisor</Text>
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

                    <Text
                        style={styles.MDocFileName}
                    >
                        {EditedocFile}
                    </Text>

                    <View style={styles.MfullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleEditDocumentSelection}
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

                    <Text
                        style={styles.MDocFileName}
                    >
                        {EditedocFile1}
                    </Text>

                    <View style={styles.MfullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleEditDocumentSelection1}
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

export default EditHeadFoot;