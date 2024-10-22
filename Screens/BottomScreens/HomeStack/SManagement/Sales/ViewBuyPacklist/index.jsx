import React, { useEffect, useState } from "react";
import styles from "./style";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const BuySalesInvoiceView = ({ route, navigation }) => {

    // route

    const Spec = route.params.Id
    const SpecId = route.params.Id.id;

    console.log(Spec, 'e')

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [list, setList] = useState({});
    const [liststatus, setListstatus] = useState([]);

    // console.log(liststatus, 'list')

    const [invoiceData, setInvoiceData] = useState('');
    const [invoiceItem, setInvoiceItem] = useState([]);

    const getApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/getbuybowpacksalesviewlist/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            if (responseData) {
                setList(responseData.Leadlist || {});  // Default to empty object if Leadlist is missing
                setListstatus(responseData.Leadstatus || []);  // Default to empty array if Leadstatus is missing
            }

        } catch (error) {
            console.error('Error fetching getApi data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [])

    const amountString = list.overall_amt;
    const amountNumber = parseFloat(amountString);
    const [numberWords, setNumberWords] = useState(0)

    useEffect(() => {
        if (isNaN(amountNumber)) {
            console.error("Invalid number:", amountString);
        } else {
            const words = numberToWords.toWords(amountNumber.toFixed(0));
            console.log(words, "words");
            setNumberWords(words)
        }
    }, [amountNumber])


    const exportToPDF = async () => {
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
    
                    .header, .footer {
                        text-align: center;
                        font-weight: bold;
                    }
    
                    .header {
                        top: 0;
                        margin-bottom: 50px;
                    }
    
                    .footer {
                        bottom: 0;
                        margin-top: 50px;
                    }
    
                    .container {
                        width: 90%;
                        margin: auto;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
    
                    th, td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
    
                    th {
                        background-color: #f2f2f2;
                    }
    
                    .page-break {
                        page-break-after: always;
                    }
    
                </style>
            </head>
            <body>
                <div class="header">
                ${list.payment_statusname == "Paid" ? `<h1>INVOICE</h1>` : `<h1>PRO FORMA INVOICE</h1>`}
                </div>
    
                <div class="container">
                    <div class="row">
                        <table>
                            <tr>
                                <td><strong>Office3i</strong><br />
                                No:624, Anna Salai, 4th Floor, Khivraj Buildings, Chennai-600006<br />
                                GSTIN/UIN: 33AOJPK8656H2ZL<br />
                                State Name: Tamil Nadu, Code : 33 <br />
                                Phone : 9876543210 Mail : abcd123@gmail.com</td>
                                <td><strong>Invoice No.</strong><br />
                                ${list.transaction_id}<br/><br/>
                                <strong>Dated</strong><br />
                                ${list.start_date}</td>
                            </tr>
                            <tr>
                                <td><strong>Buyer (Bill to)</strong><br />
                                <strong>${list.cus_companyname}</strong><br />
                                ${list.cus_billing_address}<br />
                                GSTIN/UIN: ${list.cus_gstin}<br />
                                State Name: ${list.state_name}</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
    
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Description Of Goods</th>
                                <th>HSN/SAC</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Per</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>${list.plan_name}</td>
                                    <td>998313</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                 <tr>
                                    <td></td>
                                    <td>Plan Amount ( ${list.plan_period} )</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>${list.plan_amt}</td>
                                </tr>
                                 <tr>
                                    <td></td>
                                    <td>Added Employee Amount</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>${list.add_emp_amt}</td>
                                </tr>
                                ${list.statecodegstname !== "Tamilnadu" ? `
                                    <tr>
                                        <td></td>
                                        <td>Output IGST 18%</td>
                                        <td></td>
                                        <td></td>
                                        <td>18%</td>
                                        <td></td>
                                        <td>${list.tax_amt}</td>
                                    </tr>` : ''}
                                    ${list.statecodegstname === "Tamilnadu" ? `
                                    <tr>
                                        <td></td>
                                        <td>Output SGST 9%</td>
                                        <td></td>
                                        <td></td>
                                        <td>9%</td>
                                        <td></td>
                                        <td>${list.tax_amt / 2}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Output CGST 9%</td>
                                        <td></td>
                                        <td></td>
                                        <td>9%</td>
                                        <td></td>
                                        <td>${list.tax_amt / 2}</td>
                                    </tr>` : ''}
                        </tbody>
                    </table>
    
                    <table>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>${list.overall_amt}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Amount Chargeable (in words)</strong><br />
                                ${numberWords}</td>
                            <td><strong>Company’s Bank Details</strong><br />
                                A/c Holder’s Name: Office3i<br />
                                Bank Name: Indian Bank<br />
                                A/c No: 1234567890<br />
                                Branch & IFS Code: Thousand Light, Chennai & IDIB000T020</td>
                        </tr>
                        <tr>
                            <td><strong>Declaration</strong><br />
                                We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</td>
                            <td>for Office3i<br />
                                Authorised Signatory</td>
                        </tr>
                    </table>
                </div>
    
                <div class="footer">
                    <h3>This is a Computer Generated Invoice</h3>
                </div>
            </body>
            </html>
        `;

        const { filePath } = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: 'BuyPack_InvoiceList',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };


    const SGST = list.tax_amt / 2;
    const CGST = list.tax_amt / 2;

    return (

        <ScrollView>

            <View style={{ alignItems: 'center', marginVertical: '10%' }}>

                <View style={{ width: '95%', borderWidth: 1, borderColor: '#000' }}>

                    <View style={{ alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderColor: '#000' }}>
                        {
                            Spec.payment_statusname == "Paid" ?
                                <Text style={{ fontWeight: '600', fontSize: 8 }}>INVOICE</Text> :
                                <Text style={{ fontWeight: '600', fontSize: 8 }}>PRO FORMA INVOICE</Text>
                        }
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8, paddingBottom: 5 }}>
                                Office3i
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                No:624, Anna Salai, 4th Floor, Khivraj Buildings, Chennai-600006
                                GSTIN/UIN: 33AOJPK8656H2ZLState Name: Tamil Nadu, Code : 33

                                Phone : 9876543210 Mail : abcd123@gmail.com
                            </Text>
                        </View>
                        <View style={{ width: '25%', padding: 10, borderRightWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Invoice No.
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {list.transaction_id}
                            </Text>
                        </View>
                        <View style={{ width: '25%', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Dated
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {list.start_date}
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>Buyer (Bill to)</Text>
                            <Text style={{ fontWeight: '600', fontSize: 8, paddingBottom: 5 }}>{list.cus_companyname}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {list.cus_billing_address}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                GSTIN/UIN : {list.cus_gstin}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                State Name : {list.state_name}
                            </Text>
                        </View>
                        <View style={{ width: '50%', }}>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '20%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>S.No</Text>
                            <Text style={{ width: '50%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Description Of Goods</Text>
                            <Text style={{ width: '30%', fontSize: 8, padding: 5 }}>HSN/SAC</Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Quantity</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Rate</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Per</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5 }}>Amount</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        {/* {
                            liststatus.map((item, index) => ( */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>1.</Text>
                                </View>
                                <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                    <Text style={{ fontSize: 8 }}>{list.plan_name}</Text>
                                </View>
                                <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>998313</Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                    <Text style={{ fontSize: 8 }}>Plan Amount ( {list.plan_period} )</Text>
                                </View>
                                <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>1</Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>{list.plan_amt}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                    <Text style={{ fontSize: 8 }}>Added Employee Amount</Text>
                                </View>
                                <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>{list.add_emp_count}</Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}></Text>
                                </View>
                                <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                    <Text style={{ fontSize: 8 }}>{list.add_emp_amt}</Text>
                                </View>
                            </View>
                        </View>
                        {/* ))
                        } */}

                    </View>

                    {list.statecodegstname !== "Tamilnadu" ? <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Output IGST 18%</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}>18%</Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}>{list.tax_amt}</Text>
                            </View>
                        </View>
                    </View> : null}

                    {list.statecodegstname == "Tamilnadu" ?
                        <>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                        <Text style={{ fontSize: 8, textAlign: 'right' }}>Output SGST 9%</Text>
                                    </View>
                                    <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                </View>
                                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}>9%</Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}>{SGST}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                                <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                        <Text style={{ fontSize: 8, textAlign: 'right' }}>Output CGST 9%</Text>
                                    </View>
                                    <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                </View>
                                <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}>9%</Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}></Text>
                                    </View>
                                    <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                        <Text style={{ fontSize: 8 }}>{CGST}</Text>
                                    </View>
                                </View>
                            </View>
                        </> : null}

                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0.5, borderColor: '#000' }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Total</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}>{list.overall_amt}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>Amount Chargeable (in words)</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {numberWords}
                            </Text>
                        </View>
                        <View style={{ width: '50%', padding: 10 }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>
                                Company’s Bank Details
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                A/c Holder’s Name : <Text style={{ fontWeight: '400', fontSize: 8 }}> Office3i</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Bank Name : <Text style={{ fontWeight: '400', fontSize: 8 }}>Indian Bank</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                A/c No : <Text style={{ fontWeight: '400', fontSize: 8 }}>1234567890</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Branch & IFS Code  : <Text style={{ fontWeight: '400', fontSize: 8 }}>Thousand Light, Chennai & IDIB000T020</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>Declaration</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                We declare that this invoice shows the actual price of
                                the goods described and that all particulars are true
                                and correct.
                            </Text>
                        </View>
                        <View style={{ width: '50%', padding: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ textAlign: 'right', fontSize: 8, fontWeight: '400' }}>for Office3i</Text>
                            <Text style={{ textAlign: 'right', fontSize: 8, fontWeight: '400' }}>Authorised Signatory</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                        <Text style={{ fontWeight: '400', fontSize: 8 }}>This is Computer Generated Invoice</Text>
                    </View>
                </View>

            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.buttonstyles} onPress={exportToPDF}>
                    <Text style={styles.text}>
                        Download
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default BuySalesInvoiceView;