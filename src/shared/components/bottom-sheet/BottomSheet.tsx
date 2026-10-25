import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/constants/colors';

interface BottomSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  fullHeight?: boolean;
}

export function BottomSheet({ visible, title, onClose, children, footer, scroll = true, fullHeight }: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal transparent statusBarTranslucent animationType="none" visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <MotiView style={styles.backdrop} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 180 }}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </MotiView>
        <MotiView
          style={[styles.panel, fullHeight ? styles.panelFull : styles.panelAuto, { paddingBottom: insets.bottom }]}
          from={{ translateY: 500 }}
          animate={{ translateY: 0 }}
          transition={{ type: 'timing', duration: 220 }}
        >
          <View style={styles.grabber} />
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeButton}>
              <Ionicons name="close" size={18} color={colors.textMuted} />
            </Pressable>
          </View>
          {scroll ? (
            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          ) : (
            <View style={styles.bodyFixed}>{children}</View>
          )}
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </MotiView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...(StyleSheet.absoluteFill as object), backgroundColor: 'rgba(17,24,39,0.5)' },
  panel: { backgroundColor: colors.white, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  panelAuto: { maxHeight: '88%' },
  panelFull: { height: '88%' },
  grabber: { alignSelf: 'center', width: 38, height: 4, borderRadius: 2, marginTop: 8, backgroundColor: colors.border },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 12 },
  title: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '800' },
  closeButton: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2f4' },
  body: { flexGrow: 0 },
  bodyContent: { paddingHorizontal: 18, paddingBottom: 16 },
  bodyFixed: { flex: 1, paddingHorizontal: 18 },
  footer: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingTop: 12, paddingBottom: 14, borderTopWidth: 1, borderTopColor: colors.border },
});
