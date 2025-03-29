import AuthHeader from '@/src/components/AuthHeader';
import Input from '@/src/components/Input';
import Separator from '@/src/components/Separator';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/src/styles/auth/sign-in.style';
import Button from '@/src/components/Button';
import { GlobalContext } from '@/src/libs/global-provider';
import { login } from '@/src/api/auth';
type SignInProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [values, setValues] = useState<SignInProps>({
    email: '',
    password: '',
  });
  const { setUser } = useContext(GlobalContext);
  const router = useRouter();

  const onSignUp = () => {
    router.push('/(root)/(auth)/sign-up');
  };

  const onBack = () => {
    router.back();
  };

  const onChange = (key: keyof SignInProps, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    const token = await login(values);
    if (!token) {
      Alert.alert('Invalid credentials');
      return;
    }
    setUser({ token: token });
    router.push('/(root)/(tabs)/home');
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader
        onBackPress={onBack}
        title="Sign In"
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

      <Button
        onPress={onSubmit}
        style={styles.button}
        title="Sign In"
      />

      <Separator text="Or sign in with" />

      {/* <GoogleLogin /> */}
      <Button
        onPress={onSubmit}
        style={styles.button}
        title="Sign In with Google"
      />

      <Text style={styles.footerText}>
        Don't have an account?
        <Text
          onPress={onSignUp}
          style={styles.footerLink}>
          {' '}
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
}
