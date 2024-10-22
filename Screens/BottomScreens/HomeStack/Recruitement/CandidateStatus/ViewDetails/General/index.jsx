import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../Career/style";


const General = ({ datalist, loadData }) => {

    const datas = datalist[0];

    return (
        <ScrollView>
            <View style={[styles.employeeContainer]}>
                <View style={styles.employeeCard}>
                    <View style={styles.cardheader}>
                        {/* {
                            datas ?
                                <View style={styles.cardBody}>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Source :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.source}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Candidate Name :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.candidate_name}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Position Applying For :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.position_applying}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Gender :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.gender}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Email :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.email}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Mobile No :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.mobile_no}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Alternate Mobile No :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.alter_mobile_no}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Date Of Birth :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.dob}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Address/Location :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.country_name},{datas.state_name},{datas.current_cityname}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Preferred Location :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.preferred_locations.join(', ')}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Languages Known :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.languages}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Degree :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.ug_degree}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Specialization :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.ug_specialization}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Year of Passing :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.ug_year_of_passing}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>School/University :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.ug_university}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Degree :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.post_graduate}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Specialization :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.pg_specialization}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Year of Passing :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.pg_year_of_passing}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>School/University :</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>{datas.pg_university}</Text>
                                    </View>

                                </View> :
                                <ActivityIndicator size={"small"} color={'#0A62F1'} />
                        } */}
                           {
                            datas ?
                                <View style={styles.cardBody}>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Source</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.source}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Candidate Name</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.candidate_name}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Position Applying For</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.position_applying}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Gender</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.gender}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Email</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.email}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Mobile No</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.mobile_no}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Alternate Mobile No</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.alter_mobile_no}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Date Of Birth</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.dob}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Address/Location</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.country_name},{datas.state_name},{datas.current_cityname}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Preferred Location</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.preferred_locations.join(', ')}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Languages Known</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.languages}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Degree</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.ug_degree}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Specialization</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.ug_specialization}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Year of Passing</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.ug_year_of_passing}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>School/University</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.ug_university}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Degree</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.post_graduate}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Specialization</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.pg_specialization}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>Year of Passing</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.pg_year_of_passing}</Text>
                                    </View>
                                    <View style={styles.bodyline}>
                                        <Text style={[styles.halfWidth, styles.value]}>School/University</Text>
                                        <Text style={[styles.halfWidth, styles.value1]}>: {datas.pg_university}</Text>
                                    </View>

                                </View> :
                                <ActivityIndicator size={"small"} color={'#0A62F1'} />
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default General;