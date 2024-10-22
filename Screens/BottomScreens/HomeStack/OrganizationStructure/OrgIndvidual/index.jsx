import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import EmployeeIcon from '../../../../../Assets/Icons/Employee.svg';
import styles from "./style";
import axios from "axios";
import Dash from 'react-native-dash';

const OrgIndvidual = ({ route, navigation }) => {
    const { data } = useSelector((state) => state.login);
    const SpecId = route.params.Id;
    const [totalcount, setTotalCount] = useState('');
    const [details, setDetails] = useState([]);

    const CountApi = async () => {
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/orgchart_employee_data/${SpecId.id}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data.employee_details;
            const responseDatatree = response.data.data.position_history;
            setDetails(responseDatatree);
            setTotalCount(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        CountApi();
    }, [SpecId]);

    return (
        <ScrollView>

            <View style={styles.Container}>

                <View style={{ paddingLeft: '20%' }}>

                    <View style={[styles.Card, { marginBottom: "10%" }]}>

                        <View style={styles.ImgCard}>

                            {totalcount.profile_img ? (
                                <Image source={{ uri: `https://office3i.com/development/api/storage/app/${totalcount.profile_img}` }} style={styles.Img} />
                            ) : (
                                <EmployeeIcon width={22} height={22} color={'#000'} />
                            )}

                        </View>

                        <View>

                            <Text style={styles.Name}>{totalcount.first_name} {totalcount.last_name}</Text>
                            <Text style={styles.Role}>Current Designation: {totalcount.department_name}</Text>

                        </View>

                    </View>

                    <View style={{ paddingLeft: '20%' }}>

                        {details.map((detail, index) => (

                            <View key={detail.id} style={{ flexDirection: 'row' }}>

                                <View>

                                    <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#0A62F1' }} />

                                    {index !== details.length - 1 && (
                                        <View style={{ marginLeft: 3.5, height: 250, justifyContent: 'center' }}>
                                            <Dash style={{ width: 1, height: 250, flexDirection: 'column' }} dashColor={'#0A62F1'} dashThickness={1.5} dashGap={3} />
                                        </View>
                                    )}

                                </View>

                                <View style={{ marginLeft: "7.5%" }}>

                                    <Text style={styles.dept}>{detail.department_name}</Text>

                                    {detail.department_salaries.map((salary) => (

                                        <View key={salary.id} style={{ marginVertical: '2%' }}>

                                            <Text style={styles.date}>{salary.ctc_start_month} - {salary.ctc_end_month ? salary.ctc_end_month : 'Present'}</Text>
                                            <Text style={styles.ctc}>CTC: {salary.annual_ctc} LPA</Text>

                                        </View>

                                    ))}

                                </View>

                            </View>

                        ))}
                    </View>

                </View>

            </View>

        </ScrollView>
    );
};

export default OrgIndvidual;
