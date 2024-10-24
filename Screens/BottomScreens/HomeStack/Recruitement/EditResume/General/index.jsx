import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

const EditGeneral = ({
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
    setPrefCity,
    setResume,
    resume,
    EdocFile,
    setEdocFile
}) => {

    const val = (resume && resume.length > 0) ? resume[0] : {};

    // Employee from redux store 

    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.login);

    const updateResumeFields = (updatedFields) => ({
        type: 'UPDATE_RESUME_FIELDS',
        payload: updatedFields
    });

    const updateResumeField = (fieldName, value) => {
        const updatedResume = [...resume];
        updatedResume[0] = { ...updatedResume[0], [fieldName]: value };
        setResume(updatedResume);
    };


    // Select Gender

    const [showGender, setShowGender] = useState(false);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setShowGender(false);
        updateResumeField('gender', Gender);
    };

    // Select Source

    const [showSource, setShowSource] = useState(false);

    const toggleDropdownSource = () => {
        setShowSource(!showSource);
    };

    const selectSource = (Source) => {
        setShowSource(false);
        updateResumeField('source', Source);
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
            updateResumeField('dob', formattedStartDate);
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
        updateResumeField('ug_degree', shift.degree_lists);
        updateResumeField('under_graduate', shift.id);
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
        updateResumeField('pg_degree', shift.degree_lists);
        updateResumeField('post_graduate', shift.id);
        setShowDropdown1(false);
    };

    // 

    const [selectedCountryErr, setSelectedCountryErr] = useState(null);
    const [selectedStateErr, setSelectedStateErr] = useState(null);
    const [selectedCitiesErr, setSelectedCitiesErr] = useState(null);

    const [country, setCountry] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchInputcountry, setSearchInputcountry] = useState('');

    const filteredCountry = country.filter(item =>
        item.name.toLowerCase().includes(searchInputcountry.toLowerCase())
    );

    const toggleDropdown3 = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectCountry = (selectedCountry) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            country_name: selectedCountry.name,
            current_country: selectedCountry.id,
            state_name: "",
            current_state: "",
            current_cityname: "",
            current_city: ""
        };
        setResume(updatedResume);
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
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [searchInputstate, setSearchInputstate] = useState('');

    const filteredState = state.filter(item =>
        item.name.toLowerCase().includes(searchInputstate.toLowerCase())
    );

    const toggleDropdown4 = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectState = (selectededState) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            state_name: selectededState.name,
            current_state: selectededState.id,
            current_cityname: "",
            current_city: ""
        };
        setResume(updatedResume);
        setDropdownVisible1(false);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/state_list/${val.current_country}`;
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
    }, [val.current_country])

    const [city, setCity] = useState([]);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [searchInputcity, setSearchInputcity] = useState('');

    const filteredCity = city.filter(item =>
        item.name.toLowerCase().includes(searchInputcity.toLowerCase())
    );

    const toggleDropdown5 = () => {
        setDropdownVisible2(!dropdownVisible2);
    };

    const selectCity = (selectedCity) => {
        const updatedResume = [...resume];
        updatedResume[0] = {
            ...updatedResume[0],
            current_cityname: selectedCity.name,
            current_city: selectedCity.id,
        };
        setResume(updatedResume);
        setDropdownVisible2(false);
    };

    const CityApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/city_list/${val.current_state}`;
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
    }, [val.current_state])

    // 

    const toggleDropdown6 = () => {
        setDropdownVisible3(!dropdownVisible3);
    };

    const selectPrefCity = (selectedCity) => {
        setSelectedPrefCity((prevSelectedCities) => {
            // Check if the city is already selected
            if (prevSelectedCities.includes(selectedCity.name)) {
                // Remove the city if it's already selected
                return prevSelectedCities.filter(city => city !== selectedCity.name);
            } else {
                // Add the city if it's not already selected
                return [...prevSelectedCities, selectedCity.name];
            }
        });

        setSelectedPrefCityId((prevSelectedCityIds) => {
            // Check if the city ID is already selected
            if (prevSelectedCityIds.includes(selectedCity.id)) {
                // Remove the ID if it's already selected
                return prevSelectedCityIds.filter(id => id !== selectedCity.id);
            } else {
                // Add the ID if it's not already selected
                return [...prevSelectedCityIds, selectedCity.id];
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

    // 

    useEffect(() => {
        seteditedocFile(val.certification_attach)
    }, [val])


    const [EditedocFile, seteditedocFile] = useState([]);

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();

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

                        <Text style={styles.StatusTouchableText}>{val.source || "Select Source"}</Text>
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
                        {validation ? (!resume[0].source ? "Source Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Name
                    </Text>

                    <TextInput
                        value={val.candidate_name || ''}
                        onChangeText={(text) => updateResumeField('candidate_name', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].candidate_name ? "Candidate Name Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Position Applying For
                    </Text>

                    <TextInput
                        value={val.position_applying || ''}
                        onChangeText={(text) => updateResumeField('position_applying', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].position_applying ? "position Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Gender
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{val.gender || "Select Gender"}</Text>
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
                        {validation ? (!resume[0].gender ? "Gender Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email
                    </Text>

                    <TextInput
                        value={val.email}
                        onChangeText={(text) => updateResumeField('email', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].email ? "Email Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile No
                    </Text>

                    <TextInput
                        value={val.mobile_no}
                        onChangeText={(text) => updateResumeField('mobile_no', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (
                            !resume[0].mobile_no ?
                                "Phone Number Required" :
                                resume[0].mobile_no.length !== 10 ?
                                    "Phone Number must be exactly 10 digits" :
                                    null
                        ) : null}
                    </Text>


                    <Text style={styles.StatDateText}>
                        Alternate Mobile No
                    </Text>

                    <TextInput
                        value={val.alter_mobile_no}
                        onChangeText={(text) => updateResumeField('alter_mobile_no', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date of Birth
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : val.dob} &nbsp;
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
                        {validation ? (!resume[0].dob ? "Date Of Birth Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Country
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown3}>
                        <Text style={styles.StatusTouchableText}>
                            {val.country_name ? val.country_name : 'Select a country'}
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
                        {validation ? (!resume[0].country_name ? "Country Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        State
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown4}>
                        <Text style={styles.StatusTouchableText}>
                            {val.state_name ? val.state_name : 'Select a State'}
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
                        {validation ? (!resume[0].state_name ? "State Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        City
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown5}>
                        <Text style={styles.StatusTouchableText}>
                            {val.current_cityname ? val.current_cityname : 'Select a City'}
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
                        {validation ? (!resume[0].current_cityname ? "City Required" : null) : null}
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

                    {dropdownVisible3 && (
                        <View style={styles.dropdown}>
                            {prefcity.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectPrefCity(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {/* {validation ? (resume.preferred_locations.length == 0 ? "Prefered Location Required" : null) : null} */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Languages Known
                    </Text>

                    <TextInput
                        value={val.languages}
                        onChangeText={(text) => updateResumeField('languages', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].languages ? "language Required" : null) : null}
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

                        <Text style={styles.StatusTouchableText}>{val.ug_degree || "Select Degree"}</Text>
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
                        {validation ? (!resume[0].ug_degree ? "UG Degree Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={val.ug_specialization || ""}
                        onChangeText={(text) => updateResumeField('ug_specialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].ug_specialization ? "Specialization Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={val.ug_year_of_passing || ""}
                        onChangeText={(text) => updateResumeField('ug_year_of_passing', text)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {validation ? (!resume[0].ug_year_of_passing ? "Year Of Passing Required" : null) : null}
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={val.ug_university || ''}
                        onChangeText={(text) => updateResumeField('ug_university', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
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

                        <Text style={styles.StatusTouchableText}>{val.pg_degree || "Select PgDegree"}</Text>
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
                        {/* {selectedPgDegreeErr} */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={val.pg_specialization || ""}
                        onChangeText={(text) => updateResumeField('pg_specialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={val.pg_year_of_passing || ""}
                        onChangeText={(text) => updateResumeField('pg_year_of_passing', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={val.pg_university || ''}
                        onChangeText={(text) => updateResumeField('pg_university', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Certification
                    </Text>

                    <TextInput
                        value={val.certification || ''}
                        onChangeText={(text) => updateResumeField('certification', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {/* { } */}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attachment
                    </Text>

                    <Text style={EdocFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {/* {docFile ? docFile[0].name : 'Select The Document'} */}
                        {EdocFile.length > 0 && EdocFile[0]?.name ? EdocFile[0].name : fileName}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleEditDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {/* {docFileErr} */}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default EditGeneral; 