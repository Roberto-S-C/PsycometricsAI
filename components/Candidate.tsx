import Colors from '@/constants/Colors'
import { globalStyles } from '@/styles/globalStyles'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    candidate: {
        id: number
        name: string
        score: number
        testDate: string
    }
}

const Candidate = ({candidate}: Props) => {
  return (
    <View style={globalStyles.border}>
        <Text style={{color: Colors.lightBlue}}>{candidate.name}</Text>
        <View style={styles.info}>
            <Text style={{color: Colors.darkGrey}}>Score: {candidate.score}</Text>
            <Text style={{color: Colors.darkGrey}}>{candidate.testDate}</Text>     
        </View> 
    </View>
  )
}

export default Candidate

const styles = StyleSheet.create({
    info: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 5,
    }
})


