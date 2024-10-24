import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, Linking } from "react-native";
import SearchIcon from "../../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import ViewIcon from "../../../../../../Assets/Icons/eyeopen.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../../Lead/EnquiryList/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const SalesLeadList = ({ navigation }) => {

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

    const renderPagination = () => {
        const pagination = [];
        const showEllipsis = totalPages > 5;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else {
            pagination.push(1);
            if (currentPage > 3) {
                pagination.push('...');
            }
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pagination.push(i);
            }
            if (currentPage < totalPages - 2) {
                pagination.push('...');
            }
            pagination.push(totalPages); // Always show the last page
        }

        return pagination.map((page, index) => (
            typeof page === 'number' ? (
                <Text
                    key={index}
                    style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                    onPress={() => onPageChange(page)}
                >
                    {page}
                </Text>
            ) : (
                <Text key={index} style={styles.pageNo}>...</Text>
            )
        ));
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/sale_leadlist';
            const response = await axios.post(apiUrl, {
                e_id: data.userempid,
                role_id: data.userrole
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

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Lead Date', 'Lead Id', 'Product Type', 'Product Name', 'Name', 'Phone No', 'Email', 'Status', 'Posted By', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.user_leaddate,
            rowData.lead_id,
            rowData.product_type,
            rowData.product_name,
            rowData.user_name,
            rowData.user_mobile,
            rowData.user_email,
            rowData.final_status,
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
            const fileUri = RNFS.CachesDirectoryPath + '/Lead_List.xlsx';

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
        const tableHead = ['S.No', 'Lead Date', 'Lead Id', 'Product Type', 'Product Name', 'Name', 'Phone No', 'Email', 'Status', 'Posted By', 'Updated By'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.user_leaddate,
            rowData.lead_id,
            rowData.product_type,
            rowData.product_name,
            rowData.user_name,
            rowData.user_mobile,
            rowData.user_email,
            rowData.final_status,
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
                fileName: 'Lead_List',
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

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Lead Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Lead Id</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Product Type</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Product Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Phone No</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Email</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Posted By</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Updated By</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.user_leaddate}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.lead_id}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.product_type}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.product_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.user_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.user_mobile}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.user_email}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.final_status}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.updated_name}</Text>
                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity
                                                    // onPress={() => handlePreview(item.consultfee_document)}
                                                    onPress={() => navigation.navigate('Sales View Lead', { Id: item })}
                                                    style={styles.listcontentviewbutton}>
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
                        <TouchableOpacity
                            style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>Prev</Text>
                        </TouchableOpacity>
                        {renderPagination()}
                        <TouchableOpacity
                            style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>Next</Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default SalesLeadList;