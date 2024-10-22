import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "./style";
import AddGeneral from "./General";
import AddCareer from "./Career";
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddResume = ({ route, navigation }) => {

    const [activeComponent, setActiveComponent] = useState('General');

    const [startDate, setStartDate] = useState(null);

    const { Resume } = useSelector((state) => state.resume);
    const { data } = useSelector((state) => state.login);

    const [load, setLoad] = useState(false);
    const [validation, setValidation] = useState(false);

    const renderComponent = (componentName) => {
        setActiveComponent(componentName);
    }

    const [docFile, setDocFile] = useState('');
    const [docFileErr, setDocFileErr] = useState();

    const [docFile1, setDocFile1] = useState('');
    const [docFileErr1, setDocFileErr1] = useState();

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

    // Handle Submit

    const HandleSubmit = async () => {

        setLoad(true);

        setValidation(true);

        const formData = new FormData();

        //append data

        if (
            Resume.source && Resume.candidateName && Resume.positionApplying &&
            Resume.gender && Resume.email && Resume.mobileNo && Resume.dob &&
            Resume.country && Resume.state && Resume.city && selectededPrefCity &&
            Resume.languageKnown && Resume.uDegree && Resume.uSpecialization && Resume.uYearOfPassing &&
            Resume.currentEmployer && Resume.currentDesignation && Resume.functionalArea && Resume.areaOfSpecification &&
            Resume.industry && Resume.employmentType && Resume.totalExperience && Resume.currentCTC &&
            Resume.expectedCTC && Resume.noticePeriod && Resume.candidateStatus && Resume.doj &&
            Resume.keySkills && docFile1
        ) {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(Resume.email)) {
                Alert.alert('Invalid Email ID', "Please enter a valid email address");
                setLoad(false);
                return;
            }

            if (Resume.mobileNo.length !== 10) {
                Alert.alert('Invalid "Phone Number', "Please enter a valid Phone Number");
                setLoad(false);
                return;
            }

        } else {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            setLoad(false);
            return;
        }

        formData.append('source', Resume.source);
        formData.append('candidate_name', Resume.candidateName);
        formData.append('position_applying', Resume.positionApplying);
        formData.append('gender', Resume.gender);
        formData.append('email', Resume.email);
        formData.append('mobile_no', Resume.mobileNo);
        formData.append('alter_mobile_no', Resume.alternativeMobileNo ? Resume.alternativeMobileNo : "-");
        formData.append('dob', Resume.dob);
        formData.append('current_country', Resume.countryid);
        formData.append('current_state', Resume.stateid);
        formData.append('current_city', Resume.cityId);
        formData.append('preferred_location', selectedPrefCityId.join(', '));
        formData.append('languages', Resume.languageKnown);

        formData.append('under_graduate', Resume.uDegreeid);
        formData.append('ug_specialization', Resume.uSpecialization);
        formData.append('ug_year_of_passing', Resume.uYearOfPassing);

        if (!Resume.uSchoolUniversity) {
            formData.append('ug_university', "-");
        } else {
            formData.append('ug_university', Resume.uSchoolUniversity);
        }

        if (!Resume.pDegree) {
            formData.append('post_graduate', "-");
        } else {
            formData.append('post_graduate', Resume.pDegree);
        }

        if (!Resume.pSpecialization) {
            formData.append('pg_specialization', "-");
        } else {
            formData.append('pg_specialization', Resume.pSpecialization);
        }

        formData.append('pg_year_of_passing', Resume.pYearOfPassing ? Resume.pYearOfPassing : "-");
        formData.append('pg_university', Resume.pSchoolUniversity ? Resume.pSchoolUniversity : "-");
        formData.append('certification', Resume.pCertification ? Resume.pCertification : "-");

        if (docFile.length > 0) {
            docFile.map((file, index) => {
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

        formData.append('social_link', Resume.socialMediaLink ? Resume.socialMediaLink : '-');
        formData.append('current_employer', Resume.currentEmployer);
        formData.append('functionality_area', Resume.functionalAreaid);
        formData.append('area_specialization', Resume.areaOfSpecificationid);
        formData.append('industry', Resume.industryid);
        formData.append('current_designation', Resume.currentDesignation);
        formData.append('employment_type', Resume.employmentType);
        formData.append('total_exp', Resume.totalExperience);
        formData.append('current_ctc', Resume.currentCTC);
        formData.append('expected_ctc', Resume.expectedCTC);
        formData.append('key_skills', Resume.keySkills);
        formData.append('notice_period', Resume.noticePeriod);
        formData.append('date_of_join', Resume.doj);
        formData.append('status', Resume.candidateStatus);
        formData.append('created_by', data.userrole);

        if (docFile1.length > 0) {
            docFile1.map((file, index) => {
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
            formData.append('attached_resume', docFile1);
        }

        try {

            const response = await fetch('https://office3i.com/development/api/public/api/addhr_resume_upload', {
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

    // Handle Cancel

    const dispatch = useDispatch();

    const removeFields = () => ({
        type: 'REMOVE_RESUME'
    });

    const HandleCancel = () => {
        dispatch(removeFields());
        setSelectedPrefCity([]);
        setSelectedPrefCityId([]);
        setDocFileErr1('');
        setDocFileErr('');
        setDocFile1('');
        setDocFile('');
        setValidation(false);
        setStartDate(null)
    }

    // 

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            HandleCancel();
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
                        <AddGeneral
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
                        />
                    }

                    {
                        activeComponent === 'Career' &&
                        <AddCareer
                            docFile1={docFile1}
                            docFileErr1={docFileErr1}
                            handleDocumentSelection1={handleDocumentSelection1}
                            validation={validation}
                            setStartDate={setStartDate}
                            startDate={startDate}
                        />
                    }

                    {/* <View style={styles.HeaderButtonView}> */}
                    {/* 
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
                        </TouchableOpacity> : null} */}

                    {/* {activeComponent === 'General' ? <TouchableOpacity
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
                        </TouchableOpacity> : null} */}

                    {/* {activeComponent === 'Career' ? <TouchableOpacity style={
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
                        </TouchableOpacity> : null} */}

                    {/* {activeComponent === 'Career' ? <TouchableOpacity style={
                            styles.HeaderButton
                        } onPress={HandleCancel}>
                            <Text
                                style={
                                    styles.HeaderButtonText
                                }
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity> : null} */}

                    {/* </View> */}

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

                        {activeComponent === 'Career' ? <TouchableOpacity style={styles.PrevButton} onPress={HandleCancel}>
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

export default AddResume;