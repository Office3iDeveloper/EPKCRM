// // import React, { useEffect, useState } from "react";
// // import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// // import styles from "./style";
// // import { useSelector } from "react-redux";
// // import CheckBox from '@react-native-community/checkbox';
// // import axios from "axios";
// // import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
// // import LottieAlertError from "../../../../../Assets/Alerts/Error";
// // import LottieCatchError from "../../../../../Assets/Alerts/Catch";

// // const EditRole = ({ navigation, route }) => {

// //     // data from redux store

// //     const { data } = useSelector((state) => state.login);

// //     // states

// //     const [load, setLoad] = useState(false);
// //     const [roleName, setRoleName] = useState('');
// //     const [nameError, setNameError] = useState('');

// //     const [checkedNames, setCheckedNames] = useState({
// //         'Dashboard': [],
// //         'ORGStructure': [],
// //         'LeaveAndAttendancePolicy': [],
// //         'Employee': [],
// //         'Attendance': [],
// //         'HRSupport': [],
// //         'TLApproval': [],
// //         'HelpDesk': [],
// //         'Assets': [],
// //         'Events': [],
// //         'Meeting': [],
// //         'TeamTask': [],
// //         'Payroll': [],
// //         'Holiday': [],
// //         'Visitiormanagement': [],
// //         'Logs': [],
// //     });

// //     const initialFieldsState = [
// //         { name: 'Dashboard', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
// //         { name: 'ORGStructure', isChecked: false, subheadings: ['add_Role', 'roles_list', 'supervisor_list', 'empLevel_Category', 'emp_DocumentType', 'org_Chart'], checkboxes: Array(6).fill(false) },
// //         { name: 'LeaveAndAttendancePolicy', isChecked: false, subheadings: ['addShiftSlot', 'assignEmployeeShift', 'attendancePolicy', 'attendanceType', 'attendanceLocation', 'leavePolicyType', 'leavePolicyCategory', '"leavePolicy"'], checkboxes: Array(7).fill(false) },
// //         { name: 'Employee', isChecked: false, subheadings: ['Add_Employee', 'Emp_loyeeList', 'Employee_Confirmation'], checkboxes: Array(3).fill(false) },
// //         { name: 'Attendance', isChecked: false, subheadings: ['DailyAttendance', 'Monthly_Attendance', 'Monthly_AttendanceCalendar', 'Monthly_List'], checkboxes: Array(4).fill(false) },
// //         { name: 'HRSupport', isChecked: false, subheadings: ['Approval_List', 'Template', 'Job_Opening'], checkboxes: Array(3).fill(false) },
// //         { name: 'TLApproval', isChecked: false, subheadings: ['Leave_Approval', 'OT_Approval'], checkboxes: Array(2).fill(false) },
// //         { name: 'HelpDesk', isChecked: false, subheadings: ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'], checkboxes: Array(0).fill(false) },
// //         { name: 'Assets', isChecked: false, subheadings: ['Assets_Type', 'Assign_Asset', 'Asset_List'], checkboxes: Array(3).fill(false) },
// //         { name: 'Events', isChecked: false, subheadings: ['Add_Event', 'Event_List'], checkboxes: Array(2).fill(false) },
// //         { name: 'Meeting', isChecked: false, subheadings: ['Add_Meeting', 'Meeting_List'], checkboxes: Array(2).fill(false) },
// //         { name: 'TeamTask', isChecked: false, subheadings: ['Add_Project', 'Project_List', 'Add_task', 'Task_List', 'Assigned_Task', 'TL_Assigned_Task'], checkboxes: Array(6).fill(false) },
// //         { name: 'Payroll', isChecked: false, subheadings: ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'], checkboxes: Array(3).fill(false) },
// //         { name: 'Holiday', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
// //         { name: 'Visitiormanagement', isChecked: false, subheadings: ['Add_visitor', 'Visitor_log'], checkboxes: Array(2).fill(false) },
// //         { name: 'Logs', isChecked: false, subheadings: ['Activity_Log', 'Employee_ActivityLog'], checkboxes: Array(2).fill(false) },

// //     ];

// //     const [fields, setFields] = useState(initialFieldsState);
// //     const [selectedID, setSelectedID] = useState();
// //     const [Activity, setActivity] = useState();

// //     // 

// //     const toggleFieldCheckBox = (fieldIndex) => {
// //         const newFields = [...fields];
// //         newFields[fieldIndex].isChecked = !newFields[fieldIndex].isChecked;
// //         newFields[fieldIndex].checkboxes = newFields[fieldIndex].checkboxes.map(() => newFields[fieldIndex].isChecked);
// //         setFields(newFields);
// //         updateCheckedNames(fieldIndex, newFields[fieldIndex].isChecked);
// //     };

// //     const toggleSubheadingCheckBox = (fieldIndex, subheadingIndex) => {
// //         const newFields = [...fields];
// //         newFields[fieldIndex].checkboxes[subheadingIndex] = !newFields[fieldIndex].checkboxes[subheadingIndex]; // Toggle the subheading checkbox state
// //         setFields(newFields);
// //         updateCheckedNames(fieldIndex, newFields[fieldIndex].checkboxes[subheadingIndex], subheadingIndex);
// //     };

// //     // 

// //     const updateCheckedNames = (fieldIndex, isChecked, subheadingIndex = null) => {
// //         const newCheckedNames = { ...checkedNames };
// //         const fieldName = fields[fieldIndex].name;
// //         if (isChecked) {
// //             if (subheadingIndex !== null) {
// //                 if (!newCheckedNames[fieldName]) {
// //                     newCheckedNames[fieldName] = []; // Initialize as array if it doesn't exist
// //                 }
// //                 newCheckedNames[fieldName].push(fields[fieldIndex].subheadings[subheadingIndex]);
// //             } else {
// //                 // Add the field name directly to the array if it has no subheadings
// //                 newCheckedNames[fieldName] = [fieldName];
// //             }
// //         } else {
// //             if (subheadingIndex !== null) {
// //                 if (newCheckedNames[fieldName]) { // Check if the array exists
// //                     const index = newCheckedNames[fieldName].indexOf(fields[fieldIndex].subheadings[subheadingIndex]);
// //                     if (index !== -1) {
// //                         newCheckedNames[fieldName].splice(index, 1);
// //                     }
// //                 }
// //             } else {
// //                 // Remove the field name from the array if it has no subheadings
// //                 delete newCheckedNames[fieldName];
// //             }
// //         }
// //         setCheckedNames(newCheckedNames);
// //     };

// //     // 

// //     const SpecId = route.params.Id;

// //     //  

// // useEffect(() => {

// //     const fetchData = async () => {

// //         try {
// //             const apiUrl = `https://office3i.com/development/api/public/api/editview_role/${SpecId}`;

// //             const response = await axios.get(apiUrl, {
// //                 headers: {
// //                     Authorization: `Bearer ${data.token}`
// //                 }
// //             });

// //             const responseData = response.data.data;

// //             if (responseData) {
// //                 setRoleName(responseData.role_name);
// //                 setActivity(responseData.status);
// //                 setSelectedID(responseData.id);

// //                 let parsedPermissions;
// //                 try {
// //                     parsedPermissions = JSON.parse(responseData.permission);
// //                 } catch (error) {
// //                     console.error('Error parsing permissions JSON:', error);
// //                     parsedPermissions = {};
// //                 }

// //                 if (typeof parsedPermissions === 'string') {
// //                     parsedPermissions = JSON.parse(parsedPermissions);
// //                 }

// //                 if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
// //                     setCheckedNames(parsedPermissions);
// //                 } else {
// //                     console.error('Parsed permissions are not in the expected format:', parsedPermissions);
// //                 }
// //             }

// //         } catch (error) {
// //             console.error('Error fetching data:', error);
// //         }
// //     };

// //     fetchData();

// // }, [SpecId]);

// //     // 

// // const HandleSubmit = async () => {

// //     setLoad(true);

// //     if (!roleName) {
// //         setNameError('Role Name Required');
// //         Alert.alert('Missing', "Check The Role Name Field");
// //         setLoad(false);
// //         return;
// //     }

// //     try {
// //         const apiUrl = 'https://office3i.com/development/api/public/api/update_role';
// //         const response = await axios.put(apiUrl, {
// //             id: selectedID,
// //             role_name: roleName,
// //             permission: checkedNames,
// //             updated_by: data.userempid,
// //         }, {
// //             headers: {
// //                 Authorization: `Bearer ${data.token}`
// //             },
// //         });

// //         console.log(response.data, "response.data")

// //         if (response.data.status === "success") {
// //             setLoad(false);
// //             handleShowAlert(response.data);
// //         } else {
// //             setLoad(false);
// //             handleShowAlert1(response.data);
// //             // Alert.alert("Failed To Edit");
// //             console.error('Failed To Edit:', response.data.error);
// //         }

// //     } catch (error) {
// //         setLoad(false);
// //         handleShowAlert2();
// //         // Alert.alert("Error during submit", "Check The Input Credentials");
// //         console.error('Error during submit:', error);
// //     }
// // }

// // const HandleCancel = () => {
// //     setCheckedNames({});
// // };

// //     const [isAlertVisible, setAlertVisible] = useState(false);
// //     const [resMessage, setResMessage] = useState('');

// //     const handleShowAlert = (res) => {
// //         setAlertVisible(true);
// //         setResMessage(res.message)
// //         setTimeout(() => {
// //             setAlertVisible(false);
// //             navigation.navigate('Roles List');
// //         }, 2500);
// //     };

// //     const [isAlertVisible1, setAlertVisible1] = useState(false);
// //     const [resMessageFail, setResMessageFail] = useState('');

// //     const handleShowAlert1 = (res) => {
// //         setAlertVisible1(true);
// //         setResMessageFail(res.message);
// //         setTimeout(() => {
// //             setAlertVisible1(false);
// //         }, 2500);
// //     };

// //     const [isAlertVisible2, setAlertVisible2] = useState(false);

// //     const handleShowAlert2 = () => {
// //         setAlertVisible2(true);
// //         setTimeout(() => {
// //             setAlertVisible2(false);
// //         }, 3000);
// //     };

// //     return (
// //         <ScrollView>

// //             <View style={styles.AddroleContainer}>

// //                 <View style={styles.Inputcontainer}>

// //                     <View style={styles.Row}>
// //                         <View style={{ width: "40%", alignItems: 'center' }}>
// //                             <Text style={styles.AddroleText}>
// //                                 Edit Role Name
// //                             </Text>
// //                         </View>
// //                         <View style={{ width: "50%" }}>
// //                             <TextInput
// //                                 style={styles.TextInput}
// //                                 value={roleName}
// //                                 onChangeText={(txt) => setRoleName(txt)} />
// //                             <Text style={styles.errorText}>
// //                                 {nameError}
// //                             </Text>
// //                         </View>
// //                     </View>

// //                     {fields.map((field, fieldIndex) => (
// //                         <View key={fieldIndex}>
// //                             <View style={styles.checkView}>
// //                                 {['Dashboard', 'Holiday'].includes(field.name) && (
// //                                     <CheckBox
// //                                         disabled={false}
// //                                         value={checkedNames[field.name] ? true : false}
// //                                         onValueChange={() => toggleFieldCheckBox(fieldIndex)}
// //                                         tintColors={{ true: '#20DDFE' }}
// //                                         style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
// //                                     />
// //                                 )}
// //                                 <Text style={styles.FieldHeader}>{field.name}</Text>
// //                             </View>

// //                             {field.subheadings.map((subheading, subheadingIndex) => (
// //                                 <View key={subheadingIndex} style={styles.checkView}>
// //                                     <CheckBox
// //                                         disabled={false}
// //                                         value={checkedNames[field.name] && checkedNames[field.name].includes(subheading)} // Check if subheading is included in checkedNames
// //                                         onValueChange={() => toggleSubheadingCheckBox(fieldIndex, subheadingIndex)}
// //                                         style={{ marginLeft: 20 }}
// //                                         tintColors={{ true: '#20DDFE' }}
// //                                     />
// //                                     <Text style={styles.Subheading}>{subheading}</Text>
// //                                 </View>
// //                             ))}
// //                         </View>
// //                     ))}


// //                     <View style={styles.buttonview}>

// //                         <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
// //                             {
// //                                 load ?
// //                                     <ActivityIndicator size={"small"} color={"#fff"} /> :
// //                                     <Text style={styles.submitbuttonText}>
// //                                         Submit
// //                                     </Text>
// //                             }
// //                         </TouchableOpacity>

// //                         <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
// //                             <Text style={styles.cancelbuttontext}>
// //                                 Cancel
// //                             </Text>
// //                         </TouchableOpacity>

// //                     </View>

// //                 </View>

// //                 <LottieAlertSucess
// //                     visible={isAlertVisible}
// //                     animationSource={require('../../../../../Assets/Alerts/tick.json')}
// //                     title={resMessage}
// //                 />

// //                 <LottieAlertError
// //                     visible={isAlertVisible1}
// //                     animationSource={require('../../../../../Assets/Alerts/Close.json')}
// //                     title={resMessageFail}
// //                 />

// //                 <LottieCatchError
// //                     visible={isAlertVisible2}
// //                     animationSource={require('../../../../../Assets/Alerts/Catch.json')}
// //                     title="Error While Fetching Data"
// //                 />

// //             </View>

// //         </ScrollView>
// //     )
// // }

// // export default EditRole;


// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "./style";
// import axios from "axios";
// import { MenuActive, PrimaryBlue, SubContainer } from "../../../../../Assets/Colors";
// import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
// import LottieAlertError from "../../../../../Assets/Alerts/Error";
// import LottieCatchError from "../../../../../Assets/Alerts/Catch";
// import { useSelector } from "react-redux";

// const initialCheckedNames = {
//     'Dashboard': ['Dashboard'],
//     'EmployeeManagement': {
//         'ORGStructure': [],
//         'LeaveAndAttendancePolicy': [],
//         'CompanyPolicy': [],
//         'Employee': [],
//         'Template': {
//             'OfferLetter': [],
//             'AppointmentLetter': [],
//             'RelievingLetter': [],
//         }
//     },
//     'Attendance': [],
//     'HRSupport': [],
//     'TLApproval': [],
//     'HelpDesk': [],
//     'Assets': [],
//     'TeamManagement': {
//         'Events': {
//             'AddEvent': [],
//             'EventList': [],
//         },
//         'Meeting': {
//             'AddMeeting': [],
//             'MeetingList': [],
//         },
//         'TeamTask': {
//             'AddProject': [],
//             'ProjectList': [],
//             'AddTask': [],
//             'TaskList': [],
//             'AssignedTask': [],
//             'TLAssignedTask': [],
//         }
//     },
//     'Payroll': [],
//     'Holiday': [],
//     'Visitiormanagement': [],
//     'Logs': [],
//     'Recruitment': {
//         'PostJob': [],
//         'ListJob': [],
//         'InboxResume': [],
//         'CandidateTracker': {
//             'AddResume': [],
//             'CandidateStatus': [],
//         },
//         'SearchResume': [],
//     },
//     'Accounts': {
//         'GoodsandServices': [],
//         'CompanyDetails': {
//             'AddCompany': [],
//             'CompanyList': [],
//         },
//         'Purchase': {
//             'AddPurchase': [],
//             'PurchaseList': [],
//         },
//         'Sales': {
//             'AddSales': [],
//             'SalesList': [],
//         },
//         'DailyAccounts': [],
//     },
//     'SalesManagement': {
//         'Lead': {
//             'EnquiryList': [],
//             'AddLead': [],
//             'LeadList': [],
//         },
//         'PreSales': {
//             'EnquiryList': [],
//             'LeadList': [],
//             'AddLead': [],
//         },
//         'Sales': {
//             'LeadList': [],
//         }
//     },
// };

// const EditRole = ({ navigation, route }) => {

//     // data from redux Store 

//     const { data } = useSelector((state) => state.login);

//     // 

//     const SpecId = route.params.Id;

//     // states

//     const [load, setLoad] = useState(false);
//     const [roleName, setRoleName] = useState('');
//     const [nameError, setNameError] = useState('');
//     const [selectedID, setSelectedID] = useState();
//     const [Activity, setActivity] = useState();


//     const [checkedNames, setCheckedNames] = useState(initialCheckedNames);


//     useEffect(() => {

//         const fetchData = async () => {

//             try {
//                 const apiUrl = `https://office3i.com/development/api/public/api/editview_role/${SpecId}`;

//                 const response = await axios.get(apiUrl, {
//                     headers: {
//                         Authorization: `Bearer ${data.token}`
//                     }
//                 });

//                 const responseData = response.data.data;

//                 if (responseData) {
//                     setRoleName(responseData.role_name);
//                     setActivity(responseData.status);
//                     setSelectedID(responseData.id);

//                     let parsedPermissions;
//                     try {
//                         parsedPermissions = JSON.parse(responseData.permission);
//                     } catch (error) {
//                         console.error('Error parsing permissions JSON:', error);
//                         parsedPermissions = {};
//                     }

//                     if (typeof parsedPermissions === 'string') {
//                         parsedPermissions = JSON.parse(parsedPermissions);
//                     }

//                     if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
//                         setCheckedNames(parsedPermissions);
//                     } else {
//                         console.error('Parsed permissions are not in the expected format:', parsedPermissions);
//                     }
//                 }

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();

//     }, [SpecId]);

//     useEffect(() => {

//         if (checkedNames && checkedNames.HelpDesk) {
//             const Options = checkedNames.HelpDesk || [];
//             setIsHelpDeskSelected(Options.length > 0);
//             setSelectedHelpDeskOptions(Options);
//         }

//         if (checkedNames && checkedNames.Logs) {
//             const Options = checkedNames.Logs || [];
//             setIsLogsSelected(Options.length > 0);
//             setSelectedLogsOptions(Options);
//         }

//         if (checkedNames && checkedNames.Payroll) {
//             const Options = checkedNames.Payroll || [];
//             setIsPayrollSelected(Options.length > 0);
//             setSelectedPayrollOptions(Options);
//         }

//         if (checkedNames && checkedNames.Visitiormanagement) {
//             const Options = checkedNames.Visitiormanagement || [];
//             setIsVisitorManagementSelected(Options.length > 0);
//             setSelectedVisitorManagementOptions(Options);
//         }

//         if (checkedNames && checkedNames.Attendance) {
//             const Options = checkedNames.Attendance || [];
//             setIsAttendanceSelected(Options.length > 0);
//             setSelectedAttendanceOptions(Options);
//         }

//         if (checkedNames && checkedNames.Assets) {
//             const Options = checkedNames.Assets || [];
//             setIsAssetsSelected(Options.length > 0);
//             setSelectedAssetsOptions(Options);
//         }

//         if (checkedNames) {
//             // Handle Sales Management
//             if (checkedNames.SalesManagement) {
//                 const salesManagementOptions = checkedNames.SalesManagement || {};

//                 // Update Sales Management main selection state
//                 setIsSalesManagementSelected(Object.keys(salesManagementOptions).some(option =>
//                     Object.values(salesManagementOptions[option]).some(subOption => subOption.length > 0)
//                 ));

//                 // Update selected sales options
//                 setSelectedSalesOptions(Object.keys(salesManagementOptions).filter(option =>
//                     Object.values(salesManagementOptions[option]).some(subOption => subOption.length > 0)
//                 ));
//             }

//             // Handle other sections similarly...
//         }

//         if (checkedNames.TeamManagement) {
//             const teamManagementOptions = checkedNames.TeamManagement || {};

//             // Update Team Management main selection state
//             setIsTeamManagementSelected(Object.keys(teamManagementOptions).some(option =>
//                 Object.values(teamManagementOptions[option]).some(subOption => subOption.length > 0)
//             ));

//             // Update selected team options
//             setSelectedTeamOptions(Object.keys(teamManagementOptions).filter(option =>
//                 Object.values(teamManagementOptions[option]).some(subOption => subOption.length > 0)
//             ));
//         }

//         if (checkedNames.Accounts) {
//             const accountsOptions = checkedNames.Accounts || {};

//             setIsAccountsSelected(Object.keys(accountsOptions).some(option =>
//                 Array.isArray(accountsOptions[option])
//                     ? accountsOptions[option].length > 0
//                     : Object.values(accountsOptions[option]).some(subOption => subOption.length > 0)
//             ));

//             setSelectedAccountsOptions(Object.keys(accountsOptions).filter(option =>
//                 Array.isArray(accountsOptions[option])
//                     ? accountsOptions[option].length > 0
//                     : Object.values(accountsOptions[option]).some(subOption => subOption.length > 0)
//             ));
//         }

//         if (checkedNames.Recruitment) {
//             const recruitmentOptions = checkedNames.Recruitment || {};
//             setIsRecruitmentSelected(Object.keys(recruitmentOptions).some(option =>
//                 Array.isArray(recruitmentOptions[option])
//                     ? recruitmentOptions[option].length > 0
//                     : Object.values(recruitmentOptions[option]).some(subOption => subOption.length > 0)
//             ));
//             setSelectedRecruitmentOptions(Object.keys(recruitmentOptions).filter(option =>
//                 Array.isArray(recruitmentOptions[option])
//                     ? recruitmentOptions[option].length > 0
//                     : Object.values(recruitmentOptions[option]).some(subOption => subOption.length > 0)
//             ));
//         }

//         if (checkedNames) {
//             // Handle Employee Management
//             if (checkedNames.EmployeeManagement) {
//                 const employeeManagementOptions = checkedNames.EmployeeManagement || {};
//                 setIsEmployeeManagementSelected(Object.keys(employeeManagementOptions).some(option =>
//                     Array.isArray(employeeManagementOptions[option])
//                         ? employeeManagementOptions[option].length > 0
//                         : Object.values(employeeManagementOptions[option]).some(subOption => subOption.length > 0)
//                 ));
//                 setSelectedEmployeeManagementOptions(Object.keys(employeeManagementOptions).filter(option =>
//                     Array.isArray(employeeManagementOptions[option])
//                         ? employeeManagementOptions[option].length > 0
//                         : Object.values(employeeManagementOptions[option]).some(subOption => subOption.length > 0)
//                 ));
//                 setSelectedEmployeeManagementSubOptions(Object.keys(employeeManagementOptions).reduce((acc, option) => {
//                     if (typeof employeeManagementOptions[option] === 'object' && !Array.isArray(employeeManagementOptions[option])) {
//                         acc[option] = Object.keys(employeeManagementOptions[option]).filter(subOption => employeeManagementOptions[option][subOption].length > 0);
//                     }
//                     return acc;
//                 }, {}));
//             }
//         }

//     }, [checkedNames]);

//     // ------

//     const [isHelpDeskSelected, setIsHelpDeskSelected] = useState(false);
//     const [selectedHelpDeskOptions, setSelectedHelpDeskOptions] = useState([]);

//     const handleHelpDeskClick = () => {
//         setIsHelpDeskSelected((prevIsHelpDeskSelected) => {
//             const newIsHelpDeskSelected = !prevIsHelpDeskSelected;
//             if (!newIsHelpDeskSelected) {
//                 // If isHelpDeskSelected is set to false, reset HelpDesk to an empty array
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     HelpDesk: [],
//                 }));
//                 setSelectedHelpDeskOptions([]);
//             }
//             return newIsHelpDeskSelected;
//         });
//     };

//     const handleOptionClick = (option) => {
//         setSelectedHelpDeskOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option) // Deselect if already selected
//                 : [...prevOptions, option]; // Select if not already selected

//             // Update the checkedNames state with the new options
//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 HelpDesk: newOptions,
//             }));

//             return newOptions;
//         });
//     };

//     // -------

//     const [isLogsSelected, setIsLogsSelected] = useState(false);
//     const [selectedLogsOptions, setSelectedLogsOptions] = useState([]);

//     const handleLogsClick = () => {
//         setIsLogsSelected((prevIsLogsSelected) => {
//             const newIsLogsSelected = !prevIsLogsSelected;
//             if (!newIsLogsSelected) {
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Logs: [],
//                 }));
//                 setSelectedLogsOptions([]);
//             }
//             return newIsLogsSelected;
//         });
//     };

//     const handleLogsOptionClick = (option) => {
//         setSelectedLogsOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 Logs: newOptions,
//             }));

//             return newOptions;
//         });
//     };

//     // --------

//     const [isPayrollSelected, setIsPayrollSelected] = useState(false);
//     const [selectedPayrollOptions, setSelectedPayrollOptions] = useState([]);

//     const handlePayrollClick = () => {
//         setIsPayrollSelected((prevIsPayrollSelected) => {
//             const newIsPayrollSelected = !prevIsPayrollSelected;
//             if (!newIsPayrollSelected) {
//                 // If isPayrollSelected is set to false, reset Payroll to an empty array
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Payroll: [],
//                 }));
//                 setSelectedPayrollOptions([]);
//             }
//             return newIsPayrollSelected;
//         });
//     };

//     const handlePayrollOptionClick = (option) => {
//         setSelectedPayrollOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 Payroll: newOptions,
//             }));

//             return newOptions;
//         });
//     };

//     // --------

//     const [isVisitorManagementSelected, setIsVisitorManagementSelected] = useState(false);
//     const [selectedVisitorManagementOptions, setSelectedVisitorManagementOptions] = useState([]);

//     const handleVisitorManagementClick = () => {
//         setIsVisitorManagementSelected((prevIsVisitorManagementSelected) => {
//             const newIsVisitorManagementSelected = !prevIsVisitorManagementSelected;
//             if (!newIsVisitorManagementSelected) {
//                 // If isVisitorManagementSelected is set to false, reset Visitiormanagement to an empty array
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Visitiormanagement: [],
//                 }));
//                 setSelectedVisitorManagementOptions([]);
//             }
//             return newIsVisitorManagementSelected;
//         });
//     };

//     const handleVisitorManagementOptionClick = (option) => {
//         setSelectedVisitorManagementOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 Visitiormanagement: newOptions,
//             }));

//             return newOptions;
//         });
//     };

//     // -------

//     const [isAttendanceSelected, setIsAttendanceSelected] = useState(false);
//     const [selectedAttendanceOptions, setSelectedAttendanceOptions] = useState([]);

//     const handleAttendanceClick = () => {
//         setIsAttendanceSelected((prevIsAttendanceSelected) => {
//             const newIsAttendanceSelected = !prevIsAttendanceSelected;
//             if (!newIsAttendanceSelected) {
//                 // If isAttendanceSelected is set to false, reset Attendance to an empty array
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Attendance: [],
//                 }));
//                 setSelectedAttendanceOptions([]);
//             }
//             return newIsAttendanceSelected;
//         });
//     };

//     const handleAttendanceOptionClick = (option) => {
//         setSelectedAttendanceOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 Attendance: newOptions,
//             }));

//             return newOptions;
//         });
//     };

//     // ------

//     const [isAssetsSelected, setIsAssetsSelected] = useState(false);
//     const [selectedAssetsOptions, setSelectedAssetsOptions] = useState([]);

//     const handleAssetsClick = () => {
//         setIsAssetsSelected((prevIsAssetsSelected) => {
//             const newIsAssetsSelected = !prevIsAssetsSelected;
//             if (!newIsAssetsSelected) {
//                 // If isAssetsSelected is set to false, reset Assets to an empty array
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Assets: [],
//                 }));
//                 setSelectedAssetsOptions([]);
//             }
//             return newIsAssetsSelected;
//         });
//     };

//     const handleAssetsOptionClick = (option) => {
//         setSelectedAssetsOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 Assets: newOptions,
//             }));

//             return newOptions;
//         });
//     };


//     // ----

//     const [isSalesManagementSelected, setIsSalesManagementSelected] = useState(false);
//     const [selectedSalesOptions, setSelectedSalesOptions] = useState([]);

//     const handleSalesManagementClick = () => {
//         setIsSalesManagementSelected((prevIsAssetsSelected) => {
//             const newIsAssetsSelected = !prevIsAssetsSelected;
//             if (!newIsAssetsSelected) {
//                 // Reset SalesManagement options if deselected
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     SalesManagement: {
//                         'Lead': {
//                             'EnquiryList': [],
//                             'AddLead': [],
//                             'LeadList': [],
//                         },
//                         'PreSales': {
//                             'EnquiryList': [],
//                             'LeadList': [],
//                             'AddLead': [],
//                         },
//                         'Sales': {
//                             'LeadList': [],
//                         }
//                     }
//                 }));
//                 setSelectedSalesOptions([]);  // Clear selected main options
//             }
//             return newIsAssetsSelected;
//         });
//     };

//     const handleSalesOptionClick = (option) => {
//         setSelectedSalesOptions((prevOptions) => {
//             const isOptionSelected = prevOptions.includes(option);
//             let newOptions;

//             if (isOptionSelected) {
//                 // If the option is already selected and we're closing it, remove it from selected options
//                 newOptions = prevOptions.filter((item) => item !== option);

//                 // Reset the state for the specific Sales Management option being closed
//                 setCheckedNames((prevState) => {
//                     let resetOptionState;

//                     // Determine which option is being reset and apply the correct initial structure
//                     if (option === 'Lead') {
//                         resetOptionState = {
//                             EnquiryList: [],
//                             AddLead: [],
//                             LeadList: [],
//                         };
//                     } else if (option === 'Sales') {
//                         resetOptionState = {
//                             LeadList: [],
//                         };
//                     } else if (option === 'PreSales') {
//                         resetOptionState = {
//                             EnquiryList: [],
//                             LeadList: [],
//                             AddLead: [],
//                         };
//                     }

//                     return {
//                         ...prevState,
//                         SalesManagement: {
//                             ...prevState.SalesManagement,
//                             [option]: resetOptionState,
//                         },
//                     };
//                 });
//             } else {
//                 // If the option is not selected, add it to selected options
//                 newOptions = [...prevOptions, option];
//             }

//             return newOptions;
//         });
//     };

//     const handleNestedOptionClick = (mainOption, nestedOption) => {
//         setCheckedNames((prevState) => {
//             // Clone the current state of the main option
//             const updatedMainOption = { ...prevState.SalesManagement[mainOption] };

//             // Toggle selection for the nested option
//             updatedMainOption[nestedOption] = updatedMainOption[nestedOption].length > 0
//                 ? []  // Deselect if already selected
//                 : [nestedOption.toLowerCase()];  // Select if not already selected

//             console.log(`Updated ${mainOption} Options:`, updatedMainOption);

//             return {
//                 ...prevState,
//                 SalesManagement: {
//                     ...prevState.SalesManagement,
//                     [mainOption]: updatedMainOption,
//                 }
//             };
//         });
//     };

//     //  -----

//     const [isTeamManagementSelected, setIsTeamManagementSelected] = useState(false);
//     const [selectedTeamOptions, setSelectedTeamOptions] = useState([]);

//     const handleTeamManagementClick = () => {
//         setIsTeamManagementSelected((prevIsSelected) => {
//             const newIsSelected = !prevIsSelected;
//             if (!newIsSelected) {
//                 // Reset TeamManagement options if deselected
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     TeamManagement: {
//                         'Events': {
//                             'AddEvent': [],
//                             'EventList': [],
//                         },
//                         'Meeting': {
//                             'AddMeeting': [],
//                             'MeetingList': [],
//                         },
//                         'TeamTask': {
//                             'AddProject': [],
//                             'ProjectList': [],
//                             'AddTask': [],
//                             'TaskList': [],
//                             'AssignedTask': [],
//                             'TLAssignedTask': [],
//                         }
//                     }
//                 }));
//                 setSelectedTeamOptions([]);  // Clear selected main options
//             }
//             return newIsSelected;
//         });
//     };

//     const handleTeamOptionClick = (option) => {
//         setSelectedTeamOptions((prevOptions) => {
//             const isOptionSelected = prevOptions.includes(option);
//             let newOptions;

//             if (isOptionSelected) {
//                 // Remove option if deselected
//                 newOptions = prevOptions.filter((item) => item !== option);

//                 // Reset state for the specific Team Management option being closed
//                 setCheckedNames((prevState) => {
//                     let resetOptionState;

//                     if (option === 'Events') {
//                         resetOptionState = {
//                             AddEvent: [],
//                             EventList: [],
//                         };
//                     } else if (option === 'Meeting') {
//                         resetOptionState = {
//                             AddMeeting: [],
//                             MeetingList: [],
//                         };
//                     } else if (option === 'TeamTask') {
//                         resetOptionState = {
//                             AddProject: [],
//                             ProjectList: [],
//                             AddTask: [],
//                             TaskList: [],
//                             AssignedTask: [],
//                             TLAssignedTask: [],
//                         };
//                     }

//                     return {
//                         ...prevState,
//                         TeamManagement: {
//                             ...prevState.TeamManagement,
//                             [option]: resetOptionState,
//                         },
//                     };
//                 });
//             } else {
//                 // Add option if selected
//                 newOptions = [...prevOptions, option];
//             }

//             return newOptions;
//         });
//     };

//     const handleNestedOptionClickTM = (mainOption, nestedOption) => {
//         setCheckedNames((prevState) => {
//             // Clone the current state of the main option
//             const updatedMainOption = { ...prevState.TeamManagement[mainOption] };

//             // Toggle selection for the nested option
//             updatedMainOption[nestedOption] = updatedMainOption[nestedOption].length > 0
//                 ? []  // Deselect if already selected
//                 : [nestedOption.toLowerCase()];  // Select if not already selected

//             return {
//                 ...prevState,
//                 TeamManagement: {
//                     ...prevState.TeamManagement,
//                     [mainOption]: updatedMainOption,
//                 }
//             };
//         });
//     };

//     // -----

//     const [isAccountsSelected, setIsAccountsSelected] = useState(false);
//     const [selectedAccountsOptions, setSelectedAccountsOptions] = useState([]);

//     const handleAccountsClick = () => {
//         setIsAccountsSelected((prevIsSelected) => {
//             const newIsSelected = !prevIsSelected;
//             if (!newIsSelected) {
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Accounts: {
//                         'GoodsandServices': [],
//                         'CompanyDetails': {
//                             'AddCompany': [],
//                             'CompanyList': [],
//                         },
//                         'Purchase': {
//                             'AddPurchase': [],
//                             'PurchaseList': [],
//                         },
//                         'Sales': {
//                             'AddSales': [],
//                             'SalesList': [],
//                         },
//                         'DailyAccounts': [],
//                     }
//                 }));
//                 setSelectedAccountsOptions([]);
//             }
//             return newIsSelected;
//         });
//     };

//     const handleAccountsOptionClick = (option) => {
//         setSelectedAccountsOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => {
//                 const updatedState = { ...prevState };

//                 if (option === 'GoodsandServices') {
//                     // Update GoodsandServices as an array instead of an object
//                     updatedState.Accounts.GoodsandServices = newOptions.includes(option)
//                         ? ['goodsandservices']
//                         : [];
//                 } else if (option === 'DailyAccounts') {
//                     // Update DailyAccounts as an array instead of an object
//                     updatedState.Accounts.DailyAccounts = newOptions.includes(option)
//                         ? ['dailyaccounts']
//                         : [];
//                 } else if (typeof updatedState.Accounts[option] === 'object') {
//                     // Handle nested options for other main options
//                     updatedState.Accounts[option] = Object.keys(updatedState.Accounts[option]).reduce((acc, nestedOption) => {
//                         acc[nestedOption] = newOptions.includes(option) && updatedState.Accounts[option][nestedOption].length > 0
//                             ? [nestedOption.toLowerCase()]
//                             : [];
//                         return acc;
//                     }, {});
//                 }

//                 return updatedState;
//             });

//             return newOptions;
//         });
//     };

//     const handleNestedOptionClickAc = (mainOption, nestedOption) => {
//         setCheckedNames(prevState => {
//             const updatedMainOption = { ...prevState.Accounts[mainOption] };

//             updatedMainOption[nestedOption] = updatedMainOption[nestedOption].length > 0
//                 ? []  // Deselect if already selected
//                 : [nestedOption.toLowerCase()];  // Select if not already selected

//             return {
//                 ...prevState,
//                 Accounts: {
//                     ...prevState.Accounts,
//                     [mainOption]: updatedMainOption,
//                 }
//             };
//         });
//     };

//     // -----

//     const [isRecruitmentSelected, setIsRecruitmentSelected] = useState(false);
//     const [selectedRecruitmentOptions, setSelectedRecruitmentOptions] = useState([]);

//     const handleRecruitmentClick = () => {
//         setIsRecruitmentSelected((prevIsSelected) => {
//             const newIsSelected = !prevIsSelected;
//             if (!newIsSelected) {
//                 setCheckedNames((prevState) => ({
//                     ...prevState,
//                     Recruitment: {
//                         PostJob: [],
//                         ListJob: [],
//                         InboxResume: [],
//                         CandidateTracker: {
//                             AddResume: [],
//                             CandidateStatus: [],
//                         },
//                         SearchResume: [],
//                     }
//                 }));
//                 setSelectedRecruitmentOptions([]);
//             }
//             return newIsSelected;
//         });
//     };

//     const handleRecruitmentOptionClick = (option) => {
//         setSelectedRecruitmentOptions(prevOptions => {
//             const newOptions = prevOptions.includes(option)
//                 ? prevOptions.filter(item => item !== option)  // Deselect if already selected
//                 : [...prevOptions, option];  // Select if not already selected

//             setCheckedNames(prevState => {
//                 const updatedState = { ...prevState };

//                 if (option === 'PostJob') {
//                     updatedState.Recruitment.PostJob = newOptions.includes(option) ? ['Post_Job'] : [];
//                 } else if (option === 'ListJob') {
//                     updatedState.Recruitment.ListJob = newOptions.includes(option) ? ['List_Job'] : [];
//                 } else if (option === 'InboxResume') {
//                     updatedState.Recruitment.InboxResume = newOptions.includes(option) ? ['Inbox_Resume'] : [];
//                 } else if (option === 'SearchResume') {
//                     updatedState.Recruitment.SearchResume = newOptions.includes(option) ? ['Search_Resume'] : [];
//                 } else if (typeof updatedState.Recruitment[option] === 'object') {
//                     updatedState.Recruitment[option] = Object.keys(updatedState.Recruitment[option]).reduce((acc, nestedOption) => {
//                         acc[nestedOption] = newOptions.includes(option) && updatedState.Recruitment[option][nestedOption].length > 0
//                             ? [nestedOption.replace(/([A-Z])/g, '_$1').trim().toLowerCase()]
//                             : [];
//                         return acc;
//                     }, {});
//                 }

//                 return updatedState;
//             });

//             return newOptions;
//         });
//     };

//     const handleNestedOptionClickRec = (mainOption, nestedOption) => {
//         setCheckedNames(prevState => {
//             const updatedMainOption = { ...prevState.Recruitment[mainOption] };

//             updatedMainOption[nestedOption] = updatedMainOption[nestedOption].length > 0
//                 ? []  // Deselect if already selected
//                 : [nestedOption.replace(/([A-Z])/g, ' $1').trim().replace(' ', '_')];  // Select if not already selected

//             return {
//                 ...prevState,
//                 Recruitment: {
//                     ...prevState.Recruitment,
//                     [mainOption]: updatedMainOption,
//                 }
//             };
//         });
//     };

//     //  ----

//     const [isEmployeeManagementSelected, setIsEmployeeManagementSelected] = useState(false);
//     const [selectedEmployeeManagementOptions, setSelectedEmployeeManagementOptions] = useState([]);
//     const [selectedEmployeeManagementSubOptions, setSelectedEmployeeManagementSubOptions] = useState({});


//     const handleEmployeeManagementClick = () => {
//         setIsEmployeeManagementSelected(prevIsSelected => !prevIsSelected);

//         if (!isEmployeeManagementSelected) {
//             setCheckedNames(prevState => ({
//                 ...prevState,
//                 EmployeeManagement: {
//                     ORGStructure: [],
//                     LeaveAndAttendancePolicy: [],
//                     CompanyPolicy: [],
//                     Employee: [],
//                     Template: {
//                         OfferLetter: [],
//                         AppointmentLetter: [],
//                         RelievingLetter: [],
//                     }
//                 }
//             }));
//             setSelectedEmployeeManagementOptions([]);
//             setSelectedEmployeeManagementSubOptions({});
//         }
//     };

//     const handleEmployeeManagementOptionClick = (mainOption) => {
//         setSelectedEmployeeManagementOptions(prevOptions => {
//             const newOptions = prevOptions.includes(mainOption)
//                 ? prevOptions.filter(option => option !== mainOption)
//                 : [...prevOptions, mainOption];

//             if (!newOptions.includes(mainOption)) {
//                 setSelectedEmployeeManagementSubOptions(prevSubOptions => ({
//                     ...prevSubOptions,
//                     [mainOption]: []
//                 }));
//             }

//             return newOptions;
//         });
//     };

//     const handleNestedSubOptionClick = (mainOption, subOption) => {
//         setSelectedEmployeeManagementSubOptions(prevState => {
//             const selectedOptions = prevState[mainOption] || [];
//             const newSubOptions = selectedOptions.includes(subOption)
//                 ? selectedOptions.filter(option => option !== subOption)
//                 : [...selectedOptions, subOption];

//             setCheckedNames(prevCheckedNames => ({
//                 ...prevCheckedNames,
//                 EmployeeManagement: {
//                     ...prevCheckedNames.EmployeeManagement,
//                     [mainOption]: newSubOptions
//                 }
//             }));

//             return {
//                 ...prevState,
//                 [mainOption]: newSubOptions
//             };
//         });
//     };

//     const handleEmployeeManagementOptionClick1 = (mainOption) => {
//         setSelectedEmployeeManagementOptions(prevOptions => {
//             const newOptions = prevOptions.includes(mainOption)
//                 ? prevOptions.filter(option => option !== mainOption)
//                 : [...prevOptions, mainOption];

//             // If deselecting the main option, clear its sub-options
//             if (!newOptions.includes(mainOption)) {
//                 setSelectedEmployeeManagementSubOptions(prevSubOptions => ({
//                     ...prevSubOptions,
//                     [mainOption]: []
//                 }));
//             }

//             return newOptions;
//         });
//     };

//     const handleTemplateSubOptionClick1 = (templateOption, subOption) => {
//         setSelectedEmployeeManagementSubOptions(prevState => {
//             const selectedTemplateOptions = prevState.Template || {};
//             const selectedSubOptions = selectedTemplateOptions[templateOption] || [];
//             const newSubOptions = selectedSubOptions.includes(subOption)
//                 ? selectedSubOptions.filter(option => option !== subOption)
//                 : [...selectedSubOptions, subOption];

//             return {
//                 ...prevState,
//                 Template: {
//                     ...selectedTemplateOptions,
//                     [templateOption]: newSubOptions
//                 }
//             };
//         });
//     };

//     console.log('Checked Names State:', JSON.stringify(checkedNames, null, 2));

//     // HandleSubmit

//     const HandleSubmit = async () => {

//         setLoad(true);

//         if (!roleName) {
//             setNameError('Role Name Required');
//             Alert.alert('Missing', "Check The Role Name Field");
//             setLoad(false);
//             return;
//         }

//         try {
//             const apiUrl = 'https://office3i.com/development/api/public/api/update_role';
//             const response = await axios.put(apiUrl, {
//                 id: selectedID,
//                 role_name: roleName,
//                 permission: checkedNames,
//                 updated_by: data.userempid,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${data.token}`
//                 },
//             });

//             console.log(response.data, "response.data")

//             if (response.data.status === "success") {
//                 setLoad(false);
//                 handleShowAlert(response.data);
//             } else {
//                 setLoad(false);
//                 handleShowAlert1(response.data);
//                 console.error('Failed To Edit:', response.data.error);
//             }

//         } catch (error) {
//             setLoad(false);
//             handleShowAlert2();
//             console.error('Error during submit:', error);
//         }
//     }

//     const HandleCancel = () => {
//         navigation.goBack()
//     };

//     const [isAlertVisible, setAlertVisible] = useState(false);
//     const [resMessage, setResMessage] = useState('');

//     const handleShowAlert = (res) => {
//         setAlertVisible(true);
//         setResMessage(res.message)
//         setTimeout(() => {
//             setAlertVisible(false);
//             navigation.navigate('Roles List');
//         }, 2500);
//     };

//     const [isAlertVisible1, setAlertVisible1] = useState(false);
//     const [resMessageFail, setResMessageFail] = useState('');

//     const handleShowAlert1 = (res) => {
//         setAlertVisible1(true);
//         setResMessageFail(res.message);
//         setTimeout(() => {
//             setAlertVisible1(false);
//         }, 2500);
//     };

//     const [isAlertVisible2, setAlertVisible2] = useState(false);

//     const handleShowAlert2 = () => {
//         setAlertVisible2(true);
//         setTimeout(() => {
//             setAlertVisible2(false);
//         }, 3000);
//     };

//     const capitalizeWords = (text) => {
//         return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
//     };


//     return (
//         <ScrollView>

//             <View style={{ padding: "10%" }}>

//                 <View style={styles.Row}>
//                     <View style={{ width: "40%", alignItems: 'center' }}>
//                         <Text style={styles.AddroleText}>
//                             Add Role Name :
//                         </Text>
//                     </View>
//                     <View style={{ width: "60%" }}>
//                         <TextInput
//                             style={styles.TextInput}
//                             value={roleName}
//                             onChangeText={(txt) => setRoleName(txt)} />
//                         <Text style={styles.errorText}>
//                             {nameError}
//                         </Text>
//                     </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '5%' }}>
//                     <View style={{ width: '30%', height: 40, backgroundColor: '#F4FDFF', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>Heading</Text>
//                     </View>
//                     <View style={{ width: '30%', height: 40, backgroundColor: SubContainer, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>Sub-Head</Text>
//                     </View>
//                     <View style={{ width: '30%', height: 40, backgroundColor: PrimaryBlue, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>Selected</Text>
//                     </View>
//                 </View>

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: PrimaryBlue }]}
//                 >
//                     <Text>
//                         1.Dashboard
//                     </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isEmployeeManagementSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleEmployeeManagementClick}
//                 >
//                     <Text>2. Employee Management</Text>
//                 </TouchableOpacity>

//                 {isEmployeeManagementSelected && (
//                     <View>
//                         {Object.keys(checkedNames.EmployeeManagement).map((mainOption, index) => {
//                             const isMainOptionSelected = selectedEmployeeManagementOptions.includes(mainOption);

//                             return (
//                                 <View key={mainOption}>
//                                     {/* Main Option Button */}
//                                     <TouchableOpacity
//                                         style={[
//                                             styles.card1,
//                                             {
//                                                 backgroundColor: isMainOptionSelected ? SubContainer : '#F4FDFF',
//                                             },
//                                         ]}
//                                         onPress={() => handleEmployeeManagementOptionClick(mainOption)}
//                                     >
//                                         <Text>2.{`${index + 1} ${mainOption.replace(/([A-Z])/g, ' $1').trim()}`}</Text>
//                                     </TouchableOpacity>

//                                     {/* Render Nested Sub-Options for Each Main Option */}
//                                     {isMainOptionSelected && (
//                                         <View>
//                                             {mainOption === 'ORGStructure' && ['add_Role', 'roles_list', 'supervisor_list', 'org_Chart'].map((subOption) => (
//                                                 <TouchableOpacity
//                                                     key={subOption}
//                                                     style={[
//                                                         styles.card1,
//                                                         {
//                                                             // backgroundColor: selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                             //     ? PrimaryBlue
//                                                             //     : SubContainer,
//                                                             backgroundColor: isMainOptionSelected || selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                 ? PrimaryBlue
//                                                                 : SubContainer,
//                                                         },
//                                                     ]}
//                                                     onPress={() => handleNestedSubOptionClick(mainOption, subOption)}
//                                                 >
//                                                     <Text>{capitalizeWords(subOption.replace(/_/g, ' '))}</Text>
//                                                 </TouchableOpacity>
//                                             ))}

//                                             {mainOption === 'LeaveAndAttendancePolicy' && ['attendancePolicy', 'assignEmployeeShift', 'leavePolicy', 'Holiday'].map((subOption) => (
//                                                 <TouchableOpacity
//                                                     key={subOption}
//                                                     style={[
//                                                         styles.card1,
//                                                         {
//                                                             // backgroundColor: selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                             //     ? PrimaryBlue
//                                                             //     : SubContainer,
//                                                             backgroundColor: isMainOptionSelected || selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                 ? PrimaryBlue
//                                                                 : SubContainer,
//                                                         },
//                                                     ]}
//                                                     onPress={() => handleNestedSubOptionClick(mainOption, subOption)}
//                                                 >
//                                                     <Text>{capitalizeWords(subOption.replace(/_/g, ' '))}</Text>
//                                                 </TouchableOpacity>
//                                             ))}

//                                             {isMainOptionSelected && mainOption === 'CompanyPolicy' && (
//                                                 <View>
//                                                     {['companypolicy'].map(subOption => (
//                                                         <TouchableOpacity
//                                                             key={subOption}
//                                                             style={[
//                                                                 styles.card1,
//                                                                 {
//                                                                     // backgroundColor: selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                     //     ? PrimaryBlue
//                                                                     //     : SubContainer,
//                                                                     backgroundColor: isMainOptionSelected || selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                         ? PrimaryBlue
//                                                                         : SubContainer,
//                                                                 },
//                                                             ]}
//                                                             onPress={() => handleNestedSubOptionClick(mainOption, subOption)}
//                                                         >
//                                                             <Text>{capitalizeWords(subOption.replace(/_/g, ' '))}</Text>
//                                                         </TouchableOpacity>
//                                                     ))}
//                                                 </View>
//                                             )}

//                                             {isMainOptionSelected && mainOption === 'Employee' && (
//                                                 <View>
//                                                     {['Add_Employee', 'Employee_Confirmation', 'Emp_loyeeList'].map(subOption => (
//                                                         <TouchableOpacity
//                                                             key={subOption}
//                                                             style={[
//                                                                 styles.card1,
//                                                                 {
//                                                                     // backgroundColor: selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                     //     ? PrimaryBlue
//                                                                     //     : SubContainer,
//                                                                     backgroundColor: isMainOptionSelected || selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                                                         ? PrimaryBlue
//                                                                         : SubContainer,
//                                                                 },
//                                                             ]}
//                                                             onPress={() => handleNestedSubOptionClick(mainOption, subOption)}
//                                                         >
//                                                             <Text>{subOption.replace(/_/g, ' ')}</Text>
//                                                         </TouchableOpacity>
//                                                     ))}
//                                                 </View>
//                                             )}


//                                         </View>
//                                     )}
//                                 </View>
//                             );
//                         })}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isAttendanceSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleAttendanceClick}
//                 >
//                     <Text>
//                         3.Attendance Calculation
//                     </Text>
//                 </TouchableOpacity>

//                 {isAttendanceSelected && (
//                     <View>
//                         {['DailyAttendance', 'Monthly_Attendance', 'Monthly_List', 'Approval_List', 'Leave_Approval'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[styles.card1, {
//                                     backgroundColor: selectedAttendanceOptions.includes(option) ? PrimaryBlue : SubContainer,
//                                 }]}
//                                 onPress={() => handleAttendanceOptionClick(option)}
//                             >
//                                 <Text>
//                                     3.{`${index + 1} ${option.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isRecruitmentSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleRecruitmentClick}
//                 >
//                     <Text>4.Recruitment</Text>
//                 </TouchableOpacity>

//                 {isRecruitmentSelected && (
//                     <View>
//                         {Object.keys(checkedNames.Recruitment).map((option, index) => {
//                             const isMainOptionSelected =
//                                 Array.isArray(checkedNames.Recruitment[option]) &&
//                                 checkedNames.Recruitment[option].includes(option.replace(/([A-Z])/g, '_$1').trim().toLowerCase());

//                             return (
//                                 <View key={option}>
//                                     {/* Main Option Button */}
//                                     <TouchableOpacity
//                                         style={[
//                                             styles.card1,
//                                             {
//                                                 backgroundColor:
//                                                     isMainOptionSelected || selectedRecruitmentOptions.includes(option)
//                                                         ? PrimaryBlue
//                                                         : SubContainer,
//                                             },
//                                         ]}
//                                         onPress={() => handleRecruitmentOptionClick(option)}
//                                     >
//                                         <Text>4.{`${index + 1} ${option.replace(/([A-Z])/g, ' $1').trim()}`}</Text>
//                                     </TouchableOpacity>

//                                     {/* Render Nested Options for Each Main Option */}
//                                     {selectedRecruitmentOptions.includes(option) &&
//                                         typeof checkedNames.Recruitment[option] === 'object' &&
//                                         !Array.isArray(checkedNames.Recruitment[option]) && (
//                                             <View>
//                                                 {Object.keys(checkedNames.Recruitment[option]).map(
//                                                     (nestedOption, nestedIndex) => (
//                                                         <TouchableOpacity
//                                                             key={`${option}-${nestedOption}`}  // Ensure unique key for each nested option
//                                                             style={[
//                                                                 styles.card1,
//                                                                 {
//                                                                     backgroundColor:
//                                                                         checkedNames.Recruitment[option][nestedOption].length > 0
//                                                                             ? PrimaryBlue
//                                                                             : SubContainer,
//                                                                 },
//                                                             ]}
//                                                             onPress={() => handleNestedOptionClickRec(option, nestedOption)}
//                                                         >
//                                                             <Text>{nestedOption.replace(/([A-Z])/g, ' $1').trim()}</Text>
//                                                         </TouchableOpacity>
//                                                     )
//                                                 )}
//                                             </View>
//                                         )}
//                                 </View>
//                             );
//                         })}
//                     </View>
//                 )}


//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isPayrollSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handlePayrollClick}
//                 >
//                     <Text>
//                         5.Payroll
//                     </Text>
//                 </TouchableOpacity>

//                 {isPayrollSelected && (
//                     <View>
//                         {['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[styles.card1, {
//                                     backgroundColor: selectedPayrollOptions.includes(option) ? PrimaryBlue : SubContainer,
//                                 }]}
//                                 onPress={() => handlePayrollOptionClick(option)}
//                             >
//                                 <Text>
//                                     5.{`${index + 1} ${option.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isAccountsSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleAccountsClick}
//                 >
//                     <Text>6.Accounts</Text>
//                 </TouchableOpacity>

//                 {isAccountsSelected && (
//                     <View>
//                         {Object.keys(checkedNames.Accounts).map((option, index) => {
//                             const isMainOptionSelected =
//                                 Array.isArray(checkedNames.Accounts[option]) &&
//                                 checkedNames.Accounts[option].includes(option.toLowerCase());

//                             return (
//                                 <View key={option}>
//                                     {/* Main Option Button */}
//                                     <TouchableOpacity
//                                         style={[
//                                             styles.card1,
//                                             {
//                                                 backgroundColor:
//                                                     // isMainOptionSelected || selectedAccountsOptions.includes(option)
//                                                     //     ? PrimaryBlue
//                                                     //     : SubContainer,
//                                                     isMainOptionSelected
//                                                         ? PrimaryBlue
//                                                         : SubContainer,
//                                             },
//                                         ]}
//                                         onPress={() => handleAccountsOptionClick(option)}
//                                     >
//                                         <Text>6.{`${index + 1} ${option.replace('_', ' ')}`}</Text>
//                                     </TouchableOpacity>

//                                     {/* Render Nested Options for Each Main Option */}
//                                     {selectedAccountsOptions.includes(option) &&
//                                         typeof checkedNames.Accounts[option] === 'object' &&
//                                         !Array.isArray(checkedNames.Accounts[option]) && (
//                                             <View>
//                                                 {Object.keys(checkedNames.Accounts[option]).map(
//                                                     (nestedOption, nestedIndex) => (
//                                                         <TouchableOpacity
//                                                             key={`${option}-${nestedOption}`} // Ensure unique key for each nested option
//                                                             style={[
//                                                                 styles.card1,
//                                                                 {
//                                                                     backgroundColor:
//                                                                         checkedNames.Accounts[option][nestedOption].length > 0
//                                                                             ? PrimaryBlue
//                                                                             : SubContainer,
//                                                                 },
//                                                             ]}
//                                                             onPress={() => handleNestedOptionClickAc(option, nestedOption)}
//                                                         >
//                                                             <Text>{nestedOption.replace('_', ' ')}</Text>
//                                                         </TouchableOpacity>
//                                                     )
//                                                 )}
//                                             </View>
//                                         )}
//                                 </View>
//                             );
//                         })}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isSalesManagementSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleSalesManagementClick}
//                 >
//                     <Text>
//                         7.Sales Management
//                     </Text>
//                 </TouchableOpacity>

//                 {isSalesManagementSelected && (
//                     <View>
//                         {['Lead', 'PreSales', 'Sales'].map((option, index) => (
//                             <View key={option}>
//                                 {/* Main Option Button */}
//                                 <TouchableOpacity
//                                     style={[styles.card1, {
//                                         backgroundColor: selectedSalesOptions.includes(option) ? SubContainer : '#F4FDFF',
//                                     }]}
//                                     onPress={() => handleSalesOptionClick(option)}
//                                 >
//                                     <Text>7.{`${index + 1} ${option}`}</Text>
//                                 </TouchableOpacity>

//                                 {/* Render Nested Options for Each Main Option */}
//                                 {selectedSalesOptions.includes(option) && (
//                                     <View>
//                                         {Object.keys(checkedNames.SalesManagement[option]).map((nestedOption, index) => (
//                                             <TouchableOpacity
//                                                 key={`${option}-${nestedOption}`}  // Ensure unique key for each nested option
//                                                 style={[styles.card1, {
//                                                     backgroundColor: checkedNames.SalesManagement[option][nestedOption].length > 0 ? PrimaryBlue : SubContainer,
//                                                 }]}
//                                                 onPress={() => handleNestedOptionClick(option, nestedOption)}
//                                             >
//                                                 <Text>{nestedOption}</Text>
//                                             </TouchableOpacity>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isVisitorManagementSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleVisitorManagementClick}
//                 >
//                     <Text>
//                         8.Visitor management
//                     </Text>
//                 </TouchableOpacity>

//                 {isVisitorManagementSelected && (
//                     <View>
//                         {['Add_visitor', 'Visitor_log'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[styles.card1, {
//                                     backgroundColor: selectedVisitorManagementOptions.includes(option) ? PrimaryBlue : SubContainer,
//                                 }]}
//                                 onPress={() => handleVisitorManagementOptionClick(option)}
//                             >
//                                 <Text>
//                                     8.{`${index + 1} ${option.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isTeamManagementSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleTeamManagementClick}
//                 >
//                     <Text>
//                         9.Team Management
//                     </Text>
//                 </TouchableOpacity>

//                 {isTeamManagementSelected && (
//                     <View>
//                         {['Events', 'Meeting', 'TeamTask'].map((option, index) => (
//                             <View key={option}>
//                                 {/* Main Option Button */}
//                                 <TouchableOpacity
//                                     style={[styles.card1, {
//                                         backgroundColor: selectedTeamOptions.includes(option) ? SubContainer : '#F4FDFF',
//                                     }]}
//                                     onPress={() => handleTeamOptionClick(option)}
//                                 >
//                                     <Text>9.{`${index + 1} ${option}`}</Text>
//                                 </TouchableOpacity>

//                                 {/* Render Nested Options for Each Main Option */}
//                                 {selectedTeamOptions.includes(option) && (
//                                     <View>
//                                         {Object.keys(checkedNames.TeamManagement[option]).map((nestedOption, index) => (
//                                             <TouchableOpacity
//                                                 key={`${option}-${nestedOption}`}  // Ensure unique key for each nested option
//                                                 style={[styles.card1, {
//                                                     backgroundColor: checkedNames.TeamManagement[option][nestedOption].length > 0 ? PrimaryBlue : SubContainer,
//                                                 }]}
//                                                 onPress={() => handleNestedOptionClickTM(option, nestedOption)}
//                                             >
//                                                 <Text>{nestedOption}</Text>
//                                             </TouchableOpacity>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         ))}
//                     </View>
//                 )}


//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isAssetsSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleAssetsClick}
//                 >
//                     <Text>
//                         10.Assets Management
//                     </Text>
//                 </TouchableOpacity>

//                 {isAssetsSelected && (
//                     <View>
//                         {['Assets_Type', 'Assign_Asset', 'Asset_List'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[styles.card1, {
//                                     backgroundColor: selectedAssetsOptions.includes(option) ? PrimaryBlue : SubContainer,
//                                 }]}
//                                 onPress={() => handleAssetsOptionClick(option)}
//                             >
//                                 <Text>
//                                     10.{`${index + 1} ${option.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isHelpDeskSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleHelpDeskClick}
//                 >
//                     <Text>
//                         11.HelpDesk
//                     </Text>
//                 </TouchableOpacity>

//                 {isHelpDeskSelected && (
//                     <View>
//                         {['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[styles.card1, {
//                                     backgroundColor: selectedHelpDeskOptions.includes(option) ? PrimaryBlue : SubContainer,
//                                 }]}
//                                 onPress={() => handleOptionClick(option)}
//                             >
//                                 <Text>
//                                     11.{`${index + 1} ${option.replace('_', ' ')}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <TouchableOpacity
//                     style={[styles.card, { backgroundColor: isLogsSelected ? SubContainer : '#F4FDFF' }]}
//                     onPress={handleLogsClick}
//                 >
//                     <Text>
//                         12.Logs
//                     </Text>
//                 </TouchableOpacity>

//                 {isLogsSelected && (
//                     <View>
//                         {['Activity_Log', 'Employee_ActivityLog'].map((option, index) => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[
//                                     styles.card1,
//                                     { backgroundColor: selectedLogsOptions.includes(option) ? PrimaryBlue : SubContainer }
//                                 ]}
//                                 onPress={() => handleLogsOptionClick(option)}
//                             >
//                                 <Text>
//                                     12.{`${index + 1} ${option.replace('_', ' ')}`}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}

//                 <View style={styles.buttonview}>

//                     <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
//                         {
//                             load ?
//                                 <ActivityIndicator size={"small"} color={"#fff"} /> :
//                                 <Text style={styles.submitbuttonText}>
//                                     Submit
//                                 </Text>
//                         }
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
//                         <Text style={styles.cancelbuttontext}>
//                             Cancel
//                         </Text>
//                     </TouchableOpacity>

//                 </View>

//             </View>

//             <LottieAlertSucess
//                 visible={isAlertVisible}
//                 animationSource={require('../../../../../Assets/Alerts/tick.json')}
//                 title={resMessage}
//             />

//             <LottieAlertError
//                 visible={isAlertVisible1}
//                 animationSource={require('../../../../../Assets/Alerts/Close.json')}
//                 title={resMessageFail}
//             />

//             <LottieCatchError
//                 visible={isAlertVisible2}
//                 animationSource={require('../../../../../Assets/Alerts/Catch.json')}
//                 title="Error While Fetching Data"
//             />

//         </ScrollView>
//     )
// }

// export default EditRole;


// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "./style";
// import { useSelector } from "react-redux";
// import CheckBox from '@react-native-community/checkbox';
// import axios from "axios";
// import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
// import LottieAlertError from "../../../../../Assets/Alerts/Error";
// import LottieCatchError from "../../../../../Assets/Alerts/Catch";

// const EditRole = ({ navigation, route }) => {

//     // data from redux store

//     const { data } = useSelector((state) => state.login);

//     // states

//     const [load, setLoad] = useState(false);
//     const [roleName, setRoleName] = useState('');
//     const [nameError, setNameError] = useState('');

//     const [checkedNames, setCheckedNames] = useState({
//         'Dashboard': [],
//         'ORGStructure': [],
//         'LeaveAndAttendancePolicy': [],
//         'Employee': [],
//         'Attendance': [],
//         'HRSupport': [],
//         'TLApproval': [],
//         'HelpDesk': [],
//         'Assets': [],
//         'Events': [],
//         'Meeting': [],
//         'TeamTask': [],
//         'Payroll': [],
//         'Holiday': [],
//         'Visitiormanagement': [],
//         'Logs': [],
//     });

//     const initialFieldsState = [
//         { name: 'Dashboard', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
//         { name: 'ORGStructure', isChecked: false, subheadings: ['add_Role', 'roles_list', 'supervisor_list', 'empLevel_Category', 'emp_DocumentType', 'org_Chart'], checkboxes: Array(6).fill(false) },
//         { name: 'LeaveAndAttendancePolicy', isChecked: false, subheadings: ['addShiftSlot', 'assignEmployeeShift', 'attendancePolicy', 'attendanceType', 'attendanceLocation', 'leavePolicyType', 'leavePolicyCategory', '"leavePolicy"'], checkboxes: Array(7).fill(false) },
//         { name: 'Employee', isChecked: false, subheadings: ['Add_Employee', 'Emp_loyeeList', 'Employee_Confirmation'], checkboxes: Array(3).fill(false) },
//         { name: 'Attendance', isChecked: false, subheadings: ['DailyAttendance', 'Monthly_Attendance', 'Monthly_AttendanceCalendar', 'Monthly_List'], checkboxes: Array(4).fill(false) },
//         { name: 'HRSupport', isChecked: false, subheadings: ['Approval_List', 'Template', 'Job_Opening'], checkboxes: Array(3).fill(false) },
//         { name: 'TLApproval', isChecked: false, subheadings: ['Leave_Approval', 'OT_Approval'], checkboxes: Array(2).fill(false) },
//         { name: 'HelpDesk', isChecked: false, subheadings: ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'], checkboxes: Array(0).fill(false) },
//         { name: 'Assets', isChecked: false, subheadings: ['Assets_Type', 'Assign_Asset', 'Asset_List'], checkboxes: Array(3).fill(false) },
//         { name: 'Events', isChecked: false, subheadings: ['Add_Event', 'Event_List'], checkboxes: Array(2).fill(false) },
//         { name: 'Meeting', isChecked: false, subheadings: ['Add_Meeting', 'Meeting_List'], checkboxes: Array(2).fill(false) },
//         { name: 'TeamTask', isChecked: false, subheadings: ['Add_Project', 'Project_List', 'Add_task', 'Task_List', 'Assigned_Task', 'TL_Assigned_Task'], checkboxes: Array(6).fill(false) },
//         { name: 'Payroll', isChecked: false, subheadings: ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'], checkboxes: Array(3).fill(false) },
//         { name: 'Holiday', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
//         { name: 'Visitiormanagement', isChecked: false, subheadings: ['Add_visitor', 'Visitor_log'], checkboxes: Array(2).fill(false) },
//         { name: 'Logs', isChecked: false, subheadings: ['Activity_Log', 'Employee_ActivityLog'], checkboxes: Array(2).fill(false) },

//     ];

//     const [fields, setFields] = useState(initialFieldsState);
//     const [selectedID, setSelectedID] = useState();
//     const [Activity, setActivity] = useState();

//     // 

//     const toggleFieldCheckBox = (fieldIndex) => {
//         const newFields = [...fields];
//         newFields[fieldIndex].isChecked = !newFields[fieldIndex].isChecked;
//         newFields[fieldIndex].checkboxes = newFields[fieldIndex].checkboxes.map(() => newFields[fieldIndex].isChecked);
//         setFields(newFields);
//         updateCheckedNames(fieldIndex, newFields[fieldIndex].isChecked);
//     };

//     const toggleSubheadingCheckBox = (fieldIndex, subheadingIndex) => {
//         const newFields = [...fields];
//         newFields[fieldIndex].checkboxes[subheadingIndex] = !newFields[fieldIndex].checkboxes[subheadingIndex]; // Toggle the subheading checkbox state
//         setFields(newFields);
//         updateCheckedNames(fieldIndex, newFields[fieldIndex].checkboxes[subheadingIndex], subheadingIndex);
//     };

//     // 

//     const updateCheckedNames = (fieldIndex, isChecked, subheadingIndex = null) => {
//         const newCheckedNames = { ...checkedNames };
//         const fieldName = fields[fieldIndex].name;
//         if (isChecked) {
//             if (subheadingIndex !== null) {
//                 if (!newCheckedNames[fieldName]) {
//                     newCheckedNames[fieldName] = []; // Initialize as array if it doesn't exist
//                 }
//                 newCheckedNames[fieldName].push(fields[fieldIndex].subheadings[subheadingIndex]);
//             } else {
//                 // Add the field name directly to the array if it has no subheadings
//                 newCheckedNames[fieldName] = [fieldName];
//             }
//         } else {
//             if (subheadingIndex !== null) {
//                 if (newCheckedNames[fieldName]) { // Check if the array exists
//                     const index = newCheckedNames[fieldName].indexOf(fields[fieldIndex].subheadings[subheadingIndex]);
//                     if (index !== -1) {
//                         newCheckedNames[fieldName].splice(index, 1);
//                     }
//                 }
//             } else {
//                 // Remove the field name from the array if it has no subheadings
//                 delete newCheckedNames[fieldName];
//             }
//         }
//         setCheckedNames(newCheckedNames);
//     };

//     // 

//     const SpecId = route.params.Id;

//     //  

// useEffect(() => {

//     const fetchData = async () => {

//         try {
//             const apiUrl = `https://office3i.com/api/public/api/editview_role/${SpecId}`;

//             const response = await axios.get(apiUrl, {
//                 headers: {
//                     Authorization: `Bearer ${data.token}`
//                 }
//             });

//             const responseData = response.data.data;

//             if (responseData) {
//                 setRoleName(responseData.role_name);
//                 setActivity(responseData.status);
//                 setSelectedID(responseData.id);

//                 let parsedPermissions;
//                 try {
//                     parsedPermissions = JSON.parse(responseData.permission);
//                 } catch (error) {
//                     console.error('Error parsing permissions JSON:', error);
//                     parsedPermissions = {};
//                 }

//                 if (typeof parsedPermissions === 'string') {
//                     parsedPermissions = JSON.parse(parsedPermissions);
//                 }

//                 if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
//                     setCheckedNames(parsedPermissions);
//                 } else {
//                     console.error('Parsed permissions are not in the expected format:', parsedPermissions);
//                 }
//             }

//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();

// }, [SpecId]);

//     // 

// const HandleSubmit = async () => {

//     setLoad(true);

//     if (!roleName) {
//         setNameError('Role Name Required');
//         Alert.alert('Missing', "Check The Role Name Field");
//         setLoad(false);
//         return;
//     }

//     try {
//         const apiUrl = 'https://office3i.com/api/public/api/update_role';
//         const response = await axios.put(apiUrl, {
//             id: selectedID,
//             role_name: roleName,
//             permission: checkedNames,
//             updated_by: data.userempid,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${data.token}`
//             },
//         });

//         console.log(response.data, "response.data")

//         if (response.data.status === "success") {
//             setLoad(false);
//             handleShowAlert(response.data);
//         } else {
//             setLoad(false);
//             handleShowAlert1(response.data);
//             // Alert.alert("Failed To Edit");
//             console.error('Failed To Edit:', response.data.error);
//         }

//     } catch (error) {
//         setLoad(false);
//         handleShowAlert2();
//         // Alert.alert("Error during submit", "Check The Input Credentials");
//         console.error('Error during submit:', error);
//     }
// }

// const HandleCancel = () => {
//     setCheckedNames({});
// };

//     const [isAlertVisible, setAlertVisible] = useState(false);
//     const [resMessage, setResMessage] = useState('');

//     const handleShowAlert = (res) => {
//         setAlertVisible(true);
//         setResMessage(res.message)
//         setTimeout(() => {
//             setAlertVisible(false);
//             navigation.navigate('Roles List');
//         }, 2500);
//     };

//     const [isAlertVisible1, setAlertVisible1] = useState(false);
//     const [resMessageFail, setResMessageFail] = useState('');

//     const handleShowAlert1 = (res) => {
//         setAlertVisible1(true);
//         setResMessageFail(res.message);
//         setTimeout(() => {
//             setAlertVisible1(false);
//         }, 2500);
//     };

//     const [isAlertVisible2, setAlertVisible2] = useState(false);

//     const handleShowAlert2 = () => {
//         setAlertVisible2(true);
//         setTimeout(() => {
//             setAlertVisible2(false);
//         }, 3000);
//     };

//     return (
//         <ScrollView>

//             <View style={styles.AddroleContainer}>

//                 <View style={styles.Inputcontainer}>

//                     <View style={styles.Row}>
//                         <View style={{ width: "40%", alignItems: 'center' }}>
//                             <Text style={styles.AddroleText}>
//                                 Edit Role Name
//                             </Text>
//                         </View>
//                         <View style={{ width: "50%" }}>
//                             <TextInput
//                                 style={styles.TextInput}
//                                 value={roleName}
//                                 onChangeText={(txt) => setRoleName(txt)} />
//                             <Text style={styles.errorText}>
//                                 {nameError}
//                             </Text>
//                         </View>
//                     </View>

//                     {fields.map((field, fieldIndex) => (
//                         <View key={fieldIndex}>
//                             <View style={styles.checkView}>
//                                 {['Dashboard', 'Holiday'].includes(field.name) && (
//                                     <CheckBox
//                                         disabled={false}
//                                         value={checkedNames[field.name] ? true : false}
//                                         onValueChange={() => toggleFieldCheckBox(fieldIndex)}
//                                         tintColors={{ true: '#20DDFE' }}
//                                         style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
//                                     />
//                                 )}
//                                 <Text style={styles.FieldHeader}>{field.name}</Text>
//                             </View>

//                             {field.subheadings.map((subheading, subheadingIndex) => (
//                                 <View key={subheadingIndex} style={styles.checkView}>
//                                     <CheckBox
//                                         disabled={false}
//                                         value={checkedNames[field.name] && checkedNames[field.name].includes(subheading)} // Check if subheading is included in checkedNames
//                                         onValueChange={() => toggleSubheadingCheckBox(fieldIndex, subheadingIndex)}
//                                         style={{ marginLeft: 20 }}
//                                         tintColors={{ true: '#20DDFE' }}
//                                     />
//                                     <Text style={styles.Subheading}>{subheading}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     ))}


//                     <View style={styles.buttonview}>

//                         <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
//                             {
//                                 load ?
//                                     <ActivityIndicator size={"small"} color={"#fff"} /> :
//                                     <Text style={styles.submitbuttonText}>
//                                         Submit
//                                     </Text>
//                             }
//                         </TouchableOpacity>

//                         <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
//                             <Text style={styles.cancelbuttontext}>
//                                 Cancel
//                             </Text>
//                         </TouchableOpacity>

//                     </View>

//                 </View>

//                 <LottieAlertSucess
//                     visible={isAlertVisible}
//                     animationSource={require('../../../../../Assets/Alerts/tick.json')}
//                     title={resMessage}
//                 />

//                 <LottieAlertError
//                     visible={isAlertVisible1}
//                     animationSource={require('../../../../../Assets/Alerts/Close.json')}
//                     title={resMessageFail}
//                 />

//                 <LottieCatchError
//                     visible={isAlertVisible2}
//                     animationSource={require('../../../../../Assets/Alerts/Catch.json')}
//                     title="Error While Fetching Data"
//                 />

//             </View>

//         </ScrollView>
//     )
// }

// export default EditRole;


import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';

const EditRole = ({ navigation, route }) => {

    const SpecId = route.params.Id;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1AD0FF' }}>
            <WebView source={{ uri: `https://office3i.com/admin/editrole/${SpecId}` }} style={{ flex: 1 }} />
        </SafeAreaView>
    )
}

export default EditRole;