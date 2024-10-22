import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddAsset = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [assetDetails, setAssetsDetails] = useState('');
    const [assetDetailsErr, setAssetsDetailsErr] = useState('');
    const [assetValue, setAssetsValue] = useState('');
    const [assetValueErr, setAssetsValueErr] = useState('');
    const [remarks, setRemarks] = useState('');
    const [remarksErr, setRemarksErr] = useState('');
    const [load, SetLoad] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState('');
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');

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
        setSelectedMemberId('');
        setSelectedMember('');
        fetchEmployeeDropdown(item.id);
    };

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [selectedMemberErr, setSelectedMemberErr] = useState('');

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

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedStartDate, "formattedStartDate");

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [endDateErr, setEndDateErr] = useState(null);
    const formattedEndDate = endDate ?
        `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedEndDate, "formatteddate")

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [returnDate, setreturnDate] = useState(null);
    const [returnDateErr, setreturnDateErr] = useState(null);
    const formattedReturnDate = returnDate ?
        `${returnDate.getFullYear()}-${String(returnDate.getMonth() + 1).padStart(2, '0')}-${String(returnDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedReturnDate, "formatteddate")

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setreturnDate(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    // 

    const [assetTypeDropdown, setAssetTypeDropdown] = useState([]);
    const [showAssetTypeDropdown, setShowAssetTypeDropdown] = useState(false);
    const [selectedAssetTypes, setSelectedAssetTypes] = useState([]);
    const [selectedAssetTypesErr, setSelectedAssetTypesErr] = useState([]);
    const [selectedAssetTypeIds, setSelectedAssetTypeIds] = useState([]);
    const Assetid = selectedAssetTypeIds.join(', ')


    const handleToggleAssetType = (assetTypeName, assetTypeId) => {
        if (selectedAssetTypes.includes(assetTypeName)) {
            setSelectedAssetTypes(selectedAssetTypes.filter(selectedAsset => selectedAsset !== assetTypeName));
            setSelectedAssetTypeIds(selectedAssetTypeIds.filter(id => id !== assetTypeId));
        } else {
            setSelectedAssetTypes([...selectedAssetTypes, assetTypeName]);
            setSelectedAssetTypeIds([...selectedAssetTypeIds, assetTypeId]);
        }
    };

    useEffect(() => {

        const Asstype = async () => {

            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/asset_name';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setAssetTypeDropdown(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        Asstype();

    }, [])

    // 

    const onRefresh = () => {
        setSelectedDepartments('');
        setSelectedMember('');
        setSelectedAssetTypes([]);
        setSelectedAssetTypeIds([]);
        setAssetsDetails('');
        setAssetsValue('');
        setRemarks('');
        setStartDate(null);
        setEndDate(null);
        setreturnDate(null);
        setSelectedStatus(null);
    }

    // 

    const validateFields = () => {
        let isValid = true;
    
        if (!selectedDepartments) {
            setSelectedDepartmentsErr('Select Department Name');
            isValid = false;
        } else {
            setSelectedDepartmentsErr('');
        }
    
        if (!selectedMember) {
            setSelectedMemberErr('Select Member Name');
            isValid = false;
        } else {
            setSelectedMemberErr('');
        }
    
        if (selectedAssetTypes.length === 0) {
            setSelectedAssetTypesErr('Select Asset Type');
            isValid = false;
        } else {
            setSelectedAssetTypesErr('');
        }
    
        if (!assetDetails) {
            setAssetsDetailsErr('Enter Asset Details');
            isValid = false;
        } else {
            setAssetsDetailsErr('');
        }
    
        if (!assetValue) {
            setAssetsValueErr('Enter Asset Value');
            isValid = false;
        } else {
            setAssetsValueErr('');
        }
    
        if (!selectedStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }
    
        if (!remarks) {
            setRemarksErr('Enter Remarks');
            isValid = false;
        } else {
            setRemarksErr('');
        }
    
        if (!startDate) {
            setStartDateErr('Select Issue Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }
    
        if (!endDate) {
            setEndDateErr('Select Valid Till Date');
            isValid = false;
        } else {
            setEndDateErr('');
        }
    
        return isValid;
    };

    const AddAss = async () => {

        SetLoad(true);

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/add_assign_asset';

            const response = await axios.post(apiUrl, {
                department: selectedDepartmentsId,
                emp_id: selectedMemberId,
                asset_type: Assetid,
                asset_details: assetDetails,
                asset_value: assetValue,
                issue_date: formattedStartDate,
                valid_till: formattedEndDate,
                return_on: formattedReturnDate,
                remarks: remarks,
                status: selectedStatus,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                // Alert.alert("Successfull", responseData.message);
                handleShowAlert(responseData.message);
                SetLoad(false);
                onRefresh();
            } else {
                // Alert.alert("Failed", responseData.message);
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            // console.error('Error fetching data:', error);
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
            navigation.navigate('Asset List');
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

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Assign Assets Form</Text>
                </View>

                <View style={styles.Inputcontainer}>

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
                        Employee Name
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
                        Asset Type
                    </Text>

                    <TouchableOpacity style={[styles.Input,{paddingVertical:selectedAssetTypes.length == 0 ? '5%' : '3%'}]} onPress={() => {
                        setShowAssetTypeDropdown(!showAssetTypeDropdown);
                    }}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedAssetTypes.map(assetType => (
                                <Text key={assetType} style={styles.selectedays}>{assetType}</Text>
                            ))}
                            {selectedAssetTypes.length === 0 && <Text>Select Asset Types</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showAssetTypeDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {assetTypeDropdown.map((asset, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dropdownOption,
                                            selectedAssetTypes.includes(asset.asset_type_name) && styles.selectedOption
                                        ]}
                                        onPress={() => handleToggleAssetType(asset.asset_type_name, asset.id)}
                                    >
                                        <Text style={styles.dropdownOptionText}>{asset.asset_type_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}


                    <Text style={styles.errorText}>
                        {selectedAssetTypesErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Asset Details
                    </Text>

                    <TextInput
                        value={assetDetails}
                        onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {assetDetailsErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Asset Value
                    </Text>

                    <TextInput
                        value={assetValue}
                        onChangeText={(txt) => setAssetsValue(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {assetValueErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Issue Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {/* {startDate.toDateString()} &nbsp; */}
                            {startDate ? startDate.toDateString() : "Select date"} &nbsp;
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

                    <Text style={styles.ShiftSlotText}>
                        Valid Till
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {/* {endDate.toDateString()} &nbsp; */}
                            {endDate ? endDate.toDateString() : "Select date"} &nbsp;
                        </Text>
                        {/* {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )} */}
                        {Platform.OS === 'android' && showDatePicker1 && (
                            <DateTimePicker
                                value={endDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker1} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={endDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange1}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker1(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {endDateErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Return On
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker2}>
                            {/* {returnDate.toDateString()} &nbsp; */}
                            {returnDate ? returnDate.toDateString() : "Select date"} &nbsp;
                        </Text>
                        {/* {showDatePicker2 && (
                            <DateTimePicker
                                value={returnDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )} */}
                         {Platform.OS === 'android' && showDatePicker2 && (
                            <DateTimePicker
                                value={returnDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker2} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={returnDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange2}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker2(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {returnDateErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Allocated")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Allocated</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Return")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Return</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Remarks
                    </Text>

                    <TextInput
                        value={remarks}
                        onChangeText={(txt) => setRemarks(txt)}
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {remarksErr}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={AddAss}
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
                            onPress={() => onRefresh()}
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

export default AddAsset;