import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator, Modal } from "react-native";
import styles from "../../AddEmployee/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import EditIcon from "../../../../../../Assets/Icons/Edit.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DocumentPicker from 'react-native-document-picker';
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";
import RNFS from 'react-native-fs';


const Documents = ({
    navigation,
    onprevBankDetails,
    selectedImage,
    setSelectedImage,
    setDocumentId,
    documentId,
    documentFile,
    documentName,
    documentType,
    setDocumentType,
    setDocumentName,
    setDocumentFile,
    setDocuments,
    documents,
    // employeeDoc,
    // setEmployeeDoc,
    // setEmployee,
    employee,
    formattedStartDate,
    desg,
    showFields,
    id,
}) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // state

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();
    const [docName, setDocName] = useState();
    const [docNameErr, setDocNameErr] = useState();
    const [selectedDocument, setSelectedDocument] = useState('');
    const [selectedDocumentErr, setSelectedDocumentErr] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState('');
    const [selectedDocument1, setSelectedDocument1] = useState([]);
    const [selectedDocumentId1, setSelectedDocumentId1] = useState(null);
    const [load, setLoad] = useState(false);

    // 

    const [loading, setLoading] = useState(false);
    const [employeeDoc, setEmployeeDoc] = useState([]);

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
            const resDoc = response.data.data.employee_documents;
            setEmployeeDoc(resDoc);
            setLoading(false);

        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id])


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

    const selectDocument1 = (File) => {
        setSelectedDocument1(File.document_name);
        setSelectedDocumentId1(File.id);
        setShowDropdown1(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    }

    // 

    const [loadData, setLoadData] = useState(false)

    const docRefresh = () => {
        setSelectedDocumentId('');
        setSelectedDocument('');
        setDocName('');
        setDocFile('');
    }

    const validateFields = () => {
        let isValid = true;

        if (!selectedDocument) {
            setSelectedDocumentErr('Document Type required');
            isValid = false;
        } else {
            setSelectedDocumentErr('');
        }

        if (!docName) {
            setDocNameErr('Document Name Required');
            isValid = false;
        } else {
            setDocNameErr('');
        }

        if (!docFile) {
            setDocFileErr('Document File Required');
            isValid = false;
        } else {
            setDocFileErr('');
        }

        return isValid;
    };

    const addDocument = async () => {

        setLoadData(true)

        if (!validateFields()) {
            setLoadData(false);
            return;
        }

        const formData = new FormData();

        formData.append('emp_id', id);
        formData.append('emp_document_type[]', selectedDocumentId);
        formData.append('emp_document_name[]', selectedDocument);

        if (docFile.length > 0) {
            docFile.map((file, index) => {
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
            formData.append('emp_document_image[]', docFile);
        }

        formData.append('updated_by', data.userrole);

        try {

            const response = await fetch('https://office3i.com/development/api/public/api/add_document_list', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "responsedata")

            if (responsedata.status === "success") {

                handleShowAlert(responsedata);
                fetchData();
                docRefresh();
                setLoadData(false);

            } else {

                handleShowAlert1(responsedata);
                setLoadData(false);
            }


        } catch (error) {
            handleShowAlert2();
            setLoadData(false)
            console.error('Error fetching data:', error);
        }

    };

    // Api call for Delete

    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')
    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const HandleDelete = (slotId) => {
        setSlotToDelete(slotId.id);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
        setDelData(false);
    }

    const confirmDelete = async () => {

        setDelData(true)

        if (slotToDelete) {

            try {

                if (!Reason) {
                    setReasonError('Reason Required');
                    setDelData(false);
                    return;
                } else {
                    setReasonError('');
                    setReason('');
                }

                const apiUrl = `https://office3i.com/development/api/public/api/employee_single_docmentdelete`;

                const response = await axios.post(apiUrl, {
                    id: slotToDelete,
                    updated_by: data.userempid,
                    reason: Reason,
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                console.log(response, "response")

                if (response.data.status === "success") {
                    const updatedDataList = employeeDoc.filter(slot => slot.id !== slotToDelete);
                    setEmployeeDoc(updatedDataList);
                    setDelData(false);
                    // Alert.alert("Deleted", "Deleted Successfully");
                    handleShowAlert(response.data);
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data);
                    setDelData(false)
                }
            } catch (error) {
                // Alert.alert("Error", "Error while deleting shift slot");
                handleShowAlert2();
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        } else {
            setDelData(false);
        }
    }

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

        const formData = new FormData();

        const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (!emailRegex.test(employee.email)) {
            Alert.alert('Invalid Email ID', "Please enter a valid email address");
            setLoad(false);
            return;
        }

        if (!emailRegex.test(employee.official_email)) {
            Alert.alert('Invalid Official Email ID', "Please enter a valid email address");
            setLoad(false);
            return;
        }

        if (employee.aadhar_number.length !== 12) {
            Alert.alert('Invalid Aadhar Number', "Please enter a valid Aadhar Number");
            setLoad(false);
            return;
        }

        if (!panRegex.test(employee.pan_number)) {
            Alert.alert('Invalid Pan Number', "Please enter a valid Pan Number");
            setLoad(false);
            return;
        }

        //append data

        formData.append('id', id);

        formData.append('employee_id', employee.hrms_emp_id);

        if (selectedImage) {
            if (selectedImage.length > 0) {
                selectedImage.map((selectedImg, index) => {
                    const imageUriParts = selectedImg.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`emp_profile`, {
                        uri: selectedImg,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            } else {
                formData.append('old_profileimg', employee.profile_img);
            }
        } else {
            formData.append('old_profileimg', employee.profile_img);
        }

        formData.append('first_name', employee.first_name);
        formData.append('last_name', employee.last_name);
        formData.append('gender', employee.gender);
        formData.append('status', employee.emp_status);
        formData.append('mobile_number', employee.mobile_no);
        formData.append('whatsapp_number', employee.whatsapp);
        formData.append('email_id', employee.email);
        formData.append('date_of_birth', employee.dob);
        formData.append('current_address', employee.current_address);
        formData.append('permanent_address', employee.address);
        formData.append('parent_guardian_name', employee.parents);
        formData.append('marital_status', employee.marital_status);

        if (employee.marital_status === "Married") {
            formData.append('spouse_name', employee.spouse_name);
        } else {
            formData.append('spouse_name', "-");
        }

        formData.append('aadhar_no', employee.aadhar_number);
        formData.append('pan_no', employee.pan_number);

        if (!employee.job_type) {
            formData.append('job_type', "-");
        } else {
            formData.append('job_type', employee.job_type);
        }

        if (!employee.job_type_name) {
            formData.append('job_type_name', "-");
        } else {
            formData.append('job_type_name', employee.job_type_name);
        }

        if (!employee.employee_category) {
            formData.append('employee_category', "-");
        } else {
            formData.append('employee_category', employee.category_id);
        }

        if (!employee.doj) {
            formData.append('doj', "-");
        } else {
            formData.append('doj', employee.doj);
        }

        formData.append('probation_period', employee.probation_period);

        if (!employee.confirmation_date) {
            formData.append('confiramation_date', "");
        } else {
            formData.append('confiramation_date', employee.confirmation_date);
        }

        formData.append('employee_agree_period', employee.emp_aggrement);

        if (!employee.notices_period) {
            formData.append('notice_period', "-");
        } else {
            formData.append('notice_period', employee.notices_period);
        }

        if (!employee.ctc) {
            formData.append('ctc', "-");
        } else {
            formData.append('ctc', employee.ctc);
        }

        if (!employee.emp_grosssalary) {
            formData.append('gross_salary', "-");
        } else {
            formData.append('gross_salary', employee.emp_grosssalary);
        }

        if (!employee.emp_salary) {
            formData.append('net_salary', "-");
        } else {
            formData.append('net_salary', employee.emp_salary);
        }

        formData.append('last_working_day', employee.last_working_date);

        if (!employee.emp_pf) {
            formData.append('emp_pf', "-");
        } else {
            formData.append('emp_pf', employee.emp_pf);
        }

        if (employee.emp_pf === "Applicable") {

            if (!employee.uan_number) {
                formData.append('uan_number', "-");
            } else {
                formData.append('uan_number', employee.uan_number);
            }

            if (!employee.employee_contribution) {
                formData.append('employee_pf_contribution', "-");
            } else {
                formData.append('employee_pf_contribution', employee.employee_contribution);
            }

            if (!employee.employeer_contribution) {
                formData.append('employer_pf_contribution', "-");
            } else {
                formData.append('employer_pf_contribution', employee.employeer_contribution);
            }

        } else {
            formData.append('uan_number', "-");
            formData.append('employee_pf_contribution', "-");
            formData.append('employer_pf_contribution', "-");
        }

        if (!employee.emp_esi) {
            formData.append('emp_esi', "-");
        } else {
            formData.append('emp_esi', employee.emp_esi);
        }

        if (employee.emp_esi === "Applicable") {
            if (!employee.esi_number) {
                formData.append('esi_number', "-");
            } else {
                formData.append('esi_number', employee.esi_number);
            }

            if (!employee.employee_esi_contribution) {
                formData.append('employee_esi_contribution', "-");
            } else {
                formData.append('employee_esi_contribution', employee.employee_esi_contribution);
            }

            if (!employee.employeer_esi_contribution) {
                formData.append('employer_esi_contribution', "-");
            } else {
                formData.append('employer_esi_contribution', employee.employeer_esi_contribution);
            }
        } else {
            formData.append('esi_number', "-");
            formData.append('employee_esi_contribution', "-");
            formData.append('employer_esi_contribution', "-");
        }

        if (!employee.role_name) {
            formData.append('role', "-");
        } else {
            formData.append('role', employee.role_id);
        }

        if (!employee.department_name) {
            formData.append('designation', "-");
        } else {
            formData.append('designation', employee.department_name);
        }

        formData.append('check_box', showFields);

        if (showFields) {
            formData.append('position_date', formattedStartDate);
        } else {
            formData.append('position_date', "-");
        }

        if (showFields) {
            formData.append('new_position', desg);
        } else {
            formData.append('new_position', employee.department_name);
        }


        if (!employee.supervisor_role_name) {
            formData.append('supervisor', "-");
        } else {
            formData.append('supervisor', employee.supervisor);
        }

        if (!employee.supervisor_role_name) {
            formData.append('supervisor_name', "-");
        } else {
            formData.append('supervisor_name', employee.supervisor_name);
        }

        if (!employee.official_email) {
            formData.append('official_email', "-");
        } else {
            formData.append('official_email', employee.official_email);
        }

        if (!employee.password) {
            formData.append('password', "-");
        } else {
            formData.append('password', employee.password);
        }

        if (!employee.emp_punch) {
            formData.append('emp_punch', "-");
        } else {
            formData.append('emp_punch', employee.emp_punch);
        }

        formData.append('ot_status', employee.ot_status);
        formData.append('late_policy', employee.late_policy);
        formData.append('permission_policy', employee.permission_policy);

        formData.append('account_number', employee.bank_accountnumber);
        formData.append('bank_name', employee.bank_name);
        formData.append('branch_name', employee.bank_branch);
        formData.append('ifsc_code', employee.ifsc_code);
        formData.append('account_type', employee.ac_type);

        formData.append('updated_by', data.userrole);


        try {

            const response = await fetch('https://office3i.com/development/api/public/api/update_employeemobile_details', {
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
                setTimeout(() => {
                    navigation.navigate('Employee List')

                }, 2000);
            } else {
                handleShowAlert1(responsedata);
                setLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            setLoad(false);
        }

    }

    // Handle Cancel

    const HandleCancel = () => {
        navigation.navigate('Employee List');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
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

    const availableDocumentList = documentList.filter(doc => !employeeDoc.find(d => d.document_type_name === doc.document_name));

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedtitle, setEditedtitle] = useState('');
    const [empid, setEmpid] = useState('');
    const [editedtitleErr, setEditedtitleErr] = useState('');
    const [EditLoad, setEditLoad] = useState(false);
    const [EdocFile, setEdocFile] = useState([]);
    const [EditedocFile, seteditedocFile] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (typeof EditedocFile === 'string') {
            const filePath = EditedocFile;
            setFileName(filePath.split('/').pop());
        }
    }, [EditedocFile]);

    // Api call For EditButton

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    // Function to open edit modal and populate data

    const openEditModal = (slot) => {
        setEmpid(slot.emp_id);
        setEditedtitle(slot.document_name);
        seteditedocFile(slot.document_img);
        setSelectedDocument1(slot.document_type_name);
        setEditModalVisible(true);
        setSelectedId(slot.id);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEdocFile(null);
    };

    // Function to handle edit submission

    const handleEditSubmit = async () => {

        setEditLoad(true);

        const formData = new FormData();

        try {

            if (!editedtitle) {
                setEditedtitleErr('Enter Name');
                setEditLoad(false);
                return;
            } else {
                setEditedtitleErr('');
            }

            formData.append('id', selectedId);
            formData.append('emp_id', empid);
            formData.append('emp_document_type', selectedDocumentId1);
            formData.append('emp_document_name', editedtitle);

            formData.append('updated_by', data.userempid);

            if (EdocFile) {
                if (EdocFile.length > 0) {
                    EdocFile.map((file, index) => {
                        formData.append(`emp_document_image`, {
                            uri: file.uri,
                            name: file.name,
                            type: 'image/jpeg',
                        });
                    });
                }
            } else {
                formData.append('emp_document_image', EdocFile);
            }

            formData.append('old_document_path', EditedocFile);

            const response = await fetch('https://office3i.com/development/api/public/api/update_employee_document', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setEditLoad(false);
                handleShowAlert(responsedata);
                setEdocFile(null);
                fetchData();
            } else {
                setEditLoad(false);
                handleShowAlert1(responsedata);
            }

        } catch (error) {
            setEditLoad(false);
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

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
                    {
                        loadData ?
                            <ActivityIndicator size={'small'} color={'#fff'} /> :
                            <Text style={styles.NextButtonText}> ADD +</Text>
                    }
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
                        employeeDoc.length == "0" ? (
                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                        ) : (
                            employeeDoc.map((doc, index) => (
                                <View key={index} style={styles.listcontent}>
                                    <Text style={styles.listcontentsno}>{index + 1}</Text>
                                    <Text style={styles.listcontentRoleName}>{doc.document_name}</Text>
                                    <View style={styles.listcontentButtonview}>

                                        <>
                                            <TouchableOpacity onPress={() => openEditModal(doc)} style={styles.listcontenteditbutton}>
                                                <EditIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => HandleDelete(doc)} style={styles.listcontentdelbutton}>
                                                <DeleteIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>
                                        </>

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
                    {load ? <ActivityIndicator size={"small"} color={"#fff"} /> : <Text style={styles.NextButtonText}>
                        Submit
                    </Text>}
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                        <Text style={styles.modalText}>Reason:</Text>
                        <TextInput
                            value={Reason}
                            onChangeText={(text) => setReason(text)}
                            style={styles.Reason}
                        />
                        <Text style={styles.errorTextDelete}>
                            {ReasonError}
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={cancelDelete}>
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>


                                {
                                    DelData ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                }


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>

                        <Text style={styles.Heading}>Edit Document List</Text>

                        <Text style={styles.ShiftSlotText}>Document Type</Text>

                        <TouchableOpacity onPress={toggleDropdown1} style={styles.modalInput}>

                            <Text style={styles.StatusTouchableText}>
                                {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Selected Document Type"}
                            </Text>
                            <DropdownIcon width={14} height={14} color={"#000"} />

                        </TouchableOpacity>

                        {/* Dropdown to show the options */}

                        {showDropdown1 && (
                            <View style={styles.Mdropdown}>
                                {availableDocumentList.map((File, index) => (
                                    <TouchableOpacity key={index} onPress={() => selectDocument1(File)} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>{File.document_name}</Text>
                                    </TouchableOpacity>

                                ))}
                            </View>
                        )}

                        <Text style={styles.ModalerrorText}>
                            { }
                        </Text>

                        <Text style={styles.ShiftSlotText}>Document Name</Text>

                        <TextInput
                            value={editedtitle}
                            onChangeText={setEditedtitle}
                            style={styles.modalInput}
                        />

                        <Text style={styles.ModalerrorText}>
                            {editedtitleErr}
                        </Text>

                        <Text style={styles.ShiftSlotText}>
                            Select File
                        </Text>

                        <Text
                            style={styles.MDocFileName}
                        >
                            {EdocFile ? EdocFile[0]?.name : fileName}
                        </Text>


                        <View style={styles.MfullWidth}>
                            <TouchableOpacity style={styles.UploadButton}
                                onPress={handleEditDocumentSelection}
                            >
                                <Text style={styles.UploadButtonText}>
                                    Select Document
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.Mbuttoncontainer}>

                            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                {
                                    EditLoad ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </View>

    )
}

export default Documents;






