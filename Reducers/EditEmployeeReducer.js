const initialState = {
    EditEmployee: {

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


const EditEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_EMPLOYEE_DATA':
            return {
                ...state,
                EditEmployee: action.payload
            };
        case 'EDIT_EMPLOYEE':
            return {
                ...state,
                EditEmployee: {
                    ...state.EditEmployee,
                    ...action.payload,
                }
            };
        case 'REMOVE_EMPLOYEE_DATA':
            return initialState;
        default:
            return state;
    }
};

export default EditEmployeeReducer;
