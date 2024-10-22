import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import DonutChart from './Donet/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addMonths, subMonths } from 'date-fns';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const SalaryCalculation = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [chartload, setChartLoad] = useState(true);

    setTimeout(() => {
        setChartLoad(false)
    }, 1000);

    const [gpay, setGpay] = useState(0);
    const [npay, setNpay] = useState(0);
    const [deduction, setDeduction] = useState(0);
    const [tdays, setTdays] = useState(0);
    const [temp, setTemp] = useState(0)

    console.log(gpay, "gpay", npay, "npay", deduction, "deduction")

    // 

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

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const showPreviousMonth = () => {
        setStartDate(subMonths(startDate, 1));
    };

    const showNextMonth = () => {
        setStartDate(addMonths(startDate, 1));
    };

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/salary_calculation';
            const response = await axios.post(apiUrl, {
                yearmonth: formattedStartDate
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

    const fetch = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/graph_salary_calculation';
            const response = await axios.post(apiUrl, {
                yearmonth: formattedStartDate
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setGpay(responseData.total_gross_pay);
            setNpay(responseData.total_net_pay);
            setDeduction(responseData.total_deductions);
            setTdays(responseData.total_days_in_month);
            setTemp(responseData.employee_count);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetch();
    }, [startDate])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Name', 'LA', 'PR', 'HL', 'L', 'A', 'OT Amount', 'Overall LOP', 'Gross Salary', 'W.Days - A.Days', 'Net Salary'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
            rowData.latecount,
            rowData.permissioncount,
            rowData.halfdaycount,
            rowData.leavecount,
            rowData.absentcount,
            rowData.ot_totalamount,
            rowData.totallopdays,
            rowData.empgrosssalary,
            rowData.totalmonthlyworkingdays - rowData.totallopdays,
            rowData.totalnetpayamount,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Salary_calculation_list.xlsx';

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
        const tableHead = ['S.No', 'Name', 'LA', 'PR', 'HL', 'L', 'A', 'OT Amount', 'Overall LOP', 'Gross Salary', 'W.Days - A.Days', 'Net Salary'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
            rowData.latecount,
            rowData.permissioncount,
            rowData.halfdaycount,
            rowData.leavecount,
            rowData.absentcount,
            rowData.ot_totalamount,
            rowData.totallopdays,
            rowData.empgrosssalary,
            rowData.totalmonthlyworkingdays - rowData.totallopdays,
            rowData.totalnetpayamount,
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
                fileName: ' Salary_calculation_list',
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

    return (

        <ScrollView>

            <View style={styles.BeforeContainer}>

                <View style={styles.DonetContainer}>

                    <Text style={[styles.topic, { margin: '5%' }]}>Payout Details</Text>

                    <SafeAreaView>
                        <ScrollView>
                            {chartload ? <ActivityIndicator size={"large"} color={"#F20A8C"} style={styles.Activeindicator} /> :
                                <DonutChart gpay={gpay} npay={npay} deduction={deduction} />}
                        </ScrollView>
                    </SafeAreaView>

                    {/* <View style={{ marginHorizontal: '20%', marginBottom: '10%' }}>

                        <View style={styles.mentions}>

                            <View style={styles.gpay}>

                            </View>

                            <Text>
                                Gross Pay - Rs.{gpay}
                            </Text>

                        </View>

                        <View style={[styles.mentions, { marginVertical: '10%' }]}>

                            <View style={styles.npay}>
                            </View>

                            <Text>
                                Net Pay - Rs.{npay}
                            </Text>

                        </View>

                        <View style={styles.mentions}>

                            <View style={styles.deduc}>
                            </View>

                            <Text>
                                Deductions - Rs.{deduction}
                            </Text>

                        </View>
                    </View> */}

                </View>

                <View style={styles.countboxview}>
                    <View style={styles.countbox}>
                        <Text style={styles.head}>Total No. Of Days</Text>
                        <Text style={styles.val}>{tdays}</Text>
                    </View>
                    <View style={styles.countbox}>
                        <Text style={styles.head}>Total Employees</Text>
                        <Text style={styles.val}>{temp}</Text>
                    </View>
                </View>

            </View>

            <View style={styles.Container}>

                <View style={{ marginHorizontal: "5%", marginBottom: '5%' }}>
                    <Text style={styles.topic}>Salary Calculation List</Text>
                </View>

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

                <View style={styles.dateChanger}>
                    <ArrowLeftIcon width={20} height={16} color={'#0A62F1'} onPress={showPreviousMonth} />
                    <View>
                        <Text onPress={showDatepicker} style={{ color: '#00275C', fontWeight: '700', fontSize: 20 }}>
                            {format(startDate, 'MMMM yyyy')}
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                    <ArrowRightIcon width={20} height={16} color={'#0A62F1'} onPress={showNextMonth} />
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.cell, styles.DepartmentName]}>Name</Text>
                                    <Text style={[styles.cell, styles.EmployeeName]}>LA</Text>
                                    <Text style={[styles.cell, styles.StartDate]}>PR</Text>
                                    <Text style={[styles.cell, styles.EndDate]}>HL</Text>
                                    <Text style={[styles.cell, styles.ShiftSlot]}>L</Text>
                                    <Text style={[styles.cell, styles.ShiftSlot]}>A</Text>
                                    <Text style={[styles.cell, styles.WeekOff]}>OT Amount</Text>
                                    <Text style={[styles.cell, styles.Status]}>Overall LOP</Text>
                                    <Text style={[styles.cell, styles.Status]}>Gross Salary</Text>
                                    <Text style={[styles.cell, styles.Status]}>W.Days - A.Days</Text>
                                    <Text style={[styles.cell, styles.Status]}>Net Salary</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.emp_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.latecount}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.permissioncount}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.halfdaycount}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.leavecount}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.absentcount}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.ot_totalamount}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.totallopdays}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.empgrosssalary}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.totalmonthlyworkingdays - item.totallopdays}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.totalnetpayamount}</Text>
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
                </View>

            </View>

        </ScrollView>

    )
}

export default SalaryCalculation;