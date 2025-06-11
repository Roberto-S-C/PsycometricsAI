import loginRequest from '@/authentication/loginRequest'
import SocialButton from '@/components/Buttons/SocialButton'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const handleLogin = async () => {
    try {
      const response = await loginRequest({ email, password })
      console.log('Login successful:', response)
      // TODO: Store tokens and redirect
    } catch (error) {
      console.error('Login failed:', error)
      // TODO: Show error message to user
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
      <View style={styles.socialButtons}>
        <SocialButton
          onPress={() => console.log('Google login')}
          imagePath={require('@/assets/images/icons/google_logo.png')}
          provider="Google"
        />
        <SocialButton
          onPress={() => console.log('Microsoft login')}
          imagePath={require('@/assets/images/icons/microsoft_logo.png')}
          provider="Microsoft"
        />
        <SocialButton
          onPress={() => console.log('LinkedIn login')}
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
          placeholder="Email"
          placeholderTextColor={Colors.darkGrey}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={Colors.darkGrey}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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
      </View>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleLogin}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.creamWhite,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32, // Made slightly bigger since it's now the main header
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 40, // Increased spacing
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
  signUpText: {
    color: Colors.lightBlue,
    fontSize: 16,
  },
})