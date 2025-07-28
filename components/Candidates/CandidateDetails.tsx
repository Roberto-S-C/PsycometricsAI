import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CandidateDetails = ({ candidate }: { candidate: Candidate }) => {
    const router = useRouter();

    const handleViewResume = () => {
        if (!candidate.cv) {
            console.error('Resume URL is missing.');
            return;
        }

        router.push({
            pathname: '/candidates/resume',
            params: { url: candidate.cv },
        });
    };

    if (!candidate) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Candidate details are not available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <View style={styles.row}>
                    <Text style={styles.name} ellipsizeMode="tail">
                        {candidate.first_name} {candidate.last_name}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{candidate.gender || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{candidate.age || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{candidate.email || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>{candidate.phone || 'N/A'}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleViewResume}>
                <Image
                    source={require('@/assets/images/icons/pdf_icon.png')}
                    style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>View Resume</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CandidateDetails;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.creamWhite,
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
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.lightBlue,
        marginRight: 5,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkGrey,
        marginRight: 8,
    },
    value: {
        fontSize: 18,
        color: Colors.darkBlue,
    },
    errorContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: Colors.red,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        width: '65%',
        padding: 12,
        borderWidth: 2,
        borderColor: Colors.darkGrey,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonIcon: {
        width: 35,
        height: 35,
        marginRight: 8,
    },
    buttonText: {
        fontSize: 22,
        color: Colors.lightBlue,
        fontWeight: 'bold',
    },
});