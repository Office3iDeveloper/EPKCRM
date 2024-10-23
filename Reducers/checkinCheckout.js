const initialState = {
    Checkin: {
        loggedInTime: '00:00:00',
        loggedOutTime: '00:00:00',
        totalHours: '00:00:00',
        userAlreadyLoggedIn: '0',
    },
};


const AddCheckinReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CheckInTIme':
            return {
                ...state,
                Checkin: action.payload
            };
        case 'UPDATE_CheckInTIme':
            return {
                ...state,
                Checkin: {
                    ...state.Checkin,
                    ...action.payload,
                }
            };
        case 'REMOVE_CheckInTIme':
            return initialState;
        default:
            return state;
    }
};

export default AddCheckinReducer;
