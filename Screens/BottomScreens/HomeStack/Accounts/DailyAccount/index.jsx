import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, Platform, Button } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
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

const DailyAcc = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [department, setDepartrment] = useState('');
    const [name, setName] = useState('');
    const [debit, setDebit] = useState('');
    const [credit, setCredit] = useState('');
    const [bankBalance, setBankBalance] = useState('');
    const [originalBankBalance, setOriginalBankBalance] = useState('');
    const [noe, setNoe] = useState('');

    const [departmentErr, setDepartrmentErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [debitErr, setDebitErr] = useState('');
    const [creditErr, setCreditErr] = useState('');
    const [noeErr, setNoeErr] = useState('');

    const [activeField, setActiveField] = useState(null);

    const handleDebitChange = (txt) => {
        if (credit) {
            setDebit('');
            setDebitErr('Debit is disabled because Credit has a value.');
        } else {
            if (txt === '') {
                setBankBalance(originalBankBalance);
                setDebit('');
                setDebitErr('');
            } else {
                const debitValue = parseFloat(txt) || 0;
                const newBalance = parseFloat(originalBankBalance) - debitValue;

                if (newBalance < 0) {
                    setDebitErr('Insufficient balance.');
                    setBankBalance(originalBankBalance);
                    setDebit('');
                } else {
                    setDebit(txt);
                    setDebitErr('');
                    setActiveField('debit');
                    setBankBalance(newBalance.toString());
                }
            }
        }
    };

    const handleCreditChange = (txt) => {
        if (debit) {
            setCredit('');
            setCreditErr('Credit is disabled because Debit has a value.');
        } else {
            if (txt === '') {
                setBankBalance(originalBankBalance);
                setCredit('');
                setCreditErr('');
            } else {
                const creditValue = parseFloat(txt) || 0;
                const newBalance = parseFloat(originalBankBalance) + creditValue;
                setCredit(txt);
                setCreditErr('');
                setActiveField('credit');
                setBankBalance(newBalance.toString());
            }
        }
    };


    const [loadData, setLoadData] = useState(false);
    const [load, setLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 5;

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

    const fetchBalanceCash = async () => {
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/balance_cash';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const responseData = response.data.data.balance_cash;
            setBankBalance(responseData);
            setOriginalBankBalance(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBalanceCash();
    }, [])

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/view_dailyaccounts';
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

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Date', 'Department', 'Name', 'Nature Of Expenses', 'Debit', 'Credit', 'Balance Cash'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.a_date,
            rowData.department,
            rowData.name,
            rowData.natureof_expenses,
            rowData.debit,
            rowData.credit,
            rowData.balance_cash,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Daily_accounts.xlsx';

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
        const tableHead = ['S.No', 'Date', 'Department', 'Name', 'Nature Of Expenses', 'Debit', 'Credit', 'Balance Cash'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.a_date,
            rowData.department,
            rowData.name,
            rowData.natureof_expenses,
            rowData.debit,
            rowData.credit,
            rowData.balance_cash,
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
                fileName: 'Daily_accounts',
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

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // 

    const validateFields = () => {

        let isValid = true;

        if (!startDate) {
            setStartDateErr('Select Date');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        if (!department) {
            setDepartrmentErr('Enter Department');
            isValid = false;
        } else {
            setDepartrmentErr('');
        }

        if (!name) {
            setNameErr('Enter Name');
            isValid = false;
        } else {
            setNameErr('');
        }

        if (!debit && !credit) {
            setDebitErr('Enter Debit or Credit');
            isValid = false;
        } else {
            setDebitErr('');
        }

        if (!noe) {
            setNoeErr('Enter Nature Of Expenses');
            isValid = false;
        } else {
            setNoeErr('');
        }

        return isValid;

    };

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://epkgroup.in/crm/api/public/api/add_dailyaccounts';

            const response = await axios.post(apiUrl, {
                a_date: formattedStartDate,
                department: department,
                name: name,
                natureof_expenses: noe,
                debit: debit || "0",
                credit: credit || "0",
                balance_cash: bankBalance,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                Refresh();
                fetchData();
                setLoad(false);
            } else {
                handleShowAlert1(responseData.message);
                setLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            setLoad(false);
        }

    }

    const Refresh = () => {
        setDepartrment('');
        setDepartrmentErr('');
        setName('');
        setNameErr('');
        setStartDate(null);
        setStartDateErr('');
        setDebit('');
        setDebitErr('');
        setCredit('');
        setCreditErr('');
        setNoe('');
        setNoeErr('');
        fetchBalanceCash();
    }

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Daily Accounts</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {/* {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )} */}
                         {Platform.OS === 'android' && showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        {Platform.OS === 'ios' && (
                            <Modal visible={showDatePicker} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent1}>
                                        <DateTimePicker
                                            value={startDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange}
                                        />
                                        <Button title="Cancel" onPress={() => setShowDatePicker(false)} />
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Department
                    </Text>

                    <TextInput
                        value={department}
                        onChangeText={(txt) => setDepartrment(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {departmentErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(txt) => setName(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {nameErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Debit
                    </Text>

                    <TextInput
                        value={debit}
                        onChangeText={handleDebitChange}
                        style={styles.inputs}
                        keyboardType="number-pad"
                        editable={!credit}
                    />

                    <Text style={styles.errorText}>
                        {debitErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Credit
                    </Text>

                    <TextInput
                        value={credit}
                        onChangeText={handleCreditChange}
                        style={styles.inputs}
                        keyboardType="number-pad"
                        editable={!debit}
                    />

                    <Text style={styles.errorText}>
                        {creditErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Balance Cash
                    </Text>

                    <TextInput
                        value={bankBalance}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Nature Of Expenses
                    </Text>

                    <TextInput
                        value={noe}
                        onChangeText={(txt) => setNoe(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {noeErr}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>

                        <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.HeaderButtonTextActive}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton} onPress={Refresh}>
                            <Text style={styles.HeaderButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Daily Accounts List</Text>
                </View>

            </View>

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
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Department</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Nature OF Expenses</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Debit</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Credit</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Balance Cash</Text>
                                </View>

                                {paginatedData.length == 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.a_date}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.department}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.name}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.natureof_expenses}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.debit}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.credit}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.balance_cash}</Text>
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

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

export default DailyAcc;