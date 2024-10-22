import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddSalesInvoice/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditSalesInvoice = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    const { data } = useSelector((state) => state.login);

    // 

    const [invoiceData, setInvoiceData] = useState('');
    const [invoiceItem, setInvoiceItem] = useState([]);

    const getApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/editview_saleinvoice/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setInvoiceData(responseData.involicedata || {});
            setInvoiceItem(Array.isArray(responseData.invoiceitem) ? responseData.invoiceitem : []);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [SpecId])

    // state

    const [items, setItems] = useState([{
        descriptionalGoodsId: '',
        descriptionalGoods: '',
        hsnSac: '',
        hsnSacId: '',
        quantity: '',
        rate: '',
        per: '',
        amount: '',
        editable: false
    }]);

    const addContainer = () => {

        setItems([...items, {
            descriptionalGoodsId: '',
            descriptionalGoods: '',
            hsnSac: '',
            hsnSacId: '',
            quantity: '',
            rate: '',
            per: '',
            amount: '',
            editable: false
        }]);
    };

    const removeContainer = () => {
        if (items.length > 1) {
            setItems(items.slice(0, -1));
        }
    };

    // 

    const [CGST, setCGST] = useState('0');
    const [SGST, setSGST] = useState('0');
    const [IGST, setIGST] = useState('0');

    const [GSTErr, setGSTErr] = useState('');

    const [totalValueAmount, setTotalValueAmount] = useState('0');
    const [CGSTAmount, setCGSTAmount] = useState('0');
    const [SGSTAmount, setSGSTAmount] = useState('0');
    const [IGSTAmount, setIGSTAmount] = useState('0');
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState('0');
    const [roundOff, setRoundoff] = useState('0');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const total = items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
        setTotalValueAmount(total.toFixed(2));
    }, [items]);

    useEffect(() => {
        const totalAmount = parseFloat(totalValueAmount) || 0;
        const cgstPercentage = parseFloat(CGST) || 0;
        const sgstPercentage = parseFloat(SGST) || 0;
        const igstPercentage = parseFloat(IGST) || 0;

        const cgstAmount = (totalAmount * cgstPercentage) / 100;
        const sgstAmount = (totalAmount * sgstPercentage) / 100;
        const igstAmount = (totalAmount * igstPercentage) / 100;

        setCGSTAmount(cgstAmount.toFixed(2));
        setSGSTAmount(sgstAmount.toFixed(2));
        setIGSTAmount(igstAmount.toFixed(2));
    }, [totalValueAmount, CGST, SGST, IGST]);

    useEffect(() => {
        const totalAmount = parseFloat(totalValueAmount) || 0;
        const cgstAmount = parseFloat(CGSTAmount) || 0;
        const sgstAmount = parseFloat(SGSTAmount) || 0;
        const igstAmount = parseFloat(IGSTAmount) || 0;

        const invoiceTotal = totalAmount + cgstAmount + sgstAmount + igstAmount;
        setTotalInvoiceAmount(invoiceTotal.toFixed(2));
    }, [totalValueAmount, CGSTAmount, SGSTAmount, IGSTAmount]);

    useEffect(() => {
        const roundedAmount = Math.round(parseFloat(totalInvoiceAmount) || 0);
        setRoundoff(roundedAmount.toFixed(2));
    }, [totalInvoiceAmount]);


    const [invNumberErr, setInvNumberErr] = useState('');
    const [reasonErr, setReasonErr] = useState('');

    // 

    const [descriptional, setDescriptional] = useState([]);
    const [showDropdownDescriptional, setShowDropdownDescriptional] = useState(false);
    const [selectedDescriptional, setSelectedDescriptional] = useState('');
    const [selectedDescriptionalErr, setSelectedDescriptionalErr] = useState();
    const [selectedDescriptionalId, setSelectedDescriptionalId] = useState(null);

    const toggleDropdownDescriptional = () => {
        setShowDropdownDescriptional(!showDropdownDescriptional);
    }

    const selectDescriptional = (index, File) => {
        setItems(prevItems => {
            const updatedItems = [...prevItems];
            if (updatedItems[index]) {
                updatedItems[index].descriptionalGoods = File.good_service_name;
                updatedItems[index].descriptionalGoodsId = File.id;
                updatedItems[index].editable = true;
                setShowDropdownDescriptional(false);

            }
            return updatedItems;
        });
        setSelectedDescriptional(File.good_service_name);
    };


    const DescriptionalApi = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/sales_item_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDescriptional(responseData);

        } catch (error) {
            console.error('Error fetching Descriptional data:', error);
        }

    }

    useEffect(() => {
        DescriptionalApi();
    }, [])


    const HsnApi = async (index, descriptionalGoodsId) => {
        try {
            const apiUrl = `https://office3i.com/development/api/public/api/sales_hsn_sac/${descriptionalGoodsId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            console.log(responseData, "responseData");

            // Update the specific item in items state

            if (responseData) {
                setItems(prevItems => {
                    const updatedItems = [...prevItems];
                    if (updatedItems[index]) {
                        updatedItems[index].hsnSac = responseData.hsn_sac;
                    }
                    return updatedItems;
                });
            }


        } catch (error) {
            console.error('Error fetching HSN data:', error);
        }
    };

    const prevDescriptionalGoodsIdsRef = useRef([]);

    useEffect(() => {
        const prevDescriptionalGoodsIds = prevDescriptionalGoodsIdsRef.current;
        const currentDescriptionalGoodsIds = items.map(item => item.descriptionalGoodsId);

        // Check for changes in descriptionalGoodsId
        const hasChanged = currentDescriptionalGoodsIds.some((id, index) => id !== prevDescriptionalGoodsIds[index]);

        if (hasChanged) {
            items.forEach((item, index) => {
                if (item.descriptionalGoodsId) {
                    HsnApi(index, item.descriptionalGoodsId);
                }
            });
        }

        // Update the ref with the latest descriptionalGoodsId values
        prevDescriptionalGoodsIdsRef.current = currentDescriptionalGoodsIds;
    }, [items]);

    const handleChange = (index, field, value) => {
        const updatedItems = [...items];
        if (updatedItems[index]) {
            updatedItems[index][field] = value;
            setItems(updatedItems);
        } else {
            console.error("Item at index not found");
        }
    };

    // 

    const [invoiceNumber, setInvoiceNumber] = useState('');

    // const InvoiceNumberApi = async () => {

    //     try {
    //         const apiUrl = 'https://office3i.com/development/api/public/api/autogeneratesaleinvoiceid';
    //         const response = await axios.get(apiUrl, {
    //             headers: {
    //                 Authorization: `Bearer ${data.token}`
    //             }
    //         });

    //         const responseData = response.data.data;
    //         setInvoiceNumber(responseData);

    //     } catch (error) {
    //         console.error('Error fetching Invoice Number data:', error);
    //     }

    // }

    // useEffect(() => {
    //     InvoiceNumberApi();
    // }, [])

    // 

    const [showDropdownStatus, setShowDropdownStatus] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);

    const toggleDropdownStatus = () => {
        setShowDropdownStatus(!showDropdownStatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownStatus(false);
    };

    //  

    const [showDropdownPayStatus, setShowDropdownPayStatus] = useState(false);
    const [payStatusError, setPayStatusError] = useState('');
    const [selectedPayStatus, setSelectedPayStatus] = useState(null);

    const toggleDropdownPayStatus = () => {
        setShowDropdownPayStatus(!showDropdownPayStatus);
    };

    const selectPayStatus = (status) => {
        setSelectedPayStatus(status);
        setShowDropdownPayStatus(false);
    };

    //  

    const [showDropdownPayMethod, setShowDropdownPayMethod] = useState(false);
    const [payMethodError, setPayMethodError] = useState('');
    const [selectedPayMethod, setSelectedPayMethod] = useState(null);

    const toggleDropdownPayMethod = () => {
        setShowDropdownPayMethod(!showDropdownPayMethod);
    };

    const selectPayMethod = (status) => {
        setSelectedPayMethod(status);
        setShowDropdownPayMethod(false);
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

    // company list

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState();
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [documentList1, setDocumentList1] = useState([]);
    const [selectedDocument1, setSelectedDocument1] = useState([]);
    const [selectedDocumentErr1, setSelectedDocumentErr1] = useState();
    const [selectedDocumentId1, setSelectedDocumentId1] = useState(null);

    const filteredDocumentList1 = documentList1.filter(File => File.id !== selectedDocumentId);

    const CompanyApi = async () => {

        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/sales_company_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList(responseData);
            setDocumentList1(responseData);

        } catch (error) {
            console.error('Error fetching companyList data:', error);
        }

    }

    const selectDocument = (File) => {
        setSelectedDocument(File.company_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const selectDocument1 = (File) => {
        setSelectedDocument1(File.company_name);
        setSelectedDocumentId1(File.id);
        setShowDropdown1(false);
    };

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    }

    useEffect(() => {
        CompanyApi();
    }, [])

    // 

    const validateFields = () => {
        let isValid = true;

        if (selectedDocument.length == 0) {
            setSelectedDocumentErr('Select Vendor Name')
            isValid = false;
        } else {
            setSelectedDocumentErr('');
        }

        if (selectedDocument1.length == 0) {
            setSelectedDocumentErr1('Select Ship To');
            isValid = false;
        } else {
            setSelectedDocumentErr1('');
        }

        if (!startDate) {
            setStartDateErr('Date Required');
            isValid = false;
        } else {
            setStartDateErr('');
        }

        if (!CGST && !SGST && !IGST) {
            setGSTErr('At least one of CGST, SGST, or IGST Percentage is required.')
            isValid = false;
        } else {
            setGSTErr('');
        }

        if (!selectedDescriptional) {
            setSelectedDescriptionalErr('At least one Descriptional Goods is required.')
        } else {
            setSelectedDescriptionalErr('');
        }

        if (!reason) {
            setReasonErr('Reason Required');
            isValid = false;
        } else {
            setReasonErr('');
        }

        if (!selectedPayMethod) {
            setPayMethodError('Payment Method required.');
            isValid = false;
        } else {
            setPayMethodError('');
        }

        if (!selectedPayStatus) {
            setPayStatusError('Payment Status required.');
            isValid = false;
        } else {
            setPayStatusError('');
        }

        if (!selectedStatus) {
            setStatusError('Status required.');
            isValid = false;
        } else {
            setStatusError('');
        }

        return isValid;
    };

    const [load, SetLoad] = useState(false);

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            SetLoad(false);
            return;
        }

        const formData = new FormData();

        try {
            formData.append('id', SpecId);
            formData.append('company_from', selectedDocumentId);
            formData.append('company_to', selectedDocumentId1);
            formData.append('date', formattedStartDate);
            formData.append('igst_percentage', IGST);
            formData.append('cgst_percentage', CGST);
            formData.append('sgst_percentage', SGST);
            formData.append('roundedoff', roundOff);
            formData.append('output_igst_amount', IGSTAmount);
            formData.append('output_cgst_amount', CGSTAmount);
            formData.append('output_sgst_amount', SGSTAmount);
            formData.append('item_value_amount', totalValueAmount);
            formData.append('overall_amount', totalInvoiceAmount);
            formData.append('payment_method', selectedPayMethod);
            formData.append('payment_status', selectedPayStatus);
            formData.append('payment_reason', reason);
            formData.append('status', selectedStatus);

            items.forEach((item, index) => {
                formData.append('item_id[]', item.descriptionalGoodsId);
                formData.append('quantity[]', item.quantity);
                formData.append('rate[]', item.rate);
                formData.append('per[]', item.per);
                formData.append('amount[]', item.amount || 0);
            });

            formData.append('updated_by', data.userrole);


            const response = await fetch('https://office3i.com/development/api/public/api/update_saleinvoice', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responseData = await response.json();

            console.log(responseData, "appended")

            if (responseData.status === "success") {
                handleShowAlert(responseData.message);
                SetLoad(false);
                refresh();
            } else {
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const refresh = () => {
        navigation.goBack();
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Sales Invoice List');
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

    useEffect(() => {
        setSelectedDocument(invoiceData.from_companyname);
        setSelectedDocument1(invoiceData.to_companyname);
        setSelectedDocumentId(invoiceData.company_from);
        setSelectedDocumentId1(invoiceData.company_to);
        setInvoiceNumber(invoiceData.sales_invoice_number);
        setStartDate(new Date(invoiceData.date));
        setCGST(invoiceData.cgst_percentage);
        setSGST(invoiceData.sgst_percentage);
        setIGST(invoiceData.igst_percentage);
        setSelectedPayMethod(invoiceData.payment_method);
        setSelectedPayStatus(invoiceData.payment_status);
        setReason(invoiceData.payment_reason);
        setSelectedStatus(invoiceData.status);
        setRoundoff(invoiceData.roundedoff);
        setTotalInvoiceAmount(invoiceData.overall_amount);
        setSGSTAmount(invoiceData.output_sgst_amount);
        setCGSTAmount(invoiceData.output_cgst_amount);
        setIGSTAmount(invoiceData.output_igst_amount);
        setTotalValueAmount(invoiceData.item_value_amount);
    }, [invoiceData]);

    useEffect(() => {
        if (Array.isArray(invoiceItem)) {
            const transformedItems = invoiceItem.map(item => ({
                descriptionalGoodsId: item.item_id,
                descriptionalGoods: item.good_service_name,
                hsnSac: item.hsn_sac,
                hsnSacId: '',
                quantity: item.quantity,
                rate: item.rate,
                per: item.per,
                amount: item.amount,
                editable: false
            }));

            setItems(transformedItems);
        } else {
            console.error('invoiceItem is not an array:', invoiceItem);
            setItems([]);
        }
    }, [invoiceItem]);

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Sales Invoice</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        From Company
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Company"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {documentList.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        To Company
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Select Company"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown1 && (
                        <View style={styles.dropdown}>
                            {filteredDocumentList1.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument1(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr1}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Invoice Number
                    </Text>

                    <TextInput
                        value={invoiceNumber}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        CGST Percentage
                    </Text>

                    <TextInput
                        value={CGST}
                        onChangeText={(txt) => setCGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        {GSTErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        SGST Percentage
                    </Text>

                    <TextInput
                        value={SGST}
                        onChangeText={(txt) => setSGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        IGST Percentage
                    </Text>

                    <TextInput
                        value={IGST}
                        onChangeText={(txt) => setIGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                </View>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}></Text>
                </View>

                {items.map((item, index) => (
                    <View key={index} style={[styles.Inputcontainer, { marginBottom: index === items.length - 1 ? 0 : '10%' }]}>
                        <Text style={styles.StatDateText}>Descriptional Goods</Text>

                        <TouchableOpacity onPress={() => toggleDropdownDescriptional(index)} style={styles.StatusTouchable}>
                            <Text style={styles.StatusTouchableText}>
                                {item.descriptionalGoods || "Select Descriptional Goods"}
                            </Text>
                            <DropdownIcon width={14} height={14} color={"#000"} />
                        </TouchableOpacity>

                        {showDropdownDescriptional && (
                            <View style={styles.dropdown}>
                                {descriptional
                                    .filter(option => !items.some(i => i.descriptionalGoodsId === option.id && items.indexOf(i) !== index))
                                    .map((file, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            onPress={() => selectDescriptional(index, file)}
                                            style={styles.dropdownOption}
                                        >
                                            <Text style={styles.dropdownOptionText}>{file.good_service_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        )}

                        <Text style={styles.errorText}>
                            {selectedDescriptionalErr}
                        </Text>

                        <Text style={styles.StatDateText}>HSN / ASC</Text>

                        <TextInput
                            value={item.hsnSac}
                            editable={false}
                            style={styles.inputs} />

                        <Text style={styles.errorText}>{ }</Text>

                        <Text style={styles.StatDateText}>Quantity</Text>

                        <TextInput
                            value={item.quantity}
                            onChangeText={(txt) => handleChange(index, 'quantity', txt)}
                            style={styles.inputs}
                            keyboardType="number-pad"
                            editable={item.editable} />

                        <Text style={styles.errorText}>{item.descriptionalGoods ? (item.quantity == "" ? "Quantity Required" : null) : null}</Text>

                        <Text style={styles.StatDateText}>Rate</Text>

                        <TextInput
                            value={item.rate}
                            onChangeText={(txt) => handleChange(index, 'rate', txt)}
                            style={styles.inputs}
                            keyboardType="number-pad"
                            editable={item.editable} />


                        <Text style={styles.errorText}>{item.descriptionalGoods ? (item.rate == "" ? "Rate Required" : null) : null}</Text>

                        <Text style={styles.StatDateText}>Per</Text>

                        <TextInput
                            value={item.per}
                            onChangeText={(txt) => handleChange(index, 'per', txt)}
                            style={styles.inputs}
                            editable={item.editable} />


                        <Text style={styles.errorText}>{item.descriptionalGoods ? (item.per == "" ? "Per Required" : null) : null}</Text>

                        <Text style={styles.StatDateText}>Amount</Text>

                        <TextInput
                            value={item.amount}
                            onChangeText={(txt) => handleChange(index, 'amount', txt)}
                            style={styles.inputs}
                            keyboardType="number-pad"
                            editable={item.editable} />


                        <Text style={styles.errorText}>{item.descriptionalGoods ? (item.amount == "" ? "Amount Required" : null) : null}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>

                            {index === items.length - 1 && (
                                <TouchableOpacity style={styles.HeaderButtonActive} onPress={addContainer}>
                                    <Text style={styles.HeaderButtonTextActive}>Add +</Text>
                                </TouchableOpacity>
                            )}

                            {index > 0 && (
                                <TouchableOpacity style={styles.HeaderButton} onPress={removeContainer}>
                                    <Text style={styles.HeaderButtonText}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}></Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Total Value Amount
                    </Text>

                    <TextInput
                        value={totalValueAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        IGST Amount
                    </Text>

                    <TextInput
                        value={IGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        CGST Amount
                    </Text>

                    <TextInput
                        value={CGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        SGST Amount
                    </Text>

                    <TextInput
                        value={SGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Total Invoice Amount
                    </Text>

                    <TextInput
                        value={totalInvoiceAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Round Off
                    </Text>

                    <TextInput
                        value={roundOff}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Payment Method
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownPayMethod} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedPayMethod || "Select Payment Method"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownPayMethod && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectPayMethod("Credit Card")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Credit Card</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayMethod("Bank Transfer")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Bank Transfer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayMethod("PayPal")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>PayPal</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {payMethodError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Payment Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownPayStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedPayStatus || "Select Payment Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownPayStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectPayStatus("Paid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Paid</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayStatus("Unpaid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Unpaid</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayStatus("Pending")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Pending</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {payStatusError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Reason
                    </Text>

                    <TextInput
                        value={reason}
                        onChangeText={(txt) => setReason(txt)}
                        style={styles.inputs1}
                        textAlignVertical="top"
                        multiline={true}
                    />

                    <Text style={styles.errorText}>
                        {reasonErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {statusError}
                    </Text>

                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                <TouchableOpacity style={styles.HeaderButtonActive}
                    onPress={HandleSubmit}
                >
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Update
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton}
                    onPress={refresh}
                >
                    <Text style={styles.HeaderButtonText}>
                        Cancel
                    </Text>
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

        </ScrollView>

    )
}

export default EditSalesInvoice;


