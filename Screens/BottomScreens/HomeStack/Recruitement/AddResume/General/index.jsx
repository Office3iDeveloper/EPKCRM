import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

const AddGeneral = ({
    navigation,
    docFile,
    docFileErr,
    handleDocumentSelection,
    validation,
    prefcity,
    selectededPrefCity,
    selectedPrefCityId,
    setSelectedPrefCityId,
    setSelectedPrefCity,
    setDropdownVisible3,
    dropdownVisible3,
    setPrefCity }) => {

    // Employee from redux store 

    const dispatch = useDispatch();

    const { Resume } = useSelector((state) => state.resume);
    const { data } = useSelector((state) => state.login);

    const handleFieldsChange = (fieldName, value) => {
        dispatch({
            type: 'UPDATE_RESUME_FIELDS',
            payload: { [fieldName]: value }
        });
    };

    // Select Gender

    const [showGender, setShowGender] = useState(false);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setShowGender(false);
        handleFieldsChange('gender', Gender);
    };

    // Select Source

    const [showSource, setShowSource] = useState(false);

    const toggleDropdownSource = () => {
        setShowSource(!showSource);
    };

    const selectSource = (Source) => {
        setShowSource(false);
        handleFieldsChange('source', Source);
    };

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
            const formattedStartDate = formatDate(date);
            handleFieldsChange('dob', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Api call for Ug 

    const [degree, setDegree] = useState([]);
    const [selectedDegreeErr, setSelectedDegreeErr] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/ug_list';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setDegree(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectDegree = (shift) => {
        // setSelectedDegree(shift.degree_lists);
        // setSelectedDegreeId(shift.id);
        handleFieldsChange('uDegree', shift.degree_lists);
        handleFieldsChange('uDegreeid', shift.id);
        setShowDropdown(false);
    };


    // Api call for Pg 

    const [pgDegree, setPgDegree] = useState([]);
    const [selectedPgDegreeErr, setSelectedPgDegreeErr] = useState(null);
    const [showDropdown1, setShowDropdown1] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/pg_list';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setPgDegree(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    };

    const selectPgDegree = (shift) => {
        handleFieldsChange('pDegree', shift.degree_lists);
        handleFieldsChange('pDegreeid', shift.id);
        setShowDropdown1(false);
    };

    // 

    const [country, setCountry] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchInputcountry, setSearchInputcountry] = useState('');

    const toggleDropdown3 = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectCountry = (selectedCountry) => {
        handleFieldsChange('country', selectedCountry.name);
        handleFieldsChange('countryid', selectedCountry.id);
        handleFieldsChange('state', "");
        handleFieldsChange('stateid', "");
        handleFieldsChange('city', "");
        handleFieldsChange('cityId', "");
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

    const filteredCountry = country.filter(item =>
        item.name.toLowerCase().includes(searchInputcountry.toLowerCase())
    );

    const [state, setState] = useState([]);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [searchInputstate, setSearchInputstate] = useState('');

    const toggleDropdown4 = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectState = (selectededState) => {
        handleFieldsChange('state', selectededState.name);
        handleFieldsChange('stateid', selectededState.id);
        handleFieldsChange('city', "");
        handleFieldsChange('cityId', "");
        setDropdownVisible1(false);
    };

    const filteredState = state.filter(item =>
        item.name.toLowerCase().includes(searchInputstate.toLowerCase())
    );

    const StateApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/state_list/${Resume.countryid}`;
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
    }, [Resume.countryid])

    const [city, setCity] = useState([]);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [searchInputcity, setSearchInputcity] = useState('');

    const toggleDropdown5 = () => {
        setDropdownVisible2(!dropdownVisible2);
    };

    const selectCity = (selectedCity) => {
        handleFieldsChange('city', selectedCity.name);
        handleFieldsChange('cityId', selectedCity.id);
        setDropdownVisible2(false);
    };

    const CityApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/city_list/${Resume.stateid}`;
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

    const filteredCity = city.filter(item =>
        item.name.toLowerCase().includes(searchInputcity.toLowerCase())
    );

    useEffect(() => {
        CityApi();
    }, [Resume.stateid])

    // 

    const [searchInput, setSearchInput] = useState('');

    const filteredPrefCity = prefcity.filter(item =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toggleDropdown6 = () => {
        setDropdownVisible3(!dropdownVisible3);
    };

    const selectPrefCity = (selectedPrefCity) => {
        setSelectedPrefCity((prevSelectedCities) => {
            if (prevSelectedCities.some(city => city.id === selectedPrefCity.id)) {
                return prevSelectedCities.filter(city => city.id !== selectedPrefCity.id);
            } else {
                return [...prevSelectedCities, selectedPrefCity.name];
            }
        });

        setSelectedPrefCityId((prevSelectedCityIds) => {
            if (prevSelectedCityIds.includes(selectedPrefCity.id)) {
                return prevSelectedCityIds.filter(id => id !== selectedPrefCity.id);
            } else {
                return [...prevSelectedCityIds, selectedPrefCity.id];
            }
        });

        setDropdownVisible3(false);

    };

    const PrefCityApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/all_city_list`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setPrefCity(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        PrefCityApi();
    }, [])

    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>General</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Source
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownSource} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.source || "Select Source"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showSource && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectSource("Social Media")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Social Media</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("NewsPaper")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>NewsPaper</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Advertisement")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Advertisement</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Friends Referral")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Friends Referral</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Others")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Others</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.source ? "Source Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Name
                    </Text>

                    <TextInput
                        value={Resume.candidateName}
                        onChangeText={(text) => handleFieldsChange('candidateName', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.candidateName ? "Candidate Name Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Position Applying For
                    </Text>

                    <TextInput
                        value={Resume.positionApplying}
                        onChangeText={(text) => handleFieldsChange('positionApplying', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.positionApplying ? "Position Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Gender
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.gender || "Select Gender"}</Text>
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
                        {validation ? (!Resume.gender ? "Gender Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email
                    </Text>

                    <TextInput
                        value={Resume.email}
                        onChangeText={(text) => handleFieldsChange('email', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.email ? "Email Required" : !emailRegex.test(Resume.email) ? "Please enter a valid email address" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile No
                    </Text>

                    <TextInput
                        value={Resume.mobileNo}
                        onChangeText={(text) => handleFieldsChange('mobileNo', text)}
                        keyboardType="number-pad"
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (
                            !Resume.mobileNo ?
                                "Phone Number Required" :
                                Resume.mobileNo.length !== 10 ?
                                    "Phone Number must be exactly 10 digits" :
                                    null
                        ) : null}
                    </Text>


                    <Text style={styles.StatDateText}>
                        Alternate Mobile No
                    </Text>

                    <TextInput
                        value={Resume.alternativeMobileNo}
                        onChangeText={(text) => handleFieldsChange('alternativeMobileNo', text)}
                        keyboardType="number-pad"
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date of Birth
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
                        {validation ? (!Resume.dob ? "Date Of Birth Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Country
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown3}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.country ? Resume.country : 'Select a country'}
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
                        {validation ? (!Resume.country ? "Country Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        State
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown4}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.state ? Resume.state : 'Select a State'}
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
                        {validation ? (!Resume.state ? "State Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        City
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown5}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.city ? Resume.city : 'Select a City'}
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
                        {validation ? (!Resume.city ? "City Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Preferred Location
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown6}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededPrefCity.length > 0
                                ? selectededPrefCity.join(', ')
                                : 'Select Preferred City'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {/* {dropdownVisible3 && (
                        <View style={styles.dropdown}>
                            {prefcity.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectPrefCity(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )} */}

                    {dropdownVisible3 && (
                        <View style={styles.dropdown}>
                            {/* Input field for user to filter options */}
                            <TextInput
                                style={[styles.StatusTouchableText, { paddingLeft: 10, backgroundColor: '#D4E7EB' }]}
                                placeholder="Search Preferred location..."
                                value={searchInput}
                                onChangeText={text => setSearchInput(text)}
                            />

                            {filteredPrefCity.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => selectPrefCity(item)}
                                    style={styles.dropdownOption}
                                >
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {validation ? (Resume.preferedLocation.length == 0 ? "Prefered Location Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Languages Known
                    </Text>

                    <TextInput
                        value={Resume.languageKnown}
                        onChangeText={(text) => handleFieldsChange('languageKnown', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.languageKnown ? "Language Required" : null) : null}
                    </Text>

                </View>


            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Under Graduate</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Degree
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown}>

                        <Text style={styles.StatusTouchableText}>{Resume.uDegree || "Select Degree"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {degree.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDegree(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.degree_lists}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.uDegree ? "UG Degree Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={Resume.uSpecialization}
                        onChangeText={(text) => handleFieldsChange('uSpecialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.uSpecialization ? "Specialization Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={Resume.uYearOfPassing}
                        onChangeText={(text) => handleFieldsChange('uYearOfPassing', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!Resume.uYearOfPassing ? "Year Of Passing Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={Resume.uSchoolUniversity}
                        onChangeText={(text) => handleFieldsChange('uSchoolUniversity', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                </View>

            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Post Graduate</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Degree
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown1}>

                        <Text style={styles.StatusTouchableText}>{Resume.pDegree || "Select PgDegree"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown1 && (
                        <View style={styles.dropdown}>
                            {pgDegree.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectPgDegree(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.degree_lists}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedPgDegreeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={Resume.pSpecialization}
                        onChangeText={(text) => handleFieldsChange('pSpecialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={Resume.pYearOfPassing}
                        onChangeText={(text) => handleFieldsChange('pYearOfPassing', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={Resume.pSchoolUniversity}
                        onChangeText={(text) => handleFieldsChange('pSchoolUniversity', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Certification
                    </Text>

                    <TextInput
                        value={Resume.pCertification}
                        onChangeText={(text) => handleFieldsChange('pCertification', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attachment
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile ? docFile[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default AddGeneral; 