import { FormField, GradientButton, Input } from '@/shared/components';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FitnessBackground } from './components/fitnessBackground';

const logo = require('../../../assets/logo/favicon.svg');

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!mobileNumber || !password) {
      return;
    }

    router.replace('/home');
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0B8F5A', '#087A68', '#064C59']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <FitnessBackground />

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
              paddingBottom: insets.bottom + 30,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <MotiView
              from={{
                opacity: 0,
                translateY: -15,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                scale: 1,
              }}
              transition={{
                type: 'timing',
                duration: 600,
              }}
              style={styles.brandSection}
            >
              <View style={styles.logoBox}>
                <Image
                  source={logo}
                  style={styles.logo}
                  contentFit="contain"
                />
              </View>
              <View style={styles.pill}>
                <View style={styles.pillDot} />
                <Text style={styles.pillText}>
                  FITNESS • HEALTH • NUTRITION
                </Text>
              </View>
              <Text style={styles.headline}>
                Track your{'\n'}
                <Text style={styles.headlineHighlight}>
                  health journey.
                </Text>
              </Text>
              <Text style={styles.description}>
                Track calories, macros, steps and daily activity — all in one
                place.
              </Text>
            </MotiView>
            <MotiView
              from={{
                opacity: 0,
                translateY: 30,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                type: 'timing',
                duration: 650,
                delay: 150,
              }}
              style={styles.formWrapper}
            >
              <View style={styles.card}>
                <Text style={styles.title}>
                  Welcome back 👋
                </Text>
                <Text style={styles.subtitle}>
                  Sign in to continue tracking your progress.
                </Text>
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
                <GradientButton
                  title="Sign in"
                  onPress={submit}
                />
                <View style={styles.healthInfo}>
                  <View style={styles.healthIcon}>
                    <Text style={styles.healthIconText}>
                      ✓
                    </Text>
                  </View>
                  <View style={styles.healthTextContainer}>
                    <Text style={styles.healthTitle}>
                      Automatic activity tracking
                    </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#064C59',
  },

  keyboardView: {
    flex: 1,
    zIndex: 2,
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
    paddingBottom: 26,
  },

  logoBox: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#003F38',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 8,
  },

  logo: {
    width: 64,
    height: 64,
  },

  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    marginBottom: 14,
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
    letterSpacing: 0.8,
  },

  headline: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },

  headlineHighlight: {
    color: '#C8FF35',
  },

  description: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 330,
  },

  formWrapper: {
    width: '100%',
    zIndex: 10,
    elevation: 10,
  },

  card: {
    width: '100%',
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E4F1EC',
    shadowColor: '#003F38',
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 12,
    zIndex: 10,
  },

  title: {
    color: '#064C59',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 6,
  },

  subtitle: {
    color: '#71807D',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: -5,
    marginBottom: 18,
  },

  forgotText: {
    color: '#087A68',
    fontSize: 13,
    fontWeight: '700',
  },

  healthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F0FAF5',
    borderWidth: 1,
    borderColor: '#D8EFE4',
  },

  healthIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B8F5A',
    marginRight: 11,
  },

  healthIconText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  healthTextContainer: {
    flex: 1,
  },

  healthTitle: {
    color: '#064C59',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },

  healthSubtitle: {
    color: '#7A8985',
    fontSize: 11,
    lineHeight: 15,
  },

  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#91A09C',
    fontSize: 11,
    lineHeight: 16,
  },
});