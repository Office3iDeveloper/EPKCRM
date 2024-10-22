const initialState = {
    data: null,
    email: null
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'REMOVE_USER_DATA':
            return {
                data: null,
            }
        default:
            return state;
    }
}

export default LoginReducer;
