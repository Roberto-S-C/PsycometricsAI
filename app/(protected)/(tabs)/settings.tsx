import SettingItem from '@/components/Settings/SettingItem';
import { useAuth } from '@/contexts/AuthContext';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const settings = () => {
  const { logout } = useAuth(); // Correctly destructure the logout function

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.screen, { flex: 1 }]}>
      <View style={styles.itemsContainer}>
        <SettingItem
          Icon={(props) => <Ionicons name="notifications-outline" {...props} />}
          title="Notifications"
        />
        <SettingItem
          Icon={(props) => <Ionicons name="star-outline" {...props} />}
          title="Rate App"
        />
        <SettingItem
          Icon={(props) => <Ionicons name="lock-closed-outline" {...props} />}
          title="Privacy Policy"
        />
        <SettingItem
          Icon={(props) => <Ionicons name="document-outline" {...props} />}
          title="Terms and Conditions"
        />
        <SettingItem
          Icon={(props) => <Ionicons name="mail-outline" {...props} />}
          title="Contact"
        />
        <SettingItem
          Icon={(props) => <Ionicons name="exit-outline" {...props} />}
          title="Logout"
          onPress={handleLogout} // Attach the handleLogout function
        />
      </View>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
});