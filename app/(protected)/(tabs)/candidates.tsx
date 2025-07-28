import FilterButton from '@/components/Buttons/FilterButton';
import SortButton from '@/components/Buttons/SortButton';
import CandidatePreview from '@/components/Candidates/CandidatePreview';
import SearchBar from '@/components/SearchBar';
import { globalStyles } from '@/styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const CandidatesScreen = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Retrieve the stored token
        const tokenString = await AsyncStorage.getItem('tokens');
        if (!tokenString) throw new Error('No token found');

        const { data } = JSON.parse(tokenString); // Parse the token
        const accessToken = data.access; // Extract the access token

        // Make the API request
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/hrs/candidates/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        });

        setCandidates(response.data); // Update the candidates state with the fetched data
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates. Please try again.');
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[globalStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <SearchBar />
        </View>

        <View style={styles.buttonsContainer}>
          <SortButton />
          <FilterButton />
        </View>

        <FlatList
          data={candidates}
          renderItem={({ item }) => <CandidatePreview key={item._id} candidate={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default CandidatesScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    gap: 5,
  },
});