import React from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import numberToWords from 'number-to-words';
import { ImageBackground } from "react-native";

const Slip = ({ route }) => {

    // route

    const { item } = route.params;

    // months

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const [year, month] = item.payslipmonthyear.split('-');
    const monthName = months[parseInt(month, 10) - 1];

    const words = numberToWords.toWords(`${Number(item.totalnetpay_amount).toFixed(0)}`);

    // 

    const exportToPDF = async () => {

        const htmlContent = `
        <html>
          <head>
          <style>
          body {
              font-family: 'Arial, sans-serif';
              padding: 20px;
          }
  
          .company-info {
              display: flex;
              flex-direction: row;
              margin-bottom: 20px;
              background-color: rgb(247, 248, 250);
              padding: 15px;
              width: '100%';
          }
  
          .company-info img {
              width: 50%;
          }
  
          .employee-details {
              display: flex;
              flex-direction: row;
              margin-bottom: 20px;
              width: '100%';
              padding: 15px;
          }
  
          .employee-info {
              font-size: 16px;
              width: 50%;
          }
  
          .Emp_singleline {
              display: block;
          }
  
          .logo {
              width: "41%";
              height: 100px;
              margin-right: 10px;
          }
  
          .company-details {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              width: 50%;
          }
  
          .company-name {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 5px;
          }
  
          .company-name1 {
              font-size: 17px;
              font-weight: bold;
              margin-bottom: 5px;
          }
  
          .address {
              font-size: 18px;
          }
  
          table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
          }
  
          table th,
          table td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
          }
  
          .table-header {
              width: 100%;
          }
  
          .table-header th {
              text-align: center;
              width: 50%;
          }
  
          .right-align div {
              text-align: right;
          }
  
          .left-align div {
              text-align: left;
          }

          .vertical-line {
            border-left: 1px solid black;
            height: 120px;
            
            margin-left: 10px;
            margin-right: 20px;
        }

        .Horizontal-line {
            border-bottom: 1px solid black;
            margin-bottom: 20px;
        }
      </style>
          </head>
          <body>
            <div class="company-info">

           <img
            src='https://officeinteriorschennai.com/assets/Employee/EPK_group_Logo.png'
            alt="Company Logo"
            className="logo"
          />           
              <div class="vertical-line"></div>

              <div class="company-details">
               <div class="company-name">EPK Group</div>
               <div class="address">
                 No,624, Anna Salai 4th floor, Khivraj Building,<br />
                 Near Gemini Flyover, Tamilnadu - 600006<br />
               </div>

              <div class="company-name1">Payslip - ${`${monthName} ${year}`}</div>
              </div>
               </div>
          

            <div class="employee-details">
              <div class="employee-info">
              <span class='Emp_singleline'><strong>Employee Name:</strong> ${item.emp_name}</span><br />
              <span class='Emp_singleline'><strong>Desigination:</strong> ${item.emp_designation}</span><br />
              <span class='Emp_singleline'><strong>No of Working Days :</strong> ${item.total_days_in_month}</span><br />
              </div>
              <div class="employee-info">
              <span class='Emp_singleline'><strong>UAN Number:</strong> ${item.uan_number}</span><br />
              <span class='Emp_singleline'><strong>PAN Number :</strong> ${item.pan_number}</span><br />
              <span class='Emp_singleline'><strong>LOP days :</strong> ${item.emp_lop}</span><br />
              </div>
            </div>

            <table class="data-table">
              <tr class="table-header">
               <th colspan="2">Earnings</th>
               <th colspan="2">Deductions</th>
              </tr>

              <tr class="table-subheader">
                <th class="left-align"><div>Description</div></th>
                <th class="right-align"><div>Amount</div></th>
                <th class="left-align"><div>Description</div></th>
                <th class="right-align"><div>Amount</div></th>
              </tr>


              <tr class="table-row">
                <td>Basic</td>
                <td class="right-align"><div>${Number(item.basic_da).toFixed(0)}</div></td>
                <td>Provident Fund</td>
                <td class="right-align"><div> ${Number(item.pf).toFixed(0)}</div></td>
              </tr>
  <tr class="table-row">
    <td>HRA</td>
    <td class="right-align"><div>${Number(item.hra).toFixed(0)}</div></td>
     <td>ESI</td>
                <td class="right-align"><div> ${Number(item.esi).toFixed(0)}</div></td>
  </tr>

  <tr class="table-row">
    <td>Conveyance Allowance</td>
    <td class="right-align"><div> ${Number(item.conveyance_allowance).toFixed(0)}</div></td>
    <td>Salary Advance</td>
    <td class="right-align"><div> ${Number(item.advance).toFixed(0)}</div></td>
  </tr>

  <tr class="table-row">
    <td>Transport Allowance</td>
    <td class="right-align"><div>${Number(item.transport_allowance).toFixed(0)}</div></td>
     <td>Other Decuction</td>
    <td class="right-align"><div>${Number(item.other_deduction).toFixed(0)}</div></td>
  </tr>

  <tr class="table-row">
    <td>Medical Allowance</td>
    <td class="right-align"><div>${Number(item.medical_allowance).toFixed(0)}</div></td>
     <td>Loss Of Pay</td>
    <td class="right-align"><div>${Number(item.emp_lop).toFixed(0)}</div></td>
  </tr>

  

  <tr class="table-row">
    <td>Other Allowance</td>
    <td class="right-align"><div> ${Number(item.other_allowance).toFixed(0)}</div></td>
    <td></td>
    <td></td>
  </tr>

   <tr class="table-row">
    <td>Overtime</td>
    <td class="right-align"><div> ${Number(item.emp_ot).toFixed(0)}</div></td>
    <td></td>
    <td></td>
  </tr>

   <tr class="table-row">
    <td>Variable</td>
    <td class="right-align"><div> ${Number(item.variable).toFixed(0)}</div></td>
    <td></td>
    <td></td>
  </tr>

  <tr class="table-row">
    <td>Gross Pay</td>
    <td class="right-align"><div> ${Number(item.gross_pay).toFixed(0)}</div></td>
    <td>Total Deductions</td>
    <td class="right-align"><div> ${Number(item.overall_deduction).toFixed(0)}</div></td> 
  </tr>

  <tr class="table-row">
  <td></td>
  <td></td>
  <td>Net Pay</td>
  <td class="right-align"><div> ${Number(item.totalnetpay_amount).toFixed(0)}</div></td> 
</tr>

</table>
              <div>
              <p style={{ fontSize: '10px', padding: '8px 0px', fontWeight: '500', backgroundColor: '#e9f7e7', width: '50%' }}>
              Total Net Payable ₹ ${Number(item.totalnetpay_amount).toFixed(0)} <span style={{ color: 'rgb(2, 156, 16)' }}>|</span> ${words}
            </p>

            <p style="text-align: center; margin-top: 100px;"><strong>This is Auto-generated Payslip, Signature not required</strong></p>
            </div>
          </body>
        </html>
      `;

        const { filePath } = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: 'Pay_Slip',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };

    // 


    const tableHead = ['Earnings', 'Deductions'];
    const tableTitle = ['Description', 'Amount', 'Description', 'Amount'];
    const tableData = [
        ['Basic + DA', `${Number(item.basic_da).toFixed(0)}`, 'Provident Fund', `${Number(item.pf).toFixed(0)}`],
        ['HRA', `${Number(item.hra).toFixed(0)}`, 'ESI', `${Number(item.esi).toFixed(0)}`],
        ['Conveyance Allowance', `${Number(item.conveyance_allowance).toFixed(0)}`, 'Salary Advance', `${Number(item.advance).toFixed(0)}`],
        ['Transport Allowance', `${Number(item.transport_allowance).toFixed(0)}`, 'Other Deductions', `${Number(item.other_deduction).toFixed(0)}`],
        ['Medical Allowance', `${Number(item.medical_allowance).toFixed(0)}`, 'Loss of Pay', `${Number(item.emp_lop).toFixed(0)}`],
        ['Other Allowance', `${Number(item.other_allowance).toFixed(0)}`, '', ''],
        ['Overtime', `${Number(item.emp_ot).toFixed(0)}`, '', ''],
        ['Variable', `${Number(item.variable).toFixed(0)}`, '', ''],
        ['Gross Pay', `${Number(item.gross_pay).toFixed(0)}`.charAt(0).toUpperCase() + `${Number(item.empsalaryoverall_salary).toFixed(0)}`.slice(1), 'Total Deductions', `${Number(item.overall_deduction).toFixed(0)}`],
        ['', '', 'Net Pay', `${Number(item.totalnetpay_amount).toFixed(0)}`]
    ];


    return (
        <ScrollView>
            <View>
                <View style={styles.container}>
                    <View style={styles.companyInfo}>
                        <View>
                            {/* <ImageBackground
                                source={require('../../../../../Assets/Image/Logo.png')}
                                style={styles.backgroundImage}
                            /> */}
                            <Image
                                source={{ uri: 'https://officeinteriorschennai.com/assets/Employee/EPK_group_Logo.png' }}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={styles.companyDetails}>
                            {/* <Text style={styles.companyName}>Qwerty Solutions</Text>
                            <Text style={styles.address}>
                                No.7, ABC Building, ABC Street, Nearby Landmark, XYZ Area,Chennai, Tamilnadu - 600 006
                            </Text> */}
                            <Text style={styles.companyName}>EPK Group</Text>
                            <Text style={styles.address}>
                                No,624, Anna Salai 4th floor, Khivraj Building,
                                {'\n'}
                                Near Gemini Flyover, Tamilnadu - 600006
                            </Text>
                            <Text style={styles.SalarySlip}>Payslip - {`${monthName} ${year}`}</Text>
                        </View>
                    </View>

                    <View style={styles.employeeDetails}>
                        <View style={styles.employeeInfo}>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>Employee Name:</Text> {item.emp_name}</Text>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>Designation:</Text> {item.emp_designation}</Text>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>No of Working Days:</Text> {item.total_days_in_month}</Text>
                        </View>
                        <View style={styles.employeeInfo}>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>UAN Number:</Text> {item.uan_number}</Text>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>PAN Number:</Text> {item.pan_number}</Text>
                            <Text style={styles.singleLine}><Text style={styles.boldText}>LOP days:</Text> {item.emp_lop}</Text>
                        </View>
                    </View>

                    <View style={styles.tablecontainer}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: "grey" }}>
                            <Row data={tableHead} style={styles.tableHeader1} textStyle={styles.tableHeaderText} />
                            <Row data={tableTitle} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            {tableData.map((rowData, index) => (
                                <Row key={index} data={rowData.map((data, dataIndex) => {
                                    if (dataIndex === 1 && rowData[0] === 'Net Pay') {
                                        return <Text key={dataIndex} style={{ fontSize: 12, textAlign: 'center', fontWeight: '700' }}>{data}</Text>;
                                    } else {
                                        return <Text style={{ fontSize: 11, textAlign: 'center' }} key={dataIndex}>{data}</Text>;
                                    }
                                })} style={styles.tableRow} textStyle={styles.tableRowText} />
                            ))}
                        </Table>
                    </View>

                    <View>
                        <Text style={styles.totalNetPayableText}>
                            Total Net Payable - <Text style={{ color: '#0A62F1' }}>Rs.{`${Number(item.totalnetpay_amount).toFixed(0)}`}</Text> <Text style={styles.greenText}>|</Text> {words.charAt(0).toUpperCase() + words.slice(1)}
                        </Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.buttonstyles} onPress={exportToPDF}>
                        <Text style={styles.text}>
                            Download
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Slip;