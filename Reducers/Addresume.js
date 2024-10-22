const initialState = {
    Resume: {

        source: '',
        candidateName: '',
        positionApplying: '',
        gender: '',
        email: '',
        mobileNo: '',
        alternativeMobileNo: '',
        dob: '',
        country: '',
        countryid: '',
        state: '',
        stateid: '',
        city: '',
        cityId: '',
        preferedLocation: [],
        preferedLocationid: [],
        languageKnown: '',

        uDegree: '',
        uDegreeid: '',
        uSpecialization: '',
        uYearOfPassing: '',
        uSchoolUniversity: '',

        pDegree: '',
        pSpecialization: '',
        pYearOfPassing: '',
        pSchoolUniversity: '',
        pCertification: '',
        pAttachment: '',

        currentEmployer: '',
        currentDesignation: '',
        functionalArea: '',
        functionalAreaid: '',
        areaOfSpecification: '',
        areaOfSpecificationid: '',
        industry: '',
        industryid: '',
        employmentType: '',
        totalExperience: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        candidateStatus: '',
        doj: '',
        keySkills: '',
        socialMediaLink: '',
        attachedResume: '',

    }
};


const AddResumeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RESUME':
            return {
                ...state,
                Resume: action.payload
            };
        case 'UPDATE_RESUME_FIELDS':
            return {
                ...state,
                Resume: {
                    ...state.Resume,
                    ...action.payload,
                }
            };
        case 'REMOVE_RESUME':
            return initialState;
        default:
            return state;
    }
};

export default AddResumeReducer;
