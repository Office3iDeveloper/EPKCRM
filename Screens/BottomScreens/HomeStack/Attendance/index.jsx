import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';


const BiAttendance = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1AD0FF' }}>
            <WebView source={{ uri: 'https://app.powerbi.com/reportEmbed?reportId=71d766e9-bd30-4c81-be3b-2f20e51b2cdf&autoAuth=true&ctid=00cb49fd-707f-455b-add1-922f945adba5' }} style={{ flex: 1 }} />
        </SafeAreaView>
    );
}


export default BiAttendance;    