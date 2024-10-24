import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import TickIcon from '../../../../../Assets/Icons/Tick.svg';
import CloseIcon from '../../../../../Assets/Icons/Close.svg';
import styles from "../HalfDayRequest/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


const TLLeaveRequest = () => {

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
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/tl_leaverequest_list';
            const response = await axios.post(apiUrl, {
                supervisor_empid: data.userempid,
                role_id: data.userrole,
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

    useEffect(() => {
        fetchData();
    }, [])

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Name', 'Department', 'Category', 'Shift Slot', 'From Date', 'To Date', 'Reason', 'status'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
            rowData.departmentName,
            rowData.category_name,
            rowData.shift_slot,
            rowData.from_date,
            rowData.to_date,
            rowData.leave_reason,
            rowData.emp_status,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/TLleave_request_list.xlsx';

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
        const tableHead = ['S.No', 'Name', 'Department', 'Category', 'Shift Slot', 'From Date', 'To Date', 'Reason', 'status'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
            rowData.departmentName,
            rowData.category_name,
            rowData.shift_slot,
            rowData.from_date,
            rowData.to_date,
            rowData.leave_reason,
            rowData.emp_status,
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
                fileName: 'TLleave_request_list',
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

    const HandleConfirm = async (item) => {

        try {

            const apiUrl = `https://epkgroup.in/crm/api/public/api/tl_approval_leave_request`;

            const response = await axios.post(apiUrl, {
                id: item.id,
                e_id: item.emp_id,
                tl_id: data.userempid,
                request_fromdate: item.from_date,
                request_todate: item.to_date,
                tlstatus: "Approved",
                slot_id: item.slot_id,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                fetchData();
            } else {
                console.log("error")
            }

        } catch (error) {
            console.log(error)
        }

    }

    const HandleCancel = async (item) => {
        try {

            const apiUrl = `https://epkgroup.in/crm/api/public/api/tl_approval_leave_request`;

            const response = await axios.post(apiUrl, {
                id: item.id,
                e_id: item.emp_id,
                tl_id: data.userempid,
                request_fromdate: item.from_date,
                request_todate: item.to_date,
                tlstatus: "Rejected",
                slot_id: item.slot_id,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                fetchData();
            } else {
                console.log("error")
            }

        } catch (error) {
            console.log(error)
        }
    }

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
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Department</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Category</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Shift Slot</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>From Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>To Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Reason</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>HR Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.emp_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.departmentName}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.category_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.shift_slot}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.from_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.to_date}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.leave_reason}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.emp_status}</Text>
                                            {
                                                item.tl_status === null ?
                                                    <View style={styles.listcontentButtonview}>
                                                        <TouchableOpacity style={styles.listcontenteditbutton}
                                                            onPress={() => HandleConfirm(item)}
                                                        >
                                                            <TickIcon width={14} height={14} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.listcontentdelbutton}
                                                            onPress={() => HandleCancel(item)}
                                                        >
                                                            <CloseIcon width={14} height={14} />
                                                        </TouchableOpacity>
                                                    </View> :
                                                    <Text style={[styles.cell, styles.Status]}>{item.tl_status}</Text>
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

export default TLLeaveRequest;