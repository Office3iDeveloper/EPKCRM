import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckOutIcon from "../../Assets/Icons/CheckOut.svg";
import CheckInIcon from "../../Assets/Icons/CheckIn.svg";
import styles from './style';

const CheckInOutField = ({ fieldName, SubHeader }) => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    const toggleCheckInOut = () => {
        setIsCheckedIn(!isCheckedIn);
    };

    return (
        <View style={styles.checkView}>
            <TouchableOpacity onPress={toggleCheckInOut}>
                {
                    isCheckedIn ?
                        <CheckInIcon width={28} height={28} /> :
                        <CheckOutIcon width={28} height={28} />
                }
            </TouchableOpacity>
            <Text style={styles.SingleHeader}>{fieldName}</Text>
            <Text style={styles.SubHeader}>{SubHeader}</Text>
        </View>
    );
};

export default CheckInOutField;