import SocialButton from '@/components/Buttons/SocialButton'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <View style={styles.socialButtons}>
        <SocialButton
          onPress={() => console.log('Google signup')}
          imagePath={require('@/assets/images/icons/google_logo.png')}
          provider="Google"
        />
        <SocialButton
          onPress={() => console.log('Microsoft signup')}
          imagePath={require('@/assets/images/icons/microsoft_logo.png')}
          provider="Microsoft"
        />
        <SocialButton
          onPress={() => console.log('LinkedIn signup')}
          imagePath={require('@/assets/images/icons/linkedin_logo.png')}
          provider="LinkedIn"
        />
      </View>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={Colors.darkGrey}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.darkGrey}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={Colors.darkGrey}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={Colors.darkGrey}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.darkGrey}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={Colors.darkGrey}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.creamWhite,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 40,
  },
  socialButtons: {
    width: '100%',
    gap: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  orText: {
    color: Colors.darkGrey,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    gap: 10,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  continueButton: {
    width: '100%',
    backgroundColor: Colors.darkBlue,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: Colors.darkGrey,
    fontSize: 16,
  },
  signInText: {
    color: Colors.lightBlue,
    fontSize: 16,
  },
})