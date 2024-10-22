import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from "../HomeScreen/index";
import { White } from "../../../Assets/Colors";
import AddShiftSlot from "./AttendancePolicy/AddShiftSlot";
import LevelCategory from "./OrganizationStructure/EmployeeLevelCategory";
import DocumentType from "./OrganizationStructure/EmployeeDocumentType";
import AttendancePolicy from "./AttendancePolicy/AttendancePolicy";
import RoleList from "./OrganizationStructure/RolesList";
import AddRole from "./OrganizationStructure/AddRole";
import EditPolicy from "./AttendancePolicy/AttendancePolicy/EditPolicy";
import EditRole from "./OrganizationStructure/EditRole";
import AttendanceType from "./AttendancePolicy/AttendanceType";
import AttendanceLocation from "./AttendancePolicy/AttendanceLocation";
import LeaveType from "./AttendancePolicy/LeaveType";
import LeaveCategory from "./AttendancePolicy/LeaveCategory";
import AddEmployeeShift from "./AttendancePolicy/AddEmployeeShift";
import EditEmployeeShift from "./AttendancePolicy/EditEmployeeShift";
import SupervisorList from "./OrganizationStructure/SupervisorList";
import LeavePolicy from "./AttendancePolicy/LeavePolicy";
import EditSupervisorList from "./OrganizationStructure/EditSupervisorList";
import EditLeavePolicy from "./AttendancePolicy/EditLeavePolicy";
import AddEmployee from "./Employee/AddEmployee";
// import EmployeeDetails from "./Employee/AddEmployee/EmployeeDetails";
// import BasicDetails from "./Employee/AddEmployee/BasicDetails";
// import EmployeeRole from "./Employee/AddEmployee/EmployeeRole";
// import BankDetails from "./Employee/AddEmployee/BankDetails";
// import Documents from "./Employee/AddEmployee/Documents";
import EmployeeList from "./Employee/EmployeeList";
import ViewProfile from "./Employee/ViewProfile";
import EditEmployee from "./Employee/EditEmployee";
import EmpConfirmation from "./Employee/EmpConfirmation";
import ApprovalList from "./HrSupport/ApprovalList";
import AttendanceRequest from "./HrSupport/ApprovalList/AttendanceRequest";
import LeaveRequest from "./HrSupport/ApprovalList/LeaveRequest";
import PermissionRequest from "./HrSupport/ApprovalList/PermissionRequest";
import HalfDayRequest from "./HrSupport/ApprovalList/HalfDayRequest";
import OverTimeRequest from "./HrSupport/ApprovalList/OverTimeRequest";
import AddLeavePermissionHalfDay from "./HrSupport/ApprovalList/AddLeavePermissionHalfDay";
import AddAttendance from "./HrSupport/ApprovalList/AddAttendance";
import AddOvertime from "./HrSupport/ApprovalList/AddOverTime";
import TLApprovalList from "./TLApproval";
import TLLeaveRequest from "./TLApproval/LeaveRequest";
import TLPermissionRequest from "./TLApproval/PermissionRequest";
import TLHalfDayRequest from "./TLApproval/HalfDayRequest";
import TLOtRequest from "./TLApproval/OTAppproval";
import Template from "./HrSupport/Templates";
import JobOpenings from "./HrSupport/JobOpenings";
import ViewJob from "./HrSupport/ViewJob";
import Holiday from "./Holiday";
import DailyAttendance from "./Attendance/DailyAttendance";
import MonthlyAttendance from "./Attendance/MonthlyAttendance";
import MonthlyList from "./Attendance/Monthlylist";
import Indvidual from "./Attendance/Indvidual";
import ActivityLog from "./Logs/ActivityLog";
import EMPActiveLog from "./Logs/EmployeeLog";
import Announcement from "../HomeScreen/Announcement";
import AddVisitor from "./VisitorManagement/AddVisitor";
import VisitorLog from "./VisitorManagement/VisitorLog";
import ViewDeatails from "./VisitorManagement/Details";
import Eventlist from "./Event/EventList";
import MeetingList from "./Meeting/MeetingList";
import Addmeeting from "./Meeting/AddMeeting";
import AddEvent from "./Event/AddEvent";
import Editmeeting from "./Meeting/EditMeeting";
import EditEvent from "./Event/EditEvent";
import AssetsList from "./Assets/AssetList";
import AssetType from "./Assets/AssetType";
import AddAsset from "./Assets/AddAsset";
import EditAsset from "./Assets/EditAsset";
import IssueType from "./HelpDesk/IssueType";
import AssignedList from "./HelpDesk/AssignedList";
import TicketList from "./HelpDesk/TicketList";
import RaiseTicket from "./HelpDesk/RaiseTicket";
import EditRaiseTicket from "./HelpDesk/EditRaiseTicket";
import EditRaiseAssign from "./HelpDesk/EditRaiseAssign";
import RaiseTicketEmp from "./HelpDesk/RaiseTicketEmp";
import OrgChart from "./OrganizationStructure/OrgChart";
import ProjectList from "./Task/ProjectList";
import TaskList from "./Task/TaskList";
import AssignedTask from "./Task/AssignedTask";
import AddProject from "./Task/AddProject";
import EditProject from "./Task/EditProject";
import AddTask from "./Task/AddTask";
import EditTask from "./Task/EditTask";
import OvertimeType from "./AttendancePolicy/OvertimeType";
import EmpLeaveReq from "./Attendance/EmpLeaveReq";
import EmpAttendReq from "./Attendance/EmpAttendReq";
import EmpOvertimeReq from "./Attendance/EmpOvertimeReq";
import OTCalculation from "./Payroll/OTCalculation/indexx";
import EditOtCalculation from "./Payroll/EditOTCalculation";
import PayslipList from "./Payroll/PayslipList";
import PaySlip from "./Payroll/Payslip";
import Slip from "./Payroll/Slip";
import EmpPayslip from "./Payroll/EmpPayslip";
import GeneratePayslip from "./Payroll/GeneratePayslip";
import AssignEmpSalary from "./Payroll/AssignEmployeeSalary";
import AssignEmpList from "./Payroll/AssignEmployeelist";
import EditAssignEmpSalary from "./Payroll/EditAssignEmpSalary";
import SalaryCalculation from "./Payroll/SalaryCalculation";
import MissedCount from "../HomeScreen/MissedCount";
import VisitorCount from "../HomeScreen/VisitorCount";
import LateCount from "../HomeScreen/LateCount";
import PresentCount from "../HomeScreen/PresentCount";
import AbsentCount from "../HomeScreen/AbsentCount";
import PermissionCount from "../HomeScreen/PermissionCount";
import HalfDayCount from "../HomeScreen/HalfDayCount";
import LeaveCount from "../HomeScreen/LeaveCount";
import ManualEntryCount from "../HomeScreen/ManualEntryCount";
import OdCount from "../HomeScreen/ODCount";
import OrgIndvidual from "./OrganizationStructure/OrgIndvidual";
import PostJob from "./Recruitement/PostJob";
import JobList from "./Recruitement/JobList";
import ViewJobList from "./Recruitement/ViewJob";
import EditPostJob from "./Recruitement/EditPostJob";
import CanStatus from "./Recruitement/CandidateStatus";
import CanViewDetails from "./Recruitement/CandidateStatus/ViewDetails";
import AddResume from "./Recruitement/AddResume";
import EditResume from "./Recruitement/EditResume";
import SearchResume from "./Recruitement/SearchResume";
import InboxResume from "./Recruitement/InboxResume";
// import EnquiryList from "./SalesManagement/Lead/EnquiryList";
// import AddLead from "./SalesManagement/Lead/AddLead";
// import LeadList from "./SalesManagement/Lead/LeadList";
// import PreEnquiryList from "./SalesManagement/PreSales/PreEnquiryList";
// import PreAddLead from "./SalesManagement/PreSales/PreAddLead";
// import PreLeadList from "./SalesManagement/PreSales/PreLeadList";
// import SalesLeadList from "./SalesManagement/Sales/SalesLeadList";
// import ViewLead from "./SalesManagement/Lead/ViewLead";
// import PreViewLead from "./SalesManagement/PreSales/PreViewLead";
// import PreEditList from "./SalesManagement/PreSales/PreEditLead";
// import SalesViewLead from "./SalesManagement/Sales/SalesViewLead";
// import SalesEditList from "./SalesManagement/Sales/SalesEditLead";
import GoodService from "./Accounts/GoodService";
import CompanyList from "./Accounts/CompanyList";
import EditCompany from "./Accounts/EditCompany";
import AddCompany from "./Accounts/AddCompany";
import DailyAcc from "./Accounts/DailyAccount";
import OfferLetterList from "./Template/OfferLetter/OfferLetterList";
import AppointmentLetterList from "./Template/AppointmentLetter/AppointmentLetterList";
import RelievingLetterList from "./Template/ReleivingLetter/RelieivingLetterList";
import AddRelievingLetter from "./Template/ReleivingLetter/AddRelievingLetter";
import AddAppoinmentLetter from "./Template/AppointmentLetter/AddAppoinmentLetter";
import AddOfferLetter from "./Template/OfferLetter/AddOfferLetter";
import EditAppointmentLetter from "./Template/AppointmentLetter/EditAppoinmentLetter";
import EditOfferLetter from "./Template/OfferLetter/EditOfferLetter";
import EditRelievingLetter from "./Template/ReleivingLetter/EditRelievingLetter";
import AddSalesInvoice from "./Accounts/AddSalesInvoice";
import SalesInvoiceList from "./Accounts/SalesInvoiceList";
import PurchaseInvoiceList from "./Accounts/PurchaseInvoiceList";
import AddPurchaseInvoice from "./Accounts/AddPurchaseInvoice";
import EditPurchaseInvoice from "./Accounts/EditPurchaseInvoice";
import EditSalesInvoice from "./Accounts/EditSalesInvoice";
import SalesInvoiceView from "./Accounts/ViewSalesInvoice";
import ViewOfferLetter from "./Template/OfferLetter/ViewOfferLetter";
import ViewAppointmentLetter from "./Template/AppointmentLetter/ViewAppointmentLetter";
import ViewReliveingLetter from "./Template/ReleivingLetter/ViewRelivingLetter";
import EnquiryList from "./SManagement/Lead/EnquiryList";
import EditEnquiry from "./SManagement/Lead/EditEnquiry";
import PreEnquiryList from "./SManagement/PreSales/EnquiryList";
import PreEditEnquiry from "./SManagement/PreSales/EditEnquiry";
import AddEnquiry from "./SManagement/Lead/AddEnquiry";
import AddCustomer from "./SManagement/PreSales/AddCustomer";
import TrialPackList from "./SManagement/PreSales/TrialPack";
import SalesTrialPackList from "./SManagement/Sales/Trialpack";
import OCTrialPackList from "./SManagement/OnlineCustomer/TrialPack";
import OCBuyPacklist from "./SManagement/OnlineCustomer/BuyPack";
import PreBuyPacklist from "./SManagement/PreSales/BuyPack";
import SalesBuyPack from "./SManagement/Sales/BuyPack";
import ProformaInvoiceList from "./Accounts/ProformaInvoiceList";
import ProductInvoiceList from "./Accounts/ProductInvoicelist";
import EditProform from "./Accounts/EditProFormalist";
import ProformaInvoiceView from "./Accounts/ViewProformaInvoice";
import PurchaseInvoiceView from "./Accounts/ViewPurchaseList";
import BuyInvoiceView from "./SManagement/Sales/ViewBuyPacklist";
import BuySalesInvoiceView from "./SManagement/Sales/ViewBuyPacklist";
import EditBuySalesInvoice from "./SManagement/Sales/EditBuyPack";
import BuyPreSalesInvoiceView from "./SManagement/PreSales/ViewBuyPacklist";
import EditBuyPreSalesInvoice from "./SManagement/PreSales/EditBuyPack";
// import CustomerEnquiryList from "./CustomerManagement/Customer/Enquirylist";
// import EditCustomerEnquiry from "./CustomerManagement/Customer/EditEnquiryList";
// import AddCustomer from "./CustomerManagement/Customer/AddCustomer";
// import CustomerList from "./CustomerManagement/Customer/CustomerList";
// import BuyNowPlanList from "./CustomerManagement/UserPlan/BuyNowPlanList";
// import TrialPlanList from "./CustomerManagement/UserPlan/TrialPlanList";
// import OtpCustomer from "./CustomerManagement/Customer/OTPpage";
import { Platform } from 'react-native'
import UpgradePlan from "./UpgradePlan";
import InvoiceList from "./InvoiceList";
import DepartmentList from "./OrganizationStructure/DepartmentList";
import EditDepList from "./OrganizationStructure/EditDepartmentList";
import HeaderandFooter from "./Template/HeaderandFooter";
import EditHeadFoot from "./Template/EditHeadFoot";
import ViewHeaderFooter from "./Template/ViewHeadFoot";


const Stack = createNativeStackNavigator();

const MenuIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width={40}
      height={40}
    >
      <Path
        fill={White}
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </Svg>
  );
};

const HomeStack = () => {

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#20DDFE',
        },
        headerTitleStyle: { fontWeight: 'bold', color: '#fff', },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingLeft: 10 }}
          >
            <MenuIcon />
          </TouchableOpacity>
        ),
      })}
    >

      <Stack.Screen name="Dashboard" component={HomeScreen} />
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="Missed Count" component={MissedCount} />
      <Stack.Screen name="Visitor Count" component={VisitorCount} />
      <Stack.Screen name="Late Count" component={LateCount} />
      <Stack.Screen name="Present Count" component={PresentCount} />
      <Stack.Screen name="Absent Count" component={AbsentCount} />
      <Stack.Screen name="Permission Count" component={PermissionCount} />
      <Stack.Screen name="HalfDay Count" component={HalfDayCount} />
      <Stack.Screen name="Leave Count" component={LeaveCount} />
      <Stack.Screen name="OnDuty Count" component={OdCount} />
      <Stack.Screen name="ManualEntry Count" component={ManualEntryCount} />

      {/*  */}

      <Stack.Screen name="Department List" component={DepartmentList} />
      <Stack.Screen name="Edit Department List" component={EditDepList} />
      <Stack.Screen name="Add Role" component={AddRole} />
      <Stack.Screen name="Edit Role" component={EditRole} />
      <Stack.Screen name="Roles List" component={RoleList} />
      <Stack.Screen name="Employee Level Category" component={LevelCategory} />
      <Stack.Screen name="Employee Document Type" component={DocumentType} />
      <Stack.Screen name="Supervisor List" component={SupervisorList} />
      <Stack.Screen name="Edit Supervisor List" component={EditSupervisorList} />
      <Stack.Screen name="ORG chart" component={OrgChart} options={{ headerShown: false }} />
      <Stack.Screen name="ORG Indviduals" component={OrgIndvidual} />

      {/*  */}

      <Stack.Screen name="Add Shift slot" component={AddShiftSlot} />
      <Stack.Screen name="Assign Employee shift" component={AddEmployeeShift} />
      <Stack.Screen name="Edit Employee shift" component={EditEmployeeShift} />
      <Stack.Screen name="Attendance Policy" component={AttendancePolicy} />
      <Stack.Screen name="Edit Policy" component={EditPolicy} />
      <Stack.Screen name="Attendance Type" component={AttendanceType} />
      <Stack.Screen name="Attendance Location" component={AttendanceLocation} />
      <Stack.Screen name="Leave Type" component={LeaveType} />
      <Stack.Screen name="Leave category" component={LeaveCategory} />
      <Stack.Screen name="Leave Policy" component={LeavePolicy} />
      <Stack.Screen name="Edit Leave Policy" component={EditLeavePolicy} />
      <Stack.Screen name="Overtime Type" component={OvertimeType} />

      {/*  */}

      <Stack.Screen name="Add Employee" component={AddEmployee} />
      <Stack.Screen name="Employee List" component={EmployeeList} />
      <Stack.Screen name="View Profile" component={ViewProfile} />
      <Stack.Screen name="Edit Employee" component={EditEmployee} />
      {/* <Stack.Screen name="Employee Confirmation" component={EmpConfirmation} /> */}
      <Stack.Screen name="Probation Completion" component={EmpConfirmation} />


      {/*  */}

      <Stack.Screen name="Daily Attendance" component={DailyAttendance} />
      <Stack.Screen name="Monthly Attendance" component={MonthlyAttendance} />
      <Stack.Screen name="Monthly List" component={MonthlyList} />
      <Stack.Screen name="Indvidual" component={Indvidual} />
      <Stack.Screen name="Employee Leave Request" component={EmpLeaveReq} />
      <Stack.Screen name="Employee Attendance Request" component={EmpAttendReq} />
      <Stack.Screen name="Employee Overtime Request" component={EmpOvertimeReq} />

      {/*  */}

      <Stack.Screen name="Approvals List" component={ApprovalList} />

      <Stack.Screen name="Add Leave Permission Half Day" component={AddLeavePermissionHalfDay} />
      <Stack.Screen name="Add Attendance" component={AddAttendance} />
      <Stack.Screen name="Add Over Time" component={AddOvertime} />
      <Stack.Screen name="Attendance Request" component={AttendanceRequest} />
      <Stack.Screen name="Leave Request" component={LeaveRequest} />
      <Stack.Screen name="Permission Request" component={PermissionRequest} />
      <Stack.Screen name="HalfDay Request" component={HalfDayRequest} />
      <Stack.Screen name="OverTime Request" component={OverTimeRequest} />

      {/* <Stack.Screen name="Templates" component={Template} /> */}
      <Stack.Screen name="Company Policy" component={Template} />
      <Stack.Screen name="Job Openings" component={JobOpenings} />

      <Stack.Screen name="View Job" component={ViewJob} />

      {/*  */}

      <Stack.Screen name="TL Approvals List" component={TLApprovalList} />
      <Stack.Screen name="TL Leave Request" component={TLLeaveRequest} />
      <Stack.Screen name="TL Permission Request" component={TLPermissionRequest} />
      <Stack.Screen name="TL HalfDay Request" component={TLHalfDayRequest} />

      <Stack.Screen name="TL OT Request" component={TLOtRequest} />

      {/*  */}

      <Stack.Screen name="Issue Type" component={IssueType} />
      <Stack.Screen name="Assigned List" component={AssignedList} />
      <Stack.Screen name="Tickets List" component={TicketList} />
      <Stack.Screen name="Raise Ticket" component={RaiseTicket} />
      <Stack.Screen name="Raise Ticket Emp" component={RaiseTicketEmp} />
      <Stack.Screen name="Edit Raise Ticket" component={EditRaiseTicket} />
      <Stack.Screen name="Edit Raise Assign" component={EditRaiseAssign} />

      {/*  */}

      <Stack.Screen name="Asset List" component={AssetsList} />
      <Stack.Screen name="Assign Assets" component={AddAsset} />
      <Stack.Screen name="Edit Asset" component={EditAsset} />
      <Stack.Screen name="Assets Type" component={AssetType} />

      {/*  */}

      <Stack.Screen name="Add Event" component={AddEvent} />
      <Stack.Screen name="Edit Event" component={EditEvent} />
      <Stack.Screen name="Event List" component={Eventlist} />

      {/*  */}

      <Stack.Screen name="Add Meeting" component={Addmeeting} />
      <Stack.Screen name="Edit Meeting" component={Editmeeting} />
      <Stack.Screen name="Meeting List" component={MeetingList} />

      {/*  */}

      <Stack.Screen name="Add Project" component={AddProject} />
      <Stack.Screen name="Edit Project" component={EditProject} />
      <Stack.Screen name="Projects List" component={ProjectList} />
      <Stack.Screen name="Add Task" component={AddTask} />
      <Stack.Screen name="Edit Task" component={EditTask} />
      <Stack.Screen name="Task List" component={TaskList} />
      <Stack.Screen name="Assigned Task" component={AssignedTask} />

      {/*  */}

      <Stack.Screen name="Overtime Calculation" component={OTCalculation} />
      <Stack.Screen name="Edit Overtime Calculation" component={EditOtCalculation} />
      <Stack.Screen name="Payslip List" component={PayslipList} />
      <Stack.Screen name="Payslip" component={PaySlip} />
      <Stack.Screen name="Employee Payslip" component={EmpPayslip} />
      <Stack.Screen name="Slip" component={Slip} />
      <Stack.Screen name="Generate Payslip" component={GeneratePayslip} />
      <Stack.Screen name="Assign Employee Salary Add" component={AssignEmpSalary} />
      <Stack.Screen name="Assign Employee Salary Edit" component={EditAssignEmpSalary} />
      <Stack.Screen name="Assign Employee Salary" component={AssignEmpList} />
      <Stack.Screen name="Salary Calculation" component={SalaryCalculation} />

      {/*  */}

      <Stack.Screen name="Holiday" component={Holiday} />

      {/*  */}

      <Stack.Screen name="Add visitor" component={AddVisitor} />
      <Stack.Screen name="Visitor log" component={VisitorLog} />

      {/*  */}

      <Stack.Screen name="Activity Log" component={ActivityLog} />
      <Stack.Screen name="Employee Activity Log" component={EMPActiveLog} />
      <Stack.Screen name="View Details" component={ViewDeatails} />

      {/*  */}

      <Stack.Screen name="Post Job" component={PostJob} />
      <Stack.Screen name="Edit Post Job" component={EditPostJob} />
      <Stack.Screen name="List Job" component={JobList} />
      <Stack.Screen name="View List Job" component={ViewJobList} />
      <Stack.Screen name="Candidate Resume" component={CanStatus} />
      <Stack.Screen name="Candidate View Details" component={CanViewDetails} />
      <Stack.Screen name="Add Resume" component={AddResume} />
      <Stack.Screen name="Edit Resume" component={EditResume} />
      <Stack.Screen name="Search Resume" component={SearchResume} />
      <Stack.Screen name="Inbox Resume" component={InboxResume} />

      {/*  */}

      {/* <Stack.Screen name="Enquiry List" component={EnquiryList} />
      <Stack.Screen name="Add Lead" component={AddLead} />
      <Stack.Screen name="Lead List" component={LeadList} />
      <Stack.Screen name="View Lead" component={ViewLead} />

      <Stack.Screen name="Pre Enquiry List" component={PreEnquiryList} />
      <Stack.Screen name="Pre Add Lead" component={PreAddLead} />
      <Stack.Screen name="Pre Edit Lead" component={PreEditList} />
      <Stack.Screen name="Pre Lead List" component={PreLeadList} />
      <Stack.Screen name="Pre View Lead" component={PreViewLead} />

      <Stack.Screen name="Sales Edit Lead" component={SalesEditList} />
      <Stack.Screen name="Sales View Lead" component={SalesViewLead} />
      <Stack.Screen name="Sales Lead List" component={SalesLeadList} /> */}

      {/*  */}

      <Stack.Screen name="Good & Services" component={GoodService} />
      <Stack.Screen name="Company List" component={CompanyList} />
      <Stack.Screen name="Edit Company" component={EditCompany} />
      <Stack.Screen name="Add Company" component={AddCompany} />
      <Stack.Screen name="Daily Account" component={DailyAcc} />
      <Stack.Screen name="Add Sales Invoice" component={AddSalesInvoice} />
      <Stack.Screen name="Add Purchase Invoice" component={AddPurchaseInvoice} />
      <Stack.Screen name="Sales Invoice List" component={SalesInvoiceList} />
      <Stack.Screen name="Proforma Invoice List" component={ProformaInvoiceList} />
      <Stack.Screen name="Edit Proforma Invoice List" component={EditProform} />
      <Stack.Screen name="Product Invoice List" component={ProductInvoiceList} />
      <Stack.Screen name="Purchase Invoice List" component={PurchaseInvoiceList} />
      <Stack.Screen name="Edit Purchase Invoice" component={EditPurchaseInvoice} />
      <Stack.Screen name="Edit Sales Invoice" component={EditSalesInvoice} />
      <Stack.Screen name="View Sales Invoice" component={SalesInvoiceView} />
      <Stack.Screen name="View Proforma Invoice" component={ProformaInvoiceView} />
      <Stack.Screen name="View Product Invoice" component={PurchaseInvoiceView} />

      {/*  */}

      <Stack.Screen name="Header and Footer" component={HeaderandFooter} />
      <Stack.Screen name="Edit Header and Footer" component={EditHeadFoot} />
      <Stack.Screen name="View Header and Footer" component={ViewHeaderFooter} />

      <Stack.Screen name="Add Offer Letter" component={AddOfferLetter} />
      <Stack.Screen name="Edit Offer Letter" component={EditOfferLetter} />
      <Stack.Screen name="View Offer Letter" component={ViewOfferLetter} />
      <Stack.Screen name="Offer Letter List" component={OfferLetterList} />

      <Stack.Screen name="Add Appointment Letter" component={AddAppoinmentLetter} />
      <Stack.Screen name="Edit Appointment Letter" component={EditAppointmentLetter} />
      <Stack.Screen name="View Appointment Letter" component={ViewAppointmentLetter} />
      <Stack.Screen name="Appointment Letter List" component={AppointmentLetterList} />

      <Stack.Screen name="Add Relieving Letter" component={AddRelievingLetter} />
      <Stack.Screen name="Edit Relieving Letter" component={EditRelievingLetter} />
      <Stack.Screen name="View Relieving Letter" component={ViewReliveingLetter} />
      <Stack.Screen name="Relieving Letter List" component={RelievingLetterList} />

      {/*  */}


      {/* 
      <Stack.Screen name="Customer Enquiry List" component={CustomerEnquiryList} />
      <Stack.Screen name="Edit Customer Enquiry List" component={EditCustomerEnquiry} />
      <Stack.Screen name="Add Customer" component={AddCustomer} />
      <Stack.Screen name="Customer List" component={CustomerList} />
      <Stack.Screen name="OTP Customer" component={OtpCustomer} />

      <Stack.Screen name="Trial Plan List" component={TrialPlanList} />
      <Stack.Screen name="Buy Now Plan List" component={BuyNowPlanList} /> 
      */}

      {/* Sales Management */}

      <Stack.Screen name="Add Enquiry" component={AddEnquiry} />
      <Stack.Screen name="Enquiry List" component={EnquiryList} />
      <Stack.Screen name="Edit Enquiry List" component={EditEnquiry} />

      <Stack.Screen name="Pre Enquiry List" component={PreEnquiryList} />
      <Stack.Screen name="Pre Edit Enquiry List" component={PreEditEnquiry} />
      <Stack.Screen name="Add Customer" component={AddCustomer} />
      <Stack.Screen name="Trial Pack List" component={TrialPackList} />
      <Stack.Screen name="Buy Pack List" component={PreBuyPacklist} />
      <Stack.Screen name="View BuyInvoicePreSales Invoice" component={BuyPreSalesInvoiceView} />
      <Stack.Screen name="Edit Pre Buy Pack List" component={EditBuyPreSalesInvoice} />

      <Stack.Screen name="Sales Trial Pack List" component={SalesTrialPackList} />
      <Stack.Screen name="Sales Buy Pack List" component={SalesBuyPack} />
      <Stack.Screen name="View BuyInvoiceSales Invoice" component={BuySalesInvoiceView} />
      <Stack.Screen name="Edit Buy Pack List" component={EditBuySalesInvoice} />

      <Stack.Screen name="OnlineCustomer Trial Pack List" component={OCTrialPackList} />
      <Stack.Screen name="OnlineCustomer Buy Pack List" component={OCBuyPacklist} />

      {/*  */}

      <Stack.Screen name="Invoice List" component={InvoiceList} />

      {/*  */}

      <Stack.Screen name="Upgrade Plan" component={UpgradePlan} />

    </Stack.Navigator>

  );

}

export default HomeStack;