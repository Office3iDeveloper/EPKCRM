import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from '../../../../../Assets/Icons/Search.svg';
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import ProfileIcon from "../../../../../Assets/Icons/Profile.svg";
import PhoneIcon from "../../../../../Assets/Icons/Phone.svg";
import MailIcon from "../../../../../Assets/Icons/MailorMessage.svg";
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const EmployeeList = ({ navigation }) => {

    // data from redux

    const { data } = useSelector((state) => state.login);

    // states

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Active');

    const filteredData = employeeData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://epkgroup.in/crm/api/public/api/employee_litshow/${selectedStatus}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const employeeData = response.data.data;

            const dat = employeeData ? employeeData.sort((a, b) => {
                const firstNameA = a.first_name.toUpperCase();
                const firstNameB = b.first_name.toUpperCase();

                if (firstNameA < firstNameB) {
                    return -1;
                }
                if (firstNameA > firstNameB) {
                    return 1;
                }
                return 0;
            }) : [];

            setEmployeeData(dat);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [selectedStatus])
    );

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>

            <View style={styles.filterInput}>

                <TextInput
                    style={styles.search}
                    placeholder="Search Employee"
                    value={filterText}
                    onChangeText={text => {
                        setFilterText(text);
                    }}
                />

                <View style={styles.searchIcon}>
                    <SearchIcon color={"#1AD0FF"} />
                </View>

            </View>

            <View style={styles.ActiveInactiveContainer}>

                <Text style={{ fontWeight: '600', fontSize: 16, lineHeight: 21.28 }}>Status :</Text>

                <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>{selectedStatus}</Text>
                    <DropdownIcon width={14} height={14} color={"#1AD0FF"} />

                </TouchableOpacity>

                {/* Dropdown to show the options */}

                {showDropdown && (

                    <View style={styles.dropdown}>

                        <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>Active</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>In-Active</Text>
                        </TouchableOpacity>

                    </View>

                )}

            </View>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={"#0A60F1"} style={styles.activityIndicator} />
                ) : (
                    <>
                        {
                            filteredData.length == 0 ?
                                <Text style={styles.name1}>
                                    No employee found
                                </Text> :
                                filteredData.map((employee, index) =>

                                (
                                    <TouchableOpacity key={index} style={[styles.card, index === filteredData.length - 1 && styles.cardBottom]}
                                        onPress={() => navigation.navigate('View Profile', { id: employee.id })}
                                    >
                                        <View key={employee.id} >
                                            <View style={styles.cardtop}>
                                                <View>
                                                    {employee.profile_img ? (
                                                        <Image
                                                            source={{ uri: `https://epkgroup.in/crm/api/storage/app/${employee.profile_img}` }}
                                                            style={styles.imageStyle}

                                                        />
                                                    ) : (
                                                        <View style={styles.iconStyle}>
                                                            <ProfileIcon width={22} height={22} color={'#0A60F1'} />
                                                        </View>
                                                    )}


                                                    <View style={styles.NameContainer}>
                                                        <Text style={styles.name}>{employee.first_name} {employee.last_name}</Text>
                                                        <Text style={styles.depname}>{employee.department_name}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.phoneEmail}>
                                                <View style={styles.gap} >
                                                    <PhoneIcon width={18} height={18} color={"#3A3A3A"} />
                                                    <MailIcon width={18} height={18} color={"#3A3A3A"} />
                                                </View>
                                                <View style={styles.gap} >
                                                    <Text style={styles.fontsize}>   {employee.mobile_no}</Text>
                                                    <Text style={styles.fontsize}>   {employee.official_email}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                        }

                    </>
                )}
            </View>

        </ScrollView>

    )
}

export default EmployeeList;