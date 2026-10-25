import { installInterceptors } from '@/services/api/interceptors';
import { ResultPopup } from '@/shared/components';
import { queryClient } from '@/shared/config/queryClient';
import { colors } from '@/shared/constants/colors';
import { store } from '@/store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

installInterceptors(store);

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
  },
};

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            {children}
            <ResultPopup />
          </PaperProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
