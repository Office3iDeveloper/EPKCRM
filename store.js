import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./Reducers/loginReducer"
import AddEmployeeReducer from './Reducers/AddEmployeeReducer';
import AddResumeReducer from './Reducers/Addresume';
import AddCheckinReducer from './Reducers/checkinCheckout';

const store = configureStore({
    reducer: {
        login: loginReducer,
        checkinTime: AddCheckinReducer,
        Employee: AddEmployeeReducer,
        resume: AddResumeReducer,
    }
})

export default store;