import { FitnessLoader } from "@/shared/components/fitness-loader";
import { colors } from "@/shared/constants/colors";
import { type Href, router } from "expo-router";
import { AnimatePresence } from "moti";
import { type ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppHeader } from "./AppHeader";
import { DrawerMenu } from "./DrawerMenu";
import type { NavEntry } from "./navItems";

interface AppLayoutProps {
  title: string;
  activeKey: string;
  caption?: string;
  onBack?: () => void;
  children: ReactNode;
}

const mockUser = {
  name: "Signed-in user",
  role: "Health & Fitness",
};

export function AppLayout({
  title,
  activeKey,
  caption,
  onBack,
  children,
}: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const selectEntry = (entry: NavEntry) => {
    closeMenu();

    if (entry.route && entry.key !== activeKey) {
      router.replace(entry.route as Href);
    }
  };

  const signOut = () => {
    closeMenu();
    router.replace("/");
  };

  return (
    <View style={styles.root}>
      <AppHeader
        title={title}
        caption={caption}
        onMenuPress={() => setMenuOpen(true)}
        onBackPress={onBack}
      />
      <View style={styles.body}>{children}</View>
      <DrawerMenu
        visible={menuOpen}
        activeKey={activeKey}
        userName={mockUser.name}
        userRole={mockUser.role}
        onClose={closeMenu}
        onSelect={selectEntry}
        onSignOut={signOut}
      />
      <AnimatePresence>
        {loading && <FitnessLoader key="loader" />}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
