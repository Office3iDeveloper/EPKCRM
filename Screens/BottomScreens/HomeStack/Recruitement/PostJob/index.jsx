import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//     GetCountries,
//     GetState,
//     GetCity,
// } from "react-country-state-city";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import axios from "axios";
import { useSelector } from "react-redux";

const PostJob = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [load, setLoad] = useState(false);

    const [desgination, setDesignation] = useState('');
    const [desginationErr, setDesignationErr] = useState('');
    const [nofVaccancies, setNofVaccancies] = useState('');
    const [nofVaccanciesErr, setNofVaccanciesErr] = useState('');
    const [salarymin, setSalarymin] = useState('');
    const [salaryminErr, setSalaryminErr] = useState('');
    const [salarymax, setSalarymax] = useState('');
    const [salarymaxErr, setSalarymaxErr] = useState('');
    const [expmin, setExpmin] = useState('');
    const [expminErr, setExpminErr] = useState('');
    const [expmax, setExpmax] = useState('');
    const [expmaxErr, setExpmaxErr] = useState('');
    const [keySkills, setKeySkills] = useState('');
    const [keySkillsErr, setKeySkillsErr] = useState('');
    const [rolesRes, setRolesRes] = useState('');
    const [rolesResErr, setRolesResErr] = useState('');
    const [preferrerdCan, setPreferrerdCan] = useState('');
    const [preferrerdCanErr, setPreferrerdCanErr] = useState('');
    const [otherBenefits, setOtherBenefits] = useState('');
    const [otherBenefitsErr, setOtherBenefitsErr] = useState('');

    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState('');
    const [showDropdownstatus1, setShowDropdownstatus1] = useState(false);
    const [selectedStatus1, setSelectedStatus1] = useState(null);
    const [selectedStatusErr1, setSelectedStatusErr1] = useState('');
    const [showDropdownstatus2, setShowDropdownstatus2] = useState(false);
    const [selectedStatus2, setSelectedStatus2] = useState(null);
    const [selectedStatusErr2, setSelectedStatusErr2] = useState('');
    const [showDropdownstatus3, setShowDropdownstatus3] = useState(false);
    const [selectedStatus3, setSelectedStatus3] = useState(null);
    const [selectedStatusErr3, setSelectedStatusErr3] = useState('');

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    const toggleDropdownstatus1 = () => {
        setShowDropdownstatus1(!showDropdownstatus1);
    };

    const selectStatus1 = (status) => {
        setSelectedStatus1(status);
        setShowDropdownstatus1(false);
    };

    const toggleDropdownstatus2 = () => {
        setShowDropdownstatus2(!showDropdownstatus2);
    };

    const selectStatus2 = (status) => {
        setSelectedStatus2(status);
        setShowDropdownstatus2(false);
    };

    const toggleDropdownstatus3 = () => {
        setShowDropdownstatus3(!showDropdownstatus3);
    };

    const selectStatus3 = (status) => {
        setSelectedStatus3(status);
        setShowDropdownstatus3(false);
    };

    // handleDateChange

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
            const formattedStartDate = formatDate(date);
        }
        setShowDatePicker(false);
    };


    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [selectedCountryErr, setSelectedCountryErr] = useState(null);
    const [selectedStateErr, setSelectedStateErr] = useState(null);
    const [selectedCitiesErr, setSelectedCitiesErr] = useState(null);

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
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
            console.error('Error fetching State data:', error);
        }

    }

    useEffect(() => {
        StateApi();
    }, [selectedCountryId])

    const [city, setCity] = useState([]);
    const [selectededCity, setSelectedCity] = useState([]);
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
        setSelectedCity((prevSelectedCities) => {
            if (prevSelectedCities.some(city => city.id === selectedCity.id)) {
                return prevSelectedCities.filter(city => city.id !== selectedCity.id);
            } else {
                return [...prevSelectedCities, selectedCity];
            }
        });

        setSelectedCityId((prevSelectedCityIds) => {
            if (prevSelectedCityIds.includes(selectedCity.id)) {
                return prevSelectedCityIds.filter(id => id !== selectedCity.id);
            } else {
                return [...prevSelectedCityIds, selectedCity.id];
            }
        });
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
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        CityApi();
    }, [selectededState])

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

    const [error1, setError1] = useState('');

    const validateexp = (min, max) => {
        if (min && max && parseFloat(max) <= parseFloat(min)) {
            setError1('Maximum Experience must be greater than minimum Experience');
        } else {
            setError1('');
        }
    };

    const handleExpMin = (txt) => {
        setExpmin(txt);
        validateexp(txt, expmax);
    };

    const handleExpMax = (txt) => {
        setExpmax(txt);
        validateexp(expmin, txt);
    };

    const validateFields = () => {
        let isValid = true;

        if (!desgination) {
            setDesignationErr('Enter Designation');
            isValid = false;
        } else {
            setDesignationErr('');
        }

        if (!nofVaccancies) {
            setNofVaccanciesErr('Enter No Of Vacancies');
            isValid = false;
        } else {
            setNofVaccanciesErr('');
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
            setSelectedCitiesErr('Select City');
            isValid = false;
        } else {
            setSelectedCitiesErr('');
        }

        if (!selectedStatus1) {
            setSelectedStatusErr1('Select Job Type');
            isValid = false;
        } else {
            setSelectedStatusErr1('');
        }

        if (!selectedStatus3) {
            setSelectedStatusErr3('Select Employment Type');
            isValid = false;
        } else {
            setSelectedStatusErr3('');
        }

        if (!selectedStatus2) {
            setSelectedStatusErr2('Select Shift');
            isValid = false;
        } else {
            setSelectedStatusErr2('');
        }

        if (!salarymin) {
            setSalaryminErr('Enter Minimum Salary');
            isValid = false;
        } else {
            setSalaryminErr('');
        }

        if (!salarymax) {
            setSalarymaxErr('Enter Maximum Salary');
            isValid = false;
        } else {
            setSalarymaxErr('');
        }

        if (!expmin) {
            setExpminErr('Enter Minimum Experience');
            isValid = false;
        } else {
            setExpminErr('');
        }

        if (!expmax) {
            setExpmaxErr('Enter Maximum Experience');
            isValid = false;
        } else {
            setExpmaxErr('');
        }

        if (!keySkills) {
            setKeySkillsErr('Enter Key Skills');
            isValid = false;
        } else {
            setKeySkillsErr('');
        }

        if (!rolesRes) {
            setRolesResErr('Enter Roles & Responsibilities');
            isValid = false;
        } else {
            setRolesResErr('');
        }

        if (!preferrerdCan) {
            setPreferrerdCanErr('Enter Preferred Candidates');
            isValid = false;
        } else {
            setPreferrerdCanErr('');
        }

        if (!otherBenefits) {
            setOtherBenefitsErr('Enter Other Benefits');
            isValid = false;
        } else {
            setOtherBenefitsErr('');
        }

        if (!selectedStatus) {
            setSelectedStatusErr('Select Status');
            isValid = false;
        } else {
            setSelectedStatusErr('');
        }

        if (!formattedStartDate) {
            setStartDateErr('Select Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/add_job_post';

            const response = await axios.post(apiUrl, {
                designation: desgination,
                no_of_vacancies: nofVaccancies,
                job_countries: selectedCountryId,
                job_states: selectedStateId,
                job_cities: selectedCityId.join(', '),
                job_type: selectedStatus1,
                emp_type: selectedStatus3,
                shift: selectedStatus2,
                salary_min: salarymin,
                salary_max: salarymax,
                experience_min: expmin,
                experience_max: expmax,
                key_skills: keySkills,
                preferred_candidate: preferrerdCan,
                roles_responsiblities: rolesRes,
                other_benefits: otherBenefits,
                job_status: selectedStatus,
                valid_till: formattedStartDate,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                setLoad(false);
            } else {
                handleShowAlert1(responseData.message);
                setLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            console.error('Error fetching data:', error);
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
            navigation.navigate('List Job');
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

    const onRefresh = () => {
        setDesignation('');
        setDesignationErr('');
        setNofVaccancies('');
        setNofVaccanciesErr('');
        setSelectedCountryErr('');
        setSelectedStateErr('');
        setSelectedCitiesErr('');
        setSelectedCountry([]);
        setSelectedCity([]);
        setSelectedState([]);
        setSelectedCountryId([]);
        setSelectedCityId([]);
        setSelectedStateId([]);
        setSelectedStatus1(null);
        setSelectedStatusErr1('');
        setSelectedStatus2(null);
        setSelectedStatusErr2('');
        setSelectedStatus3(null);
        setSelectedStatusErr3('');
        setSelectedStatus(null);
        setSelectedStatusErr('');
        setSalarymin('');
        setSalaryminErr('');
        setSalarymaxErr('');
        setSalarymax('');
        setExpmin('');
        setExpminErr('');
        setExpmax('');
        setExpmaxErr('');
        setKeySkills('');
        setKeySkillsErr('');
        setPreferrerdCan('');
        setPreferrerdCanErr('');
        setRolesRes('');
        setRolesResErr('');
        setOtherBenefits('');
        setOtherBenefitsErr('');
        setStartDateErr('');
        setStartDate(null);
    }

    return (
        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Post Job</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Designation
                    </Text>

                    <TextInput
                        value={desgination}
                        onChangeText={(txt) => setDesignation(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Designation"
                    />

                    <Text style={styles.errorText}>
                        {desginationErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. of Vacancies
                    </Text>

                    <TextInput
                        value={nofVaccancies}
                        onChangeText={(txt) => setNofVaccancies(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter No of Vacancies"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {nofVaccanciesErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Country
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

                    <Text style={styles.ShiftSlotText}>
                        Job State
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
                        {selectedStateErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job City
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown2}>
                        <Text style={styles.StatusTouchableText}>
                            {/* {selectededCity.length > 0 ? selectededCity : 'Select a City'} */}
                            {selectededCity.length > 0
                                ? selectededCity.map(city => city.name).join(', ')
                                : 'Select a City'}
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
                        {selectedCitiesErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus1 || "Select Job Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus1 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus1("Remote")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Remote</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus1("On-Site")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>On-Site</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus1("Hybrid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Hybrid</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr1}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Employment Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus3} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus3 || "Select Employment Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus3 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus3("Full time / Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Full time / Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Part time / Temporary")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Part time / Temporary</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Internship")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Internship</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Freelance")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Freelance</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr3}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Schedule / Shift
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus2} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus2 || "Select Schedule / Shift"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus2 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus2("General Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>General Shift</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus2("Night Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Night Shift</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus2("Rotational Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Rotational Shift</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr2}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Min)
                    </Text>

                    <TextInput
                        value={salarymin}
                        onChangeText={handleSalaryMinChange}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Minimum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {salaryminErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Max)
                    </Text>

                    <TextInput
                        value={salarymax}
                        onChangeText={handleSalaryMaxChange}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {error}
                        {salarymaxErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Experience (Min)
                    </Text>

                    <TextInput
                        value={expmin}
                        onChangeText={handleExpMin}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Minimum Experience"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {expminErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Experience (Max)
                    </Text>

                    <TextInput
                        value={expmax}
                        onChangeText={handleExpMax}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Experience"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {error1}
                        {expmaxErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Key Skills
                    </Text>

                    <TextInput
                        value={keySkills}
                        onChangeText={(txt) => setKeySkills(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Add Tag"
                    />

                    <Text style={styles.errorText}>
                        {keySkillsErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Roles & Responsibilities
                    </Text>

                    <TextInput
                        value={rolesRes}
                        onChangeText={(txt) => setRolesRes(txt)}
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {rolesResErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Preferred Candidate
                    </Text>

                    <TextInput
                        value={preferrerdCan}
                        onChangeText={(txt) => setPreferrerdCan(txt)}
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {preferrerdCanErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Other Benefits
                    </Text>

                    <TextInput
                        value={otherBenefits}
                        onChangeText={(txt) => setOtherBenefits(txt)}
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {otherBenefitsErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Job Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus && (

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
                        {selectedStatusErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Valid Till
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
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


                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={HandleSubmit}
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

export default PostJob;