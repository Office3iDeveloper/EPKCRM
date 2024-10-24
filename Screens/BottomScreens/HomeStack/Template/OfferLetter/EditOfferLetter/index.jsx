import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import styles from "../AddOfferLetter/style";
import { useSelector } from "react-redux";
import { format, parse } from 'date-fns';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";
import axios, { spread } from "axios";


const EditOfferLetter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id;
    console.log(SpecId, "SpecId")

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [load, SetLoad] = useState(false);

    // 

    const [empName, setEmpName] = useState('');
    const [designation, setDesignation] = useState('');
    const [cName, setCName] = useState('');
    const [aPName, setAPName] = useState('');
    const [aPDesignation, setAPDesignation] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const [probation, setProbation] = useState('');
    const [notice, setNotice] = useState('');
    const [annual, setAnnual] = useState('');
    const [wDays, setWDays] = useState('');
    const [benefits, setBenefits] = useState('');
    const [supName, setSupName] = useState('');
    const [otherreason, setOtherreason] = useState('');

    const [empNameErr, setEmpNameErr] = useState('');
    const [designationErr, setDesignationErr] = useState('');
    const [cNameErr, setCNameErr] = useState('');
    const [aPNameErr, setAPNameErr] = useState('');
    const [aPDesignationErr, setAPDesignationErr] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [address1Err, setAddress1Err] = useState('');
    const [probationErr, setProbationErr] = useState('');
    const [noticeErr, setNoticeErr] = useState('');
    const [annualErr, setAnnualErr] = useState('');
    const [wDaysErr, setWDaysErr] = useState('');
    const [benefitsErr, setBenefitsErr] = useState('');
    const [supNameErr, setSupNameErr] = useState('');

    // 

    // const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();
    // const [docFile1, setDocFile1] = useState();
    const [docFileErr1, setDocFileErr1] = useState();

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile(res);
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
            setEdocFile1(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(null);
    const [startDateErr1, setStartDateErr1] = useState(null);
    const formattedStartDate1 = startDate1 ?
        `${startDate1.getFullYear()}-${String(startDate1.getMonth() + 1).padStart(2, '0')}-${String(startDate1.getDate()).padStart(2, '0')}` :
        "";

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate2, setStartDate2] = useState(null);
    const [startDateErr2, setStartDateErr2] = useState(null);
    const formattedStartDate2 = startDate2 ?
        `${startDate2.getFullYear()}-${String(startDate2.getMonth() + 1).padStart(2, '0')}-${String(startDate2.getDate()).padStart(2, '0')}` :
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
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange1 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate1(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const handleDateChange2 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate2(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    // Select Gender

    const [showGender, setShowGender] = useState(false);
    const [selectededGender, setSelectedGender] = useState('');
    const [selectededGenderErr, setSelectedGenderErr] = useState('');

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setShowGender(false);
        setSelectedGender(Gender);
    };

    // Select Status

    const [showstatus, setShowstatus] = useState(false);
    const [selectededstatus, setSelectedstatus] = useState('');
    const [selectededstatusid, setSelectedstatusid] = useState('');
    const [selectededstatusErr, setSelectedstatusErr] = useState('');

    const toggleDropdownstatus = () => {
        setShowstatus(!showstatus);
    };

    const selectstatus = (status, id) => {
        setShowstatus(false);
        setSelectedstatus(status);
        setSelectedstatusid(id);
    };

    // Select Reason

    const [showreason, setShowreason] = useState(false);
    const [selectededreason, setSelectedreason] = useState('');
    const [selectededreasonid, setSelectedreasonid] = useState('');
    const [selectededreasonErr, setSelectedreasonErr] = useState('');
    console.log(selectededreasonid,"selectededreasonid")

    const toggleDropdownreason = () => {
        setShowreason(!showreason);
    };

    const selectreason = (reason, id) => {
        setShowreason(false);
        setSelectedreason(reason);
        setSelectedreasonid(id)
    };

    // From Time 


    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
    const [slotfromTimeErr, setSlotFromTimeErr] = useState('');
    const [showSlotFromTimePicker, setShowSlotFromTimePicker] = useState(false);

    const handleSlotFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotFromTime(formattedTime);
        }
        setShowSlotFromTimePicker(false);
    };

    const hshowSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // To Time 

    const [slotToTime, setSlotToTime] = useState('00:00:00');
    const [slotToTimeErr, setSlotToTimeErr] = useState('');
    const [showSlotToTimePicker, setShowSlotToTimePicker] = useState(false);

    const handleSlotToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotToTime(formattedTime);
        }
        setShowSlotToTimePicker(false);
    };

    const hshowSlotToTimepicker = () => {
        setShowSlotToTimePicker(true);
    };

    // 

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://epkgroup.in/crm/api/public/api/headerFooter_templatelist';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment = (item, id) => {
        setSelectedDepartments(item);
        setSelectedDepartmentsId(id);
        setShowDepartmentNameDropdown(false);
    };


    // 

    const validateFields = () => {

        let isValid = true;

        if (!EdocFile) {
            setDocFileErr('Header Attachment is required.');
            isValid = false;
        } else {
            setDocFileErr('');
        }

        if (!EdocFile1) {
            setDocFileErr1('Footer Attachment is required.');
            isValid = false;
        } else {
            setDocFileErr1('');
        }

        if (!cName) {
            setCNameErr('Enter Company Name');
            isValid = false;
        } else {
            setCNameErr('');
        }

        if (!empName) {
            setEmpNameErr('Enter Candidate Name');
            isValid = false;
        } else {
            setEmpNameErr('');
        }

        if (!designation) {
            setDesignationErr('Enter Designation');
            isValid = false;
        } else {
            setDesignationErr('');
        }

        if (!startDate) {
            setStartDateErr('Select Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        if (!startDate1) {
            setStartDateErr1('Select Joining Date');
            isValid = false;
        } else {
            setStartDateErr1('');
        }

        if (!startDate2) {
            setStartDateErr2('Select Last Working Date');
            isValid = false;
        } else {
            setStartDateErr2('');
        }

        if (!aPName) {
            setAPNameErr('Enter Authorised Person Name');
            isValid = false;
        } else {
            setAPNameErr('');
        }

        if (!aPDesignation) {
            setAPDesignationErr('Enter Authorised Person Designation');
            isValid = false;
        } else {
            setAPDesignationErr('');
        }

        if (!address) {
            setAddressErr('Enter Address Line 1');
            isValid = false;
        } else {
            setAddressErr('');
        }

        if (!address1) {
            setAddress1Err('Enter Address Line 2');
            isValid = false;
        } else {
            setAddress1Err('');
        }

        if (!probation) {
            setProbationErr('Enter Probation Period');
            isValid = false;
        } else {
            setProbationErr('');
        }

        if (!notice) {
            setNoticeErr('Enter Notice Period');
            isValid = false;
        } else {
            setNoticeErr('');
        }

        if (!supName) {
            setSupNameErr('Enter Supervisor Name');
            isValid = false;
        } else {
            setSupNameErr('');
        }

        if (!benefits) {
            setBenefitsErr('Enter Benefits');
            isValid = false;
        } else {
            setBenefitsErr('');
        }

        if (!wDays) {
            setWDaysErr('Enter Working Days');
            isValid = false;
        } else {
            setWDaysErr('');
        }

        if (!annual) {
            setAnnualErr('Enter Annual CTC');
            isValid = false;
        } else {
            setAnnualErr('');
        }

        if (!selectededGender) {
            setSelectedGenderErr('Select Salutation');
            isValid = false;
        } else {
            setSelectedGenderErr('');
        }

        if (!slotfromTime || slotfromTime == '00:00:00') {
            setSlotFromTimeErr('Select From Time');
            isValid = false;
        } else {
            setSlotFromTimeErr('');
        }

        if (!slotToTime || slotToTime == '00:00:00') {
            setSlotToTimeErr('Select To Time');
            isValid = false;
        } else {
            setSlotToTimeErr('');
        }

        return isValid;
    };

    // 

    const HandleSubmit = async () => {

        SetLoad(true);

        const formData = new FormData();

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            formData.append('id', SpecId.id);
            formData.append('date', formattedStartDate);
            formData.append('select_salutation', selectededGender);
            formData.append('name', empName);
            formData.append('address_line1', address);
            formData.append('address_line2', address1);
            formData.append('designation', designation);
            formData.append('company_name', cName);
            formData.append('annual_ctc', annual);
            formData.append('working_hrs_from', slotfromTime);
            formData.append('working_hrs_to', slotToTime);
            formData.append('working_day', wDays);
            formData.append('probation_period', probation);
            formData.append('noties_period', notice);
            formData.append('benefits', benefits);
            formData.append('start_date', formattedStartDate1);
            formData.append('supervisor_name', supName);
            formData.append('authorised_person_name', aPName);
            formData.append('authorised_designation', aPDesignation);
            formData.append('header_oldpath', SpecId.header_attachment);
            formData.append('footer_oldpath', SpecId.footer_attached);
            formData.append('last_date_offer', formattedStartDate2);
            formData.append('header_footer_layout_id', selectedDepartmentsId);
            formData.append('offerStatus', selectededstatusid);
            formData.append('reasonReject', selectededreasonid);
            formData.append('otherReason', otherreason);
            formData.append('updated_by', data.userempid);

            if (EdocFile) {
                if (EdocFile.length > 0) {
                    EdocFile.map((item, index) => {
                        formData.append(`header_attach`, {
                            uri: item.uri,
                            name: item.name,
                            type: item.type,
                        });
                    });
                }
            } else {
                formData.append('header_attach', EdocFile);
            }

            if (EdocFile1) {
                if (EdocFile1.length > 0) {
                    EdocFile1.map((item, index) => {
                        formData.append(`footer_attached`, {
                            uri: item.uri,
                            name: item.name,
                            type: item.type,
                        });
                    });
                }
            } else {
                formData.append('footer_attached', EdocFile1);
            }

            const response = await fetch('https://epkgroup.in/crm/api/public/api/update_offer_letter', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();
            console.log(responsedata, "responsedata");

            if (responsedata.status === "success") {
                SetLoad(false);
                handleShowAlert(responsedata.message);
            } else {
                handleShowAlert1(responsedata.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Offer Letter List')
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

    const Handlerefresh = () => {
        navigation.goBack();
    }

    const [EdocFile, setEdocFile] = useState([]);
    const [EdocFile1, setEdocFile1] = useState([]);
    console.log(EdocFile, "EdocFile")

    const [EditedocFile, seteditedocFile] = useState([]);
    const [EditedocFile1, seteditedocFile1] = useState([]);
    console.log(EditedocFile, "EditedocFile")

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();
    console.log(fileName, "fileName")

    const filePath1 = typeof EditedocFile1 === 'string' ? EditedocFile1 : '';
    const fileName1 = filePath1.split('/').pop();
    console.log(fileName1, "fileName")

    useEffect(() => {
        setStartDate(new Date(SpecId.date));
        setSelectedGender(SpecId.select_salutation);
        setEmpName(SpecId.name);
        setAddress(SpecId.address_line1);
        setAddress1(SpecId.address_line2);
        setDesignation(SpecId.designation);
        setCName(SpecId.company_name);
        setAnnual(SpecId.annual_ctc);
        setSlotFromTime(SpecId.working_hrs_from);
        setSlotToTime(SpecId.working_hrs_to);
        setWDays(SpecId.working_day);
        setProbation(SpecId.probation_period);
        setNotice(SpecId.noties_period);
        setBenefits(SpecId.benefits);
        setStartDate1(new Date(SpecId.start_date));
        setSupName(SpecId.supervisor_name);
        setStartDate2(new Date(SpecId.last_date_offer));
        setAPName(SpecId.authorised_person_name);
        setAPDesignation(SpecId.authorised_designation);
        seteditedocFile(SpecId.header_attachment);
        seteditedocFile1(SpecId.footer_attached);
        setSelectedstatus(SpecId.offer_status_name);
        setSelectedstatusid(SpecId.offer_status);
        setSelectedreason(SpecId.offer_reason_name);
        setSelectedreasonid(SpecId.offer_reason);
        setOtherreason(SpecId.other_reason);
        setSelectedDepartmentsId(SpecId.layout_id);
    }, [SpecId])

    useEffect(() => {
        if (SpecId.layout_id) {
            // Find the department that matches the layout_id
            const matchingDepartment = departmentNameDropdown.find(
                (item) => item.id === SpecId.layout_id
            );
    
            // If a match is found, set the selected department and ID
            if (matchingDepartment) {
                setSelectedDepartments(matchingDepartment.company_title);
                setSelectedDepartmentsId(matchingDepartment.id);
            }
        }
    }, [SpecId, departmentNameDropdown]);
    

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Edit Offer Letter</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    {/* <Text style={styles.StatDateText}>
                        Insert Header
                    </Text>

                    <View style={styles.fullWidth}>

                        <Text style={EdocFile ? styles.DocFileName : styles.DocFileNameHolder}>
                            {EdocFile.length > 0 && EdocFile[0]?.name ? EdocFile[0].name : fileName}
                        </Text>

                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Choose File
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Insert Footer
                    </Text>

                    <View style={styles.fullWidth}>

                        <Text style={EdocFile ? styles.DocFileName : styles.DocFileNameHolder}>
                            {EdocFile1.length > 0 && EdocFile1[0]?.name ? EdocFile1[0].name : fileName1}
                        </Text>

                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection1}>
                            <Text style={styles.UploadButtonText}>
                                Choose File
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr1}
                    </Text> */}

                    <Text style={styles.StatDateText}>
                        Select Layout
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDepartments ? selectedDepartments : 'Select Department'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDepartmentNameDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {departmentNameDropdown.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectDepartment(item.company_title, item.id)}
                                    >
                                        <Text>{item.company_title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDepartmentsErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date
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
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Select Salutation
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectededGender || "Select Salutation"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showGender && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectGender("Mr.")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Mr.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("Ms.")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Ms.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("Mrs.")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Mrs.</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectededGenderErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Name
                    </Text>

                    <TextInput
                        value={empName}
                        onChangeText={(txt) => setEmpName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {empNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Address Line 1
                    </Text>

                    <TextInput
                        value={address}
                        onChangeText={(txt) => setAddress(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {addressErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Address Line 2
                    </Text>

                    <TextInput
                        value={address1}
                        onChangeText={(txt) => setAddress1(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {address1Err}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Designation
                    </Text>

                    <TextInput
                        value={designation}
                        onChangeText={(txt) => setDesignation(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {designationErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Company Name
                    </Text>

                    <TextInput
                        value={cName}
                        onChangeText={(txt) => setCName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {cNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Annual CTC
                    </Text>

                    <TextInput
                        value={annual}
                        onChangeText={(txt) => setAnnual(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {annualErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Working Hours From
                    </Text>

                    <TouchableOpacity style={styles.inputs} onPress={hshowSlotFromTimepicker}>
                        <Text>
                            {slotfromTime} &nbsp;
                        </Text>
                        {/* {showSlotFromTimePicker && (
                            <DateTimePicker
                                value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleSlotFromTimeChange}
                            />
                        )} */}
                        {Platform.OS === 'android' && showSlotFromTimePicker && (
                            <DateTimePicker
                                value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleSlotFromTimeChange}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showSlotFromTimePicker} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                                            mode="time"
                                            display="default"
                                            onChange={handleSlotFromTimeChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowSlotFromTimePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        {slotfromTimeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Working Hours To
                    </Text>

                    <TouchableOpacity style={styles.inputs} onPress={hshowSlotToTimepicker}>
                        <Text>
                            {slotToTime} &nbsp;
                        </Text>
                        {/* {showSlotToTimePicker && (
                            <DateTimePicker
                                value={parse(slotToTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleSlotToTimeChange}
                            />
                        )} */}
                        {Platform.OS === 'android' && showSlotToTimePicker && (
                            <DateTimePicker
                                value={parse(slotToTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleSlotToTimeChange}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showSlotToTimePicker} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={parse(slotToTime, 'HH:mm:ss', new Date())}
                                            mode="time"
                                            display="default"
                                            onChange={handleSlotToTimeChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowSlotToTimePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        {slotToTimeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Working Days
                    </Text>

                    <TextInput
                        value={wDays}
                        onChangeText={(txt) => setWDays(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {wDaysErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Probation Period
                    </Text>

                    <TextInput
                        value={probation}
                        onChangeText={(txt) => setProbation(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {probationErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Notice Period
                    </Text>

                    <TextInput
                        value={notice}
                        onChangeText={(txt) => setNotice(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {noticeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Benefits
                    </Text>

                    <TextInput
                        value={benefits}
                        onChangeText={(txt) => setBenefits(txt)}
                        style={styles.inputs1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {benefitsErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Start Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {startDate1 ? formatDate(startDate1) : "Select Date"} &nbsp;
                        </Text>
                        {/* {showDatePicker1 && (
                            <DateTimePicker
                                value={startDate1 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                                maximumDate={new Date()}
                            />
                        )} */}
                        {Platform.OS === 'android' && showDatePicker1 && (
                            <DateTimePicker
                                value={startDate1 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                                maximumDate={new Date()}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker1} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={startDate1 || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange1}
                                            maximumDate={new Date()}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker1(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr1}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Supervisor Name
                    </Text>

                    <TextInput
                        value={supName}
                        onChangeText={(txt) => setSupName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {supNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Last Date For Offer Acceptance
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker2}>
                            {startDate2 ? formatDate(startDate2) : "Select Date"} &nbsp;
                        </Text>
                        {/* {showDatePicker2 && (
                            <DateTimePicker
                                value={startDate2 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                                maximumDate={new Date()}
                            />
                        )} */}
                        {Platform.OS === 'android' && showDatePicker2 && (
                            <DateTimePicker
                                value={startDate2 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                                maximumDate={new Date()}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker2} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={startDate2 || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange2}
                                            maximumDate={new Date()}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker2(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr2}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Authorised Person Name
                    </Text>

                    <TextInput
                        value={aPName}
                        onChangeText={(txt) => setAPName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {aPNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Authorised Person Designation
                    </Text>

                    <TextInput
                        value={aPDesignation}
                        onChangeText={(txt) => setAPDesignation(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {aPDesignationErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectededstatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectstatus("Accepted", '1')} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Accepted</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectstatus("Decline", '2')} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Decline</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectstatus("Pending", '0')} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Pending</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    {selectededstatus == "Decline" ?
                        <>
                            <Text style={styles.StatDateText}>
                                Reason For Reject
                            </Text>

                            <TouchableOpacity onPress={toggleDropdownreason} style={styles.StatusTouchable}>

                                <Text style={styles.StatusTouchableText}>{selectededreason || "Select Reason"}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {showreason && (

                                <View style={styles.dropdown}>

                                    <TouchableOpacity onPress={() => selectreason("Salary", '1')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Salary</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectreason("Distance", '2')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Distance</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectreason("Benefits", '3')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Benefits</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectreason("Others", '4')} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Others</Text>
                                    </TouchableOpacity>

                                </View>

                            )}

                            <Text style={styles.errorText}>
                                { }
                            </Text>
                        </> : null
                    }

                    {
                        selectededreason == "Others" ?
                            <>
                                <Text style={styles.StatDateText}>
                                    Other Type Of Reason
                                </Text>

                                <TextInput
                                    value={otherreason}
                                    onChangeText={(txt) => setOtherreason(txt)}
                                    style={styles.inputs1}
                                    multiline={true}
                                    textAlignVertical="top"
                                />

                                <Text style={styles.errorText}>
                                    { }
                                </Text>
                            </> : null
                    }

                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Update
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton} onPress={Handlerefresh}>
                    <Text style={styles.HeaderButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
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

export default EditOfferLetter;