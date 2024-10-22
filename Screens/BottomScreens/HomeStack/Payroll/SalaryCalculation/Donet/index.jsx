import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { PieChart, } from 'react-native-chart-kit';
import { Svg, Circle } from 'react-native-svg';


const DonutChart = ({ gpay, npay, deduction }) => {

  const chart = [
    {
      name: 'Gross Pay',
      population: gpay,
      color: '#0A63F2',
      legendFontColor: '#3A3A3A',
      legendFontSize: 16,
    },
    {
      name: 'Net Pay',
      population: npay,
      color: '#F20A8C',
      legendFontColor: '#3A3A3A',
      legendFontSize: 16,
    },
    {
      name: 'Deduction',
      population: deduction,
      color: '#3B609D',
      legendFontColor: '#3A3A3A',
      legendFontSize: 16,
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 220;
  const centerX = screenWidth / 2.11;
  const centerY = chartHeight / 2.11;
  const holeRadius = 60; // Adjust the size of the hole

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        {
          gpay && npay && deduction ?
            <PieChart
              data={chart}
              width={screenWidth}
              height={chartHeight}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              center={[100, 0]} // Center the chart properly
              absolute
              hasLegend={false}
            /> :
            <Text style={styles.topic}>No Data Found For Chart</Text>
        }
        {/* <Svg height={chartHeight} width={screenWidth} style={styles.svgContainer}>
          <Circle cx={centerX} cy={centerY} r={holeRadius} fill="white" />
        </Svg> */}
      </View>
      <View style={styles.legendContainer}>
        {chart.map((item, index) => (
          <View key={index} style={{}}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name} - Rs.{item.population.toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  topic: {
    color: '#00275C',
    fontWeight: '700',
    fontSize: 20,
    paddingVertical:'10%'
  },

  container: {
    alignItems: 'center',
  },

  chartWrapper: {
    position: 'relative',
  },

  svgContainer: {
    position: 'absolute',
    top: 6,
    left: -1,
    // top: 0,
    // left: 0,
  },

  legendContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // marginTop: 10,
    // justifyContent: 'center',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },

  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 15,
  },

  legendText: {
    fontSize: 16,
    marginVertical: '3%',
    color: '#7F7F7F',
  },

});

export default DonutChart;
