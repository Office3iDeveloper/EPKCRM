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

const GeneratePayslip = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [load, SetLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [nola, setNola] = useState('');
    const [nop, setNoP] = useState('');
    const [nohd, setNohd] = useState('');
    const [nol, setNol] = useState('');
    const [noa, setNoa] = useState('');
    const [totalWDM, setTotalWDM] = useState('');
    const [nowd, setNowd] = useState('');
    const [overtime, setOvertime] = useState('');
    const [grossSalary, setGrossSalary] = useState('');
    const [perDaySalary, setPerDaySalary] = useState('');
    const [variable, setVariable] = useState('');
    const [otherDeduction, setOtherDeduction] = useState('');
    const [netPay, setNetPay] = useState('');
    const [lopAmount, setLopAmount] = useState('');
    const [lopcount, setLopcount] = useState('');
    const [empSalaryOverall, setOverallSalaryOverall] = useState('');
    const [overAllDeduction, setOverAllDeduction] = useState('');
    const [presentCount, setPresentCount] = useState('');

    const [editable, setEditable] = useState(false);

    const toggleEdit = () => {
        setEditable(!editable);
        if (editable) {
            getAfterLop();
        }
    };

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

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState('');
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}` :
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

    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [startDate, setStartDate] = useState(new Date());

    // const handleDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setStartDate(date);
    //     }
    //     setShowDatePicker(Platform.OS === 'ios');
    // };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };

    // const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;

    const getData = async () => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/get_emp_yearmonth_details`;

            const response = await axios.post(apiUrl, {
                emp_id: selectedMemberId,
                yearmonth: formattedStartDate
            },
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

            const responsedata = await response.data;
            const resdata = response.data.data;

            if (responsedata.status === "success") {
                setDatalist(resdata);
            } else {
                Alert.alert('Failed', responsedata.message)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getAfterLop = async () => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/ot_emp_salary_details`;

            const response = await axios.post(apiUrl, {
                emp_id: selectedMemberId,
                yearmonth: formattedStartDate,
                lop: lopcount
            },
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

            const responsedata = await response.data;
            console.log(responsedata, "responsedata")
            const resdata = response.data.data;

            if (responsedata.status === "success") {
                setNola(resdata.latecount?.toString() || '');
                setNoP(resdata.permissioncount?.toString() || '');
                setNohd(resdata.halfdaycount?.toString() || '');
                setNol(resdata.leavecount?.toString() || '');
                setNoa(resdata.absentcount?.toString() || '');
                setTotalWDM(resdata.totalmonthlyworkingdays?.toString() || '');
                setNowd(resdata.totalworkeddays?.toString() || '');
                setOvertime(resdata.ot_totalamount?.toString() || '');
                setGrossSalary(resdata.empgrosssalary?.toString() || '');
                setPerDaySalary(resdata.empsalaryperday?.toString() || '');
                setVariable(resdata.variable?.toString() || '');
                setOtherDeduction(resdata.otherdeduction?.toString() || '');
                setLopAmount(resdata.lopamount?.toString() || '');
                setNetPay(resdata.totalnetpayamount?.toString() || '');
                setLopcount(resdata.totallopdays?.toString() || '');
                setPresentCount(resdata.presentcount?.toString() || '');
                setOverAllDeduction(resdata.overalldeduction?.toString() || '');
                setOverallSalaryOverall(resdata.empsalaryoverall?.toString() || '');
            } else {
                Alert.alert('Failed', responsedata.message)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [startDate])

    useEffect(() => {
        setNola(datalist.latecount?.toString() || '');
        setNoP(datalist.permissioncount?.toString() || '');
        setNohd(datalist.halfdaycount?.toString() || '');
        setNol(datalist.leavecount?.toString() || '');
        setNoa(datalist.absentcount?.toString() || '');
        setTotalWDM(datalist.totalmonthlyworkingdays?.toString() || '');
        setNowd(datalist.totalworkeddays?.toString() || '');
        setOvertime(datalist.ot_totalamount?.toString() || '');
        setGrossSalary(datalist.empgrosssalary?.toString() || '');
        setPerDaySalary(datalist.empsalaryperday?.toString() || '');
        setVariable(datalist.variable?.toString() || '');
        setOtherDeduction(datalist.otherdeduction?.toString() || '');
        setLopAmount(datalist.lopamount?.toString() || '');
        setNetPay(datalist.totalnetpayamount?.toString() || '');
        setLopcount(datalist.totallopdays?.toString() || '');
        setPresentCount(datalist.presentcount?.toString() || '');
        setOverAllDeduction(datalist.overalldeduction?.toString() || '');
        setOverallSalaryOverall(datalist.empsalaryoverall?.toString() || '');
    }, [datalist])

    // 

    const validateFields = () => {
        let isValid = true;
    
        const fieldsToValidate = [
            { value: selectedDepartments, errorSetter: setSelectedDepartmentsErr, errorMessage: 'Select Department Name',},
            { value: selectedMember, errorSetter: setSelectedMemberErr, errorMessage: 'Select Member Name',},
            { value: startDate, errorSetter: setStartDateErr, errorMessage: 'Select Date',}
        ];
    
        fieldsToValidate.forEach(field => {
            if (!field.value) {
                field.errorSetter(field.errorMessage);
                isValid = false;
            } else {
                field.errorSetter('');
            }
        });
    
        return isValid;
    };

    const AddAss = async () => {

        SetLoad(true);

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://office3i.com/development/api/public/api/add_generate_payslip';

            const response = await axios.post(apiUrl, {
                e_id: selectedMemberId,
                dep_id: selectedDepartmentsId,
                payslipmonthyear: formattedStartDate,
                late_count: nol,
                halfday_count: nohd,
                absent_count: noa,
                leave_count: nol,
                permission_count: nop,
                present_count: presentCount,
                totalmonthlyworkingdays: totalWDM,
                totalworkeddays: nowd,
                totallopdays: lopcount,
                lopamount: lopAmount,
                ot_totalamount: overtime,
                empsalaryperday: perDaySalary,
                overalldeduction: overAllDeduction,
                empsalaryoverall: empSalaryOverall,
                totalnetpayamount: netPay,
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
            } else {
                // Alert.alert("Failed", responseData.message);
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
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
            navigation.navigate('Payslip List')
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
                        Select Year Month
                    </Text>

                    {/* <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {format(startDate, 'yyyy-MM')}
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View> */}

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {/* {startDate.toDateString()} &nbsp; */}
                            {startDate ? format(startDate, 'yyyy-MM') : "Select a start date"} &nbsp;
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
                        No. Of Late
                    </Text>

                    <TextInput
                        value={nola}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. Of Permission
                    </Text>

                    <TextInput
                        value={nop}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. Of Half Day
                    </Text>

                    <TextInput
                        value={nohd}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. Of Leave
                    </Text>

                    <TextInput
                        value={nol}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. Of Absent
                    </Text>

                    <TextInput
                        value={noa}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Total Working Days in Month
                    </Text>

                    <TextInput
                        value={totalWDM}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. Of Worked Days
                    </Text>

                    <TextInput
                        value={nowd}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Overtime
                    </Text>

                    <TextInput
                        value={overtime}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Gross Salary
                    </Text>

                    <TextInput
                        value={grossSalary}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Per Day Salary
                    </Text>

                    <TextInput
                        value={perDaySalary}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Variable
                    </Text>

                    <TextInput
                        value={variable}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Other Deductions
                    </Text>

                    <TextInput
                        value={otherDeduction}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Loss Of Pay
                    </Text>

                    <TextInput
                        value={lopcount}
                        editable={editable}
                        onChangeText={(txt) => setLopcount(txt)}
                        style={styles.inputs}
                    />

                    <View style={{ alignItems: 'flex-end', width: '90%' }}>
                        <TouchableOpacity onPress={toggleEdit}
                            style={{ backgroundColor: '#0A62F1', width: '20%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                        >
                            <Text
                                style={{ color: '#fff', fontWeight: '600' }}
                            >
                                {editable ? 'Save' : 'Edit'}
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.ShiftSlotText}>
                        Net Pay
                    </Text>

                    <TextInput
                        value={netPay}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={AddAss}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Generate
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Dashboard')}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
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
            </View>

        </ScrollView>

    )
}

export default GeneratePayslip;