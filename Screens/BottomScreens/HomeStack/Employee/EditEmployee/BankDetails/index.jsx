import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../../AddEmployee/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import { useDispatch, useSelector } from "react-redux";

const BankDetails = ({ onDetails, onprevEmpRole, employee, setEmployee, validation }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        updateEmployeeField('ac_type', status)
        setShowDropdown(false);
    };

    const updateEmployeeField = (fieldName, value) => {
        const updatedEmployee = { ...employee };
        updatedEmployee[fieldName] = value;
        setEmployee(updatedEmployee);
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
                value={employee.bank_accountnumber}
                onChangeText={(text) => updateEmployeeField('bank_accountnumber', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Bank Name
            </Text>

            <TextInput
                style={styles.input}
                value={employee.bank_name}
                onChangeText={(text) => updateEmployeeField('bank_name', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Bank Branch
            </Text>

            <TextInput
                style={styles.input}
                value={employee.bank_branch}
                onChangeText={(text) => updateEmployeeField('bank_branch', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                IFSC Code
            </Text>

            <TextInput
                style={styles.input}
                value={employee.ifsc_code}
                onChangeText={(text) => updateEmployeeField('ifsc_code', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Select Account Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{employee.ac_type || "Selected Account Type"}</Text>
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
                { }
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
