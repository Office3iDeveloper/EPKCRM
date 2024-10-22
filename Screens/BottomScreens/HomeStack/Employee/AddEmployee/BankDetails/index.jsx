import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import { useDispatch, useSelector } from "react-redux";

const BankDetails = ({ onDetails, onprevEmpRole, validation }) => {

    const dispatch = useDispatch();

    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        handleFieldsChange('accountType', status);
        setShowDropdown(false);
    };

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Bank Details
            </Text>

            <Text style={styles.subHeading}>
                Bank Account Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.bankAccountNumber}
                onChangeText={(text) => handleFieldsChange('bankAccountNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.bankAccountNumber ? "Bank Account Number Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Bank Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.bankName}
                onChangeText={(text) => handleFieldsChange('bankName', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.bankName ? "Bank Name Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Bank Branch
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.bankBranch}
                onChangeText={(text) => handleFieldsChange('bankBranch', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.bankBranch ? "Bank Branch Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                IFSC Code
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.ifscCode}
                onChangeText={(text) => handleFieldsChange('ifscCode', text)}
            />

            <Text style={styles.errorText}>
                {validation ? (!Employee.ifscCode ? "IFSC Code Required" : null) : null}
            </Text>

            <Text style={styles.subHeading}>
                Select Account Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.accountType || "Select Account Type"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectStatus("Savings")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Savings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectStatus("Current")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Current</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectStatus("Salary")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Salary</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.errorText}>
                {validation ? (!Employee.accountType ? "Account Type Required" : null) : null}
            </Text>

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevEmpRole}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Prev
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default BankDetails;
