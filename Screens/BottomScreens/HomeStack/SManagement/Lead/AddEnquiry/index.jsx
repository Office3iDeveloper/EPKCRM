import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const AddEnquiry = ({ navigation }) => {

    const [load, SetLoad] = useState(false);

    const [fName, setFName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [des, setDes] = useState('');

    const [fNameErr, setFNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [mobileNumberErr, setMobileNumberErr] = useState('');
    const [companyNameErr, setCompanyNameErr] = useState('');
    const [desErr, setDesErr] = useState('');

    const { data } = useSelector((state) => state.login);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Enquiry List');
            onRefresh();
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

        if (!des) {
            setDesErr('Enter Description');
            isValid = false;
        } else {
            setDesErr('');
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

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/contact_add_enquiry';

            const response = await axios.post(apiUrl, {
                first_name: fName,
                description: des,
                email: email,
                mobile_number: mobileNumber,
                company_name: companyName,
                product_plan: selectedDocument1Id,
                created_by: data.userempid

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
        setEmail('');
        setMobileNumber('');
        setCompanyName('');
        setDes('');
        setSelectedDocument1([]);
        setFNameErr('');
        setEmailErr('');
        setMobileNumberErr('');
        setCompanyNameErr('');
        setSelectedDocument1Err('');
        setDesErr('');
    }

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Enquiry</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Name
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
                        Description
                    </Text>

                    <TextInput
                        value={des}
                        onChangeText={(txt) => setDes(txt)}
                        style={styles.inputs1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {desErr}
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

export default AddEnquiry; 
