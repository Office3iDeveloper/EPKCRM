import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const EditCustomerEnquiry = ({ navigation, route }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // route

    const SpecId = route.params.Id;

    // state

    const [load, setload] = useState(false);
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [company, setCompany] = useState('');
    const [mobnumber, setMobnumber] = useState('');
    const [description, setDescription] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [mailErr, setMailErr] = useState('');
    const [mobnumberErr, setMobnumberErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');

    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedStatusId, setSelectedStatusId] = useState('');
    const [selectedStatusErr, setSelectedStatusErr] = useState('');
    const [showdropdowm, setShowdropdown] = useState(false);

    // status

    useEffect(() => {

        const apiUrl = 'https://office3i.com/development/api/public/api/contact_Enquiry_StatusList';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setStatus(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


    const handleSelect = (item) => {
        setSelectedStatus(item.status_name);
        setSelectedStatusId(item.id);
        setShowdropdown(false);
    };

    // 

    useEffect(() => {
        setName(SpecId.first_name);
        setMail(SpecId.email);
        setCompany(SpecId.company_name);
        setMobnumber(SpecId.mobile_number);
        setDescription(SpecId.description);
        setSelectedStatus(SpecId.status_name);
        setSelectedStatusId(SpecId.user_status);
    }, [SpecId])

    // 

    const validateFields = () => {

        let isValid = true;

        if (!name) {
            setNameErr('Enter Name');
            isValid = false;
        } else {
            setNameErr('');
        }

        if (!description) {
            setDescriptionErr('Enter Description');
            isValid = false;
        } else {
            setDescriptionErr('');
        }

        if (!selectedStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }

        if (!mail) {
            setMailErr('Enter Email');
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(mail)) {
                setMailErr("Please enter a valid email address");
                isValid = false;
            } else {
                setMailErr('');
            }
        }

        if (!mobnumber) {
            setMobnumberErr('Enter Mobile Number');
            isValid = false;
        } else {
            if (mobnumber.length !== 10) {
                setMobnumberErr("Please enter a valid Phone Number");
                isValid = false;
            } else {
                setMobnumberErr('');
            }
        }

        return isValid;
    };

    // 

    const meetingAdd = async () => {

        setload(true);

        if (!validateFields()) {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            setload(false);
            return;
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/contact_update_enquiry';

            const response = await axios.post(apiUrl, {
                id: SpecId.id,
                updated_by: data.userempid,
                first_name: name,
                description: description,
                email: mail,
                mobile_number: mobnumber,
                company_name: company || '-',
                status: selectedStatusId,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                setload(false);
            } else {
                handleShowAlert1(responseData.message);
                setload(false);
            }

        } catch (error) {
            handleShowAlert2();
            setload(false);
        }

    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.goBack();
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

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(txt) => setName(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {nameErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        E Mail
                    </Text>

                    <TextInput
                        value={mail}
                        onChangeText={(txt) => setMail(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {mailErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Company Name
                    </Text>

                    <TextInput
                        value={company == "" ? "" : company}
                        onChangeText={(txt) => setCompany(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Mobile Number
                    </Text>

                    <TextInput
                        value={mobnumber}
                        onChangeText={(txt) => setMobnumber(txt)}
                        keyboardType="numeric"
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {mobnumberErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        onChangeText={(txt) => setDescription(txt)}
                        style={styles.ShiftSlotTextInput1}
                        textAlignVertical="top"
                        multiline={true}
                    />

                    <Text style={styles.errorText}>
                        {descriptionErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowdropdown(!showdropdowm)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedStatus ? selectedStatus : 'Select Status'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showdropdowm && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {status.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text>{item.status_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr}
                    </Text>


                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={meetingAdd}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Update
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
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

            </View>

        </ScrollView>

    )
}

export default EditCustomerEnquiry;