import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DocumentPicker from 'react-native-document-picker';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const Documents = ({
    onprevBankDetails,
    selectedImage,
    setSelectedImage,
    documentFile,
    documentName,
    documentType,
    setDocumentType,
    setDocumentName,
    setDocumentFile,
    setDocuments,
    documents,
    setSelectedImageErr,
    setValidation,
    navigation,
    dob,
    doj
}) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    // const updateEmployeeFields = (updatedFields) => ({
    //     type: 'UPDATE_EMPLOYEE_FIELDS',
    //     payload: updatedFields
    // });

    const removeEmployeeFields = () => ({
        type: 'REMOVE_EMPLOYEE'
    });

    // state

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);

    const [load, setLoad] = useState(false);

    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();
    const [docName, setDocName] = useState();
    const [docNameErr, setDocNameErr] = useState();
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState();
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    // Api call for Dropdown dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://office3i.com/development/api/public/api/employee_document_typelist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setDocumentList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectDocument = (File) => {
        setSelectedDocument(File.document_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // 

    const addDocument = () => {
        if (selectedDocumentId && docName && docFile && selectedDocument) {

            const newDocument = {
                type: selectedDocument,
                name: docName,
                file: docFile[0]
            };

            setDocuments(prevDocuments => [...prevDocuments, newDocument]);
            setDocumentType(prevDocumentTypes => [...prevDocumentTypes, selectedDocumentId]);
            setDocumentName(prevDocumentNames => [...prevDocumentNames, docName]);
            setDocumentFile(prevDocumentFiles => [...prevDocumentFiles, docFile[0]]);

            setSelectedDocument([]);
            setSelectedDocumentId([]);
            setDocName('');
            setDocFile('');
            setDocNameErr('');
            setSelectedDocumentErr('');
            setDocFileErr('');
        } else {

            if (!docName) {
                setDocNameErr('Document Name Required');
            } else {
                setDocNameErr('');
            }

            if (selectedDocument.length == "0") {
                setSelectedDocumentErr('Document Type Required');
            } else {
                setSelectedDocumentErr('');
            }

            if (!docFile) {
                setDocFileErr('Attachment Required');
            } else {
                setDocFileErr('');
            }

        }
    };

    // Delete document from list

    const deleteDocument = (index) => {
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setDocuments(updatedDocuments);
    };


    // Function to handle document selection

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
            // handleFieldsChange('selectedFile', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    // Handle Submit

    const HandleSubmit = async () => {

        setLoad(true);
        setValidation(true);

        const formData = new FormData();

        //append data

        if (Employee.employeeId && selectedImage && Employee.firstName &&
            Employee.lastName && Employee.gender && Employee.status && Employee.phoneNumber &&
            Employee.whatsappNumber && Employee.email && dob && Employee.currentAddress &&
            Employee.permanentAddress && Employee.parentName && Employee.maritalStatus &&
            Employee.aadharNumber && Employee.panNumber && Employee.employeeJobType && Employee.selectedemployeeCategory &&
            doj && Employee.noticePeriod && Employee.ctc && Employee.grossSalary && Employee.netSalary &&
            Employee.providentFund && Employee.esi && Employee.selectedRoleId && Employee.designation &&
            Employee.selectedsupervisorId && Employee.officialEmail && Employee.password &&
            Employee.checkinCheckoutId && Employee.bankAccountNumber && Employee.bankName && Employee.bankBranch &&
            Employee.ifscCode && Employee.accountType && documents.length > 0
        ) {
            const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

            if (!emailRegex.test(Employee.email)) {
                Alert.alert('Invalid Email ID', "Please enter a valid email address");
                setLoad(false);
                return;
            }

            if (!emailRegex.test(Employee.officialEmail)) {
                Alert.alert('Invalid Official Email ID', "Please enter a valid email address");
                setLoad(false);
                return;
            }

            if (Employee.aadharNumber.length !== 12) {
                Alert.alert('Invalid "Aadhar Number', "Please enter a valid Aadhar Number");
                setLoad(false);
                return;
            }

            if (!panRegex.test(Employee.panNumber)) {
                Alert.alert('Invalid Pan Number', "Please enter a valid Pan Number");
                setLoad(false);
                return;
            }

            if (Employee.phoneNumber.length !== 10) {
                Alert.alert('Invalid "Phone Number', "Please enter a valid Phone Number");
                setLoad(false);
                return;
            }

            if (Employee.whatsappNumber.length !== 10) {
                Alert.alert('Invalid "Whatsapp Number', "Please enter a valid Whatsapp Number");
                setLoad(false);
                return;
            }
        } else {

            if (documents.length > 0) {
                setDocNameErr('');
                setSelectedDocumentErr('');
                setDocFileErr('');
            } else {
                if (!docName) {
                    setDocNameErr('Document Name Required');
                } else {
                    setDocNameErr('');
                }

                if (selectedDocument.length == "0") {
                    setSelectedDocumentErr('Document Type Required');
                } else {
                    setSelectedDocumentErr('');
                }

                if (!docFile) {
                    setDocFileErr('Attachment Required');
                } else {
                    setDocFileErr('');
                }
            }

            Alert.alert('Error', 'Enter all required fields')
            setLoad(false);
            return;
        }

        formData.append('employee_id', Employee.employeeId);

        if (selectedImage.length > 0) {
            selectedImage.map((selectedImage, index) => {
                const imageUriParts = selectedImage.split('/');
                const imageName = imageUriParts[imageUriParts.length - 1];
                formData.append(`emp_profile`, {
                    uri: selectedImage,
                    name: imageName,
                    type: 'image/jpeg',
                });
            });
        }
        else {
            formData.append('emp_profile', selectedImage);
        }

        formData.append('first_name', Employee.firstName);
        formData.append('last_name', Employee.lastName);
        formData.append('gender', Employee.gender);
        formData.append('status', Employee.status);
        formData.append('mobile_number', Employee.phoneNumber);
        formData.append('whatsapp_number', Employee.whatsappNumber);
        formData.append('email_id', Employee.email);
        formData.append('date_of_birth', dob);
        formData.append('current_address', Employee.currentAddress);
        formData.append('permanent_address', Employee.permanentAddress);
        formData.append('parent_guardian_name', Employee.parentName);
        formData.append('marital_status', Employee.maritalStatus);

        if (Employee.maritalStatus === "Married") {
            formData.append('spouse_name', Employee.spouseName);
        } else {
            formData.append('spouse_name', "-");
        }

        formData.append('aadhar_no', Employee.aadharNumber);
        formData.append('pan_no', Employee.panNumber);

        formData.append('job_type', Employee.employeeJobTypeId);

        formData.append('employee_category', Employee.selectedemployeeCategory);

        formData.append('doj', doj);

        if (!Employee.probationPeriod) {
            formData.append('probation_period', "-");
        } else {
            formData.append('probation_period', Employee.probationPeriod);
        }

        if (!Employee.confirmationDate) {
            formData.append('confiramation_date', '');
        } else {
            formData.append('confiramation_date', Employee.confirmationDate);
        }

        if (!Employee.employeeAgreementPeriod) {
            formData.append('employee_agree_period', "-");
        } else {
            formData.append('employee_agree_period', Employee.employeeAgreementPeriod);
        }

        if (!Employee.noticePeriod) {
            formData.append('notice_period', "-");
        } else {
            formData.append('notice_period', Employee.noticePeriod);
        }

        if (!Employee.ctc) {
            formData.append('ctc', "-");
        } else {
            formData.append('ctc', Employee.ctc);
        }

        if (!Employee.grossSalary) {
            formData.append('gross_salary', "-");
        } else {
            formData.append('gross_salary', Employee.grossSalary);
        }

        if (!Employee.netSalary) {
            formData.append('net_salary', "-");
        } else {
            formData.append('net_salary', Employee.netSalary);
        }

        if (!Employee.lastWorkingDay) {
            formData.append('last_working_day', '-');
        } else {
            formData.append('last_working_day', Employee.lastWorkingDay);
        }

        if (!Employee.providentFund) {
            formData.append('emp_pf', "-");
        } else {
            formData.append('emp_pf', Employee.providentFund);
        }

        if (Employee.providentFund === "Applicable") {
            if (!Employee.uanNumber) {
                formData.append('uan_number', "-");
            } else {
                formData.append('uan_number', Employee.uanNumber);
            }

            if (!Employee.employeePfContribution) {
                formData.append('employee_pf_contribution', "-");
            } else {
                formData.append('employee_pf_contribution', Employee.employeePfContribution);
            }

            if (!Employee.employerPfContribution) {
                formData.append('employer_pf_contribution', "-");
            } else {
                formData.append('employer_pf_contribution', Employee.employerPfContribution);
            }
        } else {
            formData.append('uan_number', "-");
            formData.append('employee_pf_contribution', "-");
            formData.append('employer_pf_contribution', "-");
        }

        if (!Employee.esi) {
            formData.append('emp_esi', "-");
        } else {
            formData.append('emp_esi', Employee.esi);
        }

        if (Employee.esi === "Applicable") {
            if (!Employee.esiNumber) {
                formData.append('esi_number', "-");
            } else {
                formData.append('esi_number', Employee.esiNumber);
            }

            if (!Employee.employeeEsiContribution) {
                formData.append('employee_esi_contribution', "-");
            } else {
                formData.append('employee_esi_contribution', Employee.employeeEsiContribution);
            }

            if (!Employee.employerEsiContribution) {
                formData.append('employer_esi_contribution', "-");
            } else {
                formData.append('employer_esi_contribution', Employee.employerEsiContribution);
            }
        } else {
            formData.append('esi_number', "-");
            formData.append('employee_esi_contribution', "-");
            formData.append('employer_esi_contribution', "-");
        }

        if (!Employee.selectedRoleId) {
            formData.append('role', "-");
        } else {
            formData.append('role', Employee.selectedRoleId);
        }

        if (!Employee.designation) {
            formData.append('designation', "-");
        } else {
            formData.append('designation', Employee.designation);
        }

         if (!Employee.selectedRoleId) {
            formData.append('supervisor_name', "-");
        } else {
            formData.append('supervisor_name', Employee.selectedsupervisorRoleId);
        }

        if (!Employee.selectedsupervisorId) {
            formData.append('supervisor', "-");
        } else {
            formData.append('supervisor', Employee.selectedsupervisorId);
        }

        if (!Employee.officialEmail) {
            formData.append('official_email', "-");
        } else {
            formData.append('official_email', Employee.officialEmail);
        }

        if (!Employee.password) {
            formData.append('password', "-");
        } else {
            formData.append('password', Employee.password);
        }

        if (!Employee.checkinCheckoutId) {
            formData.append('emp_punch', "-");
        } else {
            formData.append('emp_punch', Employee.checkinCheckoutId);
        }

        if (!Employee.overtime) {
            formData.append('ot_status', "-");
        } else {
            formData.append('ot_status', Employee.overtime);
        }

        // formData.append('ot_status', Employee.overtime);

        if (!Employee.lateAllowed) {
            formData.append('late_policy', "-");
        } else {
            formData.append('late_policy', Employee.lateAllowed);
        }

        if (!Employee.permissionAllowed) {
            formData.append('permission_policy', "-");
        } else {
            formData.append('permission_policy', Employee.permissionAllowed);
        }

        formData.append('account_number', Employee.bankAccountNumber);
        formData.append('bank_name', Employee.bankName);
        formData.append('branch_name', Employee.bankBranch);
        formData.append('ifsc_code', Employee.ifscCode);
        formData.append('account_type', Employee.accountType);

        if (documentType.length > 0) {
            documentType.map((file, index) => {
                formData.append('emp_document_type[]', file);
            });
        } else {
            formData.append('emp_document_type[]', documentType);
        }

        if (documentName.length > 0) {
            documentName.map((file, index) => {
                formData.append('emp_document_name[]', file);
            });
        } else {
            formData.append('emp_document_name[]', documentName);
        }

        if (documentFile.length > 0) {
            documentFile.map((file, index) => {
                let uri, name;
                if (typeof file === 'string') {
                    const imageUriParts = file.split('/');
                    name = imageUriParts[imageUriParts.length - 1];
                    uri = file;
                } else {
                    name = file.name;
                    uri = file.uri;
                }
                formData.append(`emp_document_image[]`, {
                    uri: uri,
                    name: name,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('emp_document_image[]', documentFile);
        }

        formData.append('created_by', data.userrole);

        try {

            const response = await fetch('https://office3i.com/development/api/public/api/add_employee', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "appended")

            if (responsedata.status === "success") {
                setLoad(false);
                handleShowAlert(responsedata);
                HandleCancel();
            } else {
                setLoad(false);
                handleShowAlert1(responsedata);
            }

        } catch (error) {
            setLoad(false);
            handleShowAlert2();
        }

    }

    // Handle Cancel

    const HandleCancel = () => {
        dispatch(removeEmployeeFields());
        setDocuments([]);
        setSelectedDocument([]);
        setSelectedDocumentId([]);
        setSelectedImage([]);
        setSelectedImageErr('');
        setDocName('');
        setDocFile('');
        setDocNameErr('');
        setSelectedDocumentErr('');
        setDocFileErr('');
        setValidation(false);
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Employee List');
            setValidation(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res.message);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

    const availableDocumentList = documentList.filter(doc => !documents.find(d => d.type === doc.document_name));

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Documents
            </Text>

            <Text style={styles.subHeading}>
                Document Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Document Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {availableDocumentList.map((File, index) => (

                        <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.document_name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.errorText}>
                {selectedDocumentErr}
            </Text>

            <Text style={styles.subHeading}>
                Document Name
            </Text>

            <TextInput
                style={styles.input}
                value={docName}
                onChangeText={(text) => setDocName(text)}
            />

            <Text style={styles.errorText}>
                {docNameErr}
            </Text>

            <Text style={styles.subHeading}>
                Select File
            </Text>

            <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                {docFile ? docFile[0].name : 'Select The Document'}
            </Text>

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                    <Text style={styles.UploadButtonText}>
                        Select Document
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.errorText}>
                {docFileErr}
            </Text>

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.NextButton}
                    onPress={addDocument}
                >
                    <Text style={styles.NextButtonText}>
                        ADD
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

            <Text style={styles.Heading}>
                Documents List
            </Text>

            <View style={styles.RolelistContainer}>

                <View style={styles.listContainer}>

                    <View style={styles.listHeader}>
                        <Text style={styles.sno}>S.No</Text>
                        <Text style={styles.RoleName}>Document Name</Text>
                        <Text style={styles.Action}>Action</Text>
                    </View>

                    {
                        documents.length === 0 ? (
                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                        ) : (
                            documents.map((doc, index) => (
                                <View key={index} style={styles.listcontent}>
                                    <Text style={styles.listcontentsno}>{index + 1}</Text>
                                    <Text style={styles.listcontentRoleName}>{doc.name}</Text>
                                    <View style={styles.listcontentButtonview}>
                                        <TouchableOpacity onPress={() => deleteDocument(doc.id)} style={styles.listcontentdelbutton}>
                                            <DeleteIcon width={14} height={14} color={"#000"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )
                    }

                </View>

            </View>

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBankDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Prev
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={HandleSubmit}>
                    {
                        load ? <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.NextButtonText}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.PrevButton} onPress={HandleCancel}>
                    <Text style={styles.PrevButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../../../../Assets/Alerts/tick.json')}
                title={resMessage}
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../../../../Assets/Alerts/Close.json')}
                title={resMessageFail}
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data"
            />

        </View>

    )
}

export default Documents;

