import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ArrowRightIcon from "../../../../Assets/Icons/ArrowRight.svg";
import styles from "../TLApproval/style";

const TLApprovalList = ({ navigation }) => {

    return (


        <View style={styles.Container}>

            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('TL Leave Request')}>
                <Text style={styles.primaryButtonText}>Leave Request</Text>
                <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('TL Permission Request')}>
                <Text style={styles.primaryButtonText}>Permission Request</Text>
                <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('TL HalfDay Request')}>
                <Text style={styles.primaryButtonText}>Half Day Request</Text>
                <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
            </TouchableOpacity>
        </View>

    )
}

export default TLApprovalList;