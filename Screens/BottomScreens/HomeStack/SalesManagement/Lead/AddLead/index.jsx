import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const AddLead = ({ navigation }) => {

    // 

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [cName, setCName] = useState('');
    const [website, setWebsite] = useState('');
    const [area, setArea] = useState('');
    const [pincode, SetPincode] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [mailErr, setMailErr] = useState('');
    const [mobileNumberErr, setMobileNumberErr] = useState('');
    const [whatsAppNumberErr, setWhatsAppNumberErr] = useState('');
    const [cNameErr, setCNameErr] = useState('');
    const [websiteErr, setWebsiteErr] = useState('');
    const [areaErr, setAreaErr] = useState('');
    const [pincodeErr, SetPincodeErr] = useState('');

    const [productType, SetProductType] = useState('');
    const [productName, setProductName] = useState('');
    const [productTypeErr, SetProductTypeErr] = useState('');
    const [productNameErr, setProductNameErr] = useState('');
    const [salarymin, setSalarymin] = useState('');
    const [salaryminErr, setSalaryminErr] = useState('');
    const [salarymax, setSalarymax] = useState('');
    const [salarymaxErr, setSalarymaxErr] = useState('');
    const [details, setDetails] = useState('');
    const [detailsErr, setDetailsErr] = useState('');

    const [sName, setSName] = useState('');
    const [sNumber, setSNumber] = useState('');
    const [comment, setComment] = useState('');
    const [sNameErr, setSNameErr] = useState('');
    const [sNumberErr, setSNumberErr] = useState('');
    const [commentErr, setCommentErr] = useState('');

    const { data } = useSelector((state) => state.login);

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedCountryErr, setSelectedCountryErr] = useState('');
    const [selectedCountryId, setSelectedCountryId] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchInputcountry, setSearchInputcountry] = useState('');

    const filteredCountry = country.filter(item =>
        item.name.toLowerCase().includes(searchInputcountry.toLowerCase())
    );

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectCountry = (selectedCountry) => {
        setSelectedCountry(selectedCountry.name);
        setSelectedCountryId(selectedCountry.id);
        setSelectedState([]);
        setSelectedStateId([]);
        setDropdownVisible(false);
    };

    const CountApi = async () => {

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
        CountApi();
    }, [])

    const [state, setState] = useState([]);
    const [selectededState, setSelectedState] = useState([]);
    const [selectededStateErr, setSelectedStateErr] = useState('');
    const [selectedStateId, setSelectedStateId] = useState([]);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [searchInputstate, setSearchInputstate] = useState('');

    const filteredState = state.filter(item =>
        item.name.toLowerCase().includes(searchInputstate.toLowerCase())
    );

    const toggleDropdown1 = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectState = (selectededState) => {
        setSelectedState(selectededState.name);
        setSelectedStateId(selectededState.id);
        setSelectedCity([]);
        setSelectedCityId([]);
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

    const toggleDropdown2 = () => {
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

    // 

    const [leadId, setLeadId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/getautogenerateLeadId';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setLeadId(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
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

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(null);
    const [startDateErr1, setStartDateErr1] = useState(null);
    const formattedStartDate1 = startDate1 ?
        `${startDate1.getFullYear()}-${String(startDate1.getMonth() + 1).padStart(2, '0')}-${String(startDate1.getDate()).padStart(2, '0')}` :
        "";

    const handleDateChange1 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate1(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // 

    const [error, setError] = useState('');

    const handleSalaryMinChange = (txt) => {
        const filteredTxt = filterNumeric(txt);
        setSalarymin(filteredTxt);
        validateSalaries(filteredTxt, salarymax);
    };

    const handleSalaryMaxChange = (txt) => {
        const filteredTxt = filterNumeric(txt);
        setSalarymax(filteredTxt);
        validateSalaries(salarymin, filteredTxt);
    };

    const filterNumeric = (txt) => {
        return txt.replace(/[^0-9]/g, '');
    };

    const validateSalaries = (min, max) => {
        if (min && max && parseFloat(max) <= parseFloat(min)) {
            setError('Maximum salary must be greater than minimum salary');
        } else {
            setError('');
        }
    };

    const validateFields = () => {
        let isValid = true;

        if (!startDate) {
            setStartDateErr('Enter Lead Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        if (!name) {
            setNameErr('Enter Name');
            isValid = false;
        } else {
            setNameErr('');
        }

        if (!mail) {
            setMailErr('Enter Email');
            isValid = false;
        } else {

            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(mail)) {
                setMailErr('Please enter a valid email address');
                isValid = false;
            } else {
                setMailErr('');
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

        if (whatsAppNumber) {
            if (whatsAppNumber.length !== 10) {
                setWhatsAppNumberErr("Please enter a valid Phone Number");
                isValid = false;
            } else {
                setWhatsAppNumberErr('');
            }
        }

        if (!selectededGender) {
            setSelectedGenderErr('Select Gender');
            isValid = false;
        } else {
            setSelectedGenderErr('');
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

        if (!area) {
            setAreaErr('Enter Area');
            isValid = false;
        } else {
            setAreaErr('');
        }

        if (!productType) {
            SetProductTypeErr('Enter product Type');
            isValid = false;
        } else {
            SetProductTypeErr('');
        }

        return isValid;
    };

    const [load, SetLoad] = useState(false);

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            SetLoad(false);
            return;
        }

        try {

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/sales_addlead';

            const response = await axios.post(apiUrl, {
                created_by: data.userempid,
                role_id: data.userrole,
                user_name: name,
                user_email: mail,
                user_mobile: mobileNumber,
                user_whatapp: whatsAppNumber ? whatsAppNumber : '-',
                user_gender: selectededGender,
                user_city: selectedCityId,
                user_state: selectedStateId,
                user_country: selectedCountryId,
                user_pincode: pincode ? pincode : '-',
                user_company: cName ? cName : '-',
                user_website: website ? website : '-',
                user_leaddate: formattedStartDate,
                product_type: productType,
                product_name: productName ? productName : '-',
                user_area: area,
                min_budget: salarymin ? salarymin : '-',
                max_budget: salarymax ? salarymax : '-',
                description: details ? details : '-',
                source_name: sName ? sName : '-',
                source_number: sNumber ? sNumber : '-',
                call_backon: formattedStartDate1 ? formattedStartDate1 : startDate1,
                comment: comment ? comment : '-'
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                SetLoad(false);
                refresh();
            } else {
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const refresh = () => {
        setName('');
        setMail('');
        setDetails('');
        setMobileNumber('');
        setWhatsAppNumber('');
        setSelectedGender('');
        SetPincode('');
        setCName('');
        setWebsite('');
        setStartDate(null);
        setSalarymin('');
        setSalarymax('');
        setSName('');
        setSNumber('');
        setStartDate1(null);
        setComment('');
        setSelectedCityId([]);
        setSelectedStateId([]);
        setSelectedCountryId([]);
        setSelectedCity([]);
        setSelectedState([]);
        setSelectedCountry([]);
        setProductName('');
        SetProductType('');
        setArea('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Lead List');
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

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Personal Information</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Lead ID
                    </Text>

                    <TextInput
                        value={leadId}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Lead Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(txt) => setName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {nameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email
                    </Text>

                    <TextInput
                        value={mail}
                        onChangeText={(txt) => setMail(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {mailErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile No.
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
                        Whatsapp No.
                    </Text>

                    <TextInput
                        value={whatsAppNumber}
                        onChangeText={(txt) => setWhatsAppNumber(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {whatsAppNumberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Gender
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectededGender || "Select Gender"}</Text>
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
                        {selectededGenderErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Country
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedCountry.length > 0 ? selectedCountry : 'Select a country'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {/* {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {country.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectCountry(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )} */}

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

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown1}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededState.length > 0 ? selectededState : 'Select a State'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {/* {dropdownVisible1 && (
                        <View style={styles.dropdown}>
                            {state.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectState(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )} */}

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

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown2}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededCity.length > 0 ? selectededCity : 'Select a City'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {/* {dropdownVisible2 && (
                        <View style={styles.dropdown}>
                            {city.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectCity(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )} */}

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
                        Area
                    </Text>

                    <TextInput
                        value={area}
                        onChangeText={(txt) => setArea(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {areaErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Pincode
                    </Text>

                    <TextInput
                        value={pincode}
                        onChangeText={(txt) => SetPincode(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {pincodeErr}
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
                        Website
                    </Text>

                    <TextInput
                        value={website}
                        onChangeText={(txt) => setWebsite(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {websiteErr}
                    </Text>

                </View>


            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Requirement Details</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Product Type
                    </Text>

                    <TextInput
                        value={productType}
                        onChangeText={(txt) => SetProductType(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {productTypeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Product Name
                    </Text>

                    <TextInput
                        value={productName}
                        onChangeText={(txt) => setProductName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {productNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Budget ( Min )
                    </Text>

                    <TextInput
                        value={salarymin}
                        onChangeText={handleSalaryMinChange}
                        style={styles.Input}
                        placeholder="Enter Minimum Budget"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {salaryminErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Budget ( Max )
                    </Text>

                    <TextInput
                        value={salarymax}
                        onChangeText={handleSalaryMaxChange}
                        style={styles.Input}
                        placeholder="Enter Maximum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {error}
                        {salarymaxErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Requirements / Specification details
                    </Text>

                    <TextInput
                        value={details}
                        onChangeText={(txt) => setDetails(txt)}
                        multiline={true}
                        textAlignVertical="top"
                        style={styles.inputs1}
                    />

                    <Text style={styles.errorText}>
                        {detailsErr}
                    </Text>

                </View>

            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Source</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Source Name
                    </Text>

                    <TextInput
                        value={sName}
                        onChangeText={(txt) => setSName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {sNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Source Number
                    </Text>

                    <TextInput
                        value={sNumber}
                        onChangeText={(txt) => setSNumber(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {sNumberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Call On
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {startDate1 ? formatDate(startDate1) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={startDate1 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr1}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Comments ( If Any )
                    </Text>

                    <TextInput
                        value={comment}
                        onChangeText={(txt) => setComment(txt)}
                        style={styles.inputs1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {commentErr}
                    </Text>

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

                <TouchableOpacity style={styles.HeaderButton} onPress={refresh}>
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

export default AddLead; 