import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import ProfileIcon from "../../../../../Assets/Icons/Profile.svg";
import PlusIcon from "../../../../../Assets/Icons/Plus.svg";
import MinusIcon from "../../../../../Assets/Icons/minus.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { htmlToText } from 'html-to-text';


const ViewJobList = ({ route, navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const SpecId = route.params.Id.id;

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    console.log(datalist, "data")

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/post_job_editlist/${SpecId}`;
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

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const stripHtmlTags = (html) => {
        return htmlToText(html, {
            wordwrap: false,
            tags: { '': { options: { ignoreHref: true } } }
        });
    };

    const rolesResponsibilities = stripHtmlTags(datalist.roles_responsiblities);
    const otherBenefits = stripHtmlTags(datalist.other_benefits);
    const preferredCandidate = stripHtmlTags(datalist.preferred_candidate);

    return (
        <ScrollView>
            <View style={[styles.employeeContainer]}>
                <View style={styles.employeeCard}>
                    <View style={styles.cardheader}>
                        {/* <View style={styles.cardBody}>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>No. of vacancies :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.no_of_vacancies}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Key Skills :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.key_skills}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Type :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.job_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Location :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.country_name}, {datalist.state_name}, {datalist.city_names}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Experience :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.experience_min} - {datalist.experience_max} Year's</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Schedule/Shift :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.shift}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Employment Type :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.emp_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Status :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.job_status}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Salary :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.salary_min} - {datalist.salary_max}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Valid Till :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datalist.valid_till}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Roles & Responsibilities :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{rolesResponsibilities}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Preferred Candidate :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{otherBenefits}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Other Benefits :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{preferredCandidate}</Text>
                            </View>

                        </View> */}
                        <View style={styles.cardBody}>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>No. of vacancies</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.no_of_vacancies}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Key Skills</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.key_skills}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Type</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.job_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Location</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.country_name}, {datalist.state_name}, {datalist.city_names}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Experience</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.experience_min} - {datalist.experience_max} Year's</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Schedule/Shift</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.shift}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Employment Type</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.emp_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Job Status</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.job_status}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Salary</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.salary_min} - {datalist.salary_max}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Valid Till</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datalist.valid_till}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Roles & Responsibilities</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {rolesResponsibilities}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Preferred Candidate</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {otherBenefits}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Other Benefits</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {preferredCandidate}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ViewJobList;