import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import SearchIcon from '../../../../../Assets/Icons/Search.svg';
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./style";
import Joined from "./Joined";
import NotSuitable from "./NotSuitable";
import Offered from "./Offered";
import Reject from "./Reject";
import Shortlisted from "./Shortlisted";
import { useFocusEffect } from "@react-navigation/native";

const CanStatus = ({ route, navigation }) => {

    const [activeComponent, setActiveComponent] = useState('Joined');

    const tabs = [
        { name: 'Joined' },
        { name: 'Offered' },
        { name: 'Shortlisted' },
        { name: 'Rejected' },
        { name: 'Not Suitable' }
    ];

    const renderComponent = (componentName) => {
        setActiveComponent(componentName);
    }

    const renderTab = (tab) => (
        <TouchableOpacity
            key={tab.name}
            style={activeComponent === tab.name ? styles.HeaderButtonActive : styles.HeaderButton}
            onPress={() => renderComponent(tab.name)}
        >
            <Text style={activeComponent === tab.name ? styles.HeaderButtonTextActive : styles.HeaderButtonText}>
                {tab.name}
            </Text>
        </TouchableOpacity>
    );

    // data from redux

    const { data } = useSelector((state) => state.login);

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [EditLoad, setEditLoad] = useState(false);

    const filteredData = employeeData ? employeeData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    }) : [];

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://office3i.com/development/api/public/api/resume_status_list/${activeComponent}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const employeeData = response.data.data;

            setEmployeeData(employeeData);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [activeComponent])
    );

    // useEffect(() => {
    //     fetchData();
    // }, [activeComponent]);

    return (
        <ScrollView>
            <View style={styles.Page}>

                <View style={styles.filterInput}>

                    <TextInput
                        style={styles.search}
                        placeholder="Search"
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                        }}
                    />

                    <View style={styles.searchIcon}>
                        <SearchIcon color={"#1AD0FF"} />
                    </View>

                </View>

                <View style={styles.container}>

                    <View style={styles.HeaderButtonView}>
                        {tabs.map(tab => renderTab(tab))}
                    </View>

                    {activeComponent === 'Joined' && <Joined
                        employeeData={employeeData}
                        loading={loading}
                        filteredData={filteredData}
                        navigation={navigation}
                    />}

                    {
                        activeComponent === 'Not Suitable' && <NotSuitable
                            employeeData={employeeData}
                            loading={loading}
                            filteredData={filteredData}
                            navigation={navigation}
                        />
                    }

                    {activeComponent === 'Offered' && <Offered
                        employeeData={employeeData}
                        loading={loading}
                        filteredData={filteredData}
                        navigation={navigation}
                    />}

                    {activeComponent === 'Rejected' && <Reject
                        employeeData={employeeData}
                        loading={loading}
                        filteredData={filteredData}
                        navigation={navigation}
                    />}

                    {activeComponent === 'Shortlisted' && <Shortlisted
                        employeeData={employeeData}
                        loading={loading}
                        filteredData={filteredData}
                        navigation={navigation}
                    />}
                </View>
            </View>
        </ScrollView>
    )
}

export default CanStatus;
