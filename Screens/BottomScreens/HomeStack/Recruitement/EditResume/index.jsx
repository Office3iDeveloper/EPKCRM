import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "./style";
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import EditGeneral from "./General";
import EditCareer from "./Career";

const EditResume = ({ route, navigation }) => {

    const [activeComponent, setActiveComponent] = useState('General');

    const { id } = route.params;
    const { data } = useSelector((state) => state.login);

    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState(null);
    console.log(resume, "resume");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://epkgroup.in/crm/api/public/api/resume_edit_list/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                );
                const resData = response.data.data
                setResume(resData);
                setLoading(false);

            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const [load, setLoad] = useState(false);
    const [validation, setValidation] = useState(false);

    const renderComponent = (componentName) => {
        setActiveComponent(componentName);
    }

    const [docFile, setDocFile] = useState('');
    const [docFileErr, setDocFileErr] = useState();

    const [docFile1, setDocFile1] = useState('');
    const [docFileErr1, setDocFileErr1] = useState();

    const [EdocFile, setEdocFile] = useState([]);
    const [EdocFile1, setEdocFile1] = useState([]);

    // Function to handle document selection

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
            // handleFieldsChange('selectedFile', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    const handleDocumentSelection1 = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile1(res);
            // handleFieldsChange('selectedFile', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    // 

    const [prefcity, setPrefCity] = useState([]);
    const [selectededPrefCity, setSelectedPrefCity] = useState([]);
    const [selectedPrefCityId, setSelectedPrefCityId] = useState([]);
    const [dropdownVisible3, setDropdownVisible3] = useState(false);
    console.log(selectedPrefCityId, "selectedPrefCityId")

    useEffect(() => {
        if (resume) {
            setSelectedPrefCity(resume[0].preferred_locations || []);
            setSelectedPrefCityId(resume[0].preferred_location || []);
        }
    }, [resume]);


    // Handle Submit

    const HandleSubmit = async () => {

        setLoad(true);

        setValidation(true);

        const formData = new FormData();

        //append data

        if (
            resume[0].source && resume[0].candidate_name && resume[0].position_applying &&
            resume[0].gender && resume[0].email && resume[0].mobile_no && resume[0].dob &&
            resume[0].country_name && resume[0].state_name && resume[0].current_cityname && selectededPrefCity &&
            resume[0].languages && resume[0].ug_degree && resume[0].ug_specialization && resume[0].ug_year_of_passing &&
            resume[0].current_employer && resume[0].current_designation && resume[0].functional_area && resume[0].area_specialization_name &&
            resume[0].industry_name && resume[0].employment_type && resume[0].total_exp && resume[0].current_ctc &&
            resume[0].expected_ctc && resume[0].notice_period && resume[0].status && resume[0].date_of_join &&
            resume[0].key_skills && EdocFile1
        ) {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const mobileNoPattern = /^\d{10}$/;

            if (!emailRegex.test(resume[0].email)) {
                Alert.alert('Invalid Email ID', "Please enter a valid email address");
                setLoad(false);
                return;
            }

            const validatePhoneNumber = (number) => {
                // Regular expression to check if the number is exactly 10 digits
                const phoneNumberPattern = /^[0-9]{10}$/;
                return phoneNumberPattern.test(number);
            };

            if (resume[0].mobile_no) {
                if (!validatePhoneNumber(resume[0].mobile_no)) {
                    Alert.alert('Invalid Phone Number', 'Please enter a valid Phone Number');
                    setLoad(false);
                    return;
                }
            }

        } else {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            setLoad(false);
            return;
        }

        formData.append('id', id);
        formData.append('source', resume[0].source);
        formData.append('candidate_name', resume[0].candidate_name);
        formData.append('position_applying', resume[0].position_applying);
        formData.append('gender', resume[0].gender);
        formData.append('email', resume[0].email);
        formData.append('mobile_no', resume[0].mobile_no);
        formData.append('alter_mobile_no', resume[0].alter_mobile_no ? resume[0].alter_mobile_no : "-");
        formData.append('dob', resume[0].dob);
        formData.append('current_country', resume[0].current_country);
        formData.append('current_state', resume[0].current_state);
        formData.append('current_city', resume[0].current_city);
        formData.append('preferred_location', selectedPrefCityId);
        formData.append('languages', resume[0].languages);

        formData.append('under_graduate', resume[0].under_graduate);
        formData.append('ug_specialization', resume[0].ug_specialization);
        formData.append('ug_year_of_passing', resume[0].ug_year_of_passing);

        if (!resume[0].ug_university) {
            formData.append('ug_university', "-");
        } else {
            formData.append('ug_university', resume[0].ug_university);
        }

        if (!resume[0].post_graduate) {
            formData.append('post_graduate', "-");
        } else {
            formData.append('post_graduate', resume[0].post_graduate);
        }

        if (!resume[0].pg_specialization) {
            formData.append('pg_specialization', "-");
        } else {
            formData.append('pg_specialization', resume[0].pg_specialization);
        }

        formData.append('pg_year_of_passing', resume[0].pg_year_of_passing ? resume[0].pg_year_of_passing : "-");
        formData.append('pg_university', resume[0].pg_university ? resume[0].pg_university : "-");
        formData.append('certification', resume[0].certification ? resume[0].certification : "-");

        if (EdocFile.length > 0) {
            EdocFile.map((file, index) => {
                let uri, name;
                if (typeof file === 'string') {
                    const imageUriParts = file.split('/');
                    name = imageUriParts[imageUriParts.length - 1];
                    uri = file;
                } else {
                    name = file.name;
                    uri = file.uri;
                }
                formData.append(`certification_attach`, {
                    uri: uri,
                    name: name,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('certification_attach', '-');
        }

        formData.append('social_link', resume[0].social_link ? resume[0].social_link : '-');
        formData.append('current_employer', resume[0].current_employer);
        formData.append('functionality_area', resume[0].functionality_area);
        formData.append('area_specialization', resume[0].area_specialization);
        formData.append('industry', resume[0].industry);
        formData.append('current_designation', resume[0].current_designation);
        formData.append('employment_type', resume[0].employment_type);
        formData.append('total_exp', resume[0].total_exp);
        formData.append('current_ctc', resume[0].current_ctc);
        formData.append('expected_ctc', resume[0].expected_ctc);
        formData.append('key_skills', resume[0].key_skills);
        formData.append('notice_period', resume[0].notice_period);
        formData.append('date_of_join', resume[0].date_of_join);
        formData.append('status', resume[0].status);
        formData.append('updated_by', data.userrole);
        formData.append('oldpath_resume_upload', resume[0].attached_resume);
        formData.append('oldpath_certification', resume[0].certification_attach);

        if (EdocFile1.length > 0) {
            EdocFile1.map((file, index) => {
                let uri, name;
                if (typeof file === 'string') {
                    const imageUriParts = file.split('/');
                    name = imageUriParts[imageUriParts.length - 1];
                    uri = file;
                } else {
                    name = file.name;
                    uri = file.uri;
                }
                formData.append(`attached_resume`, {
                    uri: uri,
                    name: name,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('attached_resume', EdocFile1);
        }

        try {

            const response = await fetch('https://epkgroup.in/crm/api/public/api/update_hr_resume', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "appended")

            if (responsedata.status === "success") {
                setLoad(false);
                handleShowAlert(responsedata);
            } else {
                setLoad(false);
                Alert.alert("Failed", responsedata.message)
            }

        } catch (error) {
            setLoad(false);
            handleShowAlert2();
        }

    }

    // 

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Candidate Resume');
            setValidation(false);
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
    }

    return (
        <ScrollView>

            <View style={styles.Page}>

                <View style={styles.container}>

                    {
                        activeComponent === 'General' &&
                        <EditGeneral
                            docFile={docFile}
                            docFileErr={docFileErr}
                            handleDocumentSelection={handleDocumentSelection}
                            validation={validation}
                            prefcity={prefcity}
                            setPrefCity={setPrefCity}
                            selectededPrefCity={selectededPrefCity}
                            setSelectedPrefCity={setSelectedPrefCity}
                            selectedPrefCityId={selectedPrefCityId}
                            setSelectedPrefCityId={setSelectedPrefCityId}
                            dropdownVisible3={dropdownVisible3}
                            setDropdownVisible3={setDropdownVisible3}
                            setResume={setResume}
                            resume={resume}
                            EdocFile={EdocFile}
                            setEdocFile={setEdocFile}
                        />
                    }

                    {
                        activeComponent === 'Career' &&
                        <EditCareer
                            docFile1={docFile1}
                            docFileErr1={docFileErr1}
                            handleDocumentSelection1={handleDocumentSelection1}
                            validation={validation}
                            setResume={setResume}
                            resume={resume}
                            EdocFile1={EdocFile1}
                            setEdocFile1={setEdocFile1}
                        />
                    }

                    {/* <View style={styles.HeaderButtonView}>

                        {activeComponent === 'Career' ? <TouchableOpacity
                            style={

                                styles.HeaderButton
                            }
                            onPress={() => renderComponent('General')}
                        >
                            <Text
                                style={

                                    styles.HeaderButtonText
                                }
                            >
                                Previous
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'General' ? <TouchableOpacity
                            style={

                                styles.HeaderButtonActive
                            }
                            onPress={() => renderComponent('Career')}
                        >
                            <Text
                                style={

                                    styles.HeaderButtonTextActive
                                }
                            >
                                Next
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={
                            styles.HeaderButtonActive
                        } onPress={HandleSubmit}>
                            {load ?
                                <ActivityIndicator size={"small"} color={"#fff"} />
                                : <Text
                                    style={
                                        styles.HeaderButtonTextActive
                                    }
                                >
                                    Submit
                                </Text>}
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={
                            styles.HeaderButton
                        } onPress={() => navigation.navigate('Candidate Resume')}>
                            <Text
                                style={
                                    styles.HeaderButtonText
                                }
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity> : null}

                    </View> */}

                    <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                        {activeComponent === 'Career' ? <TouchableOpacity style={styles.PrevButton} onPress={() => renderComponent('General')}>
                            <Text style={styles.PrevButtonText}>
                                Previous
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'General' ? <TouchableOpacity style={styles.NextButton} onPress={() => renderComponent('Career')}>
                            <Text style={styles.NextButtonText}>
                                Next
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={styles.NextButton} onPress={HandleSubmit}>
                            {
                                load ? <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.NextButtonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={styles.PrevButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.PrevButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity> : null}
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

export default EditResume;