import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image, Platform, Alert, ActivityIndicator, Modal, Button } from "react-native";
import styles from "../../AddEmployee/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import CheckBox from '@react-native-community/checkbox';


const BasicDetails = ({ onEmpDetails, selectedImage, setSelectedImage, employee, setEmployee, validation }) => {

    const dispatch = useDispatch();

    // Employee from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // Select Gender

    const [showGender, setShowGender] = useState(false);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setShowGender(false);
        // handleFieldsChange('gender', Gender);
        updateEmployeeField('gender', Gender);
    };

    // Select Status

    const [showStatus, setShowStatus] = useState(false);

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status) => {
        setShowStatus(false);
        // handleFieldsChange('status', Status);
        updateEmployeeField('emp_status', Status);
    };

    // Select Martial Status

    const [showMstatus, setShowMstatus] = useState(false);

    const toggleDropdownMstatus = () => {
        setShowMstatus(!showMstatus);
    };

    const selectMstatus = (Mstatus) => {
        setShowMstatus(false);
        // handleFieldsChange('maritalStatus', Mstatus);
        updateEmployeeField('marital_status', Mstatus);
    };

    // Select Image

    const compressImage = async (image) => {
        try {
            const croppedImage = await ImagePicker.openCropper({
                path: image.uri,
                width: 1024,
                height: 1024,
                cropping: true,
                compressImageQuality: 0.8,
                cropperCircleOverlay: false,
                includeBase64: true,
                cropperToolbarTitle: 'Edit Image',
            });
            return croppedImage;
        } catch (error) {
            console.error('Error compressing image:', error);
            return null;
        }
    };

    const handleImagePickerResult = async (result) => {
        if (!result.didCancel) {
            const images = result.assets ? result.assets : [result];
            for (const image of images) {
                const response = await fetch(image.uri);
                const blob = await response.blob();
                if (blob.size > 1024 * 1024) {
                    Alert.alert("File size should be less than 1MB");
                } else {
                    const compressedUri = await compressImage(image);
                    // console.log(compressedUri, "compressedUri")
                    setSelectedImage(prevImages => [...prevImages, compressedUri.path]);
                    setShowInitialImage(false);
                }
            }
        }
    };

    const deleteImage = (index) => {
        setSelectedImage(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const del = () => {
        setEmployee(prevEmployee => ({ ...prevEmployee, profile_img: '' }));
    }

    const [showInitialImage, setShowInitialImage] = useState(true);

    const renderSelectedImage = () => {
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {showInitialImage ? (
                        employee.profile_img ? <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => del()} style={styles.deleteButton}>
                                <DeleteIcon width={15} height={15} color={"red"} />
                            </TouchableOpacity>
                            <Image source={{ uri: `https://office3i.com/development/api/storage/app/${employee.profile_img}` }} style={styles.image} />
                        </View> : ""
                    ) : (
                        selectedImage.map((image, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <TouchableOpacity onPress={() => deleteImage()} style={styles.deleteButton}>
                                    <DeleteIcon width={15} height={15} color={"red"} />
                                </TouchableOpacity>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        );
    };

    const handleFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, handleImagePickerResult);
    };

    // 

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/employee_uid';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                dispatch(updateEmployeeFields({ 'employeeId': responseData }));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])

    // handleDateChange

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date) {
            setSelectedDate(date);
            const formattedStartDate = formatDate(date);
            console.log(formattedStartDate, "formattedStartDate")
            updateEmployeeField('dob', formattedStartDate);
        }
        // const formattedStartDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        // updateEmployeeField('dob', formattedStartDate);
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDOB = employee && employee.dob
        ? formatDate(new Date(employee.dob))
        : formatDate(selectedDate);

    //    

    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

    const toggleSameAsCurrentAddress = () => {
        setSameAsCurrentAddress(!sameAsCurrentAddress);
        if (!sameAsCurrentAddress) {
            handleFieldsChange('permanentAddress', Employee.currentAddress);
        } else {
            handleFieldsChange('permanentAddress', '');
        }
    };

    // 

    const updateEmployeeField = (fieldName, value) => {
        const updatedEmployee = { ...employee };
        updatedEmployee[fieldName] = value;
        setEmployee(updatedEmployee);
    };


    return (

        <View style={styles.InputContainer}>

            {
                employee ? <>
                    <Text style={styles.Heading}>
                        Basic Details
                    </Text>

                    <Text style={styles.subHeading}>
                        Employee ID
                    </Text>

                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={employee.hrms_emp_id}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Employee Picture
                    </Text>

                    <View style={styles.fullWidth}>

                        <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
                            {renderSelectedImage()}
                        </ScrollView>

                        <TouchableOpacity style={styles.UploadButton} onPress={handleFromGallery}>
                            <Text style={styles.UploadButtonText}>
                                Upload Image
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        First Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.first_name}
                        onChangeText={(text) => updateEmployeeField('first_name', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Last Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.last_name}
                        onChangeText={(text) => updateEmployeeField('last_name', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Gender
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{employee.gender || "Selected Gender"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showGender && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectGender("Male")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("FeMale")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>FeMale</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("Others")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Others</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{employee.emp_status || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Phone Number
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.mobile_no}
                        onChangeText={(text) => updateEmployeeField('mobile_no', text)}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Whatsapp Number
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.whatsapp}
                        onChangeText={(text) => updateEmployeeField('whatsapp', text)}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Email ID
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.email}
                        onChangeText={(text) => updateEmployeeField('email', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Date Of Birth
                    </Text>

                    <View style={styles.inputs}>
                        <Text onPress={showDatepicker}>
                            {formattedDOB}
                        </Text>
                        {Platform.OS === 'android' && showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
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
                                            value={selectedDate}
                                            mode="date"
                                            display="clock"
                                            onChange={handleDateChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>


                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Current Address
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.current_address}
                        onChangeText={(text) => updateEmployeeField('current_address', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Permanent Address
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.address}
                        onChangeText={(text) => updateEmployeeField('address', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    {/* <View style={{ width: "90%", paddingTop: '2%', flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            tintColors={{ true: '#20DDFE' }}
                            value={sameAsCurrentAddress}
                            onValueChange={toggleSameAsCurrentAddress}
                            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                        />
                        <Text style={{ fontWeight: '400', fontSize: 13, lineHeight: 17.29 }}>Same as current address</Text>
                    </View> */}

                    <Text style={styles.subHeading}>
                        Parent / Guardian Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.parents}
                        onChangeText={(text) => updateEmployeeField('parents', text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        Marital Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownMstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{employee.marital_status || "Selected Martial status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showMstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectMstatus("Single")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Single</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectMstatus("Married")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Married</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectMstatus("Divorce")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Divorce</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    {
                        employee.marital_status === "Married" ?
                            <>
                                <Text style={styles.subHeading}>
                                    Spouse Name
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    value={employee.spouse_name}
                                    onChangeText={(text) => updateEmployeeField('spouse_name', text)}
                                />

                                <Text style={styles.errorText}>
                                    { }
                                </Text>
                            </> :
                            null
                    }

                    <Text style={styles.subHeading}>
                        Aadhar Number
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.aadhar_number}
                        onChangeText={(text) => updateEmployeeField('aadhar_number', text)}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (
                            !employee.aadhar_number ?
                                "Aadhar Number Required" :
                                employee.aadhar_number.length !== 12 ?
                                    "Aadhar Number must be exactly 12 digits" :
                                    null
                        ) : null}
                    </Text>

                    <Text style={styles.subHeading}>
                        PAN Number
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={employee.pan_number}
                        onChangeText={(text) => updateEmployeeField('pan_number', text)}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (
                            !employee.pan_number ?
                                "PAN Number Required" :
                                !panRegex.test(employee.pan_number) ?
                                    "PAN Number must be in the format: first 5 letters, next 4 numbers, last 1 letter" :
                                    null
                        ) : null}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.NextButton} onPress={onEmpDetails}>
                            <Text style={styles.NextButtonText}>
                                Next
                            </Text>
                            <ArrowRightIcon width={14} height={14} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </> : <ActivityIndicator size={"large"} />
            }
        </View>

    )
}

export default BasicDetails;