// import React, { useEffect, useState } from "react";
// import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
// import EmployeeIcon from '../../../../../Assets/Icons/Employee.svg';
// import axios from "axios";
// import { useSelector } from "react-redux";
// import styles from "./style";


// const OrgChart = ({ navigation }) => {

//     // data from redux store 

//     const { data } = useSelector((state) => state.login);

//     // state for managing fetched data

//     const [datalist, setDatalist] = useState([]);

//     // function to fetch data

//     const fetchData = async () => {

//         try {
//             const apiUrl = 'https://epkgroup.in/crm/api/public/api/orgchart_list/0';
//             const response = await axios.get(apiUrl, {
//                 headers: {
//                     Authorization: `Bearer ${data.token}`
//                 }
//             });
//             const responseData = response.data.data;
//             setDatalist(responseData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const renderEmployee = (employee, level, isLast) => (
//         <View key={employee.id}>
//             <View style={[styles.EmployeeContainer, level === 0 && { marginTop: "10%" }]}>
//                 <TouchableOpacity style={[styles.Card, { marginLeft: `${level * 15}%` }]}
//                     onPress={() => navigation.navigate('ORG Indviduals', { Id: employee })}
//                 >
//                     <View style={styles.ImgCard}>
//                         {employee.profile_img ? (
//                             <Image source={{ uri: `https://epkgroup.in/crm/api/storage/app/${employee.profile_img}` }} style={styles.Img} />
//                         ) : (
//                             <EmployeeIcon width={22} height={22} color={'#000'} />
//                         )}
//                     </View>
//                     <View>
//                         <Text style={styles.Name}>{employee.first_name} {employee.last_name}</Text>
//                         <Text style={styles.Role}>{employee.role_name}</Text>
//                     </View>
//                 </TouchableOpacity>
//                 {!(isLast && (!employee.subordinates || employee.subordinates.length === 0)) && (
//                     <View style={{ alignItems: 'flex-end', width: "60%" }}>
//                         <View style={{ alignItems: 'center', width: "25%" }}>
//                             <View style={styles.Card1}></View>
//                         </View>
//                     </View>
//                 )}
//             </View>

//             {employee.subordinates && employee.subordinates.length > 0 && (
//                 employee.subordinates.map((subordinate, index) => (
//                     <View key={subordinate.id}>
//                         {renderEmployee(subordinate, level + 1, index === employee.subordinates.length - 1)}
//                     </View>
//                 ))
//             )}
//         </View>
//     );

//     return (
//         <ScrollView>
//             <View style={{ marginLeft: '5%' }}>
//                 {datalist.map(employee => renderEmployee(employee, 0, false))}
//             </View>
//         </ScrollView>
//     );
// }

// export default OrgChart;    

import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';


const OrgChart = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1AD0FF' }}>
            <WebView source={{ uri: 'https://office3i.com/admin/organizationchart' }} style={{ flex: 1 }} />
        </SafeAreaView>
    );
}


export default OrgChart;    