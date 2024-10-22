import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../General/style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

const AddCareer = ({ navigation, handleDocumentSelection1, docFile1, docFileErr1, validation, startDate, setStartDate }) => {

    // Employee from redux store 

    const dispatch = useDispatch();

    const { Resume } = useSelector((state) => state.resume);
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
        handleFieldsChange('employmentType', Emptype);
    };

    // Select Notice Period

    const [showNperiod, setShowNperiod] = useState(false);

    const toggleDropdownNperiod = () => {
        setShowNperiod(!showNperiod);
    };

    const selectNperiod = (Nperiod) => {
        setShowNperiod(false);
        handleFieldsChange('noticePeriod', Nperiod);
    };

    // Select Candidate Status

    const [showCstatus, setShowCstatus] = useState(false);

    const toggleDropdownCstatus = () => {
        setShowCstatus(!showCstatus);
    };

    const selectCstatus = (Cstatus) => {
        setShowCstatus(false);
        handleFieldsChange('candidateStatus', Cstatus);
    };

    // Industry

    const [industry, setIndustry] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdownInd = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectIndustry = (selectedCountry) => {
        handleFieldsChange('industry', selectedCountry.name);
        handleFieldsChange('industryid', selectedCountry.id);
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
        handleFieldsChange('functionalArea', selectFArea.category);
        handleFieldsChange('functionalAreaid', selectFArea.id);
        handleFieldsChange('areaOfSpecification', "");
        handleFieldsChange('areaOfSpecificationid', "");
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
        handleFieldsChange('areaOfSpecification', selectSpec.category);
        handleFieldsChange('areaOfSpecificationid', selectSpec.id);
        setDropdownVisible2(false);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/area_specialization_list/${Resume.functionalAreaid}`;
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
    }, [Resume.functionalAreaid])

    // 

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
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
            handleFieldsChange('doj', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        if (isDOJEditable) {
            setShowDatePicker(true);
        }
    };

    const isDOJEditable = Resume.candidateStatus === "Offered" || Resume.candidateStatus === "Joined";

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
                        value={Resume.currentEmployer}
                        onChangeText={(text) => handleFieldsChange('currentEmployer', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.currentEmployer ? "Current Employer Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current Designation
                    </Text>

                    <TextInput
                        value={Resume.currentDesignation}
                        onChangeText={(text) => handleFieldsChange('currentDesignation', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.currentDesignation ? "Current Designation Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Functional Area
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownFArea}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.functionalArea ? Resume.functionalArea : 'Select a Functional Area'}
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
                        {validation ? (!Resume.functionalArea ? "Functional Area Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Area of Specialization
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownSpec}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.areaOfSpecification ? Resume.areaOfSpecification : 'Select Area Of Specification'}
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
                        {validation ? (!Resume.areaOfSpecification ? "Area Of Specification Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Industry
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownInd}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.industry ? Resume.industry : 'Select a Industry'}
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
                        {validation ? (!Resume.industry ? "Industry Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employment Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownEmptype} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.employmentType || "Select Employment Type"}</Text>
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
                        {validation ? (!Resume.employmentType ? "Employment Type Required" : null) : null}
                    </Text>


                    <Text style={styles.StatDateText}>
                        Total Experience
                    </Text>

                    <TextInput
                        value={Resume.totalExperience}
                        onChangeText={(text) => handleFieldsChange('totalExperience', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.totalExperience ? "Total Experience Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current CTC
                    </Text>

                    <TextInput
                        value={Resume.currentCTC}
                        onChangeText={(text) => handleFieldsChange('currentCTC', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.currentCTC ? "Current CTC Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Expected CTC
                    </Text>

                    <TextInput
                        value={Resume.expectedCTC}
                        onChangeText={(text) => handleFieldsChange('expectedCTC', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.expectedCTC ? "Expected CTC Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Notice Period
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownNperiod} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.noticePeriod || "Select Notice Period"}</Text>
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
                        {validation ? (!Resume.noticePeriod ? "Notice Period Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownCstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.candidateStatus || "Select Candidate Status"}</Text>
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
                        {validation ? (!Resume.candidateStatus ? "Candidate Status Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date Of Joining
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
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
                        {Resume.candidateStatus === "Offered" || Resume.candidateStatus === "Joined"
                            ? (validation ? (!startDate ? "Date Of Joining Required" : null) : null)
                            : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Key Skills
                    </Text>

                    <TextInput
                        value={Resume.keySkills}
                        onChangeText={(text) => handleFieldsChange('keySkills', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.keySkills ? "Key Skills Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Social Media Link
                    </Text>

                    <TextInput
                        value={Resume.socialMediaLink}
                        onChangeText={(text) => handleFieldsChange('socialMediaLink', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attached Resume
                    </Text>

                    <Text style={docFile1 ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile1 ? docFile1[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection1}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {validation ? (!docFile1 ? "Resume Required" : null) : null}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default AddCareer; 