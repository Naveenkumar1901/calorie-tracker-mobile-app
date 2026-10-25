import { FormField, GradientButton, Input } from '@/shared/components';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const logo = require('../../../assets/logo/favicon.svg');

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    router.replace('/home');
  };

  return (
    <LinearGradient
      colors={['#0B8F5A', '#087A68', '#064C59']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 24,
              paddingBottom: insets.bottom + 24,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <MotiView
              from={{ opacity: 0, translateY: -15 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 500 }}
              style={styles.brandSection}
            >
              <View style={styles.logoBox}>
                <Image source={logo} style={styles.logo} contentFit="contain" />
              </View>
              <View style={styles.pill}>
                <View style={styles.pillDot} />
                <Text style={styles.pillText}>FITNESS • HEALTH • NUTRITION</Text>
              </View>
              <Text style={styles.headline}>
                Track your{'\n'}
                <Text style={styles.headlineHighlight}>health journey.</Text>
              </Text>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 550, delay: 100 }}
              style={styles.formWrapper}
            >
              <View style={styles.card}>
                <Text style={styles.title}>Welcome back 👋</Text>
                <Text style={styles.subtitle}>Sign in to continue tracking your progress.</Text>
                <FormField label="Mobile Number">
                  <Input
                    icon="phone-portrait-outline"
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={10}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                  />
                </FormField>
                <FormField label="Password">
                  <Input
                    icon="lock-closed-outline"
                    password
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={submit}
                    returnKeyType="go"
                  />
                </FormField>
                <GradientButton title="Sign in" onPress={submit} />
                <View style={styles.healthInfo}>
                  <View style={styles.healthIcon}>
                    <Text style={styles.healthIconText}>✓</Text>
                  </View>
                  <View style={styles.healthTextContainer}>
                    <Text style={styles.healthTitle}>Automatic activity tracking</Text>
                    <Text style={styles.healthSubtitle}>
                      Track your steps and daily activity after signing in
                    </Text>
                  </View>
                </View>
              </View>
            </MotiView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    paddingHorizontal: 18,
  },
  brandSection: {
    paddingHorizontal: 6,
    paddingBottom: 24,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#064C59',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },
  logo: {
    width: 56,
    height: 56,
  },
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 12,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C8FF35',
    marginRight: 7,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  headlineHighlight: {
    color: '#C8FF35',
  },
  description: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    maxWidth: 330,
  },
  formWrapper: {
    width: '100%',
    zIndex: 10,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DCEDE6',
    shadowColor: '#064C59',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 14,
  },
  title: {
    color: '#064C59',
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 5,
  },
  subtitle: {
    color: '#71807D',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  healthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 11,
    borderRadius: 13,
    backgroundColor: '#EAF7F1',
    borderWidth: 1,
    borderColor: '#DCEDE6',
  },
  healthIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B8F5A',
    marginRight: 10,
  },
  healthIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  healthTextContainer: {
    flex: 1,
  },
  healthTitle: {
    color: '#064C59',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthSubtitle: {
    color: '#71807D',
    fontSize: 10,
    lineHeight: 14,
  },
});