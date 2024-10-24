// import React, { useState } from "react";
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

// const AddRole = ({ navigation }) => {

//     // data from redux Store 

//     const { data } = useSelector((state) => state.login);

//     // states

//     const [load, setLoad] = useState(false);
//     const [roleName, setRoleName] = useState('');
//     const [nameError, setNameError] = useState('');

//     const [checkedNames, setCheckedNames] = useState(initialCheckedNames);

//     // 'EmployeeManagement': {
//     //     'ORGStructure': ['add_Role', 'roles_list', 'supervisor_list', 'org_Chart'],
//     //     'LeaveAndAttendancePolicy': ['attendancePolicy', 'assignEmployeeShift', 'leavePolicy', 'Holiday'],
//     //     'CompanyPolicy': ['companypolicy'],
//     //     'Employee': ['Add_Employee', 'Employee_Confirmation', 'Emp_loyeeList'],
//     //     'Template': {
//     //         'OfferLetter': ['Add_OfferLetter', 'Offer_LetterList'],
//     //         'AppointmentLetter': ['Add_AppointmentLetter', 'Appoint_mentLetterList'],
//     //         'RelievingLetter': ['Add_RelievingLetter', 'Relieving_LetterList'],
//     //     }
//     // },

//     // -------

//     const [isDashboardSelected, setIsDashboardSelected] = useState(false);

//     // const handleAdd = () => {
//     //     if (isDashboardSelected) {
//     //         // If selected, remove 'Dashboard' and set color to pink
//     //         setCheckedNames(prevState => ({
//     //             ...prevState,
//     //             Dashboard: [],  // Clear the Dashboard array
//     //         }));
//     //         setIsDashboardSelected(false); // Set the state to unselected
//     //     } else {
//     //         // If not selected, add 'Dashboard' and set color to red
//     //         setCheckedNames(prevState => ({
//     //             ...prevState,
//     //             Dashboard: ['Dashboard'],  // Add 'Dashboard' to the array
//     //         }));
//     //         setIsDashboardSelected(true); // Set the state to selected
//     //     }
//     // };

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

//     // const [isEmployeeManagementSelected, setIsEmployeeManagementSelected] = useState(false);
//     // const [selectedEmployeeManagementOptions, setSelectedEmployeeManagementOptions] = useState([]);
//     // const [selectedEmployeeManagementSubOptions, setSelectedEmployeeManagementSubOptions] = useState({});


//     // const handleEmployeeManagementClick = () => {
//     //     setIsEmployeeManagementSelected(prevIsSelected => !prevIsSelected);

//     //     if (!isEmployeeManagementSelected) {
//     //         setCheckedNames(prevState => ({
//     //             ...prevState,
//     //             EmployeeManagement: {
//     //                 ORGStructure: [],
//     //                 LeaveAndAttendancePolicy: [],
//     //                 CompanyPolicy: [],
//     //                 Employee: [],
//     //                 Template: {
//     //                     OfferLetter: [],
//     //                     AppointmentLetter: [],
//     //                     RelievingLetter: [],
//     //                 }
//     //             }
//     //         }));
//     //         setSelectedEmployeeManagementOptions([]);
//     //         setSelectedEmployeeManagementSubOptions({});
//     //     }
//     // };

//     // const handleEmployeeManagementOptionClick = (mainOption) => {
//     //     setSelectedEmployeeManagementOptions(prevOptions => {
//     //         const newOptions = prevOptions.includes(mainOption)
//     //             ? prevOptions.filter(option => option !== mainOption)
//     //             : [...prevOptions, mainOption];

//     //         if (!newOptions.includes(mainOption)) {
//     //             setSelectedEmployeeManagementSubOptions(prevSubOptions => ({
//     //                 ...prevSubOptions,
//     //                 [mainOption]: []
//     //             }));
//     //         }

//     //         return newOptions;
//     //     });
//     // };

//     // const handleNestedSubOptionClick = (mainOption, subOption) => {
//     //     setSelectedEmployeeManagementSubOptions(prevState => {
//     //         const selectedOptions = prevState[mainOption] || [];
//     //         const newSubOptions = selectedOptions.includes(subOption)
//     //             ? selectedOptions.filter(option => option !== subOption)
//     //             : [...selectedOptions, subOption];

//     //         setCheckedNames(prevCheckedNames => ({
//     //             ...prevCheckedNames,
//     //             EmployeeManagement: {
//     //                 ...prevCheckedNames.EmployeeManagement,
//     //                 [mainOption]: newSubOptions
//     //             }
//     //         }));

//     //         return {
//     //             ...prevState,
//     //             [mainOption]: newSubOptions
//     //         };
//     //     });
//     // };

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

//     const renderNestedOptions = (mainOption) => {
//         const nestedOptions = {
//             'ORGStructure': ['add_Role', 'roles_list', 'supervisor_list', 'org_Chart'],
//             'LeaveAndAttendancePolicy': ['attendancePolicy', 'assignEmployeeShift', 'leavePolicy', 'Holiday'],
//             'CompanyPolicy': ['companypolicy'],
//             'Employee': ['Add_Employee', 'Employee_Confirmation', 'Emp_loyeeList'],
//             'Template': {
//                 'OfferLetter': ['Add_OfferLetter', 'Offer_LetterList'],
//                 'AppointmentLetter': ['Add_AppointmentLetter', 'Appoint_mentLetterList'],
//                 'RelievingLetter': ['Add_RelievingLetter', 'Relieving_LetterList']
//             }
//         };

//         if (mainOption in nestedOptions) {
//             const options = nestedOptions[mainOption];
//             if (Array.isArray(options)) {
//                 return options.map(subOption => (
//                     <TouchableOpacity
//                         key={subOption}
//                         style={[
//                             styles.card1,
//                             {
//                                 backgroundColor: selectedEmployeeManagementSubOptions[mainOption]?.includes(subOption)
//                                     ? PrimaryBlue
//                                     : SubContainer,
//                             },
//                         ]}
//                         onPress={() => handleNestedSubOptionClick(mainOption, subOption)}
//                     >
//                         <Text>{capitalizeWords(subOption.replace(/_/g, ' '))}</Text>
//                     </TouchableOpacity>
//                 ));
//             } else {
//                 // Handle nested options for `Template` as an object with arrays
//                 return Object.keys(options).map(subOption => (
//                     <View key={subOption}>
//                         {options[subOption].map(option => (
//                             <TouchableOpacity
//                                 key={option}
//                                 style={[
//                                     styles.card1,
//                                     {
//                                         backgroundColor: selectedEmployeeManagementSubOptions[subOption]?.includes(option)
//                                             ? PrimaryBlue
//                                             : SubContainer,
//                                     },
//                                 ]}
//                                 onPress={() => handleNestedSubOptionClick(subOption, option)}
//                             >
//                                 <Text>{capitalizeWords(option.replace(/_/g, ' '))}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 ));
//             }
//         }
//         return null;
//     };

//     console.log('Checked Names State:', JSON.stringify(checkedNames, null, 2));

//     // HandleSubmit

//     const HandleSubmit = async () => {

//         setLoad(true);

//         try {

//             if (!roleName) {
//                 setNameError('Role Name Required ');
//                 Alert.alert('Missing', "Check The Role Name Field");
//                 setLoad(false);
//                 return;
//             } else {
//                 setNameError('');
//             }

//             const apiUrl = 'https://epkgroup.in/crm/api/public/api/addroleinsert';

//             const response = await axios.post(apiUrl, {
//                 role_name: roleName,
//                 permission: checkedNames,
//                 created_by: data.userempid,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${data.token}`
//                 },
//             });

//             console.log(response.data, "response.data")

//             if (response.data.status === "success") {
//                 setLoad(false);
//                 handleShowAlert(response.data);
//                 setCheckedNames(initialCheckedNames);
//                 setRoleName('');
//             } else if (response.data.status === "error") {
//                 setNameError(response.data.message);
//                 handleShowAlert1(response.data);
//                 setLoad(false);
//             } else {
//                 setLoad(false);
//                 handleShowAlert1(response.data);
//                 console.error('Failed To Add:', response.data.error);
//             }

//         } catch (error) {
//             setLoad(false);
//             handleShowAlert2();
//             console.error('Error during submit:', error);
//         }
//     }

//     const HandleCancel = () => {
//         setCheckedNames(initialCheckedNames);
//         setRoleName('');
//         setNameError('');
//         setIsDashboardSelected(false);
//         setSelectedAttendanceOptions([]);
//         setIsAttendanceSelected(false);
//         setSelectedRecruitmentOptions([]);
//         setIsRecruitmentSelected(false);
//         setSelectedPayrollOptions([]);
//         setIsPayrollSelected(false);
//         setSelectedSalesOptions([]);
//         setIsSalesManagementSelected(false);
//         setSelectedVisitorManagementOptions([]);
//         setIsVisitorManagementSelected(false);
//         setSelectedTeamOptions([]);
//         setIsTeamManagementSelected(false);
//         setSelectedAssetsOptions([]);
//         setIsAssetsSelected(false);
//         setSelectedHelpDeskOptions([]);
//         setIsHelpDeskSelected(false);
//         setSelectedLogsOptions([]);
//         setIsLogsSelected(false);
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
//                                     {isMainOptionSelected && renderNestedOptions(mainOption)}
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
//                                                 // isMainOptionSelected
//                                                 //     ? PrimaryBlue : SubContainer,
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

// export default AddRole;

import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';

const AddRole = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1AD0FF' }}>
            <WebView source={{ uri: 'https://office3i.com/admin/addrole' }} style={{ flex: 1 }} />
        </SafeAreaView>
    )
}

export default AddRole;