import React, { useEffect, useState } from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewHeaderFooter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;
    console.log(SpecId, "SpecId")

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');

    const getApi = async () => {

        try {
            const apiUrl = `https://epkgroup.in/crm/api/public/api/edit_header_footer/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            console.log(responseData, "responseData")
            setInvoiceData(responseData || {});

        } catch (error) {
            console.error('Error fetching getApi data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [SpecId])


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

    const Header = `https://epkgroup.in/crm/api/storage/app/${invoiceData.header_layout}`;
    const Footer = `https://epkgroup.in/crm/api/storage/app/${invoiceData.footer_layout}`;

    return (

        <ScrollView>

            <View style={styles.imageview}>
                <Image
                    source={{ uri: Header }}
                    style={styles.imageStyle}
                />
            </View>

            <View style={{height:350}}>
                <Text> </Text>
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

export default ViewHeaderFooter;