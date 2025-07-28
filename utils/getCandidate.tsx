import axios from 'axios';

const getCandidate = async (candidateId: string) => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/candidates/${candidateId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

export default getCandidate;