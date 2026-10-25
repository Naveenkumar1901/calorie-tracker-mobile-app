import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, MotiView } from 'moti';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { homeEntry, type NavEntry, navGroups } from './navItems';
const logo = require('../../../assets/logo/favicon.svg');

interface DrawerMenuProps {
  visible: boolean;
  activeKey: string;
  userName: string;
  userRole: string;
  onClose: () => void;
  onSelect: (entry: NavEntry) => void;
  onSignOut: () => void;
}

interface MenuRowProps {
  entry: NavEntry;
  active: boolean;
  onPress: (entry: NavEntry) => void;
}

function MenuRow({ entry, active, onPress }: MenuRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        active && styles.rowActive,
        pressed && styles.rowPressed,
      ]}
      onPress={() => onPress(entry)}
    >
      {active && <View style={styles.rowBar} />}
      <Ionicons
        name={entry.icon}
        size={19}
        color={active ? colors.primary : colors.textMuted}
      />
      <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>
        {entry.label}
      </Text>
    </Pressable>
  );
}

export function DrawerMenu({
  visible,
  activeKey,
  userName,
  userRole,
  onClose,
  onSelect,
  onSignOut,
}: DrawerMenuProps) {

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const panelWidth = Math.min(width * 0.76, 285);
  const initials = userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  return (
    <AnimatePresence>
      {visible && 
      (<View key="drawer" style={StyleSheet.absoluteFill}>
          <MotiView
            style={styles.backdrop}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing', duration: 200 }}
          >
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          </MotiView>
          <MotiView
            style={[styles.panel, { width: panelWidth }]}
            from={{ translateX: -panelWidth }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -panelWidth }}
            transition={{ type: 'timing', duration: 240 }}
          >
            <LinearGradient
              colors={[colors.primary, colors.brandMid, colors.brandDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.panelHeader, { paddingTop: insets.top + 14 }]}
            >
              <View style={styles.logoBox}>
                <Image source={logo} style={styles.logo} contentFit="contain" />
              </View>
              <View style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View style={styles.userText}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {userName}
                  </Text>
                  <Text style={styles.userRole} numberOfLines={1}>
                    {userRole}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <ScrollView
              style={styles.menu}
              contentContainerStyle={styles.menuContent}
              showsVerticalScrollIndicator={false}
            >
              <MenuRow
                entry={homeEntry}
                active={activeKey === homeEntry.key}
                onPress={onSelect}
              />
              {navGroups.map((group) => (
                <View key={group.key} style={styles.group}>
                  {group.entries.map((entry) => (
                    <MenuRow
                      key={entry.key}
                      entry={entry}
                      active={activeKey === entry.key}
                      onPress={onSelect}
                    />
                  ))}
                </View>
              ))}
            </ScrollView>
            <Pressable
              style={[
                styles.signOut,
                { paddingBottom: insets.bottom + 12 },
              ]}
              onPress={onSignOut}
            >
              <Ionicons
                name="log-out-outline"
                size={19}
                color={colors.primary}
              />
              <Text style={styles.signOutLabel}>Sign out</Text>
            </Pressable>
          </MotiView>
        </View>
      )}
    </AnimatePresence>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.5)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.white,
    shadowColor: colors.brandDeep,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
    elevation: 16,
  },
  panelHeader: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    gap: 14,
    borderBottomRightRadius: 20,
  },
  logoBox: {
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  logo: {
    width: 108,
    height: 27,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  avatarText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  userText: {
    flex: 1,
  },
  userName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  userRole: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    marginTop: 1,
  },
  menu: {
    flex: 1,
    backgroundColor: colors.white,
  },
  menuContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  group: {
    marginTop: 10,
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginVertical: 2,
    borderRadius: 11,
    backgroundColor: 'transparent',
  },
  rowActive: {
    backgroundColor: '#EAF7F1',
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowBar: {
    position: 'absolute',
    left: 0,
    top: 7,
    bottom: 7,
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  rowLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  rowLabelActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  signOutLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});