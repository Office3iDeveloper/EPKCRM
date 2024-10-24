import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, Image, Platform, Button } from "react-native";
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
import EditIcon from "../../../../../Assets/Icons/Edit.svg";

const AttendanceRequest = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedStartDate = formatDate(startDate);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    console.log(datalist, "datalist")
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
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/get_dailyAttendanceList';
            const response = await axios.post(apiUrl, {
                roleid: data.userrole,
                loginempid: data.userempid,
                dailydate: formattedStartDate
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
    }, [formattedStartDate])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Employee Name', 'Date', 'In Time', 'Out Time', 'P/A/L/HL', 'LA', 'PR', 'OT', 'Total Hours'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.first_name || '-',
            rowData.checkin_date || '-',
            rowData.checkin_time || '-',
            rowData.checkout_time || '-',
            rowData.emp_present || '-',
            rowData.emp_late || '-',
            rowData.emp_permission || '-',
            rowData.emp_onduty || '-',
            rowData.checkout_total_hours || '-',
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Dailyattendance_list.xlsx';

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
        const tableHead = ['S.No', 'Employee Name', 'Date', 'In Time', 'Out Time', 'P/A/L/HL', 'LA', 'PR', 'OT', 'Total Hours'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.first_name || '-',
            rowData.checkin_date || '-',
            rowData.checkin_time || '-',
            rowData.checkout_time || '-',
            rowData.emp_present || '-',
            rowData.emp_late || '-',
            rowData.emp_permission || '-',
            rowData.emp_onduty || '-',
            rowData.checkout_total_hours || '-',
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
                fileName: 'Dailyattendance_list',
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

                <View style={styles.inputs} >
                    <Text onPress={showDatepicker}>
                        {formattedStartDate} &nbsp;
                    </Text>
                    {/* {showDatePicker && (
                        <DateTimePicker
                            value={startDate}
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

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Employee Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>In Time</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Out Time</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>P/A/L/HL</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>LA</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>PR</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>OT</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Total Hours</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status1]}>Image</Text>
                                    {(data.userrole == 1) ? <Text style={[styles.header, styles.cell, styles.Status]}>Action</Text> : null}
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.first_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.checkin_date}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.checkin_time}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.checkout_time}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.emp_present}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.emp_late}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.emp_permission}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.emp_onduty}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.checkout_total_hours}</Text>
                                            {/* <Text style={[styles.header, styles.cell, styles.Status1]}>Image</Text> */}
                                            <View style={styles.profileview}>
                                                <View style={styles.imageview}>
                                                    <Image
                                                        source={{ uri: `https://epkgroup.in/crm/api/storage/app/${item.user_img}` }}
                                                        style={styles.imageStyle}
                                                    />
                                                </View>
                                            </View>
                                            {(data.userrole == 1 && item.checkin_date != null) ? <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => navigation.navigate('Edit Daily Attendance', { Id: item })}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View> :
                                                <View style={styles.listcontentButtonview}>
                                                    <View style={styles.listcontenteditbutton1}
                                                    >
                                                        <EditIcon width={14} height={14} color={"#000"} />
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

export default AttendanceRequest;