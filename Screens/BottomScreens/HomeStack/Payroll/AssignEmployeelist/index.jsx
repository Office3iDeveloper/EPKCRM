import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from "@react-navigation/native";

const AssignEmpList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
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

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/get_define_emp_salarylist';
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
        const tableHead = ['S.No', 'Department', 'Employee Name', 'Start Date', 'End Date', 'CTC', 'Gross Pay', 'Net Pay', 'Basic + DA', 'HRA', 'Convenience Allowance', 'Transport Allowance', 'Medical Allowance', 'Other Allowance', 'Variable', 'PF', 'EPF', 'ESI', 'Salary Advance', 'Other Deductions', 'Status'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.dep_name,
            rowData.emp_name,
            rowData.start_month,
            rowData.end_month,
            rowData.annual_ctc,
            rowData.gross_pay,
            rowData.net_pay,
            rowData.basic_da,
            rowData.hra,
            rowData.conveyance_allowance,
            rowData.transport_allowance,
            rowData.medical_allowance,
            rowData.other_allowance,
            rowData.variable,
            rowData.pf,
            rowData.epf,
            rowData.esi,
            rowData.advance,
            rowData.other_deduction,
            rowData.status,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Assign_employee_salary_list.xlsx';

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
        const tableHead = ['S.No', 'Department', 'Employee Name', 'Start Date', 'End Date', 'CTC', 'Gross Pay', 'Net Pay', 'Basic + DA', 'HRA', 'Convenience Allowance', 'Transport Allowance', 'Medical Allowance', 'Other Allowance', 'Variable', 'PF', 'EPF', 'ESI', 'Salary Advance', 'Other Deductions', 'Status'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.dep_name,
            rowData.emp_name,
            rowData.start_month,
            rowData.end_month,
            rowData.annual_ctc,
            rowData.gross_pay,
            rowData.net_pay,
            rowData.basic_da,
            rowData.hra,
            rowData.conveyance_allowance,
            rowData.transport_allowance,
            rowData.medical_allowance,
            rowData.other_allowance,
            rowData.variable,
            rowData.pf,
            rowData.epf,
            rowData.esi,
            rowData.advance,
            rowData.other_deduction,
            rowData.status,
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
                fileName: 'Assign_employee_salary_list',
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

                <View style={{ margin: '5%' }}>
                    <TouchableOpacity
                        style={{ width: 77, height: 41, backgroundColor: '#0A62F1', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                        onPress={() => navigation.navigate('Assign Employee Salary Add')}
                    >
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                            + Add
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Department</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Employee Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>CTC</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Gross Pay</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Net Pay</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Basic + DA</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>HRA</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Convenience Allowance</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Transport Allowance</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Medical Allowance</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Other Allowance</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Variable</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>PF</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>EPF</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>ESI</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Salary Advance</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Other Deductions</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.dep_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.emp_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.start_month}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.end_month}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.annual_ctc}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.gross_pay}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.net_pay}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.basic_da}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.hra}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.conveyance_allowance}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.transport_allowance}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.medical_allowance}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.other_allowance}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.variable}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.pf}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.epf}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.esi}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.advance}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.other_deduction}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.status}</Text>
                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => navigation.navigate('Assign Employee Salary Edit', { Id: item })}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
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

export default AssignEmpList;