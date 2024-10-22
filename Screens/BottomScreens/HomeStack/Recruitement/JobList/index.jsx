import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
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

const JobList = ({ navigation }) => {

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

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/post_job_list/${selectedStatus}`;
            console.log(apiUrl, "apiUrl")
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;

            if (!responseData) {
                setDatalist([]);
            } else {
                setDatalist(responseData);
            }
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [selectedStatus])
    );

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Designation', 'No.of Vacancies', 'Employee Type', 'Location', 'Job Status', 'Created At'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.designation,
            rowData.no_of_vacancies,
            rowData.emp_type,
            rowData.city_names.join(', '),
            rowData.job_status,
            rowData.created_at,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Job_List.xlsx';

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
        const tableHead = ['S.No', 'Designation', 'No.of Vacancies', 'Employee Type', 'Location', 'Job Status', 'Created At'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.designation,
            rowData.no_of_vacancies,
            rowData.emp_type,
            rowData.city_names.join(', '),
            rowData.job_status,
            rowData.created_at,
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
                fileName: 'Job_List',
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

                <View style={styles.ActiveInactiveContainer}>

                    <Text style={{ fontWeight: '600', fontSize: 16, lineHeight: 21.28 }}>Job Status :</Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus}</Text>
                        <DropdownIcon width={14} height={14} color={"#1AD0FF"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdown && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("All")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>All</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

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
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Designation</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>No.of Vacancies</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Employee Type</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Location</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Job Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Created At</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.designation}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.no_of_vacancies}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.emp_type}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.city_names.join(', ')}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.job_status}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.created_at}</Text>
                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity style={styles.listcontenteditbutton}
                                                    onPress={() => navigation.navigate('Edit Post Job', { Id: item })}
                                                >
                                                    <EditIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.listcontentviewbutton}
                                                    onPress={() => navigation.navigate('View List Job', { Id: item })}
                                                >
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

export default JobList;