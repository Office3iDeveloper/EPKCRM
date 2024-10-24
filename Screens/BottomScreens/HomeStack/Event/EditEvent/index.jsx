import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddEvent/style";
import DocumentPicker from 'react-native-document-picker';
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditEvent = ({ navigation, route }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // route

    const SpecId = route.params.Id;
    console.log(SpecId, "SpecId")

    // 

    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [agenda, setAgenda] = useState('');
    const [agendaErr, setAgendaErr] = useState('');
    const [load, setLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);

    const [EdocFile, setEdocFile] = useState([]);
    console.log(EdocFile, "EdocFile")
    const [EditedocFile, seteditedocFile] = useState([]);
    console.log(EditedocFile, "EditedocFile")
    const [selectedId, setSelectedId] = useState();

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();
    console.log(fileName, "fileName")

    // 

    const handleEditDocumentSelection = async () => {

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

    // Department

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds.join(',');

    const handleToggleDepartment = async (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));

            // Clear selected employees when department is deselected
            setSelectedEmployees([]);

        } else {
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);
            // Fetch employee dropdown when department is selected
            setSelectedDepartmentIds(selectedDepartmentIds => {
                const selectedIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));
                fetchEmployeeDropdown(selectedIdsAsNumbers);
                return selectedDepartmentIds;
            });
        }
    };

    useEffect(() => {

        const apiUrl = 'https://epkgroup.in/crm/api/public/api/userrolelist';

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

    }, []);


    // Member

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [EmployeeError, setEmployeeError] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedMemberErr, setSelectedMemberErr] = useState('');
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds.join(',');


    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://epkgroup.in/crm/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

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

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

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

    // 

    // Select Image

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImageErr, setSelectedImageErr] = useState('');
    const [showInitialImage, setShowInitialImage] = useState(true);

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
                    console.log(compressedUri, "compressedUri")
                    setShowInitialImage(false);
                    setSelectedImage(prevImages => [...prevImages, compressedUri.path]);
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
                    {showInitialImage ? (
                        datalist.e_image ? (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: `https://epkgroup.in/crm/api/storage/app/${datalist.e_image}` }} style={styles.image} />
                            </View>
                        ) : null
                    ) : (
                        selectedImage.map((image, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                                    <DeleteIcon width={15} height={15} />
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

    const Handlerefresh = () => {
        setStartDate(new Date());
        setSelectedDepartments([]);
        setSelectedEmployees([]);
        setTitle('');
        setAgenda('');
        setSlotFromTime('00:00:00');
        setSlotToTime('00:00:00');
        setSelectedImage([]);
    }

    // 

    useEffect(() => {

        const GetData = async () => {

            try {
                const apiUrl = `https://epkgroup.in/crm/api/public/api/view_editevent/${SpecId.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setDatalist(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        GetData();

    }, [])

    // 

    useEffect(() => {
        setTitle(datalist.e_title);
        setAgenda(datalist.e_agenda);
        setSlotFromTime(datalist.e_start_time);
        setSlotToTime(datalist.e_end_time);
        setStartDate(new Date(datalist.e_date));
        setSelectedDepartmentIds([datalist.e_teams]);
        setSelectedEmployeesIds([datalist.e_members]);
        setSelectedDepartments(SpecId.teamname.split(','));
        setSelectedEmployees(SpecId.membername.split(','));
        setSelectedImage([datalist.e_image]);
        seteditedocFile(datalist.e_image);
    }, [datalist])


    // 

    const eventAdd = async () => {

        setLoad(true);

        const formData = new FormData();

        if (!title) {
            setTitleErr('Enter Title');
            Alert.alert('Missing', "Check The title Field");
            setLoad(false);
            return;
        } else {
            setTitleErr('');
        }

        if (selectedDepartments.length == "0") {
            setSelectedDepartmentsErr('Select Department Name');
            Alert.alert('Missing', "Check The Department Field");
            setLoad(false);
            return;
        } else {
            setSelectedDepartmentsErr('');
        }

        if (selectedEmployees.length == "0") {
            setSelectedMemberErr('Select Member Name');
            Alert.alert('Missing', "Check The Member Field");
            setLoad(false);
            return;
        } else {
            setSelectedMemberErr('');
        }

        if (slotfromTime == "00:00:00") {
            setSlotFromTimeErr('Select From Time');
            Alert.alert('Missing', "Check The From Time Field");
            setLoad(false);
            return;
        } else {
            setSlotFromTimeErr('');
        }

        if (slotToTime == "00:00:00") {
            setSlotToTimeErr('Select To Time');
            Alert.alert('Missing', "Check The To Time Field");
            setLoad(false);
            return;
        } else {
            setSlotToTimeErr('');
        }

        if (!agenda) {
            setAgendaErr('Enter Agenda');
            Alert.alert('Missing', "Check The Agenda Field");
            setLoad(false);
            return;
        } else {
            setAgendaErr('');
        }

        if (selectedImage.length == "0") {
            setSelectedImageErr('Choose Image');
            Alert.alert('Missing', "Check The Attachment Field");
            setLoad(false);
            return;
        } else {
            setSelectedImageErr('');
        }

        try {

            formData.append('id', SpecId.id);
            formData.append('e_title', title);
            formData.append('e_teams', selectedDepartmentIdsAsNumbers);
            formData.append('e_members', selectedEmployeesIdsAsNumbers);
            formData.append('e_date', formattedStartDate);
            formData.append('e_start_time', slotfromTime);
            formData.append('e_end_time', slotToTime);
            formData.append('e_agenda', agenda);
            formData.append('updated_by', data.userempid);
            formData.append('oldimg_path', datalist.e_image);

            if (selectedImage.length > 0 && !selectedImage.includes(datalist.e_image)) {
                // Only add the image if it has been changed
                selectedImage.forEach((image, index) => {
                    const imageUriParts = image.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`e_image`, {
                        uri: image,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            } else {
                // If the image is not changed, include the existing image URL
                formData.append('e_image', datalist.e_image);
            }

            const response = await fetch('https://epkgroup.in/crm/api/public/api/update_event', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setLoad(false);
                // Alert.alert('Successful', responsedata.message);
                handleShowAlert(responsedata.message);
                Handlerefresh();
            } else {
                // Alert.alert('Failed', responsedata.message);
                handleShowAlert1(responsedata.message);
                setLoad(false);
            }
        } catch (error) {
            console.error('Error:', error);
            // Alert.alert('Network Request Failed', error.message);
            handleShowAlert2();
            setLoad(false);
        }
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Event List');
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
                        Event Title
                    </Text>

                    <TextInput
                        value={title}
                        onChangeText={(txt) => setTitle(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {titleErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Select Teams
                    </Text>

                    <TouchableOpacity style={[styles.Input, { paddingVertical: selectedDepartments.length == 0 ? "5%" : "3%" }]} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showDepartmentNameDropdown && (
                        <View style={styles.dropdown}>
                            {departmentNameDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedDepartments.includes(department.role_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleDepartment(department.role_name, department.id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDepartmentsErr}
                    </Text>

                    <Text style={styles.StatusText}>
                        Select Members
                    </Text>

                    <TouchableOpacity style={[styles.Input, { paddingVertical: selectedEmployees.length == 0 ? "5%" : "3%" }]} onPress={() => {
                        setShowEmployeeDropdown(!showEmployeeDropdown);
                    }}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showEmployeeDropdown && (
                        <View style={styles.dropdown}>
                            {employeeDropdown.map((employee, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedEmployees.includes(employee.emp_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleEmployee(employee.emp_name, employee.emp_id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{employee.emp_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedMemberErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Event Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate.toDateString()} &nbsp;
                        </Text>
                        {/* {showDatePicker && (
                            <DateTimePicker
                                value={startDate}
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
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Start Time
                    </Text>

                    <View style={styles.input}>
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
                                            display="clock"
                                            onChange={handleSlotFromTimeChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowSlotFromTimePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        End Time
                    </Text>

                    <View style={styles.input}>
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
                                            display="clock"
                                            onChange={handleSlotToTimeChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowSlotToTimePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Agenda
                    </Text>

                    <TextInput
                        value={agenda}
                        onChangeText={(txt) => setAgenda(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {agendaErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Attachment
                    </Text>

                    <View style={styles.fullWidth}>

                        {/* <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
                            {renderSelectedImage()}
                        </ScrollView> */}

                        <Text
                            style={styles.MDocFileName}
                        >
                            {EdocFile.length > 0 && EdocFile[0]?.name ? EdocFile[0].name : fileName}
                        </Text>

                        <TouchableOpacity style={styles.UploadButton}
                            // onPress={handleFromGallery}
                            onPress={handleEditDocumentSelection}
                        >
                            <Text style={styles.UploadButtonText}>
                                {/* Choose Image */}
                                Choose File
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {selectedImageErr}
                    </Text>


                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={eventAdd}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Update Event
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Event List')}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
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

export default EditEvent;