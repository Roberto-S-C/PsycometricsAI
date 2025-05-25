import Colors from '@/constants/Colors'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const data = {
  labels: ['Communication', 'Adaptability'],
  data: [0.5, 0.7],
}

const chartConfig = {
  backgroundGradientFrom: Colors.white,
  backgroundGradientTo: Colors.white,
  color: (opacity = 1) => `rgba(115, 213, 228, ${opacity})`, // #73D5E4
  labelColor: (opacity = 1) => Colors.darkBlue,
  strokeWidth: 12,
  barPercentage: 1,
  useShadowColorFromDataset: false,
}

const ProgressChartComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills</Text>
      <ProgressChart
        data={data}
        width={screenWidth * 0.90}
        height={200}
        strokeWidth={16}
        radius={60}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  )
}

export default ProgressChartComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 8,
  },
})