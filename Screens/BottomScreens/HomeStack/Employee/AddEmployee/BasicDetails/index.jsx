import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image, Platform, Alert, Modal, Button } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import CheckBox from '@react-native-community/checkbox';


const BasicDetails = ({ onEmpDetails, selectedImage, setSelectedImage, selectedImageErr, validation, setDob }) => {

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

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
        handleFieldsChange('gender', Gender);
    };

    // Select Status

    const [showStatus, setShowStatus] = useState(false);

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status) => {
        setShowStatus(false);
        handleFieldsChange('status', Status);
    };

    // Select Martial Status

    const [showMstatus, setShowMstatus] = useState(false);

    const toggleDropdownMstatus = () => {
        setShowMstatus(!showMstatus);
    };

    const selectMstatus = (Mstatus) => {
        setShowMstatus(false);
        handleFieldsChange('maritalStatus', Mstatus);
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
                if (blob.size > 5 * 1024 * 1024) {
                    Alert.alert("File size should be less than 1MB");
                } else {
                    const compressedUri = await compressImage(image);
                    console.log(compressedUri, "compressedUri")
                    setSelectedImage(prevImages => [...prevImages, compressedUri.path]);
                    // selectedImageErr(null)
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

    const renderSelectedImage = () => {
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        selectedImage.map((image, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <TouchableOpacity onPress={() => deleteImage()} style={styles.deleteButton}>
                                    <DeleteIcon width={15} height={15} color={'#000'}/>
                                </TouchableOpacity>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        ))
                    }
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

    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date());

    // const handleDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setSelectedDate(date);
    //     }
    //     const formattedStartDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    //     handleFieldsChange('dob', formattedStartDate);
    //     setShowDatePicker(Platform.OS === 'ios');
    // };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };

    // const formattedDOB = Employee.dob
    //     ? new Date(Employee.dob).toISOString().slice(0, 10)
    //     : selectedDate.toISOString().slice(0, 10);

    // useEffect(() => {
    //     setDob(formattedDOB);
    // }, [formattedDOB])

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);

    const handleDateChange = (event, date) => {
        // if (date !== undefined) {
        //     setStartDate(date);
        //     const formattedStartDate = formatDate(date);
        //     handleFieldsChange('dob', formattedStartDate);
        // }
        // setShowDatePicker(Platform.OS === 'ios');
        if (event.type === "set" && date) {
            setStartDate(date);
            const formattedStartDate = formatDate(date);
            handleFieldsChange('dob', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDOB = Employee.dob
        ? formatDate(new Date(Employee.dob))
        : formatDate(startDate);

    useEffect(() => {
        setDob(formattedDOB);
    }, [formattedDOB]);


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

    const getFormattedTodayDate = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    };

    const todayFormatted = getFormattedTodayDate();

    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Basic Details
            </Text>

            <Text style={styles.subHeading}>
                Employee ID
            </Text>

            <TextInput
                style={styles.input}
                editable={false}
                value={Employee.employeeId}
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
                {validation ? (selectedImage.length == 0 ? "Image Field Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                First Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.firstName}
                onChangeText={(text) => handleFieldsChange('firstName', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.firstName ? "First Name Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Last Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.lastName}
                onChangeText={(text) => handleFieldsChange('lastName', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.lastName ? "Last Name Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Gender
            </Text>

            <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.gender || "Select Gender"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showGender && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectGender("Male")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Male</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGender("Female")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Female</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGender("Others")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Others</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.gender ? "Gender Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Status
            </Text>

            <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.status || "Select Status"}</Text>
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
                {validation ? (!Employee.status ? "Status Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Phone Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.phoneNumber}
                onChangeText={(text) => handleFieldsChange('phoneNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (
                    !Employee.phoneNumber ?
                        "Phone Number Required" :
                        Employee.phoneNumber.length !== 10 ?
                            "Phone Number must be exactly 10 digits" :
                            null
                ) : null}
            </Text>

            <Text style={styles.subHeading}>
                Whatsapp Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.whatsappNumber}
                onChangeText={(text) => handleFieldsChange('whatsappNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (
                    !Employee.whatsappNumber ?
                        "WhatsApp Number Required" :
                        Employee.whatsappNumber.length !== 10 ?
                            "WhatsApp Number must be exactly 10 digits" :
                            null
                ) : null}
            </Text>

            <Text style={styles.subHeading}>
                Email ID
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.email}
                onChangeText={(text) => handleFieldsChange('email', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.email ? "Email Required" : !emailRegex.test(Employee.email) ? "Enter Valid E-mail": null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Date Of Birth
            </Text>

            <View style={styles.inputs} >
                <Text onPress={showDatepicker}>
                    {startDate ? formatDate(startDate) : Employee.dob ? Employee.dob : "Select Date Of Birth"} &nbsp;
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
                {validation ? (!Employee.dob ? "Date Of Birth Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Current Address
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.currentAddress}
                onChangeText={(text) => handleFieldsChange('currentAddress', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.currentAddress ? "Current Address Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Permanent Address
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.permanentAddress}
                onChangeText={(text) => handleFieldsChange('permanentAddress', text)}
            />

            <View style={{ width: "90%", paddingTop: '2%', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <CheckBox
                    tintColors={{ true: '#20DDFE' }}
                    value={sameAsCurrentAddress}
                    onValueChange={toggleSameAsCurrentAddress}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                />
                <Text style={{ fontWeight: '400', fontSize: 13, lineHeight: 17.29 }}>Same as current address</Text>
            </View>

            <Text style={styles.errorText}>
                {validation ? (!Employee.permanentAddress ? "Permanent Address Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Parent / Guardian Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.parentName}
                onChangeText={(text) => handleFieldsChange('parentName', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.parentName ? "Parent Name Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Marital Status
            </Text>

            <TouchableOpacity onPress={toggleDropdownMstatus} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.maritalStatus || "Select Marital status"}</Text>
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

                    <TouchableOpacity onPress={() => selectMstatus("Widowed")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Widowed</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.maritalStatus ? "Marital Status Required" : null) : null}
            </Text>

            {
                Employee.maritalStatus === "Married" ?
                    <>
                        <Text style={styles.subHeading}>
                            Spouse Name
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.spouseName}
                            onChangeText={(text) => handleFieldsChange('spouseName', text)}
                        />

                        <Text style={styles.errorText}>
                            {!Employee.spouseName ? "Spouse Name Required" : null}
                        </Text>
                    </> : null

            }

            <Text style={styles.subHeading}>
                Aadhar Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.aadharNumber}
                onChangeText={(text) => handleFieldsChange('aadharNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (
                    !Employee.aadharNumber ?
                        "Aadhar Number Required" :
                        Employee.aadharNumber.length !== 12 ?
                            "Aadhar Number must be exactly 12 digits" :
                            null
                ) : null}
            </Text>

            <Text style={styles.subHeading}>
                PAN Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.panNumber}
                onChangeText={(text) => handleFieldsChange('panNumber', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (
                    !Employee.panNumber ?
                        "PAN Number Required" :
                        !panRegex.test(Employee.panNumber) ?
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

        </View>

    )
}

export default BasicDetails;