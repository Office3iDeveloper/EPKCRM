import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Platform, Modal, Button } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EmployeeDetails = ({ onEmpRole, onprevBasicDetails, validation, setDoj }) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // States

    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    // Api call for Category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/employee_categorylist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setCategoryList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectCategory = (File) => {
        handleFieldsChange('employeeCategory', File.employee_category);
        handleFieldsChange('selectedemployeeCategory', File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // Job type

    const [showDropdownJobType, setShowDropdownJobType] = useState(false);
    const [jobTypeList, setJobTypeList] = useState([]);

    // Api call for Category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/getjobtype';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setJobTypeList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectJobtype = (File) => {
        handleFieldsChange('employeeJobType', File.job_name);
        handleFieldsChange('employeeJobTypeId', File.id);
        setShowDropdownJobType(false);
    };

    const toggleDropdownType = () => {
        setShowDropdownJobType(!showDropdownJobType);
    }

    // 

    const [showPF, setShowPF] = useState(false);

    const toggleDropdownPF = () => {
        setShowPF(!showPF);
    };

    const selectPF = (PF) => {
        setShowPF(false);
        handleFieldsChange('providentFund', PF);
    };

    // 

    const [showESI, setShowESI] = useState(false);

    const toggleDropdownESI = () => {
        setShowESI(!showESI);
    };

    const selectESI = (ESI) => {
        setShowESI(false);
        handleFieldsChange('esi', ESI);
    };

    // 

    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [selectedDateDoj, setSelectedDateDoj] = useState(new Date());

    // const handleDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setSelectedDateDoj(date);
    //     }
    //     const formattedDoj = `${selectedDateDoj.getFullYear()}-${selectedDateDoj.getMonth() + 1}-${selectedDateDoj.getDate()}`;
    //     handleFieldsChange('dateOfJoining', formattedDoj);
    //     setShowDatePicker(Platform.OS === 'ios');
    // };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };

    // const formattedDoj = Employee.dateOfJoining ? new Date(Employee.dateOfJoining).toDateString() : selectedDateDoj.toDateString();

    // const formattedDoj = Employee.dateOfJoining
    //     ? new Date(Employee.dateOfJoining).toISOString().slice(0, 10)
    //     : selectedDateDoj.toISOString().slice(0, 10);

    // useEffect(() => {
    //     setDoj(formattedDoj);
    // }, [formattedDoj])

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
            const formattedStartDate = formatDate(date);
            handleFieldsChange('dateOfJoining', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDoj = Employee.dateOfJoining
        ? formatDate(new Date(Employee.dateOfJoining))
        : formatDate(startDate);

    useEffect(() => {
        setDoj(formattedDoj);
    }, [formattedDoj])


    // 

    // const [showDatePickerConfirm, setShowDatePickerConfirm] = useState(false);
    // const [selectedConfirmDate, setSelectedConfirmDate] = useState(new Date());

    // const handleConfirmDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setSelectedConfirmDate(date);
    //     }
    //     const formattedConfirmDate = `${selectedConfirmDate.getFullYear()}-${selectedConfirmDate.getMonth() + 1}-${selectedConfirmDate.getDate()}`;
    //     handleFieldsChange('confirmationDate', formattedConfirmDate);
    //     setShowDatePickerConfirm(Platform.OS === 'ios');
    // };

    // const showConfirmDatepicker = () => {
    //     setShowDatePickerConfirm(true);
    // };

    // const formattedConfirm = Employee.confirmationDate 
    // ? formatDate(new Date(Employee.confirmationDate)) 
    // : formatDate(selectedConfirmDate);
    // console.log(formattedConfirm, "formattedConfirm")

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(null);

    const handleDateChange1 = (event, date) => {
        // if (date !== undefined) {
        //     setStartDate1(date);
        //     const formattedStartDate1 = formatDate(date);
        //     handleFieldsChange('confirmationDate', formattedStartDate1);
        // }
        // setShowDatePicker1(Platform.OS === 'ios');
        if (event.type === "set" && date) {
            setStartDate1(date);
            const formattedStartDate1 = formatDate(date);
            handleFieldsChange('confirmationDate', formattedStartDate1);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // const formattedConfirm = Employee.confirmationDate
    //     ? formatDate(new Date(Employee.confirmationDate))
    //     : formatDate(startDate);

    // useEffect(() => {
    //     setDoj(formattedDoj);
    // }, [formattedDoj])

    // 

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate2, setStartDate2] = useState(null);

    const handleDateChange2 = (event, date) => {
        // if (date !== undefined) {
        //     setStartDate2(date);
        //     const formattedStartDate2 = formatDate(date);
        //     handleFieldsChange('lastWorkingDay', formattedStartDate2);
        // }
        // setShowDatePicker2(Platform.OS === 'ios');
        if (event.type === "set" && date) {
            setStartDate2(date);
            const formattedStartDate2 = formatDate(date);
            handleFieldsChange('lastWorkingDay', formattedStartDate2);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    const formattedLWD = Employee.selectedLWDDate
        ? formatDate(new Date(Employee.selectedLWDDate))
        : formatDate(startDate);

    // const [showDatePickerLWD, setShowDatePickerLWD] = useState(false);
    // const [selectedLWDDate, setSelectedLWDDate] = useState(new Date());

    // const handleLWDDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setSelectedLWDDate(date);
    //     }
    //     const formattedLWDDate = `${selectedLWDDate.getFullYear()}-${selectedLWDDate.getMonth() + 1}-${selectedLWDDate.getDate()}`;
    //     handleFieldsChange('lastWorkingDay', formattedLWDDate);
    //     setShowDatePickerLWD(Platform.OS === 'ios');
    // };

    // const showLWDDatepicker = () => {
    //     setShowDatePickerLWD(true);
    // };

    // const formattedLWD = Employee.lastWorkingDay ? new Date(Employee.lastWorkingDay).toDateString() : selectedLWDDate.toDateString();

    // const formattedLWD = Employee.lastWorkingDay
    //     ? new Date(Employee.lastWorkingDay).toISOString().slice(0, 10)
    //     : selectedLWDDate.toISOString().slice(0, 10);

    // useEffect(() => {
    //     setDoj(formattedLWD);
    // }, [formattedLWD])


    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Details
            </Text>

            <Text style={styles.subHeading}>
                Employee Job Type
            </Text>

            <TouchableOpacity onPress={toggleDropdownType} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.employeeJobType && Employee.employeeJobType.length > 0 ? Employee.employeeJobType : "Select Job Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdownJobType && (
                <View style={styles.dropdown}>
                    {jobTypeList.map((File, index) => (
                        <TouchableOpacity key={index} onPress={() => selectJobtype(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.job_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.errorText}>
                {validation ? (Employee.employeeJobType.length == "0" ? "Select Job Type" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Employee Category
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.employeeCategory && Employee.employeeCategory.length > 0 ? Employee.employeeCategory : "Select Category Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {categoryList.map((File, index) => (

                        <TouchableOpacity key={index} onPress={() => selectCategory(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.employee_category}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.errorText}>
                {validation ? (Employee.employeeCategory.length == "0" ? "Select Category Type" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Date Of Joining
            </Text>

            {/* <View style={styles.inputs}>
                <Text onPress={showDatepicker}>
                    {formattedDoj}
                </Text>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDateDoj}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View> */}
            <View style={styles.inputs} >
                <Text onPress={showDatepicker}>
                    {startDate ? formatDate(startDate) : Employee.dateOfJoining ? Employee.dateOfJoining : "Select Date Of Joining"} &nbsp;
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
                {validation ? (!Employee.dateOfJoining ? "Date Of Joining Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Probation Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.probationPeriod}
                onChangeText={(text) => handleFieldsChange('probationPeriod', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {/* {!Employee.probationPeriod ? "Selected probationPeriod" : null} */}
            </Text>

            <Text style={styles.subHeading}>
                Confirmation Date
            </Text>

            {/* <View style={styles.inputs}>
                <Text onPress={showConfirmDatepicker}>
                    {formattedConfirm}
                </Text>
                {showDatePickerConfirm && (
                    <DateTimePicker
                        value={selectedConfirmDate}
                        mode="date"
                        display="default"
                        onChange={handleConfirmDateChange}
                    />
                )}
            </View> */}

            <View style={styles.inputs} >
                <Text onPress={showDatepicker1}>
                    {startDate1 ? formatDate(startDate1) : Employee.confirmationDate ? Employee.confirmationDate : "Select Confirmation date"} &nbsp;
                </Text>
                {/* {showDatePicker1 && (
                    <DateTimePicker
                        value={startDate1 || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange1}
                    />
                )} */}
                {Platform.OS === 'android' && showDatePicker1 && (
                    <DateTimePicker
                        value={startDate1 || new Date()}
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
                                    value={startDate1 || new Date()}
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
                { }
            </Text>

            <Text style={styles.subHeading}>
                Employee Agreement Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.employeeAgreementPeriod}
                onChangeText={(text) => handleFieldsChange('employeeAgreementPeriod', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {/* {!Employee.employeeAgreementPeriod ? "employeeAgreementPeriod Required" : null} */}
            </Text>

            <Text style={styles.subHeading}>
                Notice Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.noticePeriod}
                onChangeText={(text) => handleFieldsChange('noticePeriod', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.noticePeriod ? "Notice Period Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                CTC
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.ctc}
                onChangeText={(text) => handleFieldsChange('ctc', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.ctc ? "CTC Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Gross Salary
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.grossSalary}
                onChangeText={(text) => handleFieldsChange('grossSalary', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.grossSalary ? "Gross Salary Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Net Salary
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.netSalary}
                onChangeText={(text) => handleFieldsChange('netSalary', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.netSalary ? "Net Salary Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Last Working Day
            </Text>

            {/* <View style={styles.inputs}>
                <Text onPress={showLWDDatepicker}>
                    {formattedLWD}
                </Text>
                {showDatePickerLWD && (
                    <DateTimePicker
                        value={selectedLWDDate}
                        mode="date"
                        display="default"
                        onChange={handleLWDDateChange}
                    />
                )}
            </View> */}

            <View style={styles.inputs} >
                <Text onPress={showDatepicker2}>
                    {startDate2 ? formatDate(startDate2) : Employee.lastWorkingDay ? Employee.lastWorkingDay : "Select Last Working Date"} &nbsp;
                </Text>
                {/* {showDatePicker2 && (
                    <DateTimePicker
                        value={startDate2 || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange2}
                    />
                )} */}
                {Platform.OS === 'android' && showDatePicker2 && (
                    <DateTimePicker
                        value={startDate2 || new Date()}
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
                                    value={startDate2 || new Date()}
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
                { }
            </Text>

            <Text style={styles.subHeading}>
                PF
            </Text>

            <TouchableOpacity onPress={toggleDropdownPF} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.providentFund || "Select Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showPF && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectPF("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPF("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.providentFund ? "Provident Fund Required" : null) : null}
            </Text>

            {
                Employee.providentFund === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            UAN Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.uanNumber}
                            onChangeText={(text) => handleFieldsChange('uanNumber', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.uanNumber ? "UAN Number Required" : null) : null}
                        </Text>

                        <Text style={styles.subHeading}>
                            Employee PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employeePfContribution}
                            onChangeText={(text) => handleFieldsChange('employeePfContribution', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.employeePfContribution ? "Employee Pf Contribution Required" : null) : null}
                        </Text>

                        <Text style={styles.subHeading}>
                            Employer PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employerPfContribution}
                            onChangeText={(text) => handleFieldsChange('employerPfContribution', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.employerPfContribution ? "Employer Pf Contribution Required" : null) : null}
                        </Text>
                    </>
                    : null
            }

            <Text style={styles.subHeading}>
                ESI
            </Text>

            <TouchableOpacity onPress={toggleDropdownESI} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.esi || "Select Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showESI && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectESI("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectESI("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.esi ? "ESI Required" : null) : null}
            </Text>

            {
                Employee.esi === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            ESI Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.esiNumber}
                            onChangeText={(text) => handleFieldsChange('esiNumber', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.esiNumber ? "ESI Number Required" : null) : null}
                        </Text>

                        <Text style={styles.subHeading}>
                            Employee ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employeeEsiContribution}
                            onChangeText={(text) => handleFieldsChange('employeeEsiContribution', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.employeeEsiContribution ? "Employee ESI Contribution Required" : null) : null}
                        </Text>

                        <Text style={styles.subHeading}>
                            Employer ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employerEsiContribution}
                            onChangeText={(text) => handleFieldsChange('employerEsiContribution', text)}
                        />

                        <Text style={styles.errorText}>
                            {validation ? (!Employee.employerEsiContribution ? "Employer ESI Contribution Required" : null) : null}
                        </Text>
                    </>
                    : null
            }

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBasicDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Prev
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onEmpRole}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeDetails;