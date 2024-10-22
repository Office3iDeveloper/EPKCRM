import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./Reducers/loginReducer"
import AddEmployeeReducer from './Reducers/AddEmployeeReducer';
import AddResumeReducer from './Reducers/Addresume';

const store = configureStore({
    reducer: {
        login: loginReducer,
        Employee: AddEmployeeReducer,
        resume: AddResumeReducer,
    }
})

export default store;