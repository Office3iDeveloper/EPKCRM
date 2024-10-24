import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const AddCustomer = ({ navigation }) => {

    const [load, SetLoad] = useState(false);

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');

    const [fNameErr, setFNameErr] = useState('');
    const [lNameErr, setLNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [mobileNumberErr, setMobileNumberErr] = useState('');
    const [companyNameErr, setCompanyNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const { data } = useSelector((state) => state.login);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            onRefresh();
            navigation.navigate('OTP Customer', {
                fName: fName,
                lName: lName,
                email: email,
                password:password,
                selectedDocumentId: selectedDocumentId,
                selectedDocument1Id: selectedDocument1Id
            })
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

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const CountApi = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/webmodule_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument = (File) => {
        setSelectedDocument(File.module_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [documentList1, setDocumentList1] = useState([]);
    const [selectedDocument1, setSelectedDocument1] = useState([]);
    const [selectedDocument1Err, setSelectedDocument1Err] = useState('');
    const [selectedDocument1Id, setSelectedDocumen1Id] = useState(null);

    const CountApi1 = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/webproduct_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList1(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument1 = (File) => {
        setSelectedDocument1(File.name);
        setSelectedDocumen1Id(File.id);
        setShowDropdown1(false);
    };

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    }

    useEffect(() => {
        CountApi();
        CountApi1();
    }, [])

    // 

    const validateFields = () => {

        let isValid = true;

        if (!fName) {
            setFNameErr('Enter First Name');
            isValid = false;
        } else {
            setFNameErr('');
        }

        if (!lName) {
            setLNameErr('Enter Last Name');
            isValid = false;
        } else {
            setLNameErr('');
        }

        if (!email) {
            setEmailErr('Enter E-mail');
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                setEmailErr("Please enter a valid email address");
                isValid = false;
            } else {
                setEmailErr('');
            }
        }

        if (!mobileNumber) {
            setMobileNumberErr('Enter Mobile Number');
            isValid = false;
        } else {
            if (mobileNumber.length !== 10) {
                setMobileNumberErr("Please enter a valid Phone Number");
                isValid = false;
            } else {
                setMobileNumberErr('');
            }
        }

        if (!companyName) {
            setCompanyNameErr('Enter Company Name');
            isValid = false;
        } else {
            setCompanyNameErr('');
        }

        if (!password) {
            setPasswordErr('Enter Password');
            isValid = false;
        } else {
            setPasswordErr('');
        }

        if (selectedDocument.length == 0) {
            setSelectedDocumentErr('Select Module');
            isValid = false;
        } else {
            setSelectedDocumentErr('');
        }

        if (selectedDocument1.length == 0) {
            setSelectedDocument1Err('Select Plan');
            isValid = false;
        } else {
            setSelectedDocument1Err('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/office3i_sign_up';

            const response = await axios.post(apiUrl, {
                first_name: fName,
                last_name: lName,
                email: email,
                mobile_number: mobileNumber,
                company_name: companyName,
                password: password,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;
            console.log(responseData, "responseData")

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                SetLoad(false);
            } else {
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const onRefresh = () => {
        setFName('');
        setLName('');
        setEmail('');
        setMobileNumber('');
        setCompanyName('');
        setPassword('');
        setSelectedDocument([]);
        setSelectedDocument1([]);
        setFNameErr('');
        setLNameErr('');
        setEmailErr('');
        setMobileNumberErr('');
        setCompanyNameErr('');
        setPasswordErr('');
        setSelectedDocumentErr('');
        setSelectedDocument1Err('');
    }

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Customer</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        First Name
                    </Text>

                    <TextInput
                        value={fName}
                        onChangeText={(txt) => setFName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {fNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Last Name
                    </Text>

                    <TextInput
                        value={lName}
                        onChangeText={(txt) => setLName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {lNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email ID
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {emailErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile Number
                    </Text>

                    <TextInput
                        value={mobileNumber}
                        onChangeText={(txt) => setMobileNumber(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {mobileNumberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Company Name
                    </Text>

                    <TextInput
                        value={companyName}
                        onChangeText={(txt) => setCompanyName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {companyNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Create Password
                    </Text>

                    <TextInput
                        value={password}
                        onChangeText={(txt) => setPassword(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {passwordErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Module Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Module Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {documentList.map((File, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.module_name}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Plan Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Select Plan Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown1 && (
                        <View style={styles.dropdown}>
                            {documentList1.map((File, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDocument1(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.name}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocument1Err}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                        <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.HeaderButtonTextActive}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton} onPress={onRefresh}>
                            <Text style={styles.HeaderButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>



            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../../../../Assets/Alerts/tick.json')}
                title={resMessage}
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../../../../Assets/Alerts/Close.json')}
                title={resMessageFail}
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data"
            />

        </ScrollView>

    )
}

export default AddCustomer; 
