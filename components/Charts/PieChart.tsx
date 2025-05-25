import Colors from '@/constants/Colors'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const data = [
    {
        name: 'Leadership',
        population: 20,
        color: 'red',
        legendFontColor: Colors.darkBlue,
        legendFontSize: 16,
    },
    {
        name: 'Teamwork',
        population: 23,
        color: 'blue',
        legendFontColor: Colors.darkBlue,
        legendFontSize: 16,
    },
    {
        name: 'Communication',
        population: 47,
        color: 'orange',
        legendFontColor: Colors.darkBlue,
        legendFontSize: 16,
    },
    {
        name: 'Problem Solving',
        population: 10,
        color: 'yellow',
        legendFontColor: Colors.darkBlue,
        legendFontSize: 16,
    },
]

const chartConfig = {
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    color: (opacity = 1) => `rgba(115, 213, 228, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(15, 71, 106, ${opacity})`,
}

const PieChartComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Candiates Skills</Text>
            <PieChart
                data={data}
                width={screenWidth * 0.95}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    )
}

export default PieChartComponent

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
})