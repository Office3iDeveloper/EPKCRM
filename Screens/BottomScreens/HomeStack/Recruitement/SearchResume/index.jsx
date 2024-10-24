import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";

const SearchResume = ({ navigation }) => {

    // 

    const { data } = useSelector((state) => state.login);

    // 

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');

    const filteredData = employeeData ? employeeData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    }) : [];

    // 

    const [skills, setSkills] = useState('');
    const [desgination, setDesignation] = useState('');
    const [salarymin, setSalarymin] = useState('');
    const [salarymax, setSalarymax] = useState('');
    const [expmin, setExpmin] = useState('');
    const [expmax, setExpmax] = useState('');
    const [expminErr, setExpminErr] = useState('');
    const [expmaxErr, setExpmaxErr] = useState('');

    // 

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState([]);
    const [selectedCountryErr, setSelectedCountryErr] = useState('');
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
            const apiUrl = `https://epkgroup.in/crm/api/public/api/state_list/${selectedCountryId}`;
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

    // 

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
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        CityApi();
    }, [selectededState])

    // 

    const [prefcity, setPrefCity] = useState([]);
    const [selectededPrefCity, setSelectedPrefCity] = useState([]);
    const [selectedPrefCityId, setSelectedPrefCityId] = useState([]);
    const [dropdownVisible3, setDropdownVisible3] = useState(false);

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

    // Functional Area

    const [fArea, setFArea] = useState([]);
    const [selectededFArea, setSelectedFArea] = useState([]);
    const [selectedFAreaId, setSelectedFAreaId] = useState([]);
    const [dropdownVisibleFArea, setDropdownVisibleFArea] = useState(false);

    const toggleDropdownFArea = () => {
        setDropdownVisibleFArea(!dropdownVisibleFArea);
    };

    const selectFArea = (selectFArea) => {
        setSelectedFArea(selectFArea.category);
        setSelectedFAreaId(selectFArea.id);
        setSelectedSpec([]);
        setSelectedSpecId([]);
        setDropdownVisibleFArea(false);
    };

    const FuncArea = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/functional_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setFArea(responseData);

        } catch (error) {
            console.error('Error fetching FArea data:', error);
        }

    }

    useEffect(() => {
        FuncArea();
    }, [])

    // 

    const [fAreaSpec, setFAreaSpec] = useState([]);
    const [selectededSpec, setSelectedSpec] = useState([]);
    const [selectedSpecId, setSelectedSpecId] = useState([]);
    const [dropdownVisibleSpec, setDropdownVisibleSpec] = useState(false);

    const toggleDropdownSpec = () => {
        setDropdownVisibleSpec(!dropdownVisibleSpec);
    };

    const selectSpec = (selectSpec) => {
        setSelectedSpec(selectSpec.category);
        setSelectedSpecId(selectSpec.id);
        setDropdownVisibleSpec(false);
    };

    const SpecApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/area_specialization_list/${selectedFAreaId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setFAreaSpec(responseData);

        } catch (error) {
            console.error('Error fetching State data:', error);
        }

    }

    useEffect(() => {
        SpecApi();
    }, [selectedFAreaId])

    // Industry

    const [industry, setIndustry] = useState([]);
    const [selectededIndustryApi, setSelectedIndustryApi] = useState([]);
    const [selectedIndustryApiId, setSelectedIndustryApiId] = useState([]);
    const [dropdownVisibleIndustry, setDropdownVisibleIndustry] = useState(false);

    const toggleDropdownInd = () => {
        setDropdownVisibleIndustry(!dropdownVisibleIndustry);
    };

    const selectIndustry = (selectedCountry) => {
        setSelectedIndustryApi(selectedCountry.name);
        setSelectedIndustryApiId(selectedCountry.id);
        setDropdownVisibleIndustry(false);
    };

    const IndustryApi = async () => {

        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/industry_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setIndustry(responseData);

        } catch (error) {
            console.error('Error fetching Industry data:', error);
        }

    }

    useEffect(() => {
        IndustryApi();
    }, [])

    // 

    const [load, setLoad] = useState(false);

    const onRefresh = () => {
        setDesignation('');
        setSelectedPrefCityId([]);
        setSelectedFAreaId([]);
        setSelectedStateId([]);
        setSelectedCountryId([]);
        setSelectedCityId([]);
        setSelectedSpecId([]);
        setSelectedPrefCity([]);
        setSelectedFArea([]);
        setSelectedState([]);
        setSelectedCountry([]);
        setSelectedCity([]);
        setSelectedSpec([]);
        setSelectedIndustryApi([]);
        setExpmin('');
        setExpmax('');
        setSalarymin('');
        setSalarymax('');
        setSkills('');
    }

    // const validateFields = () => {
    //     let isValid = true;

    //     if (selectedCountry.length == 0) {
    //         setSelectedCountryErr('Select Country');
    //         isValid = false;
    //     } else {
    //         setSelectedCountryErr('');
    //     }

    //     if (selectededState.length == 0) {
    //         setSelectedStateErr('Select State');
    //         isValid = false;
    //     } else {
    //         setSelectedStateErr('');
    //     }

    //     if (selectededCity.length == 0) {
    //         setSelectedCityErr('Select City');
    //         isValid = false;
    //     } else {
    //         setSelectedCityErr('');
    //     }

    //     return isValid;
    // };

    // if (!validateFields()) {
    //     setLoad(false);
    //     return;
    // }

    const HandleSearch = async () => {

        if (
            !desgination &&
            selectedPrefCityId.length == 0 &&
            selectedCountryId.length == 0 &&
            selectedStateId.length == 0 &&
            selectedCityId.length == 0 &&
            selectedFAreaId.length == 0 &&
            selectedSpecId.length == 0 &&
            selectedIndustryApiId.length == 0 &&
            !expmin &&
            !expmax &&
            !salarymin &&
            !salarymax &&
            !skills
        ) {
            Alert.alert("Oops", "At least one filter must be selected.");
        } else {
            setLoad(true);

            if (selectedCountry.length > 0) {
                if (selectedCountry.length == 0) {
                    setSelectedCountryErr('Select Country');
                    setLoad(false);
                    return;
                } else {
                    setSelectedCountryErr('');
                }

                if (selectededState.length == 0) {
                    setSelectedStateErr('Select State');
                    setLoad(false);
                    return;
                } else {
                    setSelectedStateErr('');
                }

                if (selectededCity.length == 0) {
                    setSelectedCityErr('Select City');
                    setLoad(false);
                    return;
                } else {
                    setSelectedCityErr('');
                }
            }

            if (expmin > expmax) {
                setExpminErr('Minimum experience cannot be greater than maximum experience');
                setExpmaxErr('Maximum experience cannot be less than minimum experience');
                setLoad(false);
                return;
            } else {
                setExpminErr('');
                setExpmaxErr('');
            }

            try {
                const apiUrl = 'https://epkgroup.in/crm/api/public/api/search_resume_list';
                const response = await axios.post(apiUrl, {
                    designation: desgination || "",
                    preferred_location: selectedPrefCityId || "",
                    current_city: selectedCityId || "",
                    functional_area: selectedFAreaId || "",
                    area_specialization: selectedSpecId || "",
                    industry: selectedIndustryApiId || "",
                    exp_min: expmin || "",
                    exp_max: expmax || "",
                    salary_min: salarymin || "",
                    salary_max: salarymax || "",
                    key_skills: skills
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                setLoad(false);
                const responseData = response.data.data;
                setEmployeeData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoad(false);
            }
        }
    };


    // 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (

        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Search Resume</Text>
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
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
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
                        {selectededStateErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job City
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

                    <Text style={styles.ShiftSlotText}>
                        Preferred Location
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown6}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededPrefCity.length > 0
                                ? selectededPrefCity.join(', ')
                                : 'Select Prefered City'}
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
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Functional Area
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownFArea}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededFArea.length > 0 ? selectededFArea : 'Select a Functional Area'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisibleFArea && (
                        <View style={styles.dropdown}>
                            {fArea.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectFArea(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Area of Specialization
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownSpec}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededSpec.length > 0 ? selectededSpec : 'Select Area Of Specification'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisibleSpec && (
                        <View style={styles.dropdown}>
                            {fAreaSpec.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectSpec(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Industry
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdownInd}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededIndustryApi.length > 0 ? selectededIndustryApi : 'Select a Industry'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisibleIndustry && (
                        <View style={styles.dropdown}>
                            {industry.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectIndustry(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Min)
                    </Text>

                    <TextInput
                        value={salarymin}
                        onChangeText={(txt) => setSalarymin(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Minimum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Max)
                    </Text>

                    <TextInput
                        value={salarymax}
                        onChangeText={(txt) => setSalarymax(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Experience (Min)
                    </Text>

                    <TextInput
                        value={expmin}
                        onChangeText={(txt) => setExpmin(txt)}
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
                        onChangeText={(txt) => setExpmax(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Experience"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {expmaxErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Key Skills
                    </Text>

                    <TextInput
                        value={skills}
                        onChangeText={(txt) => setSkills(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Search Skills"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={HandleSearch}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Search
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => onRefresh()}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle1}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Search Result</Text>
                </View>

            </View>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={"#0A60F1"} style={styles.activityIndicator} />
                ) : (
                    <>
                        {paginatedData.length === 0 ? (
                            <Text style={styles.name}>Resume List Data Not Found!.</Text>
                        ) : (
                            paginatedData.map((employee, index) => (
                                <View key={index} style={[styles.card]}>
                                    <View>

                                        <View style={styles.divider}>
                                            <View style={{ gap: 5, width: '60%' }}>
                                                <Text style={{ fontWeight: '600', fontSize: 20, color: '#3A3A3A' }}>{employee.candidate_name}</Text>
                                                <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.current_designation}</Text>
                                            </View>
                                            <View style={[styles.ViewDetails1, { width: '40%' }]}>
                                                <Text style={styles.DetailsText1}>{employee.status}</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.divider]}>
                                            <Text style={{ fontWeight: '600', fontSize: 18, color: '#00275C' }}>CTC : <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.current_ctc}</Text></Text>
                                            <Text style={{ fontWeight: '600', fontSize: 18, color: '#00275C' }}>EXP : <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.total_exp}</Text></Text>
                                        </View>

                                        <View>
                                            <TouchableOpacity style={styles.ViewDetails} onPress={() => navigation.navigate('Candidate View Details', { Id: employee.id })}
                                            >
                                                <Text style={styles.DetailsText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            ))
                        )}

                        {paginatedData.length === 0 ? null : <View style={{ alignItems: 'center' }}>
                            <View style={styles.pagination}>

                                <TouchableOpacity style={styles.prev}
                                    onPress={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                                    <Text style={styles.prevText}>
                                        Prev
                                    </Text>
                                </TouchableOpacity>

                                {pages.map((page, index) => (
                                    <View key={index} style={[currentPage === page ? styles.PageActive : null, { width: 26, height: 26, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }]}>
                                        <Text
                                            style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                            onPress={() => onPageChange(page)}
                                        >
                                            {page}
                                        </Text>
                                    </View>
                                ))}

                                <TouchableOpacity style={styles.Next}
                                    onPress={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <Text style={styles.NextText}>
                                        Next
                                    </Text>
                                    <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                                </TouchableOpacity>

                            </View>
                        </View>
                        }

                    </>
                )}
            </View>

        </ScrollView>

    )
}

export default SearchResume;