import registerRequest from '@/authentication/registerRequest';
import SocialButton from '@/components/Buttons/SocialButton';
import Loading from '@/components/Loading'; // Import the Loading component
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [registerError, setRegisterError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const { register, loginWithGoogle, loginWithMicrosoft, isAuthenticated, tokens, isLoading } = useAuth(); // Use isLoading from AuthContext
  const router = useRouter();

  // Redirect to home if authenticated and tokens exist
  useEffect(() => {
    if (isAuthenticated && tokens) {
      router.replace('/(protected)/(tabs)/');
    }
  }, [isAuthenticated, tokens, router]);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setRegisterError('');
      setEmailError('');

      const tokens = await registerRequest(data);
      await register(tokens);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error instanceof Error && error.message === 'Email already registered') {
        setEmailError(error.message);
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setRegisterError('');
      await loginWithGoogle(); // Use loginWithGoogle from AuthContext
    } catch (error) {
      console.error('Google sign-up failed:', error);
      setRegisterError('Google sign-up failed');
    }
  };

  const handleMicrosoftRegister = async () => {
    try {
      setRegisterError('');
      await loginWithMicrosoft(); // Use loginWithMicrosoft from AuthContext
    } catch (error) {
      console.error('Microsoft sign-up failed:', error);
      setRegisterError('Microsoft sign-up failed');
    }
  };

  if (isLoading) {
    return <Loading />; // Show the Loading component while loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <View style={styles.socialButtons}>
        <SocialButton
          onPress={handleGoogleRegister} // Use the Google register handler
          imagePath={require('@/assets/images/icons/google_logo.png')}
          provider="Google"
        />
        <SocialButton
          onPress={handleMicrosoftRegister} // Use the Microsoft register handler
          imagePath={require('@/assets/images/icons/microsoft_logo.png')}
          provider="Microsoft"
        />
      </View>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={[styles.input, (errors.email || emailError) && styles.inputError]}
                placeholder="Email"
                placeholderTextColor={Colors.darkGrey}
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={(text) => {
                  setEmailError('');
                  onChange(text);
                }}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
              {emailError && !errors.email && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
            </View>
          )}
        />
        
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }, errors.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={Colors.darkGrey}
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
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
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input, 
                    { flex: 1 }, 
                    (errors.confirmPassword || registerError) && styles.inputError
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.darkGrey}
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  onChangeText={(text) => {
                    setRegisterError('');
                    onChange(text);
                  }}
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
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}
              {registerError && !errors.confirmPassword && (
                <Text style={styles.errorText}>{registerError}</Text>
              )}
            </View>
          )}
        />
      </View>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleSubmit(handleRegister)}
      >
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
  );
};

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
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
})