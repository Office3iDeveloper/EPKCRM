import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useFocusEffect } from "@react-navigation/native";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const PayslipList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('Active');
    const [showDropdown, setShowDropdown] = useState(false);

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
            const apiUrl = `https://epkgroup.in/crm/api/public/api/view_activeinactiveList/${selectedStatus}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDatalist(responseData);
            setLoadData(false)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [selectedStatus])
    );

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Employee Name'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
        ]);


        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Employee_Confirmation.xlsx';

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
        const tableHead = ['S.No', 'Employee Name'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.emp_name,
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
                fileName: 'Employee_Confirmation',
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

            <View style={styles.ActiveInactiveContainer}>

                <Text style={{ fontWeight: '600', fontSize: 16, lineHeight: 21.28 }}>Status :</Text>

                <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>{selectedStatus}</Text>
                    <DropdownIcon width={14} height={14} color={"#1AD0FF"} />

                </TouchableOpacity>

                {/* Dropdown to show the options */}

                {showDropdown && (

                    <View style={styles.dropdown}>

                        <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>Active</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>In-Active</Text>
                        </TouchableOpacity>

                    </View>

                )}

            </View>

            <ScrollView>

                <View style={styles.Tablecontainer}>
                    {loadData ? (
                        <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                    ) : (
                        <View>
                            <View style={styles.listHeader1}>
                                <Text style={styles.sno1}>S.No</Text>
                                <Text style={styles.shift1}>Employee Name</Text>
                                <Text style={styles.Action1}>Action</Text>
                            </View>

                            {paginatedData.length === 0 ? (
                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                            ) : (
                                paginatedData.map((slot, index) => (
                                    <View style={styles.listcontent} key={index}>
                                        <Text style={styles.listcontentsno}>{index + 1}</Text>
                                        <Text style={styles.listcontentShift}>{slot.emp_name}</Text>

                                        <View style={styles.listcontentButtonview1}>
                                            <TouchableOpacity style={styles.listcontenteditbutton} onPress={() => navigation.navigate('Payslip', { Id: slot })}>
                                                <ViewIcon width={14} height={14} color={"#000"} />
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

    )
}

export default PayslipList;