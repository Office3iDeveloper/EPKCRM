import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddCompany/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditCompany = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    const { data } = useSelector((state) => state.login);

    // 

    const [cName, setCName] = useState('');
    const [mName, setMName] = useState('');
    const [address, setAddress] = useState('');
    const [gstin, setGstin] = useState('');
    const [cType, setCType] = useState('');
    const [cNameErr, setCNameErr] = useState('');
    const [mNameErr, setMNameErr] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [gstinErr, setGstinErr] = useState('');
    const [cTypeErr, setCTypeErr] = useState('');

    const [hName, setHName] = useState('');
    const [accNo, setAccNo] = useState('');
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [panNo, setPanNo] = useState('');
    const [hNameErr, setHNameErr] = useState('');
    const [accNoErr, setAccNoErr] = useState('');
    const [bankNameErr, setBankNameErr] = useState('');
    const [branchNameErr, setBranchNameErr] = useState('');
    const [ifscErr, setIfscErr] = useState('');
    const [bankAddressErr, setBankAddressErr] = useState('');
    const [panNoErr, setPanNoErr] = useState('');

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
        setDropdownVisible(false);
        setSelectedCity([]);
        setSelectedCityId([]);
        setSelectedState([]);
        setSelectedStateId([]);
    };

    const CountApi = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/country_list';
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
        setDropdownVisible1(false);
        setSelectedCity([]);
        setSelectedCityId([]);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/state_list/${selectedCountryId}`;
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
            const apiUrl = `https://office3i.com/development/api/public/api/city_list/${selectedStateId}`;
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

    const validateFields = () => {
        let isValid = true;

        if (!cName) {
            setCNameErr('Enter Company Name');
            isValid = false;
        } else {
            setCNameErr('');
        }

        if (!mName) {
            setMNameErr('Enter Mailling Name');
            isValid = false;
        } else {
            setMNameErr('');
        }

        if (!address) {
            setAddressErr('Enter Address');
            isValid = false;
        } else {
            setAddressErr('');
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

        if (!gstin) {
            setGstinErr('Enter GSTIN / UIN');
            isValid = false;
        } else {
            setGstinErr('');
        }

        if (!cType) {
            setCTypeErr('Enter Company Type');
            isValid = false;
        } else {
            setCTypeErr('');
        }

        if (!hName) {
            setHNameErr('Enter Holder Name');
            isValid = false;
        } else {
            setHNameErr('');
        }

        if (!accNo) {
            setAccNoErr('Enter Account Number');
            isValid = false;
        } else {
            setAccNoErr('');
        }

        if (!bankName) {
            setBankNameErr('Enter Bank Name');
            isValid = false;
        } else {
            setBankNameErr('');
        }

        if (!branchName) {
            setBranchNameErr('Enter Branch Name');
            isValid = false;
        } else {
            setBranchNameErr('');
        }

        if (!ifsc) {
            setIfscErr('Enter IFSC Code');
            isValid = false;
        } else {
            setIfscErr('');
        }

        if (!bankAddress) {
            setBankAddressErr('Enter Bank Address');
            isValid = false;
        } else {
            setBankAddressErr('');
        }

        if (!panNo) {
            setPanNoErr('Enter Pan No');
            isValid = false;
        } else {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (!panRegex.test(panNo)) {
                setPanNoErr('PAN Number must be in the format: first 5 letters, next 4 numbers, last 1 letter');
                isValid = false;
            } else {
                setPanNoErr('');
            }
        }

        if (!selectededStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
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

            const apiUrl = 'https://office3i.com/development/api/public/api/update_company_information';

            const response = await axios.put(apiUrl, {
                id: SpecId,
                updated_by: data.userempid,
                company_name: cName,
                mailing_name: mName,
                address: address,
                country: selectedCountryId,
                state: selectedStateId,
                city: selectedCityId,
                gstin_uin: gstin,
                company_type: cName,
                account_holder_name: hName,
                account_number: accNo,
                ifsc_code: ifsc,
                branch_name: branchName,
                bank_address: bankAddress,
                bank_name: bankName,
                pan_no: panNo,
                status: selectededStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

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

    const refresh = () => {
        navigation.navigate("Company List")
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Company List');
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

    const [datalist, setDatalist] = useState([]);

    const GetData = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/editview_company_information/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDatalist(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        GetData();
    }, []);

    useEffect(() => {
        setCName(datalist.company_name);
        setMName(datalist.mailing_name);
        setAddress(datalist.address);
        setGstin(datalist.gstin_uin);
        setCType(datalist.company_type);
        setHName(datalist.account_holder_name);
        setAccNo(datalist.account_number);
        setBankName(datalist.bank_name);
        setBranchName(datalist.branch_name);
        setIfsc(datalist.ifsc_code);
        setBankAddress(datalist.bank_address);
        setPanNo(datalist.pan_no);
        setSelectedStatus(datalist.status);
        setSelectedCountryId(datalist.country);
        setSelectedStateId(datalist.state);
        setSelectedCityId(datalist.city);
        setSelectedCountry(datalist.countryname);
        setSelectedState(datalist.statename);
        setSelectedCity(datalist.cityname);
    }, [datalist])

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Company Information</Text>
                </View>

                <View style={styles.Inputcontainer}>

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
                        Mailing Name
                    </Text>

                    <TextInput
                        value={mName}
                        onChangeText={(txt) => setMName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {mNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Address
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

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedCountry && selectedCountry.length > 0 ? selectedCountry : 'Select a country'}
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
                                style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB', height: 50 }]}
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
                            {selectededState && selectededState.length > 0 ? selectededState : 'Select a State'}
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
                                style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB', height: 50 }]}
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
                            {selectededCity && selectededCity.length > 0 ? selectededCity : 'Select a City'}
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
                                style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB', height: 50 }]}
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
                        GSTIN / UIN
                    </Text>

                    <TextInput
                        value={gstin}
                        onChangeText={(txt) => setGstin(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {gstinErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Company Type
                    </Text>

                    <TextInput
                        value={cType}
                        onChangeText={(txt) => setCType(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {cTypeErr}
                    </Text>

                </View>

            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Bank Details</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Holder Name
                    </Text>

                    <TextInput
                        value={hName}
                        onChangeText={(txt) => setHName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {hNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Account No
                    </Text>

                    <TextInput
                        value={accNo}
                        onChangeText={(txt) => setAccNo(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {accNoErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Bank Name
                    </Text>

                    <TextInput
                        value={bankName}
                        onChangeText={(txt) => setBankName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {bankNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Branch Name
                    </Text>

                    <TextInput
                        value={branchName}
                        onChangeText={(txt) => setBranchName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {branchNameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        IFSC Code
                    </Text>

                    <TextInput
                        value={ifsc}
                        onChangeText={(txt) => setIfsc(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {ifscErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Bank Address
                    </Text>

                    <TextInput
                        value={bankAddress}
                        onChangeText={(txt) => setBankAddress(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {bankAddressErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Pan No
                    </Text>

                    <TextInput
                        value={panNo}
                        onChangeText={(txt) => setPanNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {panNoErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

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

                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectededStatusErr}
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

export default EditCompany; 