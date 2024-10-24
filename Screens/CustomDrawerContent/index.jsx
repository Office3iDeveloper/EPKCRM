import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./style";
import DropdownIcon from "../../Assets/Icons/Dropdowndownarrow.svg";
import DropupIcon from "../../Assets/Icons/DropdownUparrow.svg";
import HomeIcon from '../../Assets/Icons/Home.svg';
import OrgIcon from '../../Assets/Icons/Org.svg';
import LeavePolicyIcon from '../../Assets/Icons/leavpolicy.svg';
import EmployeeIcon from '../../Assets/Icons/Employee.svg';
import AttendanceIcon from '../../Assets/Icons/Attendance.svg';
import HrSupportIcon from '../../Assets/Icons/HRSupport.svg';
import TLApprovalIcon from '../../Assets/Icons/TLApproval.svg';
import HelpDeskIcon from '../../Assets/Icons/helpdesk.svg';
import AssetsIcon from '../../Assets/Icons/Assets.svg';
import EventsIcon from '../../Assets/Icons/Events.svg';
import MeetingIcon from '../../Assets/Icons/meeting.svg';
import TeamTaskIcon from '../../Assets/Icons/teamtask.svg';
import PayrollIcon from '../../Assets/Icons/Payroll.svg';
import HolidayIcon from '../../Assets/Icons/Holiday.svg';
import VistitorManageIcon from '../../Assets/Icons/visitorManagement.svg';
import LogsIcon from '../../Assets/Icons/Logs.svg';
import LogoutIcon from '../../Assets/Icons/logout.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from '../../Components/CustomAlert/index';
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawerContent = ({ navigation }) => {

    // ------------------------------------------------------------------------------------------------\

    const [checkedNames, setCheckedNames] = useState({
        'Dashboard': [],
        'EmployeeManagement': {
            'ORGStructure': [],
            'LeaveAndAttendancePolicy': [],
            'CompanyPolicy': [],
            'Employee': [],

            'Template': {
                'OfferLetter': [],
                'AppointmentLetter': [],
                'RelievingLetter': [],
            }
        },

        'Attendance': [],
        'HRSupport': [],
        'TLApproval': [],
        'HelpDesk': [],
        'Assets': [],
        'Events': [],
        'Meeting': [],
        'TeamTask': [],
        'Payroll': [],
        'Holiday': [],
        'Visitiormanagement': [],
        'Logs': [],
        'Recruitment': {
            'PostJob': [],
            'ListJob': [],
            'InboxResume': [],
            'CandidateTracker': {
                'AddResume': [],
                'CandidateStatus': [],
            },
            'SearchResume': [],
        },
        'Accounts': {
            'GoodsandServices': [],
            'CompanyDetails': {
                'AddCompany': [],
                'CompanyList': [],
            },
            'Purchase': {
                'AddPurchase': [],
                'PurchaseList': [],
            },
            'Sales': {
                'AddSales': [],
                'SalesList': [],
            },
            'DailyAccounts': [],
        }
    });

    // dispatch

    const dispatch = useDispatch();

    // custom Alert

    const [showAlert, setShowAlert] = useState(false);

    const handleeLogout = () => {
        setShowAlert(true);
    };

    const handleeCancel = () => {
        setShowAlert(false);
    };

    const handleeConfirm = () => {
        setShowAlert(false);
        signout();
    };

    // dropdowns for tabs

    const [dropdowns, setDropdowns] = useState({

        // --------- Employee Management

        EmployeeManagement: false,
        // 
        OrganisationStructure: false,
        // 
        AttendancePolicy: false,
        // 
        EmployeeInfo: false,
        // 
        Template: false,

        OfferLetter: false,
        AppointmentLetter: false,
        RelivingLetter: false,

        // ------ Attendance Calculations

        AttendanceCalculations: false,

        // ------- Recruitment

        Recruitment: false,

        CandidateTracker: false,

        //  ------ Payroll

        PayRoll: false,

        // ----- Accounts

        Account: false,

        companyDetails: false,
        salesinvoice: false,
        purchaseinvoice: false,

        // ----- Sales Management

        SalesManagement: false,

        SalesManagementLead: false,
        PreSalesDropdown: false,
        SalesDropdown: false,
        OnlineCustomerDropdown: false,

        // ----- Customer Management

        CustomerManagement: false,

        Customer: false,
        UserPlan: false,

        //  ----- Visitor management

        Visitormanagement: false,

        // ----- Team Management

        Teammanagement: false,

        TeamTask: false,
        Meeting: false,
        Events: false,

        // ----- Asset Management

        Assetmanagement: false,

        // ------ HelpDesk

        HelpDesk: false,

        // ----- Logs

        Logs: false,

    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...Object.fromEntries(
                Object.entries(prevDropdowns).map(([key, value]) => [
                    key,
                    key === dropdown ? !value : false,
                ])
            ),
        }));
    };

    const toggleDropdown1 = (dropdown) => {
        setDropdowns(prevDropdowns => {
            const newDropdowns = { ...prevDropdowns };

            if (['SalesManagement', 'EmployeeManagement', 'Recruitment', 'Account', 'Teammanagement', 'CustomerManagement'].includes(dropdown)) {
                // Toggle top-level dropdown and close others
                newDropdowns[dropdown] = !prevDropdowns[dropdown];
                Object.keys(newDropdowns).forEach(key => {
                    if (key !== dropdown && (
                        key.includes('SalesManagement') ||
                        key.includes('EmployeeManagement') ||
                        key.includes('Recruitment') ||
                        key.includes('Account') ||
                        key.includes('Teammanagement') ||
                        key.includes('CustomerManagement')
                    )) {
                        newDropdowns[key] = false;
                    }
                });
            } else if ([
                'SalesManagementLead',
                'PreSalesDropdown',
                'SalesDropdown',
                'OnlineCustomerDropdown',

                'OrganisationStructure',
                'AttendancePolicy',
                'Template',
                'EmployeeInfo',
                'companyPolicy',
                'OfferLetter',
                'AppointmentLetter',
                'RelivingLetter',

                'CandidateTracker',

                'companyDetails',
                'salesinvoice',
                'purchaseinvoice',

                'TeamTask',
                'Meeting',
                'Events',

                'Customer',
                'UserPlan',

            ].includes(dropdown)) {
                // Toggle nested dropdown and keep parent open
                newDropdowns[dropdown] = !prevDropdowns[dropdown];
            }

            return newDropdowns;
        });
    };


    // Data from Redux Store

    const { data } = useSelector((state) => state.login);

    // Log out

    // const signout = async () => {

    //     await AsyncStorage.removeItem('userData');
    //     const val = {};
    //     dispatch({ type: 'REMOVE_USER_DATA', payload: val });

    // }

    const signout = async () => {
        // Trigger the alert before signing out
        Alert.alert(
            'Confirm Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Sign out canceled'), // You can add any behavior for the cancel button
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        // The signout logic goes here
                        await AsyncStorage.removeItem('userData');
                        const val = {};
                        dispatch({ type: 'REMOVE_USER_DATA', payload: val });
                    },
                    style: 'destructive', // Optional: styles the button as destructive
                },
            ],
            { cancelable: false } // Prevents dismissing the alert by tapping outside
        );
    };

    // const signout = async () => {
    //     try {
    //         const apiUrl = 'https://epkgroup.in/crm/api/public/api/logout';

    //         const response = await axios.post(apiUrl, {}, { 
    //             headers: {
    //                 Authorization: `Bearer ${data.token}`
    //             }
    //         });

    //         const ResData = response.data;

    //         if (ResData.status === "success") {
    //             Alert.alert("Successful", ResData.message);
    //             await AsyncStorage.removeItem('userData');
    //             dispatch({ type: 'REMOVE_USER_DATA', payload: {} });
    //         } else {
    //             Alert.alert("Failed", ResData.message);
    //         }

    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };


    // Image URL  

    const imageUrl = `https://epkgroup.in/crm/api/storage/app/${data.userimage}`;

    // 

    useEffect(() => {
        axios.get(`https://epkgroup.in/crm/api/public/api/editview_role/${data.userrole}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const roleData = res.data.data;

                    let parsedPermissions;
                    try {
                        parsedPermissions = JSON.parse(roleData.permission);
                    } catch (error) {
                        console.error('Error parsing permissions JSON:', error);
                        parsedPermissions = {};
                    }

                    if (typeof parsedPermissions === 'string') {
                        parsedPermissions = JSON.parse(parsedPermissions);
                    }

                    if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
                        setCheckedNames(parsedPermissions);
                    } else {
                        console.error('Parsed permissions are not in the expected format:', parsedPermissions);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [data.userempid, data.token]);

    const DashboardPermissions = ['Dashboard'];

    const hasAccessToDashboard = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return DashboardPermissions.some(permission => checkedNames.Dashboard.includes(permission));
        }
        return false;
    };

    const PostJobPermissions = ['Post_Job'];

    const hasAccessToPostJob = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return PostJobPermissions.some(permission => checkedNames.Recruitment?.PostJob.includes(permission));
        }
        return false;
    };

    const ListJobPermissions = ['List_Job'];

    const hasAccessToListJob = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return ListJobPermissions.some(permission => checkedNames.Recruitment?.ListJob.includes(permission));
        }
        return false;
    };

    const InboxResumePermissions = ['Inbox_Resume'];

    const hasAccessToInboxResume = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return InboxResumePermissions.some(permission => checkedNames.Recruitment?.InboxResume.includes(permission));
        }
        return false;
    };

    const candidatetrackerPermissions = {
        AddResume: ['Add_Resume'],
        CandidateStatus: ['Candidate_Status'],
    };

    const hasAccessTocandidatetracker = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return Object.keys(candidatetrackerPermissions).some(candidatetrackerType =>
                candidatetrackerPermissions[candidatetrackerType].some(permission =>
                    checkedNames.Recruitment?.CandidateTracker[candidatetrackerType]?.includes(permission)
                )
            );

        }
        return false;
    };

    const SearchResumePermissions = ['Search_Resume'];

    const hasAccessToSearchResume = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return SearchResumePermissions.some(permission => checkedNames.Recruitment?.SearchResume.includes(permission));
        }
        return false;
    };

    const orgStructurePermissions = ['add_Role', 'roles_list', 'supervisor_list', 'empLevel_Category', 'emp_DocumentType', 'org_Chart'];

    const hasAccessToorgStructure = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return orgStructurePermissions.some(permission => checkedNames.EmployeeManagement?.ORGStructure.includes(permission));
        }
        return false;
    };

    const LeaveAndAttendancePolicyPermissions = ['addShiftSlot', 'assignEmployeeShift', 'attendancePolicy', 'attendanceType', 'attendanceLocation', 'leavePolicyType', 'leavePolicyCategory', 'leavePolicy', 'overtimeType', 'Holiday'];

    const hasAccessToLeaveAndAttendancePolicy = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return LeaveAndAttendancePolicyPermissions.some(permission => checkedNames.EmployeeManagement?.LeaveAndAttendancePolicy.includes(permission));
        }
        return false;
    };

    const CompanyPolicyPermissions = ['companypolicy'];

    const hasAccessToCompanyPolicy = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return CompanyPolicyPermissions.some(permission => checkedNames.EmployeeManagement?.CompanyPolicy.includes(permission));
        }
        return false;
    };

    const templatePermissions = {
        OfferLetter: ['Add_OfferLetter', 'Offer_LetterList'],
        AppointmentLetter: ['Add_AppointmentLetter', 'Appoint_mentLetterList'],
        RelievingLetter: ['Add_RelievingLetter', 'Relieving_LetterList'],
    };

    const hasAccessToTemplate = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return Object.keys(templatePermissions).some(templateType =>
                templatePermissions[templateType].some(permission =>
                    checkedNames.EmployeeManagement?.Template[templateType]?.includes(permission)
                )
            );
        }
        return false;
    };

    const EmployeePermissions = ['Add_Employee', 'Emp_loyeeList', 'Employee_Confirmation'];

    const hasAccessToEmployee = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return EmployeePermissions.some(permission => checkedNames.EmployeeManagement?.Employee.includes(permission));
        }
        return false;
    };

    const AttendancePermissions = ['DailyAttendance', 'Monthly_Attendance', 'Monthly_AttendanceCalendar', 'Monthly_List', 'Approval_List', 'Leave_Approval'];

    const hasAccessToAttendance = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return AttendancePermissions.some(permission => checkedNames.Attendance.includes(permission));
        }
        return false;
    };

    const HRSupportPermissions = ['Approval_List', 'Template', 'Job_Opening'];

    const hasAccessToHRSupport = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return HRSupportPermissions.some(permission => checkedNames.HRSupport.includes(permission));
        }
        return false;
    };

    const TLApprovalPermissions = ['Leave_Approval', 'OT_Approval'];

    const hasAccessToTLApproval = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return TLApprovalPermissions.some(permission => checkedNames.TLApproval.includes(permission));
        }
        return false;
    };

    const HelpDeskPermissions = ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'];

    const hasAccessToHelpDesk = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return HelpDeskPermissions.some(permission => checkedNames.HelpDesk.includes(permission));
        }
        return false;
    };

    const AssetsPermissions = ['Assets_Type', 'Assign_Asset', 'Asset_List'];

    const hasAccessToAssets = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return AssetsPermissions.some(permission => checkedNames.Assets.includes(permission));
        }
        return false;
    };

    const PayrollPermissions = ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'];

    const hasAccessToPayroll = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return PayrollPermissions.some(permission => checkedNames.Payroll.includes(permission));
        }
        return false;
    };

    const HolidayPermissions = ['Holiday'];

    const hasAccessToHoliday = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return HolidayPermissions.some(permission => checkedNames.Holiday.includes(permission));
        }
        return false;
    };

    const VisitiormanagementPermissions = ['Add_visitor', 'Visitor_log'];

    const hasAccessToVisitiormanagement = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return VisitiormanagementPermissions.some(permission => checkedNames.Visitiormanagement.includes(permission));
        }
        return false;
    };

    const LogsPermissions = ['Activity_Log', 'Employee_ActivityLog']

    const hasAccessToLogs = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return LogsPermissions.some(permission => checkedNames.Logs.includes(permission));
        }
        return false;
    };

    // Accounts

    const goodsAndServicesPermissions = ['goodsandservices'];
    const companyDetailsPermissions = {
        AddCompany: ['addcompany'],
        CompanyList: ['companylist']
    };
    const salesPermissions = {
        AddSales: ['addsales'],
        SalesList: ['saleslist']
    };
    const purchasePermissions = {
        AddPurchase: ['addpurchase'],
        PurchaseList: ['purchaselist']
    };
    const dailyAccountsPermissions = ['dailyaccounts'];

    // Define access check functions
    const hasAccessToGoodsAndServices = () => {
        return goodsAndServicesPermissions.some(permission => checkedNames.Accounts?.GoodsandServices.includes(permission));
    };

    const hasAccessToCompanyDetails = () => {
        return Object.keys(companyDetailsPermissions).some(companyDetail =>
            companyDetailsPermissions[companyDetail].some(permission =>
                checkedNames.Accounts?.CompanyDetails[companyDetail]?.includes(permission)
            )
        );
    };

    const hasAccessToSalesInvoice = () => {
        return Object.keys(salesPermissions).some(saleType =>
            salesPermissions[saleType].some(permission =>
                checkedNames.Accounts?.Sales[saleType]?.includes(permission)
            )
        );
    };

    const hasAccessToPurchaseInvoice = () => {
        return Object.keys(purchasePermissions).some(purchaseType =>
            purchasePermissions[purchaseType].some(permission =>
                checkedNames.Accounts?.Purchase[purchaseType]?.includes(permission)
            )
        );
    };

    const hasAccessToDailyAccounts = () => {
        return dailyAccountsPermissions.some(permission => checkedNames.Accounts?.DailyAccounts.includes(permission));
    };

    // Check if any permissions are available
    const hasAnyAccountPermissions = () => {
        return hasAccessToGoodsAndServices() ||
            hasAccessToCompanyDetails() ||
            hasAccessToSalesInvoice() ||
            hasAccessToPurchaseInvoice() ||
            hasAccessToDailyAccounts();
    };

    // // Sales Management

    // // Define permissions based on API response
    // const salesManagementPermissions = {
    //     Lead: {
    //         EnquiryList: ['enquirylist'],
    //         AddLead: ['addlead'],
    //         LeadList: ['leadlist']
    //     },
    //     PreSales: {
    //         EnquiryList: ['enquirylist'],
    //         LeadList: ['leadlist'],
    //         AddLead: ['addlead']
    //     },
    //     Sales: {
    //         LeadList: ['leadlist']
    //     }
    // };

    // // Define access check functions
    // const hasAccessToLead = () => {
    //     return Object.keys(salesManagementPermissions.Lead).some(permissionType =>
    //         salesManagementPermissions.Lead[permissionType].some(permission =>
    //             checkedNames.SalesManagement?.Lead[permissionType]?.includes(permission)
    //         )
    //     );
    // };

    // const hasAccessToPreSales = () => {
    //     return Object.keys(salesManagementPermissions.PreSales).some(permissionType =>
    //         salesManagementPermissions.PreSales[permissionType].some(permission =>
    //             checkedNames.SalesManagement?.PreSales[permissionType]?.includes(permission)
    //         )
    //     );
    // };

    // const hasAccessToSales = () => {
    //     return Object.keys(salesManagementPermissions.Sales).some(permissionType =>
    //         salesManagementPermissions.Sales[permissionType].some(permission =>
    //             checkedNames.SalesManagement?.Sales[permissionType]?.includes(permission)
    //         )
    //     );
    // };

    // // Check if any permissions are available
    // const hasAnySalesManagementPermissions = () => {
    //     return hasAccessToLead() || hasAccessToPreSales() || hasAccessToSales();
    // };

    //    Team Management

    // Define permissions based on API response
    const teamManagementPermissions = {
        Events: {
            AddEvent: ['addevent'],
            EventList: ['eventlist']
        },
        Meeting: {
            AddMeeting: ['addmeeting'],
            MeetingList: ['meetinglist']
        },
        TeamTask: {
            AddProject: ['addproject'],
            ProjectList: ['projectlist'],
            AddTask: ['addtask'],
            TaskList: ['tasklist'],
            AssignedTask: ['assignedtask'],
            TLAssignedTask: ['tlassignedtask']
        }
    };

    // Define access check functions
    const hasAccessToEvents = () => {
        return Object.keys(teamManagementPermissions.Events).some(permissionType =>
            teamManagementPermissions.Events[permissionType].some(permission =>
                checkedNames.TeamManagement?.Events[permissionType]?.includes(permission)
            )
        );
    };

    const hasAccessToMeeting = () => {
        return Object.keys(teamManagementPermissions.Meeting).some(permissionType =>
            teamManagementPermissions.Meeting[permissionType].some(permission =>
                checkedNames.TeamManagement?.Meeting[permissionType]?.includes(permission)
            )
        );
    };

    const hasAccessToTeamTask = () => {
        return Object.keys(teamManagementPermissions.TeamTask).some(permissionType =>
            teamManagementPermissions.TeamTask[permissionType].some(permission =>
                checkedNames.TeamManagement?.TeamTask[permissionType]?.includes(permission)
            )
        );
    };

    // Check if any permissions are available
    const hasAnyTeamManagementPermissions = () => {
        return hasAccessToEvents() || hasAccessToMeeting() || hasAccessToTeamTask();
    };

    // Sales Management

    // Define permissions based on API response
    const salesManagementPermissions = {
        Lead: {
            EnquiryList: ['enquirylist'],
            AddEnquiry: ['addenquiry'],
        },
        PreSales: {
            EnquiryList: ['enquirylist'],
            AddCustomer: ['addcustomer'],
            TrialPackList: ['trialpacklist'],
            BuyPackList: ['buypacklist'],
            OneTimeInstallation: ['onetimeinstallation'],
        },
        Sales: {
            AddCustomer: ['addcustomer'],
            TrialPackList: ['trialpacklist'],
            BuyPackList: ['buypacklist'],
            OneTimeInstallation: ['onetimeinstallation'],
        },
        OnlineCustomer: {
            TrialPackList: ['trialpacklist'],
            BuyPackList: ['buypacklist'],
            OneTimeInstallation: ['onetimeinstallation'],
        }
    };

    // Define access check functions
    const hasAccessToLead = () => {
        return Object.keys(salesManagementPermissions.Lead).some(permissionType =>
            salesManagementPermissions.Lead[permissionType].some(permission =>
                checkedNames.SalesManagement?.Lead[permissionType]?.includes(permission)
            )
        );
    };

    const hasAccessToPreSales = () => {
        return Object.keys(salesManagementPermissions.PreSales).some(permissionType =>
            salesManagementPermissions.PreSales[permissionType].some(permission =>
                checkedNames.SalesManagement?.PreSales[permissionType]?.includes(permission)
            )
        );
    };

    const hasAccessToSales = () => {
        return Object.keys(salesManagementPermissions.Sales).some(permissionType =>
            salesManagementPermissions.Sales[permissionType].some(permission =>
                checkedNames.SalesManagement?.Sales[permissionType]?.includes(permission)
            )
        );
    };

    const hasAccessToOnlineCustomer = () => {
        return Object.keys(salesManagementPermissions.OnlineCustomer).some(permissionType =>
            salesManagementPermissions.OnlineCustomer[permissionType].some(permission =>
                checkedNames.SalesManagement?.OnlineCustomer[permissionType]?.includes(permission)
            )
        );
    };

    // Check if any permissions are available
    const hasAnySalesManagementPermissions = () => {
        return hasAccessToLead() || hasAccessToPreSales() || hasAccessToSales() || hasAccessToOnlineCustomer();
    };


    return (

        <>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>

                    <View style={styles.shadowContainer}>
                        {
                            Platform.OS === "ios" ?
                                <View
                                    // colors={['#1FDAFD', '#0670F5']}
                                    style={styles.profileview}

                                >
                                    <View style={styles.imageview}>
                                        <Image
                                            source={{ uri: imageUrl }}
                                            style={styles.imageStyle}
                                        />
                                    </View>

                                    <View style={{ width: '70%' }}>
                                        <Text style={styles.profileviewusername}>{data.username}</Text>
                                        <Text style={styles.profileviewuserdepartmentname}>{data.userdepartmentname}</Text>
                                    </View>
                                </View>

                                : <LinearGradient
                                    colors={['#ed1c26', '#e5707bd1']}
                                    style={styles.profileview}

                                >
                                    <View style={styles.imageview}>
                                        <Image
                                            source={{ uri: imageUrl }}
                                            style={styles.imageStyle}
                                        />
                                    </View>

                                    <View style={{ width: '70%' }}>
                                        <Text style={styles.profileviewusername}>{data.username}</Text>
                                        <Text style={styles.profileviewuserdepartmentname}>{data.userdepartmentname}</Text>
                                    </View>
                                </LinearGradient>}
                    </View>

                </TouchableOpacity>


                <DrawerContentScrollView style={styles.DrawerContentScrollView} contentContainerStyle={{ paddingTop: 0 }}>

                    <View>

                        {/* Home */}

                        {hasAccessToDashboard() && checkedNames.Dashboard.length > 0 && (
                            <>
                                {checkedNames.Dashboard.includes('Dashboard') && (
                                    <DrawerItem
                                        style={styles.forSingle}
                                        label="Dashboard"
                                        labelStyle={[styles.forsinglelable]}
                                        icon={() => <HomeIcon width={20} height={20} color={'#000'} />}
                                        onPress={() => navigation.navigate('Dashboard')}
                                    />
                                )}
                            </>
                        )}

                        {/* Employee Management */}

                        {(
                            (hasAccessToorgStructure() && checkedNames.EmployeeManagement?.ORGStructure.length > 0) ||
                            (hasAccessToLeaveAndAttendancePolicy() && checkedNames.EmployeeManagement?.LeaveAndAttendancePolicy.length > 0)
                        ) && (
                                <>
                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => toggleDropdown('EmployeeManagement')}
                                    >
                                        <View style={styles.Tab}>
                                            <OrgIcon width={20} height={20} color={'#000'} />
                                            <Text style={styles.dropdownText}>Employee Management</Text>
                                        </View>
                                        {dropdowns.EmployeeManagement ? (
                                            <DropupIcon width={15} height={15} color={'#000'} />
                                        ) : (
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                        )}
                                    </TouchableOpacity>

                                    {dropdowns.EmployeeManagement && (

                                        <>

                                            {/*  */}

                                            {hasAccessToorgStructure() && checkedNames.EmployeeManagement?.ORGStructure.length > 0 && (
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    onPress={() => toggleDropdown1('OrganisationStructure')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>ORG Structure</Text>
                                                    </View>
                                                    {dropdowns.OrganisationStructure ? (
                                                        <DropupIcon width={15} height={15} color={'#000'} />
                                                    ) : (
                                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                                    )}
                                                </TouchableOpacity>
                                            )}

                                            {dropdowns.OrganisationStructure && (
                                                <>

                                                    <DrawerItem
                                                        label="Department List"
                                                        onPress={() => navigation.navigate('Department List')}
                                                    />

                                                    {checkedNames.EmployeeManagement.ORGStructure.includes('add_Role') && (
                                                        <DrawerItem
                                                            label="Add Role / Designation"
                                                            onPress={() => navigation.navigate('Add Role')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.ORGStructure.includes('roles_list') && (
                                                        <DrawerItem
                                                            label="Role List"
                                                            onPress={() => navigation.navigate('Roles List')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.ORGStructure.includes('supervisor_list') && (
                                                        <DrawerItem
                                                            label="Supervisor List / Hierarchy"
                                                            onPress={() => navigation.navigate('Supervisor List')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.ORGStructure.includes('org_Chart') && (
                                                        <DrawerItem
                                                            label="ORG Chart"
                                                            onPress={() => navigation.navigate('ORG chart')}
                                                        />
                                                    )}
                                                </>
                                            )}

                                            {/*  */}

                                            {hasAccessToLeaveAndAttendancePolicy() && checkedNames.EmployeeManagement?.LeaveAndAttendancePolicy.length > 0 && (
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    onPress={() => toggleDropdown1('AttendancePolicy')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>Attendance Policy</Text>
                                                    </View>
                                                    {dropdowns.AttendancePolicy ? (
                                                        <DropupIcon width={15} height={15} color={'#000'} />
                                                    ) : (
                                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                                    )}
                                                </TouchableOpacity>
                                            )}


                                            {dropdowns.AttendancePolicy && (
                                                <>
                                                    {checkedNames.EmployeeManagement.LeaveAndAttendancePolicy.includes('attendancePolicy') && (
                                                        <DrawerItem
                                                            label="Attendance Slot"
                                                            onPress={() => navigation.navigate('Attendance Policy')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.LeaveAndAttendancePolicy.includes('leavePolicy') && (
                                                        <DrawerItem
                                                            label="Leave Policy"
                                                            onPress={() => navigation.navigate('Leave Policy')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.LeaveAndAttendancePolicy.includes('assignEmployeeShift') && (
                                                        <DrawerItem
                                                            label="Assign Employee shift"
                                                            onPress={() => navigation.navigate('Assign Employee shift')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.LeaveAndAttendancePolicy.includes('Holiday') && (
                                                        <DrawerItem
                                                            label="Holiday List"
                                                            onPress={() => navigation.navigate('Holiday')}
                                                        />
                                                    )}

                                                </>
                                            )}

                                            {/*  */}

                                            {hasAccessToTemplate() && (
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    onPress={() => toggleDropdown1('Template')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>Template</Text>
                                                    </View>
                                                    {dropdowns.Template ? (
                                                        <DropupIcon width={15} height={15} color={'#000'} />
                                                    ) : (
                                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                                    )}
                                                </TouchableOpacity>
                                            )}

                                            {dropdowns.Template && (
                                                <>
                                                    <DrawerItem
                                                        label="Header and Footer"
                                                        onPress={() => navigation.navigate('Header and Footer')}
                                                    />

                                                    {templatePermissions.OfferLetter.some(permission => checkedNames.EmployeeManagement.Template.OfferLetter.includes(permission)) && (
                                                        <TouchableOpacity
                                                            style={styles.dropdown}
                                                            onPress={() => toggleDropdown1('OfferLetter')}
                                                        >
                                                            <View style={styles.Tab}>
                                                                <Text style={styles.dropdownText}>Offer Letter</Text>
                                                            </View>
                                                            {dropdowns.OfferLetter ? (
                                                                <DropupIcon width={15} height={15} color={'#000'} />
                                                            ) : (
                                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                                            )}
                                                        </TouchableOpacity>
                                                    )}

                                                    {dropdowns.OfferLetter && (
                                                        <>
                                                            {checkedNames.EmployeeManagement.Template.OfferLetter.includes('Add_OfferLetter') && (
                                                                <DrawerItem
                                                                    label="Add Offer Letter"
                                                                    onPress={() => navigation.navigate('Add Offer Letter')}
                                                                />
                                                            )}

                                                            {checkedNames.EmployeeManagement.Template.OfferLetter.includes('Offer_LetterList') && (
                                                                <DrawerItem
                                                                    label="Offer Letter List"
                                                                    onPress={() => navigation.navigate('Offer Letter List')}
                                                                />
                                                            )}
                                                        </>
                                                    )}

                                                    {templatePermissions.AppointmentLetter.some(permission => checkedNames.EmployeeManagement.Template.AppointmentLetter.includes(permission)) && (
                                                        <TouchableOpacity
                                                            style={styles.dropdown}
                                                            onPress={() => toggleDropdown1('AppointmentLetter')}
                                                        >
                                                            <View style={styles.Tab}>
                                                                <Text style={styles.dropdownText}>Appointment Letter</Text>
                                                            </View>
                                                            {dropdowns.AppointmentLetter ? (
                                                                <DropupIcon width={15} height={15} color={'#000'} />
                                                            ) : (
                                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                                            )}
                                                        </TouchableOpacity>
                                                    )}

                                                    {dropdowns.AppointmentLetter && (
                                                        <>
                                                            {checkedNames.EmployeeManagement.Template.AppointmentLetter.includes('Add_AppointmentLetter') && (
                                                                <DrawerItem
                                                                    label="Add Appointment Letter"
                                                                    onPress={() => navigation.navigate('Add Appointment Letter')}
                                                                />
                                                            )}

                                                            {checkedNames.EmployeeManagement.Template.AppointmentLetter.includes('Appoint_mentLetterList') && (
                                                                <DrawerItem
                                                                    label="Appointment Letter List"
                                                                    onPress={() => navigation.navigate('Appointment Letter List')}
                                                                />
                                                            )}
                                                        </>
                                                    )}

                                                    {templatePermissions.RelievingLetter.some(permission => checkedNames.EmployeeManagement.Template.RelievingLetter.includes(permission)) && (
                                                        <TouchableOpacity
                                                            style={styles.dropdown}
                                                            onPress={() => toggleDropdown1('RelivingLetter')}
                                                        >
                                                            <View style={styles.Tab}>
                                                                <Text style={styles.dropdownText}>Relieving Letter</Text>
                                                            </View>
                                                            {dropdowns.RelivingLetter ? (
                                                                <DropupIcon width={15} height={15} color={'#000'} />
                                                            ) : (
                                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                                            )}
                                                        </TouchableOpacity>
                                                    )}

                                                    {dropdowns.RelivingLetter && (
                                                        <>
                                                            {checkedNames.EmployeeManagement.Template.RelievingLetter.includes('Add_RelievingLetter') && (
                                                                <DrawerItem
                                                                    label="Add Relieving Letter"
                                                                    onPress={() => navigation.navigate('Add Relieving Letter')}
                                                                />
                                                            )}

                                                            {checkedNames.EmployeeManagement.Template.RelievingLetter.includes('Relieving_LetterList') && (
                                                                <DrawerItem
                                                                    label="Relieving Letter List"
                                                                    onPress={() => navigation.navigate('Relieving Letter List')}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {/*  */}

                                            {hasAccessToCompanyPolicy() && checkedNames.EmployeeManagement?.CompanyPolicy.length > 0 && (
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    // onPress={() => navigation.navigate('Templates')}
                                                    onPress={() => navigation.navigate('Company Policy')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>Company Policy</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}

                                            {/*  */}

                                            {hasAccessToEmployee() && checkedNames.EmployeeManagement?.Employee.length > 0 && (
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    onPress={() => toggleDropdown1('EmployeeInfo')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>Employee Info</Text>
                                                    </View>
                                                    {dropdowns.Template ? (
                                                        <DropupIcon width={15} height={15} color={'#000'} />
                                                    ) : (
                                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                                    )}
                                                </TouchableOpacity>
                                            )}

                                            {dropdowns.EmployeeInfo && (
                                                <>

                                                    {checkedNames.EmployeeManagement.Employee.includes('Add_Employee') && (
                                                        <DrawerItem
                                                            label="Add Employee"
                                                            onPress={() => navigation.navigate('Add Employee')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.Employee.includes('Emp_loyeeList') && (
                                                        <DrawerItem
                                                            label="Employee List"
                                                            onPress={() => navigation.navigate('Employee List')}
                                                        />
                                                    )}

                                                    {checkedNames.EmployeeManagement.Employee.includes('Employee_Confirmation') && (
                                                        <DrawerItem
                                                            label="Probation Completion"
                                                            // onPress={() => navigation.navigate('Employee Confirmation')}
                                                            onPress={() => navigation.navigate('Probation Completion')}
                                                        />
                                                    )}

                                                </>
                                            )}


                                        </>
                                    )}
                                </>
                            )}

                        {/* Attendance Calculation */}

                        {hasAccessToAttendance() && checkedNames.Attendance.length > 0 && (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => {
                                        toggleDropdown('AttendanceCalculations');
                                        navigation.navigate('Power Bi Attendance');
                                    }}
                                >
                                    <View style={styles.Tab}>
                                        <LeavePolicyIcon width={22} height={22} color={'#000'} />
                                        <Text style={styles.dropdownText}>Attendance Calculations</Text>
                                    </View>
                                    {dropdowns.AttendanceCalculations ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.AttendanceCalculations && (

                                    <>
                                        {checkedNames.Attendance.includes('DailyAttendance') && (
                                            <DrawerItem
                                                label="Daily Attendance"
                                                onPress={() => navigation.navigate('Daily Attendance')}
                                            />
                                        )}

                                        {checkedNames.Attendance.includes('Monthly_Attendance') && (
                                            <DrawerItem
                                                label="Monthly Attendance"
                                                onPress={() => navigation.navigate('Monthly Attendance')}
                                            />
                                        )}

                                        {checkedNames.Attendance.includes('Monthly_List') && (
                                            <DrawerItem
                                                label="Monthly List"
                                                onPress={() => navigation.navigate('Monthly List')}
                                            />
                                        )}

                                        {checkedNames.Attendance.includes('Approval_List') && (
                                            <DrawerItem
                                                label="HR Approval list"
                                                onPress={() => navigation.navigate('Approvals List')}
                                            />
                                        )}

                                        {checkedNames.Attendance.includes('Leave_Approval') && (
                                            <DrawerItem
                                                label="TL Approval List"
                                                onPress={() => navigation.navigate('TL Approvals List')}
                                            />
                                        )}
                                    </>

                                )}
                            </>
                        )}

                        {/* Recruitment */}

                        {(hasAccessToPostJob() && checkedNames.Recruitment?.PostJob.length > 0) ||
                            (hasAccessToListJob() && checkedNames.Recruitment?.ListJob.length > 0) ||
                            (hasAccessToInboxResume() && checkedNames.Recruitment?.InboxResume.length > 0) ||
                            (hasAccessTocandidatetracker() && (
                                checkedNames.Recruitment?.CandidateTracker.AddResume.length > 0 ||
                                checkedNames.Recruitment?.CandidateTracker.CandidateStatus.length > 0
                            )) ||
                            (hasAccessToSearchResume() && checkedNames.Recruitment?.SearchResume.length > 0) ? (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown('Recruitment')}
                                >
                                    <View style={styles.Tab}>
                                        <EmployeeIcon width={22} height={22} color={'#000'} />
                                        <Text style={styles.dropdownText}>Recruitment</Text>
                                    </View>
                                    {dropdowns.Recruitment ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Recruitment && (
                                    <>
                                        {hasAccessToPostJob() && checkedNames.Recruitment?.PostJob.length > 0 && (
                                            <>
                                                {checkedNames.Recruitment.PostJob.includes('Post_Job') && (
                                                    <DrawerItem
                                                        label="Post Job"
                                                        onPress={() => navigation.navigate('Post Job')}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {hasAccessToListJob() && checkedNames.Recruitment?.ListJob.length > 0 && (
                                            <>
                                                {checkedNames.Recruitment.ListJob.includes('List_Job') && (
                                                    <DrawerItem
                                                        label="List Job"
                                                        onPress={() => navigation.navigate('List Job')}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {hasAccessToInboxResume() && checkedNames.Recruitment?.InboxResume.length > 0 && (
                                            <>
                                                {checkedNames.Recruitment.InboxResume.includes('Inbox_Resume') && (
                                                    <DrawerItem
                                                        label="Inbox Webmail"
                                                        onPress={() => navigation.navigate('Inbox Resume')}
                                                    />
                                                )}
                                            </>
                                        )}


                                        {hasAccessToSearchResume() && checkedNames.Recruitment?.SearchResume.length > 0 && (
                                            <>
                                                {checkedNames.Recruitment.SearchResume.includes('Search_Resume') && (
                                                    <DrawerItem
                                                        label="Search Resume"
                                                        onPress={() => navigation.navigate('Search Resume')}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {hasAccessTocandidatetracker() && (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.dropdown}
                                                    onPress={() => toggleDropdown1('CandidateTracker')}
                                                >
                                                    <View style={styles.Tab}>
                                                        <Text style={styles.dropdownText}>Candidate Tracker</Text>
                                                    </View>
                                                    {dropdowns.CandidateTracker ? (
                                                        <DropupIcon width={15} height={15} color={'#000'} />
                                                    ) : (
                                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                                    )}
                                                </TouchableOpacity>

                                                {dropdowns.CandidateTracker && (
                                                    <>
                                                        {candidatetrackerPermissions.AddResume.some(permission =>
                                                            checkedNames.Recruitment.CandidateTracker.AddResume.includes(permission)
                                                        ) && (
                                                                <>
                                                                    {checkedNames.Recruitment.CandidateTracker.AddResume.includes('Add_Resume') && (
                                                                        <DrawerItem
                                                                            label="Call Tracker"
                                                                            onPress={() => navigation.navigate('Add Resume')}
                                                                        />
                                                                    )}
                                                                </>
                                                            )}

                                                        {candidatetrackerPermissions.CandidateStatus.some(permission =>
                                                            checkedNames.Recruitment.CandidateTracker.CandidateStatus.includes(permission)
                                                        ) && (
                                                                <>
                                                                    {checkedNames.Recruitment.CandidateTracker.CandidateStatus.includes('Candidate_Status') && (
                                                                        <DrawerItem
                                                                            label="View Tracker"
                                                                            onPress={() => navigation.navigate('Candidate Resume')}
                                                                        />
                                                                    )}
                                                                </>
                                                            )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        ) : null}


                        {/* Payroll */}

                        {hasAccessToPayroll() && checkedNames.Payroll.length > 0 && (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown('PayRoll')}
                                >
                                    <View style={styles.Tab}>
                                        <PayrollIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Payroll</Text>
                                    </View>
                                    {dropdowns.PayRoll ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.PayRoll && (

                                    <>
                                        {checkedNames.Payroll.includes('OverTimeCalculation') && (
                                            <DrawerItem
                                                label="Overtime Calculation"
                                                onPress={() => navigation.navigate('Overtime Calculation')}
                                            />
                                        )}

                                        {checkedNames.Payroll.includes('Assign Employee Salary') && (
                                            <DrawerItem
                                                label="Assign Employee Salary"
                                                onPress={() => navigation.navigate('Assign Employee Salary')}
                                            />
                                        )}

                                        {checkedNames.Payroll.includes('Salarycalculation') && (
                                            <DrawerItem
                                                label="Salary Calculation"
                                                onPress={() => navigation.navigate('Salary Calculation')}
                                            />
                                        )}

                                        {checkedNames.Payroll.includes('Generate_payslip') && (
                                            <DrawerItem
                                                label="Generate Payslip"
                                                onPress={() => navigation.navigate('Generate Payslip')}
                                            />
                                        )}

                                        {checkedNames.Payroll.includes('Payslip_list') && (
                                            <DrawerItem
                                                label="Payslip List"
                                                onPress={() => navigation.navigate('Payslip List')}
                                            />
                                        )}

                                    </>

                                )}
                            </>
                        )}

                        {/* Accounts */}

                        {hasAnyAccountPermissions() && (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown('Account')}
                                >
                                    <View style={styles.Tab}>
                                        <HrSupportIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Accounts</Text>
                                    </View>
                                    {dropdowns.Account ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Account && (

                                    <>
                                        {hasAccessToGoodsAndServices() && (
                                            <DrawerItem
                                                label="Good & Services"
                                                onPress={() => navigation.navigate('Good & Services')}
                                            />
                                        )}

                                        {hasAccessToCompanyDetails() && (
                                            <TouchableOpacity
                                                style={styles.dropdown}
                                                onPress={() => toggleDropdown1('companyDetails')}
                                            >
                                                <View style={styles.Tab}>
                                                    <Text style={styles.dropdownText}>Company Details</Text>
                                                </View>
                                                {dropdowns.companyDetails ? (
                                                    <DropupIcon width={15} height={15} color={'#000'} />
                                                ) : (
                                                    <DropdownIcon width={15} height={15} color={'#000'} />
                                                )}
                                            </TouchableOpacity>
                                        )}

                                        {dropdowns.companyDetails && (
                                            <>
                                                {checkedNames.Accounts?.CompanyDetails.AddCompany.length > 0 && (
                                                    <DrawerItem
                                                        label="Add Company"
                                                        onPress={() => navigation.navigate('Add Company')}
                                                    />
                                                )}

                                                {checkedNames.Accounts?.CompanyDetails.CompanyList.length > 0 && (
                                                    <DrawerItem
                                                        label="Company List"
                                                        onPress={() => navigation.navigate('Company List')}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {hasAccessToSalesInvoice() && (
                                            <TouchableOpacity
                                                style={styles.dropdown}
                                                onPress={() => toggleDropdown1('salesinvoice')}
                                            >
                                                <View style={styles.Tab}>
                                                    <Text style={styles.dropdownText}>Sales Invoice</Text>
                                                </View>
                                                {dropdowns.salesinvoice ? (
                                                    <DropupIcon width={15} height={15} color={'#000'} />
                                                ) : (
                                                    <DropdownIcon width={15} height={15} color={'#000'} />
                                                )}
                                            </TouchableOpacity>
                                        )}

                                        {dropdowns.salesinvoice && (
                                            <>
                                                {checkedNames.Accounts?.Sales.AddSales.length > 0 && (
                                                    <DrawerItem
                                                        label="Add Sales Invoice"
                                                        onPress={() => navigation.navigate('Add Sales Invoice')}
                                                    />
                                                )}

                                                {checkedNames.Accounts?.Sales.SalesList.length > 0 && (
                                                    <DrawerItem
                                                        label="Sales Invoice List"
                                                        onPress={() => navigation.navigate('Sales Invoice List')}
                                                    />
                                                )}

                                                <DrawerItem
                                                    label="Pro Forma Invoice List"
                                                    onPress={() => navigation.navigate('Proforma Invoice List')}
                                                />

                                                <DrawerItem
                                                    label="Product Invoice List"
                                                    onPress={() => navigation.navigate('Product Invoice List')}
                                                />
                                            </>

                                        )}

                                        {hasAccessToPurchaseInvoice() && (
                                            <TouchableOpacity
                                                style={styles.dropdown}
                                                onPress={() => toggleDropdown1('purchaseinvoice')}
                                            >
                                                <View style={styles.Tab}>
                                                    <Text style={styles.dropdownText}>Purchase Invoice</Text>
                                                </View>
                                                {dropdowns.purchaseinvoice ? (
                                                    <DropupIcon width={15} height={15} color={'#000'} />
                                                ) : (
                                                    <DropdownIcon width={15} height={15} color={'#000'} />
                                                )}
                                            </TouchableOpacity>
                                        )}

                                        {dropdowns.purchaseinvoice && (
                                            <>
                                                {checkedNames.Accounts?.Purchase.AddPurchase.length > 0 && (
                                                    <DrawerItem
                                                        label="Add Purchase Invoice"
                                                        onPress={() => navigation.navigate('Add Purchase Invoice')}
                                                    />
                                                )}

                                                {checkedNames.Accounts?.Purchase.PurchaseList.length > 0 && (
                                                    <DrawerItem
                                                        label="Purchase Invoice List"
                                                        onPress={() => navigation.navigate('Purchase Invoice List')}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {hasAccessToDailyAccounts() && checkedNames.Accounts?.DailyAccounts.length > 0 && (
                                            <DrawerItem
                                                label="Daily Account"
                                                onPress={() => navigation.navigate('Daily Account')}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {/* Visitor Management */}

                        <>
                            {hasAccessToVisitiormanagement() && checkedNames.Visitiormanagement.length > 0 && (
                                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Visitormanagement')}>
                                    <View style={styles.Tab}>
                                        <VistitorManageIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Visitor management</Text>
                                    </View>
                                    {
                                        dropdowns.Visitormanagement ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                    }
                                </TouchableOpacity>
                            )}

                            {dropdowns.Visitormanagement && (
                                <>
                                    {checkedNames.Visitiormanagement.includes('Add_visitor') && (
                                        < DrawerItem
                                            label="Add visitor"
                                            onPress={() => navigation.navigate('Add visitor')}
                                        />
                                    )}

                                    {checkedNames.Visitiormanagement.includes('Visitor_log') && (
                                        < DrawerItem
                                            label="Visitor log"
                                            onPress={() => navigation.navigate('Visitor log')}
                                        />
                                    )}
                                </>
                            )}
                        </>

                        {/* Team management */}

                        <>
                            {hasAnyTeamManagementPermissions() && (
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown('Teammanagement')}
                                >
                                    <View style={styles.Tab}>
                                        <TLApprovalIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Team Management</Text>
                                    </View>
                                    {dropdowns.Teammanagement ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>
                            )}

                            {dropdowns.Teammanagement && (
                                <>
                                    {hasAccessToEvents() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('Events')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Events</Text>
                                            </View>
                                            {dropdowns.Events ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}

                                    {dropdowns.Events && (
                                        <>
                                            {checkedNames.TeamManagement?.Events?.AddEvent?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Event"
                                                    onPress={() => navigation.navigate('Add Event')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.Events?.EventList?.length > 0 && (
                                                <DrawerItem
                                                    label="Event List"
                                                    onPress={() => navigation.navigate('Event List')}
                                                />
                                            )}
                                        </>
                                    )}

                                    {hasAccessToMeeting() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('Meeting')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Meeting</Text>
                                            </View>
                                            {dropdowns.Meeting ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}

                                    {dropdowns.Meeting && (
                                        <>
                                            {checkedNames.TeamManagement?.Meeting?.AddMeeting?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Meeting"
                                                    onPress={() => navigation.navigate('Add Meeting')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.Meeting?.MeetingList?.length > 0 && (
                                                <DrawerItem
                                                    label="Meeting List"
                                                    onPress={() => navigation.navigate('Meeting List')}
                                                />
                                            )}
                                        </>
                                    )}

                                    {hasAccessToTeamTask() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('TeamTask')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Team Task</Text>
                                            </View>
                                            {dropdowns.TeamTask ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}

                                    {dropdowns.TeamTask && (
                                        <>
                                            {checkedNames.TeamManagement?.TeamTask?.AddProject?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Project"
                                                    onPress={() => navigation.navigate('Add Project')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.TeamTask?.ProjectList?.length > 0 && (
                                                <DrawerItem
                                                    label="Projects List"
                                                    onPress={() => navigation.navigate('Projects List')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.TeamTask?.AddTask?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Task"
                                                    onPress={() => navigation.navigate('Add Task')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.TeamTask?.TaskList?.length > 0 && (
                                                <DrawerItem
                                                    label="Task List"
                                                    onPress={() => navigation.navigate('Task List')}
                                                />
                                            )}

                                            {checkedNames.TeamManagement?.TeamTask?.AssignedTask?.length > 0 && (
                                                <DrawerItem
                                                    label="Assigned Task"
                                                    onPress={() => navigation.navigate('Assigned Task')}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>

                        {/* Asset Management */}

                        <>

                            {hasAccessToAssets() && checkedNames.Assets.length > 0 && (
                                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Assetmanagement')}>
                                    <View style={styles.Tab}>
                                        <AssetsIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Asset management</Text>
                                    </View>
                                    {
                                        dropdowns.Assetmanagement ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                    }
                                </TouchableOpacity>
                            )}

                            {dropdowns.Assetmanagement && (
                                <>
                                    {checkedNames.Assets.includes('Assets_Type') && (
                                        < DrawerItem
                                            label="Assets Type"
                                            onPress={() => navigation.navigate('Assets Type')}
                                        />
                                    )}

                                    {checkedNames.Assets.includes('Assign_Asset') && (
                                        < DrawerItem
                                            label="Assign Assets"
                                            onPress={() => navigation.navigate('Assign Assets')}
                                        />
                                    )}

                                    {checkedNames.Assets.includes('Asset_List') && (
                                        < DrawerItem
                                            label="Asset List"
                                            onPress={() => navigation.navigate('Asset List')}
                                        />
                                    )}
                                </>
                            )}

                        </>

                        {/* Help deskS */}

                        <>
                            {hasAccessToHelpDesk() && checkedNames.HelpDesk.length > 0 && (
                                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('HelpDesk')}>
                                    <View style={styles.Tab}>
                                        <HelpDeskIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Help Desk</Text>
                                    </View>
                                    {
                                        dropdowns.HelpDesk ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                    }
                                </TouchableOpacity>
                            )}

                            {dropdowns.HelpDesk && (
                                <>
                                    {checkedNames.HelpDesk.includes('Issue_Type') && (
                                        < DrawerItem
                                            label="Issue Type"
                                            onPress={() => navigation.navigate('Issue Type')}
                                        />
                                    )}

                                    {checkedNames.HelpDesk.includes('Raise_Ticket') && (
                                        < DrawerItem
                                            label="Raise Ticket"
                                            onPress={() => navigation.navigate('Raise Ticket')}
                                        />
                                    )}

                                    {checkedNames.HelpDesk.includes('Tickets_List') && (
                                        < DrawerItem
                                            label="Tickets List"
                                            onPress={() => navigation.navigate('Tickets List')}
                                        />
                                    )}

                                    {checkedNames.HelpDesk.includes('Assigned_List') && (
                                        < DrawerItem
                                            label="Assigned List"
                                            onPress={() => navigation.navigate('Assigned List')}
                                        />
                                    )}
                                </>
                            )}
                        </>

                        {/* Logs */}

                        <>
                            {hasAccessToLogs() && checkedNames.Logs.length > 0 && (
                                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Logs')}>
                                    <View style={styles.Tab}>
                                        <LogsIcon width={20} height={20} color={'#000'} />
                                        <Text style={styles.dropdownText}>Logs</Text>
                                    </View>
                                    {
                                        dropdowns.Logs ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                    }
                                </TouchableOpacity>
                            )}

                            {dropdowns.Logs && (
                                <>
                                    {checkedNames.Logs.includes('Activity_Log') && (
                                        < DrawerItem
                                            label="Activity Log"
                                            onPress={() => navigation.navigate('Activity Log')}
                                        />
                                    )}

                                    {checkedNames.Logs.includes('Employee_ActivityLog') && (
                                        < DrawerItem
                                            label="Employee Activity Log"
                                            onPress={() => navigation.navigate('Employee Activity Log')}
                                        />
                                    )}
                                </>
                            )}
                        </>

                        {/* Customer Management */}

                        {/* <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('CustomerManagement')}
                        >
                            <View style={styles.Tab}>
                                <AttendanceIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Customer Management</Text>
                            </View>
                            {dropdowns.CustomerManagement ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.CustomerManagement && (
                            <>

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('Customer')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Customer</Text>
                                    </View>
                                    {dropdowns.Customer ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Customer && (
                                    <>
                                        <DrawerItem
                                            label="Customer Enquiry List"
                                            onPress={() => navigation.navigate('Customer Enquiry List')}
                                        />

                                        <DrawerItem
                                            label="Add Customer"
                                            onPress={() => navigation.navigate('Add Customer')}
                                        />

                                        <DrawerItem
                                            label="Customer List"
                                            onPress={() => navigation.navigate('Customer List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('UserPlan')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>User Plan</Text>
                                    </View>
                                    {dropdowns.UserPlan ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.UserPlan && (
                                    <>
                                        <DrawerItem
                                            label="Trial Plan List"
                                            onPress={() => navigation.navigate('Trial Plan List')}
                                        />

                                        <DrawerItem
                                            label="Buy Now Plan List"
                                            onPress={() => navigation.navigate('Buy Now Plan List')}
                                        />
                                    </>
                                )}

                            </>
                        )}
                    // </> */}

                        {/* Sales Management */}

                        {/* {hasAnySalesManagementPermissions() && (
                        <>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => toggleDropdown('SalesManagement')}
                            >
                                <View style={styles.Tab}>
                                    <AttendanceIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Sales Management</Text>
                                </View>
                                {dropdowns.SalesManagement ? (
                                    <DropupIcon width={15} height={15} color={'#000'} />
                                ) : (
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                                )}
                            </TouchableOpacity>


                            {dropdowns.SalesManagement && (
                                <>
                                    {hasAccessToLead() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('SalesManagementLead')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Lead</Text>
                                            </View>
                                            {dropdowns.SalesManagementLead ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    {dropdowns.SalesManagementLead && (
                                        <>
                                            {checkedNames.SalesManagement?.Lead?.EnquiryList?.length > 0 && (
                                                <DrawerItem
                                                    label="Enquiry List"
                                                    onPress={() => navigation.navigate('Enquiry List')}
                                                />
                                            )}

                                            {checkedNames.SalesManagement?.Lead?.AddLead?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Lead"
                                                    onPress={() => navigation.navigate('Add Lead')}
                                                />
                                            )}

                                            {checkedNames.SalesManagement?.Lead?.LeadList?.length > 0 && (
                                                <DrawerItem
                                                    label="Lead List"
                                                    onPress={() => navigation.navigate('Lead List')}
                                                />
                                            )}
                                        </>
                                    )}

                                    {hasAccessToPreSales() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('PreSalesDropdown')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Pre Sales</Text>
                                            </View>
                                            {dropdowns.PreSalesDropdown ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    {dropdowns.PreSalesDropdown && (
                                        <>
                                            {checkedNames.SalesManagement?.PreSales?.EnquiryList?.length > 0 && (
                                                <DrawerItem
                                                    label="Enquiry List"
                                                    onPress={() => navigation.navigate('Pre Enquiry List')}
                                                />
                                            )}

                                            {checkedNames.SalesManagement?.PreSales?.AddLead?.length > 0 && (
                                                <DrawerItem
                                                    label="Lead List"
                                                    onPress={() => navigation.navigate('Pre Lead List')}
                                                />
                                            )}

                                            {checkedNames.SalesManagement?.PreSales?.LeadList?.length > 0 && (
                                                <DrawerItem
                                                    label="Add Lead"
                                                    onPress={() => navigation.navigate('Pre Add Lead')}
                                                />
                                            )}
                                        </>
                                    )}

                                    {hasAccessToSales() && (
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('SalesDropdown')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Sales</Text>
                                            </View>
                                            {dropdowns.SalesDropdown ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>
                                    )}

                                    {dropdowns.SalesDropdown && (
                                        <>
                                            {checkedNames.SalesManagement?.Sales?.LeadList?.length > 0 && (
                                                <DrawerItem
                                                    label="Lead List"
                                                    onPress={() => navigation.navigate('Sales Lead List')}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )} */}

                        {/* Sales Management */}

                        {/* <>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => toggleDropdown('SalesManagement')}
                            >
                                <View style={styles.Tab}>
                                    <AttendanceIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Sales Management</Text>
                                </View>
                                {dropdowns.SalesManagement ? (
                                    <DropupIcon width={15} height={15} color={'#000'} />
                                ) : (
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                                )}
                            </TouchableOpacity>


                            {dropdowns.SalesManagement && (
                                <>

                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => toggleDropdown1('SalesManagementLead')}
                                    >
                                        <View style={styles.Tab}>
                                            <Text style={styles.dropdownText}>Lead</Text>
                                        </View>
                                        {dropdowns.SalesManagementLead ? (
                                            <DropupIcon width={15} height={15} color={'#000'} />
                                        ) : (
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                        )}
                                    </TouchableOpacity>

                                    {dropdowns.SalesManagementLead && (
                                        <>
                                            <DrawerItem
                                                label="Enquiry List"
                                                onPress={() => navigation.navigate('Enquiry List')}
                                            />

                                            <DrawerItem
                                                label="Add Enquiry"
                                                onPress={() => navigation.navigate('Add Enquiry')}
                                            />
                                        </>
                                    )}

                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => toggleDropdown1('PreSalesDropdown')}
                                    >
                                        <View style={styles.Tab}>
                                            <Text style={styles.dropdownText}>Pre Sales</Text>
                                        </View>
                                        {dropdowns.PreSalesDropdown ? (
                                            <DropupIcon width={15} height={15} color={'#000'} />
                                        ) : (
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                        )}
                                    </TouchableOpacity>

                                    {dropdowns.PreSalesDropdown && (
                                        <>
                                            <DrawerItem
                                                label="Enquiry List"
                                                onPress={() => navigation.navigate('Pre Enquiry List')}
                                            />

                                            <DrawerItem
                                                label="Add Customer"
                                                onPress={() => navigation.navigate('Add Customer')}
                                            />

                                            <DrawerItem
                                                label="Trial Pack List"
                                                onPress={() => navigation.navigate('Trial Pack List')}
                                            />

                                            <DrawerItem
                                                label="Buy Pack List"
                                                onPress={() => navigation.navigate('Buy Pack List')}
                                            />

                                            <DrawerItem
                                                label="One Time Installation"
                                                onPress={() => navigation.navigate('One Time Installation')}
                                            />
                                        </>
                                    )}

                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => toggleDropdown1('SalesDropdown')}
                                    >
                                        <View style={styles.Tab}>
                                            <Text style={styles.dropdownText}>Sales</Text>
                                        </View>
                                        {dropdowns.SalesDropdown ? (
                                            <DropupIcon width={15} height={15} color={'#000'} />
                                        ) : (
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                        )}
                                    </TouchableOpacity>

                                    {dropdowns.SalesDropdown && (
                                        <>
                                            <DrawerItem
                                                label="Add Customer"
                                                onPress={() => navigation.navigate('Sales Add Customer')}
                                            />

                                            <DrawerItem
                                                label="Trial Pack List"
                                                onPress={() => navigation.navigate('Sales Trial Pack List')}
                                            />

                                            <DrawerItem
                                                label="Buy Pack List"
                                                onPress={() => navigation.navigate('Sales Buy Pack List')}
                                            />

                                            <DrawerItem
                                                label="One Time Installation"
                                                onPress={() => navigation.navigate('Sales One Time Installation')}
                                            />
                                        </>
                                    )}

                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => toggleDropdown1('OnlineCustomerDropdown')}
                                    >
                                        <View style={styles.Tab}>
                                            <Text style={styles.dropdownText}>Online Customer</Text>
                                        </View>
                                        {dropdowns.SalesDropdown ? (
                                            <DropupIcon width={15} height={15} color={'#000'} />
                                        ) : (
                                            <DropdownIcon width={15} height={15} color={'#000'} />
                                        )}
                                    </TouchableOpacity>

                                    {dropdowns.OnlineCustomerDropdown && (
                                        <>
                                            <DrawerItem
                                                label="Trial Pack List"
                                                onPress={() => navigation.navigate('OnlineCustomer Trial Pack List')}
                                            />

                                            <DrawerItem
                                                label="Buy Pack List"
                                                onPress={() => navigation.navigate('OnlineCustomer Buy Pack List')}
                                            />

                                            <DrawerItem
                                                label="One Time Installation"
                                                onPress={() => navigation.navigate('OnlineCustomer One Time Installation')}
                                            />
                                        </>
                                    )}

                                </>
                            )}
                        </> */}

                        {/* Invoice List */}

                        {/* <DrawerItem
                            style={[styles.forSingle1]}
                            label="Invoice List"
                            labelStyle={[styles.forsinglelable1]}
                            icon={() => <LeavePolicyIcon width={22} height={22} color={'#000'} />}
                            onPress={() => navigation.navigate('Invoice List')}
                        /> */}

                        {/* Upgrade Plan */}

                        {/* <DrawerItem
                            style={[styles.forSingle1]}
                            label="Upgrade Plan"
                            labelStyle={[styles.forsinglelable1]}
                            icon={() => <LeavePolicyIcon width={22} height={22} color={'#000'} />}
                            onPress={() => navigation.navigate('Upgrade Plan')}
                        /> */}

                        {/* Logout */}

                        <DrawerItem
                            style={[styles.forSingle, { borderBottomWidth: 0 }]}
                            label="Logout"
                            labelStyle={[styles.forsinglelable]}
                            icon={() => <EmployeeIcon width={22} height={22} color={'#000'} />}
                            onPress={() => signout()}
                        />

                        {/* Alert */}

                        <CustomAlert
                            isVisible={showAlert}
                            headingmessage="Confirmation"
                            message="Are you sure you want to logout?"
                            onCancelText="Cancel"
                            onConfirmText="Confirm"
                            onCancel={handleeCancel}
                            onConfirm={handleeConfirm}
                        />

                        {/*  */}

                        <StatusBar hidden={false} />

                    </View>

                </DrawerContentScrollView >
            </SafeAreaView>
        </>

    )
}

export default CustomDrawerContent;
