import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, Button } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import styles from "../DailyAttendance/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform } from "react-native";

const MonthlyList = ({ navigation }) => {

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

    // const [showDatePicker1, setShowDatePicker1] = useState(false);
    // const [endDate, setEndDate] = useState(new Date());

    // const handleDateChange1 = (event, date) => {
    //     if (date !== undefined) {
    //         setEndDate(date);
    //     }
    //     setShowDatePicker1(Platform.OS === 'ios');
    // };

    // const showDatepicker1 = () => {
    //     setShowDatePicker1(true);
    // };

    // const [showDatePicker2, setShowDatePicker2] = useState(false);
    // const [returnDate, setreturnDate] = useState(new Date());

    // const handleDateChange2 = (event, date) => {
    //     if (date !== undefined) {
    //         setreturnDate(date);
    //     }
    //     setShowDatePicker2(Platform.OS === 'ios');
    // };

    // const showDatepicker2 = () => {
    //     setShowDatePicker2(true);
    // };

    // const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;
    // const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    // const formattedReturnDate = `${returnDate.getFullYear()}-${returnDate.getMonth() + 1}-${returnDate.getDate()}`;

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
            const apiUrl = 'https://epkgroup.in/crm/api/public/api/get_allmonthlyAttendanceList';
            const payload = {
                roleid: data.userrole,
                loginempid: data.userempid,
                yearmonth: formattedStartDate
            };

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            setLoadData(false);

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
        const tableHead = ['S.No', 'Employee Name', ...allKeys];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.Name,
            ...allKeys.map(day => rowData[day] || '')
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Monthly_list.xlsx';

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
        const tableHead = ['S.No', 'Employee Name', ...allKeys];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.Name,
            ...allKeys.map(day => rowData[day] || '')
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
                fileName: 'Monthly_list',
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


    // 

    const allKeys = paginatedData.reduce((keys, record) => {
        Object.keys(record).forEach(key => {
            if (!keys.includes(key) && key !== "Name" && key !== "id" && key !== "emp_status") {
                keys.push(key);
            }
        });
        return keys;
    }, []).sort((a, b) => a - b);

    // 

    const [EdocFile, setEdocFile] = useState([]);
    const [EditedocFile, seteditedocFile] = useState([]);

    // Api call For EditButton

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };



    // 

    // const [modalVisible, setModalVisible] = useState(false);
    // const [ReasonError, setReasonError] = useState('')
    // const [Reason, setReason] = useState('');
    // const [DelData, setDelData] = useState(false);

    // const HandleLeave = () => {
    //     setModalVisible(true);
    // }

    // const cancelDelete = () => {
    //     setModalVisible(false);
    // }

    // const Confirm = async () => {

    //     setDelData(true)

    //     const formData = new FormData();

    //     formData.append('emp_id', data.userempid);
    //     formData.append('emp_name', data.username);
    //     formData.append('request_type', selectedleaveTypeId);
    //     formData.append('request_category', selectedCategoryId);
    //     formData.append('from_date', formattedEndDate);
    //     formData.append('to_date', formattedReturnDate);
    //     formData.append('permission_date', "");
    //     formData.append('permission_timefrom', "");
    //     formData.append('permission_timeto', "");
    //     formData.append('shift_slot', "1");
    //     formData.append('leave_reason', Reason);

    //     if (EdocFile.length > 0) {
    //         EdocFile.map((file, index) => {
    //             formData.append(`attachement`, {
    //                 uri: file.uri,
    //                 name: file.name,
    //                 type: 'image/jpeg',
    //             });
    //         });
    //     } else {
    //         formData.append('attachement', EdocFile);
    //     }

    //     try {
    //         const response = await fetch('https://epkgroup.in/crm/api/public/api/add_employee_leave_request', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${data.token}`
    //             },
    //             body: formData,
    //         });

    //         const responsedata = await response.json();

    //         if (responsedata.status === "success") {
    //             Alert.alert('Successfull', responsedata.message);
    //             setDelData(false)
    //         } else {
    //             Alert.alert('Failed', responsedata.message)
    //             setDelData(false)
    //         }

    //     } catch (error) {
    //         Alert.alert('Error');
    //         setDelData(false)
    //     }

    //     setModalVisible(false);

    // }

    return (

        <ScrollView>

            <View style={styles.Container}>

                <View style={styles.AgentaView}>

                    <View style={styles.top}>
                        <Text style={[styles.Agenta, { color: '#404040' }]}>P - Present</Text>
                        <Text style={[styles.Agenta, { color: '#FB5A00' }]}>LA - Late</Text>
                        <Text style={[styles.Agenta, { color: '#9BB500' }]}>PR - Permission</Text>
                        <Text style={[styles.Agenta, { color: '#6B057B' }]}>HL - Half Day</Text>
                        <Text style={[styles.Agenta1, { color: '#404040' }]}>OT - Over Time</Text>
                    </View>

                    <View >
                        <Text style={[styles.Agenta, { color: '#C20076' }]}>AB - Absent</Text>
                        <Text style={[styles.Agenta, { color: '#C0000C' }]}>L - Leave</Text>
                        <Text style={[styles.Agenta, { color: '#5E20C8' }]}>W - Week Off</Text>
                        <Text style={[styles.Agenta, { color: '#028A00' }]}>H - Holiday</Text>

                    </View>

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

                {(data.userrole == 1) ? null : <View style={styles.RequestContainer}>
                    <TouchableOpacity style={styles.RaiseButton} onPress={() => navigation.navigate('Employee Leave Request')}>
                        <Text style={styles.RaiseText}>
                            Leave
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.RaiseButton} onPress={() => navigation.navigate('Employee Attendance Request')}>
                        <Text style={styles.RaiseText}>
                            Attendance
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.RaiseButton} onPress={() => navigation.navigate('Employee Overtime Request')}>
                        <Text style={styles.RaiseText}>
                            Overtime
                        </Text>
                    </TouchableOpacity>
                </View>}

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
                                    {allKeys.map((day, index) => (
                                        <Text key={index} style={[styles.header, styles.cell, styles.DepartmentName]}>{day}</Text>
                                    ))}
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <TouchableOpacity key={index} style={[styles.row, styles.listBody]} onPress={() => navigation.navigate('Indvidual', {
                                            Id: item.id,
                                        })}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.Name}</Text>
                                            {allKeys.map((day, index) => (
                                                <View key={index} style={{
                                                    backgroundColor: item[day] === "HL" ? "#6B057B" :
                                                        item[day] === "LA" ? "#FB5A00" :
                                                            item[day] === "PR" ? "#9BB500" :
                                                                item[day] === "AB" ? "#C20076" :
                                                                    item[day] === "L" ? "#C0000C" :
                                                                        null,
                                                    borderRadius: 25,
                                                    width: 150,
                                                    height: 50,
                                                    borderWidth: 5,
                                                    borderColor: '#fff',
                                                }}>
                                                    <Text style={[styles.cell, {
                                                        color: item[day] === "HL" ? "#fff" :
                                                            item[day] === "LA" ? "#fff" :
                                                                item[day] === "L" ? "#fff" :
                                                                    item[day] === "PR" ? "#fff" :
                                                                        item[day] === "W" ? "#5E20C8" :
                                                                            item[day] === "P" ? "#404040" :
                                                                                item[day] === "H" ? "#028A00" :
                                                                                    null,
                                                        textAlign: 'center'
                                                    }]}>
                                                        {item[day]}
                                                    </Text>
                                                </View>
                                            ))}
                                        </TouchableOpacity>
                                    ))
                                )
                                }

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>

                            <Text style={styles.modalTextHeading}>Leave Request</Text>

                            <Text style={styles.modalText}>Request Type</Text>

                            <TouchableOpacity style={styles.modalInput} onPress={() => setShowleaveTypeDropdown(!showleaveTypeDropdown)}>
                                <Text>{selectedleaveType ? selectedleaveType : 'Select Leave Type'}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />
                            </TouchableOpacity>

                            {showleaveTypeDropdown && (
                                <View style={styles.dropdown}>
                                    {leaveTypeDropdown.map((department, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownOption,
                                                selectedleaveType === department.leave_type_name && styles.selectedOption
                                            ]}
                                            onPress={() => handleSelectLeave(department)}
                                        >
                                            <Text style={styles.dropdownOptionText}>{department.leave_type_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            <Text style={styles.errorTextDelete}>
                                { }
                            </Text>

                            <Text style={styles.modalText}>Category</Text>

                            <TouchableOpacity
                                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                style={styles.modalInput}>

                                <Text style={styles.StatusTouchableText}>
                                    {selectedCategory ? selectedCategory : 'Select Category'}
                                </Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {showCategoryDropdown && (
                                <View style={styles.dropdown}>
                                    <ScrollView>
                                        {CategoryDropdown.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.dropdownOption}
                                                onPress={() => handleSelectCategory(item)}
                                            >
                                                <Text>{item.leave_category_name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            <Text style={styles.errorTextDelete}>
                                { }
                            </Text>

                            <View style={styles.DoubleInputs}>

                                <View style={styles.shortInputs}>

                                    <Text style={styles.Text}>
                                        From Date
                                    </Text>

                                    <View style={styles.input}>
                                        <Text onPress={showDatepicker1}>
                                            {endDate.toDateString()} &nbsp;
                                        </Text>
                                        {showDatePicker1 && (
                                            <DateTimePicker
                                                value={endDate}
                                                mode="date"
                                                display="default"
                                                onChange={handleDateChange1}
                                            />
                                        )}
                                    </View>

                                </View>

                                <View style={styles.shortInputs}>

                                    <Text style={styles.Text}>
                                        To Date
                                    </Text>

                                    <View style={styles.input}>
                                        <Text onPress={showDatepicker2}>
                                            {returnDate.toDateString()} &nbsp;
                                        </Text>
                                        {showDatePicker2 && (
                                            <DateTimePicker
                                                value={returnDate}
                                                mode="date"
                                                display="default"
                                                onChange={handleDateChange2}
                                            />
                                        )}
                                    </View>

                                </View>

                            </View>

                            <Text style={styles.errorTextDelete}>
                                { }
                            </Text>

                            <Text style={styles.modalText}>Attachment</Text>

                            <Text
                                style={styles.MDocFileName}
                            >
                                {EdocFile ? EdocFile[0]?.name : EdocFile}
                            </Text>

                            <View style={styles.MfullWidth}>
                                <TouchableOpacity style={styles.UploadButton}
                                    onPress={handleEditDocumentSelection}
                                >
                                    <Text style={styles.UploadButtonText}>
                                        Choose File
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.errorTextDelete}>
                                { }
                            </Text>

                            <Text style={styles.modalText}>Reason</Text>

                            <TextInput
                                value={Reason}
                                onChangeText={(text) => setReason(text)}
                                style={styles.Reason}
                            />

                            <Text style={styles.errorTextDelete}>
                                {ReasonError}
                            </Text>

                            <View style={styles.modalButtonContainer}>

                                <TouchableOpacity style={styles.modalDeleteButton}
                                    onPress={Confirm}
                                >

                                    {
                                        DelData ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalDeleteButtonText}>Submit</Text>
                                    }


                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCancelButton} onPress={cancelDelete}>
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>
                </Modal> */}

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

export default MonthlyList;
