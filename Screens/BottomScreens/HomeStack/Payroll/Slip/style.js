import { StyleSheet } from "react-native";
// import { Black, PrimaryAshPurple, PrimaryBlue, PrimaryGreen, PrimaryPurple, SecondaryAshPurple, White } from "../../../../../../assets/Colors";

const styles = StyleSheet.create({
  backgroundImage: {
    width: 60,
    height: 60,
    // alignItems: 'center',
    // justifyContent: 'center',
},
  container: {
    padding: 20,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    // backgroundColor: SecondaryAshPurple,
    padding: 15,
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 40,
    marginRight: 10,
  },
  companyDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 50,
    borderLeftWidth: 1,
    borderColor: '#737373',
    paddingLeft: 10
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  SalarySlip: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 10,
    marginVertical: 10
  },
  employeeDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  employeeInfo: {
    flex: 1,
  },
  singleLine: {
    fontSize: 10,
    marginBottom: 10,
    fontWeight: '400',
    color: '#3A3A3A'
  },
  boldText: {
    fontWeight: '600',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    // borderBottomColor: Black,
    marginBottom: 10,
  },
  dataTable: {
    width: '100%',
    marginBottom: 20,
  },
  tablecontainer: {
    flex: 1,
    // backgroundColor: White,
    marginTop: 5,
    marginBottom: 10
  },

  tableHeader1: {
    height: 25,
    // backgroundColor: PrimaryAshPurple,
  },
  tableHeader: {
    height: 25,
    // backgroundColor: PrimaryAshPurple
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    // color: PrimaryBlue
  },
  tableRow: {
    height: 35,
    // backgroundColor: SecondaryAshPurple
  },
  tableRowText: {
    textAlign: 'center',
    fontSize: 10
  },
  totalNetPayableText: {
    fontSize: 12,
    padding: 15,
    fontWeight: '700',
    borderLeftWidth: 4,
    borderColor: '#0A62F1',
  },
  buttonstyles: {
    width: 136,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#0A62F1",
    alignContent: "center",
    marginBottom: 50,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: "#fff",
    fontWeight: '600',
    fontSize: 16,
  }
});

export default styles;