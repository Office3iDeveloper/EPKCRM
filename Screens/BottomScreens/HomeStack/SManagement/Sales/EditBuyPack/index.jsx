import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";
import { PrimaryBlue, SubContainer } from "../../../../../../Assets/Colors";

const EditBuySalesInvoice = ({ navigation, route }) => {

    const SpecId = route.params.Id;

    // console.log(SpecId,"SpecId")

    const [load, SetLoad] = useState(false);

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [gst, setGst] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [reason, setReason] = useState('');
    const [offline, setOffline] = useState('');

    const [fNameErr, setFNameErr] = useState('');
    const [lNameErr, setLNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [mobileNumberErr, setMobileNumberErr] = useState('');
    const [companyNameErr, setCompanyNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [gstErr, setGstErr] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [pincodeErr, setPincodeErr] = useState('');
    const [reasonErr, setReasonErr] = useState('');
    const [offlineErr, setOfflineErr] = useState('');

    const { data } = useSelector((state) => state.login);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            onRefresh();
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

    // 

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate2, setStartDate2] = useState(null);
    const [startDateErr2, setStartDateErr2] = useState(null);
    const formattedStartDate2 = startDate2 ?
        `${startDate2.getFullYear()}-${String(startDate2.getMonth() + 1).padStart(2, '0')}-${String(startDate2.getDate()).padStart(2, '0')}` :
        "";

    const handleDateChange2 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate2(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    const [list, setList] = useState({});
    const [liststatus, setListstatus] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [statusComment, setStatusComment] = useState('');

    const Annlist = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/getbuybowpacksalesviewlist/${SpecId.id}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            if (responseData) {
                setList(responseData.Leadlist || {});  // Default to empty object if Leadlist is missing
                setListstatus(responseData.Leadstatus || []);  // Default to empty array if Leadstatus is missing
            }

        } catch (error) {
            console.error('Error fetching Announcement data:', error);
        }

    }

    useEffect(() => {
        Annlist();
    }, [])

    // 

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const CountApi = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/webmodule_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument = (File) => {
        setSelectedDocument(File.module_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [documentList1, setDocumentList1] = useState([]);
    const [selectedDocument1, setSelectedDocument1] = useState([]);
    const [selectedDocument1Err, setSelectedDocument1Err] = useState('');
    const [selectedDocument1Id, setSelectedDocumen1Id] = useState(null);

    const CountApi1 = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/webproduct_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList1(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument1 = (File) => {
        setSelectedDocument1(File.name);
        setSelectedDocumen1Id(File.id);
        setShowDropdown1(false);
    };

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    }

    const [showDropdown2, setShowDropdown2] = useState(false);
    const [documentList2, setDocumentList2] = useState([]);
    const [selectedDocument2, setSelectedDocument2] = useState([]);
    const [selectedDocument2Err, setSelectedDocument2Err] = useState('');
    const [selectedDocument2Id, setSelectedDocumen2Id] = useState(null);

    const CountApi2 = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/payment_method_status';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList2(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument2 = (File) => {
        setSelectedDocument2(File.payment_method);
        setSelectedDocumen2Id(File.id);
        setShowDropdown2(false);
    };

    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    }

    useEffect(() => {
        CountApi();
        CountApi1();
        CountApi2();
    }, [])

    // 

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedCountryErr, setSelectedCountryErr] = useState('');
    const [selectedCountryId, setSelectedCountryId] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchInputcountry, setSearchInputcountry] = useState('');

    const filteredCountry = country.filter(item =>
        item.name.toLowerCase().includes(searchInputcountry.toLowerCase())
    );

    const toggleDropdown3 = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectCountry = (selectedCountry) => {
        setSelectedCountry(selectedCountry.name);
        setSelectedCountryId(selectedCountry.id);
        setDropdownVisible(false);
    };

    const CountApi3 = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/country_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setCountry(responseData);

        } catch (error) {
            console.error('Error fetching Country data:', error);
        }

    }

    useEffect(() => {
        CountApi3();
    }, [])


    // 

    const [documentList4, setDocumentList4] = useState([]);

    const CountApi4 = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/webproductmodule_list/${selectedDocument1Id}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList4(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }


    useEffect(() => {
        CountApi4();
    }, [selectedDocument1])


    // 

    const [count, setCount] = useState(0);
    const [monthlyPlan, setMonthlyPlan] = useState(0);
    const [yearlyPlan, setYearlyPlan] = useState(0);
    const [addOn, setAddOn] = useState(0);
    const [addOnEmp, setAddOnEmp] = useState(0);
    const [planAmount, setPlanAmount] = useState(0);
    const [totalGst, setTotalGst] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    const [tcount, setTcount] = useState(0);

    const gstPercentage = 18;
    const Discount = 10;

    useEffect(() => {
        setTcount(parseFloat(documentList4[0]?.member) + count || 0);
    }, [documentList4, count])

    // Increment and Decrement functions
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    // Calculate the monthly plan and add-on values when documentList4 changes
    useEffect(() => {
        setMonthlyPlan(documentList4[0]?.price || 0);
        setAddOn(documentList4[0]?.monthly_member || 0);
    }, [documentList4]);

    // Calculate addOnEmp whenever addOn or count changes
    useEffect(() => {
        if (addOn) {
            if (active1) {
                setAddOnEmp(parseFloat(addOn) * count * 12);
            } else {
                setAddOnEmp(parseFloat(addOn) * count);
            }
        } else {
            setAddOnEmp(0);
        }
    }, [addOn, count]);

    // Calculate yearlyPlan whenever monthlyPlan changes
    useEffect(() => {
        if (monthlyPlan) {
            setYearlyPlan(parseFloat(monthlyPlan) * 12);
        } else {
            setYearlyPlan(0);
        }
    }, [monthlyPlan]);

    // Calculate total GST whenever addOnEmp or planAmount changes
    useEffect(() => {
        setTotalGst(((addOnEmp + parseFloat(planAmount)) * gstPercentage) / 100);
        console.log("Total GST:", totalGst); // Debugging: Check the GST value
    }, [addOnEmp, planAmount]); // Corrected dependencies

    // Calculate final amount whenever totalGst, addOnEmp, or planAmount changes
    useEffect(() => {

        if (active1) {
            setFinalAmount(parseFloat(totalGst) + parseFloat(addOnEmp) + (parseFloat(planAmount) - discount));
        } else {
            setFinalAmount(parseFloat(totalGst) + parseFloat(addOnEmp) + parseFloat(planAmount));
        }

        console.log("Final Amount:", finalAmount); // Debugging: Check the final amount value
        console.log("Plan Amount:", planAmount); // Debugging: Check the plan amount value
    }, [totalGst, addOnEmp, planAmount]);

    const [discount, setDiscount] = useState(0);

    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [plan, setPlan] = useState('');

    const HandleMonthly = (txt) => {
        setActive(monthlyPlan ? true : false);
        setPlan('monthly')
        setActive1(false);
        setPlanAmount(txt);
    }

    const HandleYearly = (txt) => {
        setActive(false);
        setPlan('yearly')
        setActive1(yearlyPlan ? true : false);
        setPlanAmount(txt);
    }

    useEffect(() => {
        setDiscount(((parseFloat(planAmount)) * Discount) / 100)
    }, [addOnEmp, planAmount])


    //  

    const [state, setState] = useState([]);
    const [selectededState, setSelectedState] = useState([]);
    const [selectededStateErr, setSelectedStateErr] = useState('');
    const [selectedStateId, setSelectedStateId] = useState([]);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [searchInputstate, setSearchInputstate] = useState('');

    const filteredState = state.filter(item =>
        item.name.toLowerCase().includes(searchInputstate.toLowerCase())
    );

    const toggleDropdown4 = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectState = (selectededState) => {
        setSelectedState(selectededState.name);
        setSelectedStateId(selectededState.id);
        setDropdownVisible1(false);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/state_list/${selectedCountryId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setState(responseData);

        } catch (error) {
            // console.error('Error fetching State data:', error);
        }

    }

    useEffect(() => {
        StateApi();
    }, [selectedCountryId])

    const [city, setCity] = useState([]);
    const [selectededCity, setSelectedCity] = useState([]);
    const [selectededCityErr, setSelectedCityErr] = useState('');
    const [selectedCityId, setSelectedCityId] = useState([]);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [searchInputcity, setSearchInputcity] = useState('');

    const filteredCity = city.filter(item =>
        item.name.toLowerCase().includes(searchInputcity.toLowerCase())
    );

    const toggleDropdown5 = () => {
        setDropdownVisible2(!dropdownVisible2);
    };

    const selectCity = (selectedCity) => {
        setSelectedCity(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        setDropdownVisible2(false);
    };

    const CityApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/city_list/${selectedStateId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setCity(responseData);

        } catch (error) {
            // console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        CityApi();
    }, [selectededState])

    // 

    // Select Status

    const [showStatus, setShowStatus] = useState(false);
    const [selectededStatus, setSelectedStatus] = useState('');
    const [selectededStatusErr, setSelectedStatusErr] = useState('');

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status) => {
        setShowStatus(false);
        setSelectedStatus(Status);
    };

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');

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

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    // 

    const [showDropdown5, setShowDropdown5] = useState(false);
    const [documentList5, setDocumentList5] = useState([]);
    const [selectedDocument5, setSelectedDocument5] = useState([]);
    const [selectedDocument5Err, setSelectedDocument5Err] = useState('');
    const [selectedDocument5Id, setSelectedDocument5Id] = useState(null);

    const CountApi5 = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/payment_type_status';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList5(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    const selectDocument5 = (File) => {
        setSelectedDocument5(File.payment_type);
        setSelectedDocument5Id(File.id);
        setShowDropdown5(false);
    };

    const toggleDropdown6 = () => {
        setShowDropdown5(!showDropdown5);
    }

    useEffect(() => {
        CountApi5();
    }, [])


    // 

    const validateFields = () => {

        let isValid = true;

        // if (selectedDocument2.length == 0) {
        //     setSelectedDocument2Err('Select Payment Method');
        //     isValid = false;
        // } else {
        //     setSelectedDocument2Err('');
        // }

        if (selectedDocument5.length == 0) {
            setSelectedDocument5Err('Select Payment Status');
            isValid = false;
        } else {
            setSelectedDocument5Err('');
        }

        // if (!offline) {
        //     setOfflineErr('Enter Proof');
        //     isValid = false;
        // } else {
        //     setOfflineErr('');
        // }

        return isValid;
    };

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            SetLoad(false);
            Alert.alert('Invalid Fields', 'Check All mandatory Fieald')
            return;
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/getbuybowpackupdatestatuslist';

            const response = await axios.post(apiUrl, {
                id: SpecId.id,
                updated_by: data.userempid,
                status_date: formattedStartDate2,
                payment_status: selectedDocument5Id,
                comments: statusComment,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;
            console.log(responseData, "responseData")

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                SetLoad(false);
            } else {
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const onRefresh = () => {
        navigation.goBack()
    }

    useEffect(() => {

        if (Object.keys(list).length > 0) {

            setFName(list.cus_name);
            setEmail(list.cus_email);
            setMobileNumber(list.cus_mobile);
            setCompanyName(list.cus_companyname);
            setPassword(list.cus_password);
            setSelectedDocument(list.module_name);
            setSelectedDocumentId(list.module_id);
            setSelectedDocument1(list.plan_name);
            setSelectedDocumen1Id(list.plan_id);
            setSelectedStatus(list.demo_mode);
            setSelectedDepartments(list.Assign_departmentname);
            setSelectedDepartmentsId(list.assign_department);
            setSelectedMember(list.assign_member_name);
            setSelectedMemberId(list.assign_member);
            setGst(list.cus_gstin);
            setAddress(list.cus_billing_address);
            setSelectedCityId(list.cus_city);
            setSelectedStateId(list.cus_state);
            setSelectedCountryId(list.cus_country);
            setSelectedCity(list.current_cityname);
            setSelectedState(list.state_name);
            setSelectedCountry(list.country_name);
            setPincode(list.cus_pincode);
            setSelectedDocument2(list.payment_methodname);
            setSelectedDocumen2Id(list.payment_method);
            setReason(list.pay_reason);

            setCount(list.add_emp_count);
            setPlan(list.plan_period);

            if (list.plan_period == "monthly") {
                setActive1(false);
                setActive(true);
            } else {
                setActive1(true);
                setActive(false);
            }

            setAddOnEmp(list.add_emp_amt);
            setTotalGst(list.tax_amt);
            setPlanAmount(list.plan_amt);
            setFinalAmount(list.overall_amt);

        }

    }, [list])

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Edit Customer</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        First Name
                    </Text>

                    <TextInput
                        value={fName}
                        onChangeText={(txt) => setFName(txt)}
                        style={styles.inputs}
                        editable={false}
                    />

                    <Text style={styles.errorText}>
                        {fNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email ID
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                        style={styles.inputs}
                        editable={false}
                    />

                    <Text style={styles.errorText}>
                        {emailErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile Number
                    </Text>

                    <TextInput
                        value={mobileNumber}
                        onChangeText={(txt) => setMobileNumber(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                        editable={false}
                    />

                    <Text style={styles.errorText}>
                        {mobileNumberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Company Name
                    </Text>

                    <TextInput
                        value={companyName}
                        onChangeText={(txt) => setCompanyName(txt)}
                        style={styles.inputs}
                        editable={false}
                    />

                    <Text style={styles.errorText}>
                        {companyNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Create Password
                    </Text>

                    <TextInput
                        value={password}
                        onChangeText={(txt) => setPassword(txt)}
                        style={styles.inputs}
                        editable={false}
                    />

                    <Text style={styles.errorText}>
                        {passwordErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Select Module
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Module Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {documentList.map((File, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.module_name}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr}
                    </Text>

                    {selectedDocument && selectedDocument.length > 0 && (
                        <>
                            <Text style={styles.StatDateText}>
                                Select Plan
                            </Text>

                            <TouchableOpacity style={styles.StatusTouchable}>

                                <Text style={styles.StatusTouchableText}>
                                    {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Select Plan Type"}
                                </Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {showDropdown1 && (
                                <View style={styles.dropdown}>
                                    {documentList1.map((File, index) => (
                                        <TouchableOpacity key={index} onPress={() => selectDocument1(File)} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>{File.name}</Text>
                                        </TouchableOpacity>

                                    ))}
                                </View>
                            )}

                            <Text style={styles.errorText}>
                                {selectedDocument1Err}
                            </Text>
                        </>
                    )}

                    <Text style={styles.StatDateText}>
                        Demo Mode
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectededStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Online")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Online</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Sales-Team")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Sales-Team</Text>
                            </TouchableOpacity>


                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectededStatusErr}
                    </Text>

                    {
                        selectededStatus === "Sales-Team" ?
                            <>
                                <Text style={styles.StatDateText}>
                                    Select Team
                                </Text>

                                <TouchableOpacity

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

                                <Text style={styles.StatDateText}>
                                    Select Member
                                </Text>

                                <TouchableOpacity

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
                            </> :
                            null
                    }

                    {
                        selectedDocument === "Trial" || selectedDocument.length == 0 ? null :
                            <>

                                <Text style={styles.StatDateText}>
                                    GST
                                </Text>

                                <TextInput
                                    value={gst}
                                    onChangeText={(txt) => setGst(txt)}
                                    style={styles.inputs}
                                    editable={false}

                                />

                                <Text style={styles.errorText}>
                                    {gstErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Billing Address
                                </Text>

                                <TextInput
                                    value={address}
                                    onChangeText={(txt) => setAddress(txt)}
                                    style={styles.inputs}
                                    editable={false}

                                />

                                <Text style={styles.errorText}>
                                    {addressErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Country
                                </Text>

                                <TouchableOpacity style={styles.StatusTouchable}>
                                    <Text style={styles.StatusTouchableText}>
                                        {selectedCountry.length > 0 ? selectedCountry : 'Select a country'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>

                                {dropdownVisible && (
                                    <View style={styles.dropdown}>
                                        {/* Input field for user to filter options */}
                                        <TextInput
                                            style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB' }]}
                                            placeholder="Search Country ..."
                                            value={searchInputcountry}
                                            onChangeText={text => setSearchInputcountry(text)}
                                        />

                                        {filteredCountry.map((item) => (
                                            <TouchableOpacity key={item.id} onPress={() => selectCountry(item)} style={styles.dropdownOption}>
                                                <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                <Text style={styles.errorText}>
                                    {selectedCountryErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    State
                                </Text>

                                <TouchableOpacity style={styles.StatusTouchable}>
                                    <Text style={styles.StatusTouchableText}>
                                        {selectededState.length > 0 ? selectededState : 'Select a State'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>

                                {dropdownVisible1 && (
                                    <View style={styles.dropdown}>
                                        {/* Input field for user to filter options */}
                                        <TextInput
                                            style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB' }]}
                                            placeholder="Search State..."
                                            value={searchInputstate}
                                            onChangeText={text => setSearchInputstate(text)}
                                        />

                                        {filteredState.map((item) => (
                                            <TouchableOpacity key={item.id} onPress={() => selectState(item)} style={styles.dropdownOption}>
                                                <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                <Text style={styles.errorText}>
                                    {selectededStateErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    City
                                </Text>

                                <TouchableOpacity style={styles.StatusTouchable}>
                                    <Text style={styles.StatusTouchableText}>
                                        {selectededCity.length > 0 ? selectededCity : 'Select a City'}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>

                                {dropdownVisible2 && (
                                    <View style={styles.dropdown}>
                                        {/* Input field for user to filter options */}
                                        <TextInput
                                            style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB' }]}
                                            placeholder="Search city..."
                                            value={searchInputcity}
                                            onChangeText={text => setSearchInputcity(text)}
                                        />

                                        {filteredCity.map((item) => (
                                            <TouchableOpacity key={item.id} onPress={() => selectCity(item)} style={styles.dropdownOption}>
                                                <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                <Text style={styles.errorText}>
                                    {selectededCityErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Pincode
                                </Text>

                                <TextInput
                                    value={pincode}
                                    onChangeText={(txt) => setPincode(txt)}
                                    style={styles.inputs}
                                    keyboardType="number-pad"
                                    editable={false}

                                />

                                <Text style={styles.errorText}>
                                    {pincodeErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Payment Method
                                </Text>

                                <TouchableOpacity style={styles.StatusTouchable}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedDocument2 && selectedDocument2.length > 0 ? selectedDocument2 : "Select Payment Method"}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                                {showDropdown2 && (
                                    <View style={styles.dropdown}>
                                        {documentList2.map((File, index) => (

                                            <TouchableOpacity key={index} onPress={() => selectDocument2(File)} style={styles.dropdownOption}>
                                                <Text style={styles.dropdownOptionText}>{File.payment_method}</Text>
                                            </TouchableOpacity>

                                        ))}
                                    </View>
                                )}

                                <Text style={styles.errorText}>
                                    {selectedDocument2Err}
                                </Text>

                                {/* <Text style={styles.StatDateText}>
                                    Payment Status
                                </Text>

                                <TouchableOpacity onPress={toggleDropdown6} style={styles.StatusTouchable}>

                                    <Text style={styles.StatusTouchableText}>
                                        {selectedDocument5 && selectedDocument5.length > 0 ? selectedDocument5 : "Select Payment Status"}
                                    </Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                                {showDropdown5 && (
                                    <View style={styles.dropdown}>
                                        {documentList5.map((File, index) => (

                                            <TouchableOpacity key={index} onPress={() => selectDocument5(File)} style={styles.dropdownOption}>
                                                <Text style={styles.dropdownOptionText}>{File.payment_type}</Text>
                                            </TouchableOpacity>

                                        ))}
                                    </View>
                                )}

                                <Text style={styles.errorText}>
                                    {selectedDocument5Err}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Offline Proof
                                </Text>

                                <TextInput
                                    value={offline}
                                    onChangeText={(txt) => setOffline(txt)}
                                    style={styles.inputs1}
                                    multiline={true}
                                    textAlignVertical="top"
                                />

                                <Text style={styles.errorText}>
                                    {offlineErr}
                                </Text> */}

                                <Text style={styles.StatDateText}>
                                    Reason
                                </Text>

                                <TextInput
                                    value={reason}
                                    onChangeText={(txt) => setReason(txt)}
                                    style={styles.inputs1}
                                    multiline={true}
                                    textAlignVertical="top"
                                    editable={false}
                                />

                                <Text style={styles.errorText}>
                                    {reasonErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Choose plan Amount
                                </Text>

                                <TouchableOpacity
                                    style={[styles.card, { backgroundColor: active ? PrimaryBlue : SubContainer }]}

                                >
                                    <Text>{documentList4[0]?.monthly_member ? `Rs. ${monthlyPlan}/monthly` : 'Rs. 0/monthly'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.card, { backgroundColor: active1 ? PrimaryBlue : SubContainer }]}

                                >
                                    <Text>Rs. {yearlyPlan ? yearlyPlan : 0}/Yearly (10% off)</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '10%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.StatDateText1}>Add Employee</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: PrimaryBlue, height: 30, borderRadius: 30 }}

                                        >
                                            <Text style={[styles.StatDateText1, { color: '#fff', fontWeight: 'bold' }]}>-</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '30%', alignItems: 'center' }}><Text style={styles.StatDateText1}>{count}</Text></View>
                                        <TouchableOpacity
                                            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: PrimaryBlue, height: 30, borderRadius: 30 }}

                                        >
                                            <Text style={[styles.StatDateText1, { color: '#fff', fontWeight: 'bold' }]}>+</Text></TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '5%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.StatDateText1}>Plan Amount</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{planAmount ? planAmount : 0}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '5%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.StatDateText1, { textAlign: 'center' }]}>Add On Employee Amount</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{addOnEmp ? addOnEmp : 0}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '5%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.StatDateText1]}>GST (18%)</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{totalGst ? totalGst : 0}</Text>
                                    </View>
                                </View>

                                {active1 ? <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '5%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.StatDateText1]}>Discount (10%)</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{discount ? discount : 0}</Text>
                                    </View>
                                </View> : null}

                                <View style={{ flexDirection: 'row', width: '90%', height: 50, marginTop: '10%' }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.StatDateText1]}>Total Amount</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{finalAmount ? finalAmount : 0}</Text>
                                    </View>
                                </View>

                                <Text style={styles.errorText}>
                                    { }
                                </Text>

                            </>
                    }

                    <Text style={styles.StatDateText}>
                        Status Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker2}>
                            {startDate2 ? formatDate(startDate2) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker2 && (
                            <DateTimePicker
                                value={startDate2 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Status
                    </Text>

                    {/* <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectededStatus || "Select Status"}</Text>
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

                            <TouchableOpacity onPress={() => selectStatus("Acheived")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Acheived</Text>
                            </TouchableOpacity>

                        </View>

                    )} */}

                    <TouchableOpacity onPress={toggleDropdown6} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument5 && selectedDocument5.length > 0 ? selectedDocument5 : "Select Payment Status"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown5 && (
                        <View style={styles.dropdown}>
                            {documentList5
                                .filter((File) => File.payment_type !== "Paid")
                                .map((File, index) => (
                                    <TouchableOpacity key={index} onPress={() => selectDocument5(File)} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>{File.payment_type}</Text>
                                    </TouchableOpacity>

                                ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocument5Err}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Comments
                    </Text>

                    <TextInput
                        value={statusComment}
                        onChangeText={(txt) => setStatusComment(txt)}
                        style={styles.inputs1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={styles.PolicyContainer1}>
                        <View style={styles.PolicyContainerTitleHeader1}>
                            <Text style={styles.PolicyContainerTitleText}>Status :</Text>
                        </View>

                        <View style={styles.Inputcontainer1}>
                            <ScrollView horizontal={true}>

                                <View style={styles.Tablecontainer1}>
                                    {loadData ? (
                                        <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                                    ) : (
                                        <View>

                                            <View style={[styles.row, styles.listHeader]}>
                                                <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                                <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Status Date</Text>
                                                <Text style={[styles.header, styles.cell, styles.StartDate]}>Status</Text>
                                                <Text style={[styles.header, styles.cell, styles.StartDate]}>Employee Name</Text>
                                                <Text style={[styles.header, styles.cell, styles.EndDate]}>Comments</Text>
                                            </View>

                                            {liststatus.length == 0 ? (
                                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                            ) : (
                                                liststatus.map((item, index) => (
                                                    <View key={index} style={[styles.row, styles.listBody]}>
                                                        <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                                        <Text style={[styles.cell, styles.DepartmentName]}>{item.status_date}</Text>
                                                        <Text style={[styles.cell, styles.StartDate]}>{item.leadstatus_name}</Text>
                                                        <Text style={[styles.cell, styles.StartDate]}>{item.employee_name}</Text>
                                                        <Text style={[styles.cell, styles.EndDate]}>{item.comments}</Text>
                                                    </View>
                                                ))
                                            )}
                                        </View>
                                    )
                                    }
                                </View>

                            </ScrollView>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                        <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.HeaderButtonTextActive}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton} onPress={onRefresh}>
                            <Text style={styles.HeaderButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

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

export default EditBuySalesInvoice; 
