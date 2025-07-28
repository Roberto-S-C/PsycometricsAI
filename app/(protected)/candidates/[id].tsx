import Button from '@/components/Buttons/Button';
import CandidateDetails from '@/components/Candidates/CandidateDetails';
import ProgressChartComponent from '@/components/Charts/ProgressChart';
import Loading from '@/components/Loading';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/styles/globalStyles';
import getCandidate from '@/utils/getCandidate';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Candidate = () => {
  const { id } = useLocalSearchParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCandidate(id as string) // Fetch candidate details using the extracted ID
        .then((data) => {
          setCandidate(data);
        })
        .catch((error) => {
          console.error('Failed to fetch candidate:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={[globalStyles.screen, { flex: 1 }]}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.screen, { flex: 1 }]}>
      <View style={styles.container}>
        <CandidateDetails candidate={candidate} />

        <View>
          <ProgressChartComponent />
        </View>

        <View style={styles.buttons}>
          <View style={{ flex: 1 }}>
            <Button
              content="Accept"
              buttonColor={Colors.white}
              textColor={Colors.lightBlue}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              content="Discard"
              buttonColor={Colors.red}
              textColor={Colors.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Candidate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    width: '95%',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
});