import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AddVisitor = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);


    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [mobileNumberErr, setmobileNumberErr] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [idNumberErr, setIdNumberErr] = useState('');
    const [mail, setMail] = useState('');
    const [mailErr, setMailErr] = useState('');
    const [location, setLocation] = useState('');
    const [locationErr, setLocationErr] = useState('');
    const [load, SetLoad] = useState(false);

    // 

    const [selectedImageErr, setSelectedImageErr] = useState([]);

    const renderSelectedImage = () => {
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        selectedImage.map((image, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <TouchableOpacity onPress={() => deleteImage()} style={styles.deleteButton}>
                                    <DeleteIcon width={15} height={15} color={'#000'} />
                                </TouchableOpacity>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        );
    };

    const deleteImage = (index) => {
        setSelectedImage(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleFromGallery = () => {
        checkAndRequestCameraPermission();
    };

    const [cameraPermission, setCameraPermission] = useState(false);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        handleCameraPermissionResult(result);
    };

    const requestCameraPermission = async () => {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        handleCameraPermissionResult(result);
    };

    const handleCameraPermissionResult = (result) => {
        if (result === RESULTS.GRANTED) {
            setCameraPermission(true);
        } else {
            setCameraPermission(false);
        }
    };

    const checkAndRequestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const status = await check(PERMISSIONS.ANDROID.CAMERA);

            if (status !== 'granted') {
                const result = await request(PERMISSIONS.ANDROID.CAMERA);
                if (result !== 'granted') {
                    console.log('Camera permission is not granted');
                    return;
                }
            }
            handleFromCamera();
        } else if (Platform.OS === 'ios') {
            // Check and request camera permission for iOS
            const status = await check(PERMISSIONS.IOS.CAMERA);

            if (status !== 'granted') {
                const result = await request(PERMISSIONS.IOS.CAMERA);
                if (result === RESULTS.GRANTED) {
                    console.log('Camera permission is not granted');
                    return;
                }
            }
            requestCameraPermission();
        } else {
            console.log('Camera permission is not granted');
        }

    };

    const [selectedImage, setSelectedImage] = useState([]);

    // const handleFromCamera = () => {
    //     launchCamera({ mediaType: 'photo', cameraType: 'front' }, handleImagePickerResult);
    // };

    const handleFromCamera = async () => {
        try {
            const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
            handleImagePickerResult(result);
        } catch (error) {
            console.error("Camera launch failed: ", error);
            Alert.alert("Error", "Failed to open the camera. Please try again.");
        }
    };

    const handleImagePickerResult = async (result) => {
        if (!result.didCancel) {
            const images = result.assets ? result.assets : [result];
            for (const image of images) {

                const response = await fetch(image.uri);
                const blob = await response.blob();

                if (blob.size > 3 * 1024 * 1024) {
                    Alert.alert("File size should be less than 1MB");
                } else {
                    const compressedUri = await compressImage(image);
                    if (compressedUri && compressedUri.path) {
                        setSelectedImage(prevImages => [...prevImages, compressedUri.path]);
                    } else {
                        launchCamera({ mediaType: 'photo', cameraType: 'front' }, handleImagePickerResult);
                    }
                }
            }
        }
    };


    const compressImage = async (image) => {
        try {
            const croppedImage = await ImagePicker.openCropper({
                path: image.uri,
                width: 1024,
                height: 1024,
                cropping: true,
                compressImageQuality: 0.8,
                includeBase64: true,
                cropperToolbarTitle: 'Edit Image',
            });
            return croppedImage;
        } catch (error) {
            console.error('Error compressing image:', error);
            return null;
        }
    };

    // Api call for Dropdown dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/employee_document_typelist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setDocumentList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectDocument = (File) => {
        setSelectedDocument(File.document_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // 

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://office3i.com/development/api/public/api/userrolelist';

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

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setSelectedDepartmentsId(item.id);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
    };

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberErr, setSelectedMemberErr] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://office3i.com/development/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    // slotfromTime

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

    const showSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // slotToTime

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

    const showSlotToTimepicker = () => {
        setShowSlotToTimePicker(true);
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateFormFields = () => {
        let isValid = true;

        // Define the fields and their corresponding error setters and messages
        const fieldsToValidate = [
            {
                value: name,
                errorSetter: setNameErr,
                errorMessage: 'Enter Name',
                alertMessage: 'Check The Name Field'
            },
            {
                value: selectedImage.length,
                errorSetter: setSelectedImageErr,
                errorMessage: 'Select Image',
                alertMessage: 'Check The Image Field',
                checkType: 'length'
            },
            {
                value: mobileNumber,
                errorSetter: setmobileNumberErr,
                errorMessage: 'Enter Mobile Number',
                alertMessage: 'Check The Mobile Number Field'
            },
            {
                value: selectedDocument.length,
                errorSetter: setSelectedDocumentErr,
                errorMessage: 'Select ID',
                alertMessage: 'Check The ID Proof Field',
                checkType: 'length'
            },
            {
                value: idNumber,
                errorSetter: setIdNumberErr,
                errorMessage: 'Enter Id Proof Number',
                alertMessage: 'Check The Id Proof Number Field'
            },
            {
                value: mail,
                errorSetter: setMailErr,
                errorMessage: 'Enter Mail',
                alertMessage: 'Check The Mail Field',
                additionalCheck: isValidEmail,
                additionalErrorMessage: 'Enter a valid mail id'
            },
            {
                value: selectedDepartments,
                errorSetter: setSelectedDepartmentsErr,
                errorMessage: 'Select Department Name',
                alertMessage: 'Check The Department Field'
            },
            {
                value: selectedMember,
                errorSetter: setSelectedMemberErr,
                errorMessage: 'Select Member Name',
                alertMessage: 'Check The Member Field'
            },
            {
                value: location,
                errorSetter: setLocationErr,
                errorMessage: 'Enter Location',
                alertMessage: 'Check Location Field'
            },
            {
                value: slotfromTime,
                errorSetter: setSlotFromTimeErr,
                errorMessage: 'Select From Time',
                alertMessage: 'Check The From Time Field',
                checkType: 'equals',
                checkValue: '00:00:00'
            }
        ];

        // Iterate over the fields and perform validation
        fieldsToValidate.forEach(field => {
            if (field.checkType === 'length') {
                if (field.value === "0") {
                    field.errorSetter(field.errorMessage);
                    isValid = false;
                } else {
                    field.errorSetter('');
                }
            } else if (field.checkType === 'equals') {
                if (field.value === field.checkValue) {
                    field.errorSetter(field.errorMessage);
                    isValid = false;
                } else {
                    field.errorSetter('');
                }
            } else if (field.additionalCheck) {
                if (!field.value || !field.additionalCheck(field.value)) {
                    field.errorSetter(field.additionalErrorMessage || field.errorMessage);
                    isValid = false;
                } else {
                    field.errorSetter('');
                }
            } else {
                if (!field.value) {
                    field.errorSetter(field.errorMessage);
                    isValid = false;
                } else {
                    field.errorSetter('');
                }
            }
        });

        return isValid;
    };


    const visitorAdd = async () => {

        SetLoad(true);

        const formData = new FormData();

        if (!validateFormFields()) {
            SetLoad(false);
            return;
        }

        try {

            formData.append('visitor_name', name);
            formData.append('mobile_number', mobileNumber);
            formData.append('id_proof', selectedDocumentId);
            formData.append('id_number', idNumber);
            formData.append('email_id', mail);
            formData.append('whom_to_visit', selectedMemberId);
            formData.append('location', location);
            formData.append('in_time', slotfromTime);
            formData.append('out_time', slotToTime);

            if (selectedImage) {
                if (selectedImage.length > 0) {
                    selectedImage.map((image, index) => {
                        const imageUriParts = image.split('/');
                        const imageName = imageUriParts[imageUriParts.length - 1];
                        formData.append(`profile_img`, {
                            uri: image,
                            name: imageName,
                            type: 'image/jpeg',
                        });
                    });
                }
                else {
                    formData.append('profile_img', selectedImage);
                }
            }

            formData.append('department', selectedDepartmentsId);
            formData.append('created_by', data.userempid);

            const response = await fetch('https://office3i.com/development/api/public/api/add_visitor', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                SetLoad(false);
                onCancel();
                // Alert.alert('Successfull', responsedata.message);
                handleShowAlert(responsedata);
            } else {
                SetLoad(false);
                // Alert.alert('Failed', responsedata.message)
                handleShowAlert1(responsedata);
            }

        } catch (error) {
            SetLoad(false);
            // Alert.alert('Error', error)
            handleShowAlert2();
        }
    }

    const onCancel = () => {
        setName('');
        setmobileNumber('');
        setMail('');
        setLocation('');
        setSlotFromTime('00:00:00');
        setSlotToTime('00:00:00');
        setSelectedImage([]);
        setSelectedDocument(null);
        setIdNumber('');
        setSelectedDepartments(null);
        setSelectedMember(null);
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Visitor log')
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
                        Capture Image
                    </Text>

                    <>
                        {renderSelectedImage()}
                    </>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleFromGallery}
                        >
                            <Text style={styles.UploadButtonText}>
                                Click Here To Capture Image
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {selectedImageErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Mobile Number
                    </Text>

                    <TextInput
                        value={mobileNumber}
                        keyboardType={"number-pad"}
                        onChangeText={(txt) => setmobileNumber(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {mobileNumberErr}
                    </Text>

                    <Text style={styles.StatusText}>
                        Select ID Proof
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Document Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {documentList.map((File, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.document_name}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        ID Proof Number
                    </Text>

                    <TextInput
                        value={idNumber}
                        onChangeText={(txt) => setIdNumber(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {idNumberErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Email ID
                    </Text>

                    <TextInput
                        value={mail}
                        keyboardType={"email-address"}
                        onChangeText={(txt) => setMail(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {mailErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Department
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
                                        onPress={() => handleSelectDepartment(item)}
                                    >
                                        <Text>{item.role_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDepartmentsErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Whom To Visit
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedMember ? selectedMember : 'Select Member'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showEmployeeDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {employeeDropdown.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectMember(item)}
                                    >
                                        <Text>{item.emp_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedMemberErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Location
                    </Text>

                    <TextInput
                        value={location}
                        onChangeText={(txt) => setLocation(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {locationErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        In Time
                    </Text>

                    <View style={styles.ShiftSlotTextInput}>
                        <Text onPress={showSlotFromTimepicker}>
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
                    </View>

                    <Text style={styles.errorText}>
                        {slotfromTimeErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Out Time
                    </Text>

                    <View style={styles.ShiftSlotTextInput}>
                        <Text onPress={showSlotToTimepicker}>
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
                    </View>

                    <Text style={styles.errorText}>
                        {slotToTimeErr}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={visitorAdd}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => onCancel()}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

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

        </ScrollView>

    )
}

export default AddVisitor;