import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import ProfileIcon from "../../../../../Assets/Icons/Profile.svg";
import PlusIcon from "../../../../../Assets/Icons/Plus.svg";
import MinusIcon from "../../../../../Assets/Icons/minus.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const ViewProfile = ({ route, navigation }) => {

    const { id } = route.params;
    const { data } = useSelector((state) => state.login);

    const [employee, setEmployee] = useState(null);
    const [employeeDoc, setEmployeeDoc] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isBDetails, setIsBDetails] = useState(false);

    const toggleBDetails = () => {
        setIsBDetails(!isBDetails);
        setIsEDetails(false);
        setIsErole(false);
        setIsBankdetails(false);
        setIsDocuments(false);
    };

    const [isEDetails, setIsEDetails] = useState(false);

    const toggleEDetails = () => {
        setIsEDetails(!isEDetails);
        setIsBDetails(false);
        setIsErole(false);
        setIsBankdetails(false);
        setIsDocuments(false);
    };

    const [isErole, setIsErole] = useState(false);

    const toggleErole = () => {
        setIsErole(!isErole);
        setIsBDetails(false);
        setIsEDetails(false);
        setIsBankdetails(false);
        setIsDocuments(false);
    };

    const [isBankdetails, setIsBankdetails] = useState(false);

    const toggleBankdetails = () => {
        setIsBankdetails(!isBankdetails);
        setIsBDetails(false);
        setIsEDetails(false);
        setIsErole(false);
        setIsDocuments(false);
    };

    const [isDocuments, setIsDocuments] = useState(false);

    const toggleDocuments = () => {
        setIsDocuments(!isDocuments);
        setIsBDetails(false);
        setIsEDetails(false);
        setIsErole(false);
        setIsBankdetails(false);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://office3i.com/development/api/public/api/employee_detailslitshow/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                }
            );
            const resData = response.data.data.employee_details;
            const resDoc = response.data.data;
            setEmployee(resData);
            setEmployeeDoc(resDoc);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [id])
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                {loading ? (
                    <ActivityIndicator size="large" color={'#0A60F1'} style={styles.activityIndicator} />
                ) : (
                    <>
                        {employee && employeeDoc && (
                            <View style={styles.profileimage}>
                                {employee.profile_img != '' || null ? <Image source={{ uri: `https://office3i.com/development/api/storage/app/${employee.profile_img}` }} style={styles.imageStyle} />
                                    :
                                    <View style={styles.iconStyle}>
                                        <ProfileIcon width={80} height={80} color={'#0A60F1'} />
                                    </View>
                                }
                                <Text style={styles.name}>{employee.first_name} {employee.last_name}</Text>
                                <Text style={styles.Role}>{employee.department_name}</Text>
                            </View>
                        )}

                        {
                            employee && (

                                <View style={[styles.employeeContainer]}>

                                    <View style={styles.employeeCard}>

                                        <View style={styles.cardheader}>

                                            <View>
                                                <Text style={styles.header}>Basic Details</Text>
                                            </View>

                                            <View>
                                                {!isBDetails ? (
                                                    <TouchableOpacity onPress={toggleBDetails}>
                                                        <PlusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity onPress={toggleBDetails}>
                                                        <MinusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                        </View>

                                        {
                                            isBDetails && (
                                                <View style={styles.cardBody}>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee ID</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.hrms_emp_id}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>First Name</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.first_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Last Name</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.last_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Gender</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.gender}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Status</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_status}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Phone Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.mobile_no}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Whatsapp Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.whatsapp}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Email ID</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.email}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Date Of Birth</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.dob}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Current Address</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.current_address}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Permanent Address</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.address}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Parent/Guardian
                                                            Name</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.parents}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Marital Status</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.marital_status}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Spouse Name</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.spouse_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Aadhar Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.aadhar_number}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>PAN Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.pan_number}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }

                                    </View>

                                    <View style={styles.employeeCard}>

                                        <View style={styles.cardheader}>

                                            <View>
                                                <Text style={styles.header}>Employee Details</Text>
                                            </View>

                                            <View>
                                                {!isEDetails ? (
                                                    <TouchableOpacity onPress={toggleEDetails}>
                                                        <PlusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity onPress={toggleEDetails}>
                                                        <MinusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                        </View>

                                        {
                                            isEDetails && (
                                                <View style={styles.cardBody}>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee Category</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.employee_category}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Date Of Joining</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.doj}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Probation Period</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.probation_period}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Confirmation Date</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.confirmation_date === null ? "-" : employee.confirmation_date}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee Agreement Period</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_aggrement}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Notice Period</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.notices_period}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>CTC</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.ctc}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Gross Salary</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_grosssalary}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Net Salary</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_salary}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Last Working Day</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.last_working_date}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>PF</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_pf}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>UAN Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.uan_number}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee PF Contribution</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.employee_contribution}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employer PF Contribution</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.employeer_contribution}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>ESI</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_esi}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>ESI Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.esi_number}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee ESI Contribution</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.employee_esi_contribution}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employer ESI Contribution</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.employeer_esi_contribution}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }

                                    </View>

                                    <View style={styles.employeeCard}>

                                        <View style={styles.cardheader}>

                                            <View>
                                                <Text style={styles.header}>Employee Role</Text>
                                            </View>

                                            <View>
                                                {!isErole ? (
                                                    <TouchableOpacity onPress={toggleErole}>
                                                        <PlusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity onPress={toggleErole}>
                                                        <MinusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                        </View>

                                        {
                                            isErole && (
                                                <View style={styles.cardBody}>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Employee Role</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.role_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Designation</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.department_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Supervisor</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.supervisor_role_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Official Email ID</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.official_email}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}> Password</Text>
                                                        <Text style={styles.halfWidth}>:  ......</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Check-in / Check-out</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.emp_punch == '1' ? "Check-in" : employee.emp_punch == '2' ? "Check-in/Check-out" : employee.emp_punch == '3' ? "None" : null}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Overtime</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.ot_status}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Late Allowed</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.late_policy}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Permission Allowed</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.permission_policy}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }

                                    </View>

                                    <View style={styles.employeeCard}>

                                        <View style={styles.cardheader}>

                                            <View>
                                                <Text style={styles.header}>Bank Details</Text>
                                            </View>

                                            <View>
                                                {!isBankdetails ? (
                                                    <TouchableOpacity onPress={toggleBankdetails}>
                                                        <PlusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity onPress={toggleBankdetails}>
                                                        <MinusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                        </View>

                                        {
                                            isBankdetails && (
                                                <View style={styles.cardBody}>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Bank Account Number</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.bank_accountnumber}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Bank Name</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.bank_name}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Bank Branch</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.bank_branch}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>IFSC Code</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.ifsc_code}</Text>
                                                    </View>
                                                    <View style={styles.bodyline}>
                                                        <Text style={styles.halfWidth}>Select Account Type</Text>
                                                        <Text style={styles.halfWidth}>:  {employee.ac_type}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }

                                    </View>

                                    <View style={styles.employeeCard}>

                                        <View style={styles.cardheader}>

                                            <View>
                                                <Text style={styles.header}>Documents</Text>
                                            </View>

                                            <View>
                                                {!isDocuments ? (
                                                    <TouchableOpacity onPress={toggleDocuments}>
                                                        <PlusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity onPress={toggleDocuments}>
                                                        <MinusIcon width={28} height={28} color={'#00275C'} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                        </View>

                                        {isDocuments && employeeDoc && employeeDoc.employee_documents.map((document, index) => (
                                            <View key={index} style={styles.cardBody}>
                                                <View style={styles.bodyline}>
                                                    <Text style={styles.halfWidth}>Document Type</Text>
                                                    <Text style={styles.halfWidth}>:  {document.document_type_name}</Text>
                                                </View>
                                                <View style={styles.bodyline}>
                                                    <Text style={styles.halfWidth}>Document Name</Text>
                                                    <Text style={styles.halfWidth}>:  {document.document_name}</Text>
                                                </View>
                                            </View>
                                        ))}

                                    </View>

                                    <TouchableOpacity style={styles.Editbutton}
                                        onPress={() => navigation.navigate('Edit Employee', { id: employee.id })}
                                    >
                                        <Text style={styles.EditText}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default ViewProfile;

