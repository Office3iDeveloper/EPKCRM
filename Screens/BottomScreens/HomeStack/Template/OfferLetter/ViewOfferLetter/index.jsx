import React, { useEffect, useState } from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewOfferLetter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');

    const getApi = async () => {

        try {
            const apiUrl = `https://office3i.com/development/api/public/api/edit_offer_list/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setInvoiceData(responseData || {});

        } catch (error) {
            console.error('Error fetching getApi data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [])


    const exportToPDF = async () => {

        const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 10px;
                        color: #000;
                        padding: 10%;
                    }
                    .container {
                        width: 100%;
                    }
                     .image-view {
                        margin: 5% 0; 
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 101px;
                    }
                    .image-style {
                        width: 90%;
                        height: 101px;
                        object-fit: contain;
                    }
                    .header {
                        text-align: center;
                        font-weight: 700;
                        margin-top: 10px;
                    }
                    .section {
                        margin-top: 20px;
                    }
                    .section-title {
                        font-weight: 600;
                        font-size: 10px;
                        color: #000;
                    }
                    .paragraph {
                        font-weight: 400;
                        font-size: 10px;
                        color: #000;
                        line-height: 1.6;
                    }
                    .strong {
                        font-weight: 600;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .button {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">

                    <!-- Header Image -->
                    <div class="image-view">
                        <img src="${Header}" class="image-style" />
                    </div>

                    <!-- Title -->
                    <div class="header">
                        <p>EMPLOYMENT OFFER LETTER</p>
                    </div>

                    <!-- Address and Date Section -->
                    <div class="section">
                        <div style="float: left; width: 50%;">
                            <p class="section-title">${invoiceData.select_salutation} ${invoiceData.name}</p>
                            <p class="section-title">${invoiceData.address_line1}</p>
                            <p class="section-title">${invoiceData.address_line2}</p>
                        </div>
                        <div style="float: right; width: 50%; text-align: right;">
                            <p class="section-title">${invoiceData.date}</p>
                        </div>
                        <div style="clear: both;"></div>
                    </div>

                    <!-- Offer Details Section -->
                    <div class="section">
                        <p class="paragraph">
                            We are pleased to offer you a job as a <span class="strong">${invoiceData.designation}</span> at <span class="strong">${invoiceData.company_name}</span>.
                            We trust that your experience and skills will be a valuable asset to our company.
                        </p>
                    </div>

                    <!-- Compensation Section -->
                    <div class="section">
                        <p class="paragraph">
                            You will be entitled with an annual cost to company of <span class="strong">Rs.${invoiceData.annual_ctc}</span>.
                            Your working hours will be <span class="strong">${invoiceData.working_hrs_from} to ${invoiceData.working_hrs_to}</span> on <span class="strong">${invoiceData.working_day}</span>.
                        </p>
                    </div>

                    <!-- Probation Period Section -->
                    <div class="section">
                        <p class="paragraph">
                            You will be on probation for <span class="strong">${invoiceData.probation_period}</span>.
                        </p>
                    </div>

                    <!-- Termination Clause Section -->
                    <div class="section">
                        <p class="paragraph">
                            On acceptance of the terms and conditions as per this offer letter, you will be able
                            to terminate your employment with the Company by giving <span class="strong">${invoiceData.notice_period}</span> notice to
                            the Company and vice versa.
                        </p>
                    </div>

                    <!-- Benefits Section -->
                    <div class="section">
                        <p class="paragraph">Benefits for the position include:</p>
                        <p class="section-title">${invoiceData.benefits}</p>
                    </div>

                    <!-- Start Date Section -->
                    <div class="section">
                        <p class="paragraph">
                            We would like you to start work on <span class="strong">${invoiceData.start_date}</span> and report to <span class="strong">${invoiceData.supervisor_name}</span>.
                        </p>
                    </div>

                    <!-- Acceptance Instructions Section -->
                    <div class="section">
                        <p class="paragraph">
                            To accept this offer, please sign the enclosed copy of this letter and return it via
                            email by <span class="strong">${invoiceData.start_date}</span> to indicate your acceptance of this offer.
                        </p>
                    </div>

                    <!-- Regards Section -->
                    <div class="section">
                        <p class="paragraph">With regards,</p>
                        <p class="section-title">${invoiceData.authorised_person_name},</p>
                        <p class="section-title">${invoiceData.authorised_designation}.</p>
                    </div>

                    <!-- Acceptance Clause Section -->
                    <div class="section">
                        <p class="paragraph">
                            I accept the aforesaid terms & conditions and this offer of employment. I shall
                            keep the contents of this document confidential.
                        </p>
                    </div>

                    <!-- Signature Section -->
                    <div class="section">
                        <p class="paragraph">I will join on: _______________</p>
                        <p class="paragraph">Name: _______________________</p>
                        <p class="paragraph">Signature: ___________________</p>
                        <p class="paragraph">Date: ______________________</p>
                    </div>

                    <!-- Footer Image -->
                    <div class="image-view">
                        <img src="${Footer}" class="image-style" />
                    </div>

                </div>
            </body>
        </html>
    `;
        const { filePath } = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: 'Offer_Letter',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };

    const Header = `https://office3i.com/development/api/storage/app/${invoiceData.header_attachment}`;
    const Footer = `https://office3i.com/development/api/storage/app/${invoiceData.footer_attached}`;

    return (

        <ScrollView>

            <View style={styles.imageview}>
                <Image
                    source={{ uri: Header }}
                    style={styles.imageStyle}
                />
            </View>

            <View style={{ paddingHorizontal: '10%' }}>

                <View style={{ alignItems: 'center', marginTop: '1%' }}>
                    <Text style={{ fontWeight: '700', color: '#000', fontSize: 10 }}>EMPLOYMENT OFFER LETTER</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>

                    <View style={{ width: '50%' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.select_salutation}{invoiceData.name}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.address_line1}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.address_line2}</Text>
                    </View>

                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.date}</Text>
                    </View>

                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We are pleased to offer you a job as a <Text style={{ fontWeight: '600' }}>{invoiceData.designation}</Text> at <Text style={{ fontWeight: '600' }}>{invoiceData.company_name} </Text>
                        We trust that your experience and skills will be a valuable asset to our company.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        You will be entitled with an annual cost to company of <Text style={{ fontWeight: '600' }}>Rs.{invoiceData.annual_ctc} </Text>
                        Your working hours will be <Text style={{ fontWeight: '600' }}>{invoiceData.working_hrs_from} to {invoiceData.working_hrs_to}</Text> on <Text style={{ fontWeight: '600' }}>{invoiceData.working_day}</Text>
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        You will be on probation for <Text style={{ fontWeight: '600' }}>{invoiceData.probation_period}</Text>
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        On acceptance of the terms of conditions as per this offer letter, you will be able
                        to terminate your employment with the Company by giving <Text style={{ fontWeight: '600' }}>{invoiceData.noties_period} notice</Text> to
                        the Company and vice versa.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        Benefits for the position include:
                    </Text>
                </View>

                <View style={{ marginTop: '1%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.benefits}
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We would like you to start work on <Text style={{ fontWeight: '600' }}>{invoiceData.start_date}</Text> and report to <Text style={{ fontWeight: '600' }}>{invoiceData.supervisor_name}</Text>
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        To accept this offer please sign the enclosed copy of this letter and return it via
                        email by <Text style={{ fontWeight: '600' }}>{invoiceData.start_date}</Text> to indicate your acceptance of this offer.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        With regards,
                    </Text>
                </View>

                <View style={{ marginTop: '1%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_person_name},
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_designation}.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        I accept the aforesaid terms & conditions and this offer of employment. I shall
                        keep the contents of this document confidential.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>I will join on:</Text>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>Name:</Text>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>Signature: </Text>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>Date:</Text>
                </View>

            </View>

            <View style={styles.imageview}>
                <Image
                    source={{ uri: Footer }}
                    style={styles.imageStyle}
                />
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

export default ViewOfferLetter;