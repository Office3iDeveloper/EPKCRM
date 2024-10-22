const initialState = {
    Employee: {

        employeeId: '',
        firstName: '',
        lastName: '',
        gender: '',
        status: '',
        phoneNumber: '',
        whatsappNumber: '',
        email: '',
        dob: '',
        currentAddress: '',
        permanentAddress: '',
        parentName: '',
        maritalStatus: '',
        spouseName: '',
        aadharNumber: '',
        panNumber: '',

        employeeJobType: [],
        employeeJobTypeId:'',
        employeeCategory: [],
        selectedemployeeCategory: '',
        dateOfJoining: '',
        probationPeriod: '',
        confirmationDate: '',
        employeeAgreementPeriod: '',
        noticePeriod: '',
        ctc: '',
        grossSalary: '',
        netSalary: '',
        lastWorkingDay: '',
        providentFund: '',
        uanNumber: '',
        employeePfContribution: '',
        employerPfContribution: '',
        esi: '',
        esiNumber: '',
        employeeEsiContribution: '',
        employerEsiContribution: '',

        userRole: [],
        selectedRoleId: '',
        designation: '',
        supervisor: [],
        selectedsupervisorId: '',
        officialEmail: '',
        password: '',
        checkinCheckout: '',
        checkinCheckoutId: '',
        overtime: '',
        lateAllowed: '',
        permissionAllowed: '',

        bankAccountNumber: '',
        bankName: '',
        bankBranch: '',
        ifscCode: '',
        accountType: '',

    }
};


const AddEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                Employee: action.payload
            };
        case 'UPDATE_EMPLOYEE_FIELDS':
            return {
                ...state,
                Employee: {
                    ...state.Employee,
                    ...action.payload,
                }
            };
        case 'REMOVE_EMPLOYEE':
            return initialState;
        default:
            return state;
    }
};

export default AddEmployeeReducer;
