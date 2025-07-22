import SocialButton from '@/components/Buttons/SocialButton';
import Loading from '@/components/Loading'; // Adjust the import based on your project structure
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

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const { login, loginWithMicrosoft, loginWithGoogle, isAuthenticated, tokens, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to home if authenticated and tokens exist
  useEffect(() => {
    if (isAuthenticated && tokens) {
      router.replace('/(protected)/(tabs)/');
    }
  }, [isAuthenticated, tokens, router]);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setLoginError('');
      await login({ data }); // Use login from AuthContext
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      await loginWithGoogle(); // Use loginWithGoogle from AuthContext
    } catch (error) {
      console.error('Google login failed:', error);
      setLoginError('Google login failed');
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setLoginError('');
      await loginWithMicrosoft(); // Use loginWithMicrosoft from AuthContext
    } catch (error) {
      console.error('Microsoft login failed:', error);
      setLoginError('Microsoft login failed');
    }
  };

  if (isLoading) {
    return <Loading />; // Show the Loading component while loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.socialButtons}>
        <SocialButton
          onPress={handleGoogleLogin} // Use the Google login handler
          imagePath={require('@/assets/images/icons/google_logo.png')}
          provider="Google"
        />
        <SocialButton
          onPress={handleMicrosoftLogin} // Use the Microsoft login handler
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
                style={[styles.input, (errors.email || loginError) && styles.inputError]}
                placeholder="Email"
                placeholderTextColor={Colors.darkGrey}
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={(text) => {
                  setLoginError('');
                  onChange(text);
                }}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
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
                  style={[styles.input, { flex: 1 }, (errors.password || loginError) && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={Colors.darkGrey}
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={(text) => {
                    setLoginError('');
                    onChange(text);
                  }}
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
              {loginError && !errors.password && (
                <Text style={styles.errorText}>{loginError}</Text>
              )}
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleSubmit(handleLogin)}
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
  );
};

export default Login;

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
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});