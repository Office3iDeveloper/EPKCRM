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

const AddCustomer = ({ navigation }) => {

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
    // console.log(documentList4, "documentList4")

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
    const [tplanAmount, setTplanAmount] = useState(0);
    // console.log(tplanAmount,"tplanAmount")

    const gstPercentage = 18;
    const Discount = 10;

    useEffect(() => {
        setTplanAmount(parseFloat(documentList4[0]?.price) + addOnEmp || 0);
    }, [documentList4, addOnEmp])

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

    const validateFields = () => {

        let isValid = true;

        if (!fName) {
            setFNameErr('Enter First Name');
            isValid = false;
        } else {
            setFNameErr('');
        }

        if (!lName) {
            setLNameErr('Enter Last Name');
            isValid = false;
        } else {
            setLNameErr('');
        }

        if (!email) {
            setEmailErr('Enter E-mail');
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                setEmailErr("Please enter a valid email address");
                isValid = false;
            } else {
                setEmailErr('');
            }
        }

        if (!mobileNumber) {
            setMobileNumberErr('Enter Mobile Number');
            isValid = false;
        } else {
            if (mobileNumber.length !== 10) {
                setMobileNumberErr("Please enter a valid Phone Number");
                isValid = false;
            } else {
                setMobileNumberErr('');
            }
        }

        if (!companyName) {
            setCompanyNameErr('Enter Company Name');
            isValid = false;
        } else {
            setCompanyNameErr('');
        }

        if (!password) {
            setPasswordErr('Enter Password');
            isValid = false;
        } else {
            setPasswordErr('');
        }

        if (selectedDocument.length == 0) {
            setSelectedDocumentErr('Select Module');
            isValid = false;
        } else {
            setSelectedDocumentErr('');
        }

        if (selectedDocument1.length == 0) {
            setSelectedDocument1Err('Select Plan');
            isValid = false;
        } else {
            setSelectedDocument1Err('');
        }

        if (selectedDocument == "Buy Now") {
            if (selectedDocument2.length == 0) {
                setSelectedDocument2Err('Select Payment Method');
                isValid = false;
            } else {
                setSelectedDocument2Err('');
            }

            if (selectedCountry.length == 0) {
                setSelectedCountryErr('Select Country');
                isValid = false;
            } else {
                setSelectedCountryErr('');
            }

            if (selectededState.length == 0) {
                setSelectedStateErr('Select State');
                isValid = false;
            } else {
                setSelectedStateErr('');
            }

            if (selectededCity.length == 0) {
                setSelectedCityErr('Select City');
                isValid = false;
            } else {
                setSelectedCityErr('');
            }

            if (!gst) {
                setGstErr('Enter Gst');
                isValid = false;
            } else {
                setGstErr('')
            }

            if (!pincode) {
                setPincodeErr('Enter Pincode');
                isValid = false;
            } else {
                setPincodeErr('')
            }

            if (!address) {
                setAddressErr('Enter Address');
                isValid = false;
            } else {
                setAddressErr('')
            }

            if (!reason) {
                setReasonErr('Reason Required');
                isValid = false;
            } else {
                setReasonErr('');
            }
        }

        if (!selectededStatus) {
            setSelectedStatusErr('Select Demo Mode');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }

        if (selectededStatus === "Sales-Team") {
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
        } else {
            setSelectedDepartmentsErr('');
            setSelectedMemberErr('');
        }

        return isValid;
    };

    // console.log(
    //     "first_name:", fName,
    //     "last_name:", lName,
    //     "email:", email,
    //     "mobile_number:", mobileNumber,
    //     "company_name:", companyName,
    //     "password:", password,
    //     "module_id:", selectedDocumentId,
    //     "plan_id:", selectedDocument1Id,
    //     "demo_mode:", selectededStatus,
    //     "assign_department:", selectedDepartmentsId,
    //     "assign_member:", selectedMemberId,
    //     "created_by:", data.userempid,
    //     "gstin:", gst,
    //     "billing_address:", address,
    //     "country:", selectedCountryId,
    //     "state:", selectedStateId,
    //     "city:", selectedCityId,
    //     "pin_code:", pincode,
    //     "add_emp_count:", count,
    //     "total_emp_count:", tcount,
    //     "plan_period:", plan,
    //     "total_plan_amt:", tplanAmount,
    //     "add_emp_amt:", addOnEmp,
    //     "tax_amt:", totalGst,
    //     "discount_amount:", discount,
    //     "overall_amt:", finalAmount,
    //     "payment_method:", selectedDocument2Id,
    //     "pay_reason:", reason
    // )

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/office3i_add_lead';

            const response = await axios.post(apiUrl, {
                first_name: fName,
                last_name: lName,
                email: email,
                mobile_number: mobileNumber,
                company_name: companyName,
                password: password,
                module_id: selectedDocumentId,
                plan_id: selectedDocument1Id,
                demo_mode: selectededStatus || null,
                assign_department: selectedDepartmentsId || null,
                assign_member: selectedMemberId || null,
                created_by: data.userempid,
                gstin: gst || null,
                billing_address: address || null,
                country: selectedCountryId || [],
                state: selectedStateId || [],
                city: selectedCityId || [],
                pin_code: pincode || null,
                add_emp_count: count || 0,
                total_emp_count: tcount || 0,
                plan_period: plan || null,
                // total_plan_amt: planAmount || 0,
                total_plan_amt: tplanAmount || 0,
                add_emp_amt: addOnEmp || 0,
                tax_amt: totalGst || 0,
                discount_amount: discount || 0,
                overall_amt: finalAmount || 0,
                payment_method: selectedDocument2Id || null,
                pay_reason: reason || null
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
        setFName('');
        setLName('');
        setEmail('');
        setMobileNumber('');
        setCompanyName('');
        setPassword('');
        setSelectedDocument([]);
        setSelectedDocument1([]);
        setSelectedDocument2([]);
        setSelectedDocumentId();
        setSelectedDocumen1Id();
        setSelectedDocumen2Id();
        setGst('');
        setAddress('');
        setPincode('');
        setReason('');
        setFNameErr('');
        setLNameErr('');
        setEmailErr('');
        setMobileNumberErr('');
        setCompanyNameErr('');
        setPasswordErr('');
        setGstErr('');
        setAddressErr('');
        setPincodeErr('');
        setReasonErr('');
        setSelectedDocumentErr('');
        setSelectedDocument1Err('');
        setSelectedDocument2Err('');
        setSelectedCityId([]);
        setSelectedStateId([]);
        setSelectedCountryId([]);
        setSelectedCity([]);
        setSelectedState([]);
        setSelectedCountry([]);
        setSelectedCityErr('');
        setSelectedCountryErr('');
        setSelectedStateErr('');
        setSelectedStatus('');
        setSelectedStatusErr('');
        setSelectedDepartments('');
        setSelectedDepartmentsId('');
        setSelectedDepartmentsErr('');
        setSelectedMember('');
        setSelectedMemberId('');
        setSelectedMemberErr('');

        setPlan('');
        setCount(0);
        setMonthlyPlan(0);
        setYearlyPlan(0);
        setAddOn(0);
        setAddOnEmp(0);
        setPlanAmount(0);
        setTotalGst(0);
        setFinalAmount(0);
        setDiscount(0);
        setActive(false);
        setActive1(false);
    }

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Customer</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        First Name
                    </Text>

                    <TextInput
                        value={fName}
                        onChangeText={(txt) => setFName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {fNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Last Name
                    </Text>

                    <TextInput
                        value={lName}
                        onChangeText={(txt) => setLName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {lNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email ID
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                        style={styles.inputs}
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
                    />

                    <Text style={styles.errorText}>
                        {passwordErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Select Module
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

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

                            <TouchableOpacity onPress={toggleDropdown1} style={styles.StatusTouchable}>

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

                    <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

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

                                <Text style={styles.StatDateText}>
                                    Select Member
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
                                />

                                <Text style={styles.errorText}>
                                    {addressErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Country
                                </Text>

                                <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown3}>
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

                                <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown4}>
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

                                <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown5}>
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
                                />

                                <Text style={styles.errorText}>
                                    {pincodeErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Payment Method
                                </Text>

                                <TouchableOpacity onPress={toggleDropdown2} style={styles.StatusTouchable}>

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

                                <Text style={styles.StatDateText}>
                                    Reason
                                </Text>

                                <TextInput
                                    value={reason}
                                    onChangeText={(txt) => setReason(txt)}
                                    style={styles.inputs1}
                                    multiline={true}
                                    textAlignVertical="top"
                                />

                                <Text style={styles.errorText}>
                                    {reasonErr}
                                </Text>

                                <Text style={styles.StatDateText}>
                                    Choose plan Amount
                                </Text>

                                <TouchableOpacity
                                    style={[styles.card, { backgroundColor: active ? PrimaryBlue : SubContainer }]}
                                    onPress={() => HandleMonthly(monthlyPlan)}
                                >
                                    <Text>{documentList4[0]?.monthly_member ? `Rs. ${monthlyPlan}/monthly` : 'Rs. 0/monthly'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.card, { backgroundColor: active1 ? PrimaryBlue : SubContainer }]}
                                    onPress={() => HandleYearly(yearlyPlan)}
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
                                            onPress={decrement}
                                        >
                                            <Text style={[styles.StatDateText1, { color: '#fff', fontWeight: 'bold' }]}>-</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '30%', alignItems: 'center' }}><Text style={styles.StatDateText1}>{count}</Text></View>
                                        <TouchableOpacity
                                            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: PrimaryBlue, height: 30, borderRadius: 30 }}
                                            onPress={increment}
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

export default AddCustomer; 
