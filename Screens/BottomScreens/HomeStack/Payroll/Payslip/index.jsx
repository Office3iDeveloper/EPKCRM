import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const PaySlip = ({ route, navigation }) => {

    const SpecId = route.params.Id;
    console.log(SpecId, "SpecId")

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
            const apiUrl = `https://office3i.com/development/api/public/api/get_emp_payslip_list/${SpecId.e_id}`;
            const response = await axios.get(apiUrl, {
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

    useEffect(() => {
        fetchData();
    }, [])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Month', 'Basic + DA', 'HRA', 'Convenience Allowance', 'Transport Allowance', 'Medical Allowance', 'Other Allowance', 'Overtime', 'Variable', 'Gross Pay', 'PF', 'ESI', 'Salary Advance', 'Other Deduction', 'LOP', 'Total Deduction', 'Net Pay'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.payslipmonthyear,
            rowData.basic_da,
            rowData.hra,
            rowData.conveyance_allowance,
            rowData.transport_allowance,
            rowData.medical_allowance,
            rowData.other_allowance,
            rowData.emp_ot,
            rowData.variable,
            rowData.gross_pay,
            rowData.pf,
            rowData.esi,
            rowData.advance,
            rowData.other_deduction,
            rowData.emp_lop,
            rowData.overall_deduction,
            rowData.totalnetpay_amount,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Payslip_list.xlsx';

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
        const tableHead = ['S.No', 'Month', 'Basic + DA', 'HRA', 'Convenience Allowance', 'Transport Allowance', 'Medical Allowance', 'Other Allowance', 'Overtime', 'Variable', 'Gross Pay', 'PF', 'ESI', 'Salary Advance', 'Other Deduction', 'LOP', 'Total Deduction', 'Net Pay'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.payslipmonthyear,
            rowData.basic_da,
            rowData.hra,
            rowData.conveyance_allowance,
            rowData.transport_allowance,
            rowData.medical_allowance,
            rowData.other_allowance,
            rowData.emp_ot,
            rowData.variable,
            rowData.gross_pay,
            rowData.pf,
            rowData.esi,
            rowData.advance,
            rowData.other_deduction,
            rowData.emp_lop,
            rowData.overall_deduction,
            rowData.totalnetpay_amount,
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
                fileName: 'Payslip_list',
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

                const apiUrl = `https://office3i.com/development/api/public/api/delete_payslip_list`;

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
                    handleShowAlert1(response.data.message)
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

    return (

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
                                <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Month</Text>
                                <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Basic + DA</Text>
                                <Text style={[styles.header, styles.cell, styles.StartDate]}>HRA</Text>
                                <Text style={[styles.header, styles.cell, styles.EndDate]}>Convenience Allowance</Text>
                                <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Transport Allowance</Text>
                                <Text style={[styles.header, styles.cell, styles.EndDate]}>Medical Allowance</Text>
                                <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Other Allowance</Text>
                                <Text style={[styles.header, styles.cell, styles.WeekOff]}>Overtime</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Variable</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Gross Pay</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>PF</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>ESI</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Salary Advance</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Other Deduction</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>LOP</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Total Deduction</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Net Pay</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text>
                            </View>

                            {paginatedData.length === 0 ? (
                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <View key={index} style={[styles.row, styles.listBody]}>

                                        <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                        <Text style={[styles.cell, styles.DepartmentName]}>{item.payslipmonthyear}</Text>
                                        <Text style={[styles.cell, styles.EmployeeName]}>{item.basic_da}</Text>
                                        <Text style={[styles.cell, styles.StartDate]}>{item.hra}</Text>
                                        <Text style={[styles.cell, styles.EndDate]}>{item.conveyance_allowance}</Text>
                                        <Text style={[styles.cell, styles.ShiftSlot]}>{item.transport_allowance}</Text>
                                        <Text style={[styles.cell, styles.EndDate]}>{item.medical_allowance}</Text>
                                        <Text style={[styles.cell, styles.ShiftSlot]}>{item.other_allowance}</Text>
                                        <Text style={[styles.cell, styles.WeekOff]}>{item.emp_ot}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.variable}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.gross_pay}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.pf}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.esi}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.advance}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.other_deduction}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.emp_lop}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.overall_deduction}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.totalnetpay_amount}</Text>

                                        <View style={styles.listcontentButtonview}>

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Slip', { item })}
                                                style={styles.listcontentviewbutton}>
                                                <ViewIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>


                                            <TouchableOpacity
                                                onPress={() => HandleDelete(item.id)}
                                                style={styles.listcontentdelbutton}>
                                                <DeleteIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                ))
                            )}

                        </View>
                    )
                    }
                </View>

            </ScrollView>

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
                            multiline={true}
                            textAlignVertical="top"
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

                    {pages.map(page => (
                        <Text
                            key={page}
                            style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                            onPress={() => onPageChange(page)}
                        >
                            {page}
                        </Text>
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

    )
}

export default PaySlip;