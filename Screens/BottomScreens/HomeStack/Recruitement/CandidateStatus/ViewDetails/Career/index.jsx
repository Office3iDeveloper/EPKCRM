import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ViewIcon from "../../../../../../../Assets/Icons/eyeopen.svg";
import styles from "./style";


const Career = ({ datalist, loadData }) => {

    const datas = datalist[0];

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

    return (
        <ScrollView>
            <View style={[styles.employeeContainer]}>
                <View style={styles.employeeCard}>
                    {/* <View style={styles.cardheader}>
                        <View style={styles.cardBody}>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current Employer :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.current_employer}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current Designation :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.current_designation}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Functional Area :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.functional_area}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Area of Specialization :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.area_specialization_name}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Industry :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.industry}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Employment Type :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.employment_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Total Experience :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.total_exp}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current CTC :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.current_ctc}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Expected CTC :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.expected_ctc}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Notice Period :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.notice_period}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Candidate Status :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.status}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Date Of Joining :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.date_of_join}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Key Skills :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.key_skills}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Social Media Link :</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>{datas.social_link}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Attached Resume :</Text>
                                {/* <Text style={[styles.halfWidth, styles.value1]}>{datas.attached_resume}</Text> */}
                                {/* <TouchableOpacity
                                    onPress={() => handlePreview(datas.attached_resume)}
                                    style={styles.listcontentviewbutton}>
                                    <ViewIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View> */} 
                     <View style={styles.cardheader}>
                        <View style={styles.cardBody}>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current Employer</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.current_employer}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current Designation</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.current_designation}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Functional Area</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.functional_area}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Area of Specialization</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.area_specialization_name}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Industry</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.industry}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Employment Type</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.employment_type}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Total Experience</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.total_exp}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Current CTC</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.current_ctc}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Expected CTC</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.expected_ctc}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Notice Period</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.notice_period}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Candidate Status</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.status}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Date Of Joining</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.date_of_join}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Key Skills</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.key_skills}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Social Media Link</Text>
                                <Text style={[styles.halfWidth, styles.value1]}>: {datas.social_link}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Attached Resume :</Text>
                                {/* <Text style={[styles.halfWidth, styles.value1]}>{datas.attached_resume}</Text> */}
                                <TouchableOpacity
                                    onPress={() => handlePreview(datas.attached_resume)}
                                    style={styles.listcontentviewbutton}>
                                    <ViewIcon width={14} height={14} color={"#000"} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Career;