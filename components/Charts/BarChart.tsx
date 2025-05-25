import Colors from '@/constants/Colors'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const data = {
    labels: ['Completed', 'Unfinished'],
    datasets: [
        {
            data: [68, 32],
        },
    ],
}

const chartConfig = {
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    color: (opacity = 1) => `rgba(115, 213, 228, ${opacity})`,
    barPercentage: 1,
    labelColor: (opacity = 1) => `rgba(15, 71, 106, ${opacity})`,
}

const BarChartComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Test Completion</Text>
            <BarChart
                data={data}
                width={screenWidth * 0.95}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
                yAxisLabel=""
                yAxisSuffix=""
            />
        </View>
    )
}

export default BarChartComponent

const styles = StyleSheet.create({
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 8,
    },
    container: {
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
    },
    chart: {
        borderRadius: 16,
    },
})