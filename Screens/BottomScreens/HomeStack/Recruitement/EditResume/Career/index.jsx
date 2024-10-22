import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../General/style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';


const EditCareer = ({
    navigation,
    handleDocumentSelection1,
    docFile1,
    docFileErr1,
    validation,
    setResume,
    resume,
    EdocFile1,
    setEdocFile1
}) => {

    const val = (resume && resume.length > 0) ? resume[0] : {};

    const updateResumeField = (fieldName, value) => {
        const updatedResume = [...resume];
        updatedResume[0] = { ...updatedResume[0], [fieldName]: value };
        setResume(updatedResume);
    };

    // Employee from redux store 

    const dispatch = useDispatch();

    // const { Resume } = useSelector((state) => state.resume);
    const { data } = useSelector((state) => state.login);

    const handleFieldsChange = (fieldName, value) => {
        dispatch({
            type: 'UPDATE_RESUME_FIELDS',
            payload: { [fieldName]: value }
        });
    };

    // Select Gender

    const [showEmptype, setShowEmptype] = useState(false);

    const toggleDropdownEmptype = () => {
        setShowEmptype(!showEmptype);
    };

    const selectEmptype = (Emptype) => {
        setShowEmptype(false);
        updateResumeField('employment_type', Emptype);
    };

    // Select Notice Period

    const [showNperiod, setShowNperiod] = useState(false);

    const toggleDropdownNperiod = () => {
        setShowNperiod(!showNperiod);
    };

    const selectNperiod = (Nperiod) => {
        setShowNperiod(false);
        updateResumeField('notice_period', Nperiod);
    };

    // Select Candidate Status

    const [showCstatus, setShowCstatus] = useState(false);

    const toggleDropdownCstatus = () => {
        setShowCstatus(!showCstatus);
    };

    const selectCstatus = (Cstatus) => {
        setShowCstatus(false);
        updateResumeField('status', Cstatus);
    };

    // Industry

    const [industry, setIndustry] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdownInd = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectIndustry = (selectedCountry) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            industry_name: selectedCountry.name,
            industry: selectedCountry.id
        };
        setResume(updatedResume);
        setDropdownVisible(false);
    };

    const CountApi = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/industry_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setIndustry(responseData);

        } catch (error) {
            console.error('Error fetching Industry data:', error);
        }

    }

    useEffect(() => {
        CountApi();
    }, [])

    // Functional Area

    const [fArea, setFArea] = useState([]);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);

    const toggleDropdownFArea = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectFArea = (selectFArea) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            functional_area: selectFArea.category,
            functionality_area: selectFArea.id,
            area_specialization: "",
            area_specialization_name: ""
        };
        setResume(updatedResume);
        setDropdownVisible1(false);
    };

    const FuncArea = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/functional_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setFArea(responseData);

        } catch (error) {
            console.error('Error fetching FArea data:', error);
        }

    }

    useEffect(() => {
        FuncArea();
    }, [])

    // 

    const [fAreaSpec, setFAreaSpec] = useState([]);
    const [state, setState] = useState([]);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);

    const toggleDropdownSpec = () => {
        setDropdownVisible2(!dropdownVisible2);
    };

    const selectSpec = (selectSpec) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            area_specialization: selectSpec.id,
            area_specialization_name: selectSpec.category
        };
        setResume(updatedResume);
        setDropdownVisible2(false);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/area_specialization_list/${val.functionality_area}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setFAreaSpec(responseData);

        } catch (error) {
            console.error('Error fetching State data:', error);
        }

    }

    useEffect(() => {
        StateApi();
    }, [val.functionality_area])

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
            const formattedStartDate = formatDate(date);
            updateResumeField('date_of_join', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // 

    useEffect(() => {
        seteditedocFile1(val.attached_resume)
    }, [val])

    const [EditedocFile1, seteditedocFile1] = useState([]);

    const filePath1 = typeof EditedocFile1 === 'string' ? EditedocFile1 : '';
    const fileName1 = filePath1.split('/').pop();

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile1(res);
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

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Career</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Current Employer
                    </Text>

                    <TextInput
                        value={val.current_employer || ""}
                        onChangeText={(text) => updateResumeField('current_employer', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].current_employer ? "Current Employer Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current Designation
                    </Text>

                    <TextInput
                        value={val.current_designation || ''}
                        onChangeText={(text) => updateResumeField('current_designation', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].current_designation ? "Current Designation Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Functional Area
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownFArea}>
                        <Text style={styles.StatusTouchableText}>
                            {val.functional_area ? val.functional_area : 'Select a City'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible1 && (
                        <View style={styles.dropdown}>
                            {fArea.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectFArea(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].functional_area ? "Functional Area Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Area of Specialization
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownSpec}>
                        <Text style={styles.StatusTouchableText}>
                            {val.area_specialization_name ? val.area_specialization_name : 'Select Area Of Specification'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible2 && (
                        <View style={styles.dropdown}>
                            {fAreaSpec.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectSpec(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].area_specialization_name ? "Area Of Specification Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Industry
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownInd}>
                        <Text style={styles.StatusTouchableText}>
                            {val.industry_name ? val.industry_name : 'Select a Industry'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {industry.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectIndustry(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].industry_name ? "Industry Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employment Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownEmptype} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{val.employment_type || "Select Employment Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showEmptype && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectEmptype("Fulltime/Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Fulltime/Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Parttime/Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Parttime/Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Internship")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Internship</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Freelance")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Freelance</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].employment_type ? "Employment Type Required" : null) : null}
                    </Text>


                    <Text style={styles.StatDateText}>
                        Total Experience
                    </Text>

                    <TextInput
                        value={val.total_exp}
                        onChangeText={(text) => updateResumeField('total_exp', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].total_exp ? "Total Experience Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current CTC
                    </Text>

                    <TextInput
                        value={val.current_ctc}
                        onChangeText={(text) => updateResumeField('current_ctc', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].current_ctc ? "Current CTC Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Expected CTC
                    </Text>

                    <TextInput
                        value={val.expected_ctc}
                        onChangeText={(text) => updateResumeField('expected_ctc', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].current_ctc ? "Expected CTC Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Notice Period
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownNperiod} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{val.notice_period || "Select Notice Period"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showNperiod && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectNperiod("Immediate")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Immediate</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("Less Than 15 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Less Than 15 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("15 - 30 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>15 - 30 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("30 - 45 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>30 - 45 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("45 - 60 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>45 - 60 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("Above 60 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Above 60 Days</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].notice_period ? "Notice Period Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownCstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{val.status || "Select Candidate Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showCstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectCstatus("Offered")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Offered</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Joined")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Joined</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Shortlisted")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Shortlisted</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Rejected")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Rejected</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Not Suitable")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Not Suitable</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].status ? "Candidate Status Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date Of Joining
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : val.date_of_join} &nbsp;
                        </Text>
                        {/* {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )} */}
                        {Platform.OS === 'android' && showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={startDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].date_of_join ? "Date Of Joining Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Key Skills
                    </Text>

                    <TextInput
                        value={val.key_skills}
                        onChangeText={(text) => updateResumeField('key_skills', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].key_skills ? "key Skills Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Social Media Link
                    </Text>

                    <TextInput
                        value={val.social_link}
                        onChangeText={(text) => updateResumeField('social_link', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attached Resume
                    </Text>

                    <Text style={EdocFile1 ? styles.DocFileName : styles.DocFileNameHolder}>
                        {/* {docFile1 ? docFile1[0].name : 'Select The Document'} */}
                        {EdocFile1.length > 0 && EdocFile1[0]?.name ? EdocFile1[0].name : fileName1}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleEditDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {validation ? (!EdocFile1 ? "Resume Reqquired" : null) : null}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default EditCareer; 