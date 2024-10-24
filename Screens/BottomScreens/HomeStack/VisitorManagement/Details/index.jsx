import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import ProfileIcon from "../../../../../Assets/Icons/Profile.svg";
import PlusIcon from "../../../../../Assets/Icons/Plus.svg";
import MinusIcon from "../../../../../Assets/Icons/minus.svg";
import { useSelector } from "react-redux";
import axios from "axios";


const ViewDeatails = ({ route, navigation }) => {

    // 

    const SpecId = route.params.Id;

    return (
        <ScrollView>
            <View style={[styles.employeeContainer]}>
                <View style={styles.profileimage}>
                    <Image source={{ uri: `https://epkgroup.in/crm/api/storage/app/${SpecId.profile_img}` }} style={styles.imageStyle} />
                    <Text style={styles.name}>{SpecId.visitor_name}</Text>
                </View>
                <View style={styles.employeeCard}>
                    <View style={styles.cardheader}>
                        <View style={styles.cardBody}>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Phone Number</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.mobile_number}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Email ID</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.email_id}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>ID Proof</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.id_proof_name}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>ID Proof Number</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.id_number}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Department</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.department}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Whom To Visit</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.whom_to_visit}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Location</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.location}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>In Time</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.in_time}</Text>
                            </View>
                            <View style={styles.bodyline}>
                                <Text style={[styles.halfWidth, styles.value]}>Out Time</Text>
                                <Text style={[styles.halfWidth, styles.value]}>: {SpecId.out_time}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ViewDeatails;