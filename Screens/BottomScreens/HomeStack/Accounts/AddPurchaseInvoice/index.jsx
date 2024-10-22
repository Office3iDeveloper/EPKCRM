import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddPurchaseInvoice = ({ navigation }) => {

    const { data } = useSelector((state) => state.login);

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

    const [invNumber, setInvNumber] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [otherReference, setOtherReference] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [dispatchNo, setDispatchNo] = useState('');
    const [dispatchThrough, setDispatchThrough] = useState('');
    const [designation, setDesignation] = useState('');
    const [termsDelivery, setTermsDelivery] = useState('');
    const [otherDelivery, setOtherDelivery] = useState('');
    const [CGST, setCGST] = useState();
    const [SGST, setSGST] = useState();
    const [IGST, setIGST] = useState();

    const [GSTErr, setGSTErr] = useState('');

    const [totalValueAmount, setTotalValueAmount] = useState();
    const [CGSTAmount, setCGSTAmount] = useState();
    const [SGSTAmount, setSGSTAmount] = useState();
    const [IGSTAmount, setIGSTAmount] = useState();
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState();
    const [roundOff, setRoundoff] = useState();
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

    // 

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

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(null);
    const [startDateErr1, setStartDateErr1] = useState(null);
    const formattedStartDate1 = startDate1 ?
        `${startDate1.getFullYear()}-${String(startDate1.getMonth() + 1).padStart(2, '0')}-${String(startDate1.getDate()).padStart(2, '0')}` :
        "";

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate2, setStartDate2] = useState(null);
    const [startDateErr2, setStartDateErr2] = useState(null);
    const formattedStartDate2 = startDate2 ?
        `${startDate2.getFullYear()}-${String(startDate2.getMonth() + 1).padStart(2, '0')}-${String(startDate2.getDate()).padStart(2, '0')}` :
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

    const handleDateChange1 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate1(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const handleDateChange2 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate2(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
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

    const [showDropdown2, setShowDropdown2] = useState(false);
    const [documentList2, setDocumentList2] = useState([]);
    const [selectedDocument2, setSelectedDocument2] = useState([]);
    const [selectedDocumentErr2, setSelectedDocumentErr2] = useState();
    const [selectedDocumentId2, setSelectedDocumentId2] = useState(null);

    const filteredDocumentList1 = documentList1.filter(File => File.id !== selectedDocumentId);
    const filteredDocumentList2 = documentList1.filter(File => File.id !== selectedDocumentId);

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

    const selectDocument2 = (File) => {
        setSelectedDocument2(File.company_name);
        setSelectedDocumentId2(File.id);
        setShowDropdown2(false);
    };

    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    }

    useEffect(() => {
        CompanyApi();
    }, [])

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

        if (selectedDocument2.length == 0) {
            setSelectedDocumentErr2('Select Bill To');
            isValid = false;
        } else {
            setSelectedDocumentErr2('');
        }

        if (!invNumber) {
            setInvNumberErr('Invoice Number Required');
            isValid = false;
        } else {
            setInvNumberErr('');
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

            formData.append('vendor_id', selectedDocumentId);
            formData.append('ship_to', selectedDocumentId1);
            formData.append('bill_to', selectedDocumentId2);
            formData.append('bill_number', invNumber);
            formData.append('bill_date', formattedStartDate);
            formData.append('delivery_note', deliveryNote || "-");
            formData.append('delivery_date', formattedStartDate1 || "");
            formData.append('mode_termsof_payment', paymentMode || "-");
            formData.append('reference_no_date', referenceNo || 0);
            formData.append('other_reference', otherReference || "-");
            formData.append('buyers_order_no', orderNo || 0);
            formData.append('order_date', formattedStartDate2 || "");
            formData.append('dispatch_doc_no', dispatchNo || 0);

            formData.append('dispatched_through', dispatchThrough || "-");
            formData.append('destination', designation || "-");
            formData.append('termsof_delivery', termsDelivery || "-");
            formData.append('others_details', otherDelivery || "-");
            formData.append('igst_percentage', IGST || 0);
            formData.append('cgst_percentage', CGST || 0);
            formData.append('sgst_percentage', SGST || 0);
            formData.append('roundedoff', roundOff || 0);
            formData.append('output_igst_amount', IGSTAmount || 0);
            formData.append('output_cgst_amount', CGSTAmount || 0);
            formData.append('output_sgst_amount', SGSTAmount || 0);
            formData.append('item_value_amount', totalValueAmount || 0);
            formData.append('overall_amount', totalInvoiceAmount || 0);
            formData.append('payment_method', selectedPayMethod);
            formData.append('payment_status', selectedPayStatus);
            formData.append('payment_reason', reason);
            formData.append('status', selectedStatus);

            items.forEach((item, index) => {
                formData.append('item_id[]', item.descriptionalGoodsId);
                formData.append('quantity[]', item.quantity || 0);
                formData.append('rate[]', item.rate || 0);
                formData.append('per[]', item.per || 0);
                formData.append('amount[]', item.amount || 0);
            });

            formData.append('created_by', data.userrole);


            const response = await fetch('https://office3i.com/development/api/public/api/addpurchaseinvoice', {
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
        setSelectedDocument([]);
        setSelectedDocumentErr('');
        setSelectedDocumentId(null);
        setSelectedDocument1([]);
        setSelectedDocumentErr1('');
        setSelectedDocumentId1(null);
        setSelectedDocument2([]);
        setSelectedDocumentErr2('');
        setSelectedDocumentId2(null);
        setInvNumber('');
        setStartDate(null);
        setStartDateErr(null);
        setStartDate1(null);
        setStartDateErr1(null);
        setStartDate2(null);
        setStartDateErr2(null);
        setDeliveryNote('');
        setPaymentMode('');
        setReferenceNo('');
        setOtherReference('');
        setOrderNo('');
        setDispatchNo('');
        setDispatchThrough('');
        setDesignation('');
        setTermsDelivery('');
        setOtherDelivery('');
        setIGST(0);
        setCGST(0);
        setSGST(0);
        setRoundoff(0);
        setIGSTAmount(0);
        setSGSTAmount(0);
        setCGSTAmount(0);
        setTotalValueAmount(0);
        setTotalInvoiceAmount(0);
        setSelectedPayMethod(null);
        setPayMethodError(null);
        setSelectedPayStatus(null);
        setPayStatusError(null);
        setReason('')
        setReasonErr('');
        setStatusError(null);
        setSelectedStatus(null);
        setSelectedDescriptionalErr('');

        setItems([{
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
    }

    const Redirect = () => {
        navigation.navigate('Purchase Invoice List');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res);
        SetLoad(false);
        refresh();
        setTimeout(() => {
            setAlertVisible(false);
            Redirect();
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

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Purchase Invoice</Text>
                </View>

                <View style={styles.Inputcontainer}>


                    <Text style={styles.StatDateText}>
                        Vendor Name
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Document Type"}
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
                        Ship To
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Select Document Type"}
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
                        Bill To
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown2} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument2 && selectedDocument2.length > 0 ? selectedDocument2 : "Select Document Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown2 && (
                        <View style={styles.dropdown}>
                            {filteredDocumentList2.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument2(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr2}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Invoice Number
                    </Text>

                    <TextInput
                        value={invNumber}
                        onChangeText={(txt) => setInvNumber(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {invNumberErr}
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
                        Delivery Note
                    </Text>

                    <TextInput
                        value={deliveryNote}
                        onChangeText={(txt) => setDeliveryNote(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Delivery Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {startDate1 ? formatDate(startDate1) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={startDate1 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr1}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mode Of Payment
                    </Text>

                    <TextInput
                        value={paymentMode}
                        onChangeText={(txt) => setPaymentMode(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Reference No & Dates
                    </Text>

                    <TextInput
                        value={referenceNo}
                        onChangeText={(txt) => setReferenceNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Other Reference
                    </Text>

                    <TextInput
                        value={otherReference}
                        onChangeText={(txt) => setOtherReference(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Buyer’s Order No
                    </Text>

                    <TextInput
                        value={orderNo}
                        onChangeText={(txt) => setOrderNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Buyer’s Order Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker2}>
                            {startDate2 ? formatDate(startDate2) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker2 && (
                            <DateTimePicker
                                value={startDate2 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr2}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Dispatch Document No
                    </Text>

                    <TextInput
                        value={dispatchNo}
                        onChangeText={(txt) => setDispatchNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Dispatch Through
                    </Text>

                    <TextInput
                        value={dispatchThrough}
                        onChangeText={(txt) => setDispatchThrough(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Designation
                    </Text>

                    <TextInput
                        value={designation}
                        onChangeText={(txt) => setDesignation(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Terms of Delivery
                    </Text>

                    <TextInput
                        value={termsDelivery}
                        onChangeText={(txt) => setTermsDelivery(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Other Details
                    </Text>

                    <TextInput
                        value={otherDelivery}
                        onChangeText={(txt) => setOtherDelivery(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
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

                <View style={[styles.PolicyContainerTitleHeader]}>
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

                    {/* Dropdown to show the options */}

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

                    {/* Dropdown to show the options */}

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

                    {/* Dropdown to show the options */}

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
                <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Add
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton} onPress={refresh}>
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

export default AddPurchaseInvoice;

