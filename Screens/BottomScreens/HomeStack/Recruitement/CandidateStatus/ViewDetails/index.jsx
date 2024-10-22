import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import General from "./General";
import Career from "./Career";

const CanViewDetails = ({ route, navigation }) => {

    const SpecId = route.params.Id;

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);

    const [activeComponent, setActiveComponent] = useState('General');

    const tabs = [
        { name: 'General' },
        { name: 'Career' },
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

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/resume_edit_list/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    return (

        <ScrollView>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: '5%' }}>
                <TouchableOpacity
                    style={
                        styles.HeaderButtonActive1
                    }
                    onPress={() => navigation.navigate('Edit Resume', { id: SpecId })}
                >
                    <Text
                        style={
                            styles.HeaderButtonTextActive1
                        }
                    >
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.Page}>

                <View style={styles.container}>

                    <View style={styles.ShiftSlotContainerTitle}>
                        <Text style={styles.ShiftSlotContainerTitleText}>View Details</Text>
                    </View>

                    <View style={styles.HeaderButtonView}>

                        <TouchableOpacity
                            style={
                                activeComponent === 'General' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('General')}
                        >
                            <Text
                                style={
                                    activeComponent === 'General' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                General
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                activeComponent === 'Career' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('Career')}
                        >
                            <Text
                                style={
                                    activeComponent === 'Career' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                Career
                            </Text>
                        </TouchableOpacity>


                    </View>

                    {
                        activeComponent === 'General' &&
                        <General
                            datalist={datalist}
                            loadData={loadData}
                        />
                    }
                    {
                        activeComponent === 'Career' &&
                        <Career
                            datalist={datalist}
                            loadData={loadData}
                        />
                    }

                </View>

            </View>

        </ScrollView>
    )
}

export default CanViewDetails;