import { signup } from '@/src/api/auth';
import AuthHeader from '@/src/components/AuthHeader';
import Button from '@/src/components/Button';
import Checkbox from '@/src/components/Checkbox';
import Input from '@/src/components/Input';
import Separator from '@/src/components/Separator';
import { GlobalContext } from '@/src/libs/global-provider';
import { styles } from '@/src/styles/auth/sign-in.style';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function SignUp() {
  const { setUser } = useContext(GlobalContext);
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (key: keyof typeof values, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const onBack = () => {
    router.back();
  };

  const onSubmit = async () => {
    try {
      if (!values?.fullName || !values?.email || !values?.password || !values?.confirmPassword) {
        Alert.alert('All fields are required');
        return;
      }

      if (values?.password !== values?.confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      if (!checked) {
        Alert.alert('Please agree to the terms');
        return;
      }
      const token = await signup(values);
      if (!token) {
        Alert.alert('Invalid credentials');
        return;
      }
      setUser({ token: token });
      router.push('/(root)/(tabs)/home');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const onSignIn = () => {
    router.push('/(root)/(auth)/sign-in');
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader
        onBackPress={onBack}
        title="Sign Up"
      />

      <Input
        value={values.fullName}
        onChangeText={(v) => onChange('fullName', v)}
        label="Name"
        placeholder="John Doe"
        type="text"
      />
      <Input
        value={values.email}
        onChangeText={(v) => onChange('email', v)}
        label="E-mail"
        placeholder="example@gmail.com"
        type="email"
      />
      <Input
        value={values.password}
        onChangeText={(v) => onChange('password', v)}
        isPassword
        label="Password"
        placeholder="*******"
        type="password"
      />
      <Input
        value={values.confirmPassword}
        onChangeText={(v) => onChange('confirmPassword', v)}
        isPassword
        label="Confirm Password"
        placeholder="*******"
        type="password"
      />

      <View style={styles.agreeRow}>
        <Checkbox
          checked={checked}
          onCheck={setChecked}
        />
        <Text style={styles.agreeText}>
          I agree with <Text style={styles.agreeTextBold}>Terms</Text> &{' '}
          <Text style={styles.agreeTextBold}>Privacy</Text>
        </Text>
      </View>

      <Button
        onPress={onSubmit}
        style={styles.button}
        title="Sign Up"
      />

      <Separator text="Or sign up with" />

      {/* <GoogleLogin /> */}
      <Button
        onPress={onSubmit}
        style={styles.button}
        title="Sign In with Google"
      />

      <Text style={styles.footerText}>
        Already have an account?
        <Text
          onPress={onSignIn}
          style={styles.footerLink}>
          {' '}
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
}
