import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ViewIcon from "../../../../../../Assets/Icons/eyeopen.svg";
import RadioGroup from 'react-native-radio-buttons-group';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewLead = ({ route }) => {

    // 

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [value, setValue] = useState('');

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [leadStatus, setLeadStatus] = useState([]);

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/viewedit_leadlist/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data.Leadlist;
            const responseData1 = response.data.data.Leadstatus;
            setDatalist(responseData);
            setLeadStatus(responseData1);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    // 

    const handlePreview = (UrlLink) => {
        const baseUrl = 'https://office3i.com/development/api/storage/app/';
        const filePath = UrlLink;
        const url = `${baseUrl}${filePath}`;
        if (filePath && filePath !== "-") {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        } else {
            Alert.alert('No File Located')
        }
    }

    useEffect(() => {
        setValue(datalist.consultfee_filetype)
    }, [datalist])


    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.CardContainer}>

                    <View style={styles.CardContainerTitle}>
                        <Text style={styles.PolicyContainerTitleText}>Personal Information</Text>
                    </View>

                    <View>
                        <Text style={styles.CardContainerList}>Lead ID : <Text style={styles.CardContainerListData}>{datalist.lead_id}</Text></Text>
                        <Text style={styles.CardContainerList}>Lead Date : <Text style={styles.CardContainerListData}>{datalist.user_leaddate}</Text></Text>
                        <Text style={styles.CardContainerList}>Name : <Text style={styles.CardContainerListData}>{datalist.user_name}</Text></Text>
                        <Text style={styles.CardContainerList}>Email : <Text style={styles.CardContainerListData}>{datalist.user_email}</Text></Text>
                        <Text style={styles.CardContainerList}>Mobile No : <Text style={styles.CardContainerListData}>{datalist.user_mobile}</Text></Text>
                        <Text style={styles.CardContainerList}>Whatsapp No : <Text style={styles.CardContainerListData}>{datalist.user_whatapp}</Text></Text>
                        <Text style={styles.CardContainerList}>Gender : <Text style={styles.CardContainerListData}>{datalist.user_gender}</Text></Text>
                        <Text style={styles.CardContainerList}>Country : <Text style={styles.CardContainerListData}>{datalist.country_name}</Text></Text>
                        <Text style={styles.CardContainerList}>State : <Text style={styles.CardContainerListData}>{datalist.state_name}</Text></Text>
                        <Text style={styles.CardContainerList}>City : <Text style={styles.CardContainerListData}>{datalist.current_cityname}</Text></Text>
                        <Text style={styles.CardContainerList}>Area : <Text style={styles.CardContainerListData}>{datalist.user_area}</Text></Text>
                        <Text style={styles.CardContainerList}>Pincode : <Text style={styles.CardContainerListData}>{datalist.user_pincode}</Text></Text>
                        <Text style={styles.CardContainerList}>Company Name : <Text style={styles.CardContainerListData}>{datalist.user_company}</Text></Text>
                        <Text style={styles.CardContainerList}>Website : <Text style={styles.CardContainerListData}>{datalist.user_website}</Text></Text>
                    </View>


                </View>

                <View style={styles.CardContainer}>

                    <View style={styles.CardContainerTitle}>
                        <Text style={styles.PolicyContainerTitleText}>Requirement Details</Text>
                    </View>

                    <View>
                        <Text style={styles.CardContainerList}>Product Type : <Text style={styles.CardContainerListData}>{datalist.product_type}</Text></Text>
                        <Text style={styles.CardContainerList}>Product Name : <Text style={styles.CardContainerListData}>{datalist.product_name}</Text></Text>
                        <Text style={styles.CardContainerList}>Budget ( Min ) : <Text style={styles.CardContainerListData}>{datalist.min_budget}</Text></Text>
                        <Text style={styles.CardContainerList}>Budget ( Max ) : <Text style={styles.CardContainerListData}>{datalist.max_budget}</Text></Text>
                        <Text style={styles.CardContainerList}>Requirements / Specification details : <Text style={styles.CardContainerListData}>{datalist.description}</Text></Text>
                    </View>


                </View>

                <View style={styles.CardContainer}>

                    <View style={styles.CardContainerTitle}>
                        <Text style={styles.PolicyContainerTitleText}>Source</Text>
                    </View>

                    <View>
                        <Text style={styles.CardContainerList}>Source Name : <Text style={styles.CardContainerListData}>{datalist.source_name}</Text></Text>
                        <Text style={styles.CardContainerList}>Source Number : <Text style={styles.CardContainerListData}>{datalist.source_number}</Text></Text>
                        <Text style={styles.CardContainerList}>Call On : <Text style={styles.CardContainerListData}>{datalist.call_backon}</Text></Text>
                        <Text style={styles.CardContainerList}>Comments ( If Any ) : <Text style={styles.CardContainerListData}>{datalist.comment}</Text></Text>
                    </View>


                </View>

                <View style={styles.CardContainer}>

                    <View style={styles.CardContainerTitle}>
                        <Text style={styles.PolicyContainerTitleText}>Presales Upload</Text>
                    </View>

                    <View>
                        <Text style={styles.CardContainerList}>Upload Proof</Text>
                        <RadioGroup
                            layout='row'
                            selectedId={value}
                            radioButtons={[
                                { id: 'image', label: 'Image' },
                                { id: 'audio', label: 'Audio' },
                            ]}
                        />
                        <Text style={styles.CardContainerList}>Attached Proof Link</Text>

                        <TouchableOpacity style={styles.View} onPress={() => handlePreview(datalist.consultfee_document)}>
                            <ViewIcon width={14} height={14} color={"#000"} />
                            <Text>
                                View
                            </Text>
                        </TouchableOpacity>

                        <View style={{ paddingBottom: '5%' }}>

                            <Text style={styles.CardContainerList}>Sales Department Name</Text>

                            <TextInput
                                editable={false}
                                style={styles.inputs}
                                value={datalist.Assign_sales_departmentname}
                            />

                            <Text style={styles.CardContainerList}>Sales Employee Name</Text>

                            <TextInput
                                editable={false}
                                style={styles.inputs}
                                value={datalist.Assign_sales_name}
                            />

                        </View>

                    </View>

                </View>

                <View style={styles.PolicyContainerTitle}>
                    <Text style={styles.PolicyContainerTitleText}>Status</Text>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Status Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Comments</Text>
                                </View>

                                {leadStatus.length == 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    leadStatus.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.status_date}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.lead_status}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.comments}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        )
                        }
                    </View>

                </ScrollView>

            </View>

        </ScrollView>

    )

}

export default ViewLead;