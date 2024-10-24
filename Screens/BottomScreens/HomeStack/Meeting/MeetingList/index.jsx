import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import TickIcon from '../../../../../Assets/Icons/Tick.svg';
import CloseIcon from '../../../../../Assets/Icons/Close.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from "@react-navigation/native";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const MeetingList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [remarks, setRemarks] = useState('');
    console.log(remarks, "remarks")

    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 8;

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/view_meeting_list';
            const response = await axios.post(apiUrl, {
                user_roleid: data.userrole,
                emp_id: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Title', 'Created By', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks', 'Approval List', 'Reject List'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.m_title,
            rowData.created_by,
            rowData.teamname,
            rowData.membername,
            rowData.m_date,
            rowData.m_start_time,
            rowData.m_end_time,
            rowData.m_agenda,
            rowData.m_remarks,
            rowData.approved_approval,
            rowData.rejected_approval,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Meeting_List.xlsx';

            await RNFS.writeFile(fileUri, wbout, 'base64');

            // Check if file is correctly written
            console.log('File written to:', fileUri);

            // Share the file
            const options = {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                url: 'file://' + fileUri,
                title: 'Share Excel File',
            };
            await Share.open(options);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    // Export-PDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Title', 'Created By', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks', 'Approval List', 'Reject List'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.m_title,
            rowData.created_by,
            rowData.teamname,
            rowData.membername,
            rowData.m_date,
            rowData.m_start_time,
            rowData.m_end_time,
            rowData.m_agenda,
            rowData.m_remarks,
            rowData.approved_approval,
            rowData.rejected_approval,
        ]);

        const htmlContent = `
                <html>
                    <head>
                        <style>
                            @page {
                                size: landscape; /* Set the page to landscape mode */
                            }
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }
                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <table>
                            <thead>
                                <tr>
                                    ${tableHead.map(column => `<th>${column}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${tableData1.map(row => `<tr>${row.map((cell, index) =>
            `<td style="${index === 1 ? 'text-align: left;' : ''}">${cell}</td>`).join('')}</tr>`).join('')}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;

        try {
            const { filePath } = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: 'Meeting_List',
                directory: RNFS.DocumentDirectoryPath,
            });

            Share.open({
                url: `file://${filePath}`,
                type: 'application/pdf',
                title: 'Export to PDF',
            });
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }
    };

    // Api call for Delete

    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')
    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const HandleDelete = (slotId) => {
        setSlotToDelete(slotId);
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

                const apiUrl = `https://epkgroup.in/crm/api/public/api/delete_meeting`;

                const response = await axios.post(apiUrl, {
                    id: slotToDelete,
                    updated_by: data.userempid,
                    reason: Reason,
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                if (response.data.status === "success") {
                    const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    // Alert.alert("Deleted", "Deleted Successfully");
                    handleShowAlert(response.data.message);
                } else {
                    // Alert.alert("Failed", "Failed to delete shift slot");
                    handleShowAlert1(response.data.message);
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
        }
    }

    const [modalVisible1, setModalVisible1] = useState(false);
    const [ReasonError1, setReasonError1] = useState('')
    const [Reason1, setReason1] = useState('');
    const [DelData1, setDelData1] = useState(false);
    const [slotToDelete1, setSlotToDelete1] = useState(null);
    const [status, setStatus] = useState('');

    const HandleDelete1 = (item, status) => {
        setSlotToDelete1(item.id);
        setModalVisible1(true);
        setStatus(status);
        // StatusApi();
    }

    const cancelDelete1 = () => {
        setSlotToDelete1(null);
        setModalVisible1(false);
        setReasonError1('');
        setReason1('');
        setDelData1(false);
    }

    const [modalVisible2, setModalVisible2] = useState(false);
    const [ReasonError2, setReasonError2] = useState('')
    const [Reason2, setReason2] = useState('');
    const [DelData2, setDelData2] = useState(false);
    const [slotToDelete2, setSlotToDelete2] = useState(null);

    const HandleDelete2 = (item, status) => {
        setSlotToDelete2(item.id);
        setModalVisible2(true);
        setStatus(status);
        // StatusApi();
    }

    const cancelDelete2 = () => {
        setSlotToDelete2(null);
        setModalVisible2(false);
        setReasonError2('');
        setReason2('');
        setDelData2(false);
    }

    const HandleConfirm = async () => {

        setDelData1(true);

        try {

            const apiUrl = `https://epkgroup.in/crm/api/public/api/approval_meeting`;

            const response = await axios.post(apiUrl, {
                meeting_id: slotToDelete1,
                meetingemp_id: data.userempid,
                meeting_status: status,
                meeting_remarks: Reason1
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const Resdata = response.data;

            if (Resdata.status === "success") {
                fetchData();
                // Alert.alert("Successfull", Resdata.message);
                handleShowAlert(Resdata.message);
                setDelData1(false);
                setReason1('');
            } else {
                // Alert.alert("Failed", Resdata.message)
                handleShowAlert1(Resdata.message);
                console.log("error");
                setDelData1(false);
            }

        } catch (error) {
            handleShowAlert2();
            console.log(error);
            setDelData1(false);
        }
        setModalVisible1(false)
    }

    const HandleCancel = async (item) => {

        setDelData2(true);

        try {

            const apiUrl = `https://epkgroup.in/crm/api/public/api/approval_meeting`;

            const response = await axios.post(apiUrl, {
                meeting_id: slotToDelete2,
                meetingemp_id: data.userempid,
                meeting_status: "Rejected",
                meeting_remarks: Reason2
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const Resdata = response.data;

            if (Resdata.status === "success") {
                fetchData();
                Alert.alert("Successfull", Resdata.message);
                setDelData2(false);
                setReason1('');
            } else {
                Alert.alert("Failed", Resdata.message)
                console.log("error");
                setDelData2(false);
            }

        } catch (error) {
            console.log(error);
            setDelData2(false);
        }
        setModalVisible2(false)
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
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

    // const StatusApi = async () => {

    //     try {
    //         const apiUrl = `https://epkgroup.in/crm/api/public/api/meeting_status_list/1/${status}`;
    //         const response = await axios.get(apiUrl, {
    //             headers: {
    //                 Authorization: `Bearer ${data.token}`
    //             }
    //         });

    //         const responseData = response.data;
    //         setRemarks(responseData);

    //         if (responseData.status === "success") {
    //             Alert.alert('Successfull', "Updated Successfully")
    //         } else {
    //             Alert.alert('Failed', "Failed to Update")
    //         }

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }

    // }

    return (
        <ScrollView>
            <View style={styles.Container}>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity style={[styles.Button, { marginRight: '5%' }]}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.ButtonText}>
                            Export to Excel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button}
                        onPress={exportToPDF}
                    >
                        <Text style={styles.ButtonText}>
                            Export to PDF
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.Input}
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />
                    <View style={styles.IconBg}>
                        <SearchIcon color={'#474747'} width={24} height={24} />
                    </View>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Title</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Created By</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Teams</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Members</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Start Time</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>End Time</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status1, { textAlign: 'left' }]}>Agenda</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status1, { textAlign: 'left' }]}>Remarks</Text>
                                    {
                                        data.userrole == 1 || data.userrole == 2 ?
                                            <>
                                                <Text style={[styles.header, styles.cell, styles.Status]}>Approval List</Text>
                                                <Text style={[styles.header, styles.cell, styles.Status]}>Rejectt List</Text>
                                            </> :
                                            <>
                                                <Text style={[styles.header, styles.cell, styles.Status]}>Reason</Text>
                                            </>
                                    }

                                    <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.m_title}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.created_by}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.teamname}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.membername}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.m_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.m_start_time}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.m_end_time}</Text>
                                            <Text style={[styles.cell, styles.Status1, { textAlign: 'left' }]}>{item.m_agenda}</Text>
                                            <Text style={[styles.cell, styles.Status1, { textAlign: 'left' }]}>{item.m_remarks}</Text>
                                            {
                                                data.userrole == 1 || data.userrole == 2 ?
                                                    <>
                                                        <Text style={[styles.cell, styles.Status]}>{item.approved_approval === null ? "-" : item.approved_approval}</Text>
                                                        <Text style={[styles.cell, styles.Status]}>{item.rejected_approval === null ? "-" : item.rejected_approval}</Text>
                                                    </> :
                                                    <>
                                                        <Text style={[styles.cell, styles.Status]}>{item.empreason}</Text>
                                                    </>
                                            }

                                            {(data.userrole == 1 || data.userrole == 2) ? (
                                                <View style={styles.listcontentButtonview}>
                                                    <TouchableOpacity style={styles.listcontenteditbutton}
                                                        onPress={() => navigation.navigate('Edit Meeting', { Id: item })}
                                                    >
                                                        <EditIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.listcontentdelbutton}
                                                        onPress={() => HandleDelete(item.id)}
                                                    >
                                                        <DeleteIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (
                                                item.emp_status === null ?
                                                    (
                                                        <>
                                                            <View style={styles.listcontentButtonview}>
                                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                                    onPress={() => HandleDelete1(item, 'Approved')}
                                                                >
                                                                    <TickIcon width={14} height={14} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.listcontentdelbutton}
                                                                    onPress={() => HandleDelete2(item, 'Rejected')}
                                                                >
                                                                    <CloseIcon width={14} height={14} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <View style={[styles.cell, styles.Status]}>
                                                                <Text>{item.emp_status}</Text>
                                                            </View>
                                                        </>
                                                    )
                                            )}
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

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
                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
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
                        visible={modalVisible1}
                        onRequestClose={() => setModalVisible1(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTextHeading}>Meeting Status</Text>
                                <Text style={styles.modalText}>Meeting Remarks:</Text>
                                <TextInput
                                    value={Reason1}
                                    onChangeText={(text) => setReason1(text)}
                                    style={styles.Reason}
                                />
                                <Text style={styles.errorTextDelete}>
                                    {ReasonError1}
                                </Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete1}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalDeleteButton} onPress={HandleConfirm}>


                                        {
                                            DelData1 ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalDeleteButtonText}>Submit</Text>
                                        }


                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => setModalVisible2(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTextHeading}>Meeting Status</Text>
                                <Text style={styles.modalText}>Meeting Remarks:</Text>
                                <TextInput
                                    value={Reason2}
                                    onChangeText={(text) => setReason2(text)}
                                    style={styles.Reason}
                                />
                                <Text style={styles.errorTextDelete}>
                                    {ReasonError2}
                                </Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete2}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalDeleteButton} onPress={HandleCancel}>


                                        {
                                            DelData2 ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalDeleteButtonText}>Submit</Text>
                                        }


                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.pagination}>

                        <TouchableOpacity style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>
                                Prev
                            </Text>
                        </TouchableOpacity>

                        {pages.map((page, index) => (
                            <View key={index} style={[currentPage === page ? styles.PageActive : null, { width: 26, height: 26, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }]}>
                                <Text
                                    style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                    onPress={() => onPageChange(page)}
                                >
                                    {page}
                                </Text>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>
                                Next
                            </Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>

                    </View>

                    <LottieAlertSucess
                        visible={isAlertVisible}
                        animationSource={require('../../../../../Assets/Alerts/tick.json')}
                        title={resMessage}
                    />

                    <LottieAlertError
                        visible={isAlertVisible1}
                        animationSource={require('../../../../../Assets/Alerts/Close.json')}
                        title={resMessageFail}
                    />

                    <LottieCatchError
                        visible={isAlertVisible2}
                        animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                        title="Error While Fetching Data"
                    />

                </View>

            </View>
        </ScrollView>
    )
}

export default MeetingList;