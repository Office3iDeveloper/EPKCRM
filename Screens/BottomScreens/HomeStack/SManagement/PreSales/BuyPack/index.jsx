import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../../../Assets/Icons/Edit.svg";
import ViewIcon from "../../../../../../Assets/Icons/eyeopen.svg";
import styles from "../TrialPack/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from "@react-navigation/native";
import LottieAlertSucess from "../../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../../Assets/Alerts/Catch";

const PreBuyPacklist = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [remarks, setRemarks] = useState('');

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
            const apiUrl = 'https://office3i.com/development/api/public/api/getbuynow_packlist';
            const response = await axios.post(apiUrl, {
                e_id: data.userempid,
                role_id: data.userrole
            },
                {
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
        const tableHead = ['S.No', 'Name', 'E-mail', 'Plan Name', 'Add on Employee', 'Total Amount', 'Payment Method', 'Payment Status', 'Plan Type', 'Start Date', 'End Date', 'Assigned Sales', 'Created By', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.cus_name,
            rowData.cus_email,
            rowData.plan_name,
            rowData.add_emp_count,
            rowData.total_plan_amt,
            rowData.payment_methodname,
            rowData.payment_statusname,
            rowData.plan_period,
            rowData.start_date,
            rowData.end_date,
            rowData.assign_member_name,
            rowData.created_name,
            rowData.updated_name,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Buy_Pack_List.xlsx';

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
        const tableHead = ['S.No', 'Name', 'E-mail', 'Plan Name', 'Add on Employee', 'Total Amount', 'Payment Method', 'Payment Status', 'Plan Type', 'Start Date', 'End Date', 'Assigned Sales', 'Created By', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.cus_name,
            rowData.cus_email,
            rowData.plan_name,
            rowData.add_emp_count,
            rowData.total_plan_amt,
            rowData.payment_methodname,
            rowData.payment_statusname,
            rowData.plan_period,
            rowData.start_date,
            rowData.end_date,
            rowData.assign_member_name,
            rowData.created_name,
            rowData.updated_name,
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
                fileName: 'Buy_Pack_List',
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
                                    <Text style={[styles.header, styles.cell, styles.sno, { textAlign: 'center' }]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>E-mail</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Plan Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Add on Employee</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Total Amount</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Payment Method</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Payment Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Plan Type</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status1]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Assigned Sales</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Created By</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Updated By</Text>
                                    <Text style={[styles.header, styles.cell, styles.Stat, { textAlign: 'center' }]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno, { textAlign: 'center' }]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.cus_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.cus_email}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.plan_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.add_emp_count}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.total_plan_amt}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.payment_methodname}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.payment_statusname}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.plan_period}</Text>
                                            <Text style={[styles.cell, styles.Status1]}>{item.start_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.end_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.assign_member_name}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.updated_name}</Text>
                                            {item.payment_statusname !== "Paid" ? <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontentviewbutton}
                                                    onPress={() => navigation.navigate('View BuyInvoicePreSales Invoice', { Id: item })}
                                                >
                                                    <ViewIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => navigation.navigate('Edit Pre Buy Pack List', { Id: item })}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View> :
                                                <View style={styles.listcontentButtonview}>
                                                    <TouchableOpacity style={styles.listcontentviewbutton}
                                                        onPress={() => navigation.navigate('View BuyInvoicePreSales Invoice', { Id: item })}
                                                    >
                                                        <ViewIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>
                                                    <View>
                                                    </View>
                                                </View>
                                            }
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

            </View>
        </ScrollView>
    )
}

export default PreBuyPacklist;