import Colors from '@/constants/Colors';
import { globalStyles } from '@/styles/globalStyles';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  candidate: {
    _id: string;
    first_name: string;
    last_name: string;
    age: string;
    gender: string;
  };
};

const CandidatePreview = ({ candidate }: Props) => {
  return (
    <Link style={[globalStyles.border, styles.container]} href={`/candidates/${candidate._id}`}>
      <View>
        <View style={styles.row}>
          <Text style={styles.name} ellipsizeMode="tail">
            {candidate.first_name} {candidate.last_name}
          </Text>
        </View>

        {/* Gender */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{candidate.gender}</Text>
        </View>

        {/* Age */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{candidate.age}</Text>
        </View>
      </View>
    </Link>
  );
};

export default CandidatePreview;

const styles = StyleSheet.create({
  container: {
    width: '98%',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.lightBlue,
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGrey,
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: Colors.darkBlue,
  },
});


