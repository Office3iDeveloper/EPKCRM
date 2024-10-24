import React, { useEffect, useState } from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewReliveingLetter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');

    const getApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/edit_relieving_list/${SpecId}`;
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
        <!DOCTYPE html>
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
                        color: #000;
                        font-size: 10px;
                        margin-top: 10px;
                    }
                    .section {
                        margin-top: 5%;
                    }
                    .section-title, .paragraph {
                        font-size: 10px;
                        color: #000;
                    }
                    .section-title {
                        font-weight: 600;
                    }
                        .section-title1 {
                        font-weight: 600;
                        margin-bottom:100px;
                        }
                    .paragraph {
                        font-weight: 400;
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
                   <div class="title">RELIEVING LETTER</div>

                    <!-- Address and Date Section -->
                    <div class="section">
                        <div style="float: left; width: 50%;">
                            
                        </div>
                        <div style="float: right; width: 50%; text-align: right;">
                            <p class="section-title">${invoiceData.date}</p>
                        </div>
                        <div style="clear: both;"></div>
                    </div>

                    <div class="section">
                        <p class="paragraph">
                           <p>This is to certify that Jarvis was employed with Stark Industries from <span class="bold">${invoiceData.joining_date}</span> to <span class="bold">${invoiceData.last_working_day}</span>.</p>
                        </p>
                    </div>

                    <div class="section">
                        <p class="paragraph">
                            <p>Throughout this tenure, <span class="bold">${invoiceData.employee_name}</span> has diligently fulfilled their responsibilities as a <span class="bold">${invoiceData.designation}</span>. Your dedication and contribution to the team has been valuable.</p>
                        </p>
                    </div>

                    <div class="section">
                        <p class="paragraph">
                            <p>We acknowledge that you have returned any and all properties of the Company and have completed all formalities with respect to your cessation of employment with the Company.</p>
                        </p>
                    </div>

                    <div class="section">
                        <p class="paragraph">
                            <p>We wish you all the best for your future endeavors.</p>
                        </p>
                    </div>

                    <!-- Signature Section -->
                    <div class="section">
                        <p class="section-title1">For ${invoiceData.company_name}</p>
                        <p class="section-title">${invoiceData.authorised_person_name}</p>
                        <p class="section-title">${invoiceData.authorised_person_designation}</p>
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
            fileName: 'Relieving_Letter',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };

    const Header = `https://epkgroup.in/crm/api/storage/app/${invoiceData.header_attachment}`;
    const Footer = `https://epkgroup.in/crm/api/storage/app/${invoiceData.footer_attached}`;

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
                    <Text style={{ fontWeight: '700', color: '#000', fontSize: 10 }}>RELIEVING LETTER</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>

                    <View style={{ width: '50%' }}>

                    </View>

                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.date}</Text>
                    </View>

                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        This is to certify that Jarvis was employed with Stark Industries from <Text style={{ fontWeight: '600' }}>{invoiceData.joining_date} </Text>
                        to <Text style={{ fontWeight: '600' }}> {invoiceData.last_working_day}</Text>.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        Throughout this tenure, <Text style={{ fontWeight: '600' }}>{invoiceData.employee_name}</Text> has diligently fulfilled their responsibilities as a
                        <Text style={{ fontWeight: '600' }}> {invoiceData.designation}</Text>. Your dedication and contribution to the team has been valuable.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We acknowledge that you have returned any and all properties of the Company
                        and have completed all formalities with respect to your cessation of employment
                        with the Company.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We wish you all the best for your future endeavors.
                    </Text>
                </View>

                <View style={{ marginTop: '5%', marginBottom: '15%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        For {invoiceData.company_name}
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_person_name}
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_person_designation}
                    </Text>
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

export default ViewReliveingLetter;