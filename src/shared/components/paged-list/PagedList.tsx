import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import type { ReactElement, ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/constants/colors';
import type { PagedResult } from '@/shared/paging/usePagedList';

interface PagedListProps<T, M> {
  list: PagedResult<T, M>;
  renderItem: (item: T, index: number) => ReactElement;
  keyExtractor: (item: T) => string;
  header?: ReactNode;
  emptyIcon?: keyof typeof Ionicons.glyphMap;
  emptyText?: string;
  bottomInset?: number;
}

function SkeletonCard() {
  return (
    <MotiView style={styles.skeleton} from={{ opacity: 0.45 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 700, loop: true }}>
      <View style={[styles.bar, { width: '38%' }]} />
      <View style={[styles.bar, { width: '70%', height: 14 }]} />
      <View style={[styles.bar, { width: '55%' }]} />
      <View style={[styles.bar, { width: '100%', height: 34 }]} />
    </MotiView>
  );
}

export function PagedList<T, M = undefined>({ list, renderItem, keyExtractor, header, emptyIcon = 'file-tray-outline', emptyText = 'No records found', bottomInset = 90 }: PagedListProps<T, M>) {
  const insets = useSafeAreaInsets();

  const footer = list.isFetchingNextPage ? (
    <View style={styles.footer}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.footerText}>Loading more…</Text>
    </View>
  ) : list.items.length > 0 && !list.hasNextPage ? (
    <Text style={styles.end}>You have reached the end · {list.total.toLocaleString('en-IN')} records</Text>
  ) : null;

  const empty = list.isLoading ? (
    <View style={styles.skeletons}>
      {[0, 1, 2, 3].map((index) => <SkeletonCard key={index} />)}
    </View>
  ) : (
    <View style={styles.empty}>
      <Ionicons name={emptyIcon} size={36} color={colors.placeholder} />
      <Text style={styles.emptyText}>{list.isError ? 'Could not load the records' : emptyText}</Text>
    </View>
  );

  return (
    <FlashList
      data={list.items}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => <View style={styles.item}>{renderItem(item, index)}</View>}
      onEndReached={list.fetchNextPage}
      onEndReachedThreshold={0.6}
      refreshing={list.isRefetching}
      onRefresh={list.refetch}
      ListHeaderComponent={header ? <View>{header}</View> : undefined}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      contentContainerStyle={{ paddingBottom: bottomInset + insets.bottom }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  item: { paddingHorizontal: 14, paddingBottom: 10 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  footerText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  end: { textAlign: 'center', color: colors.placeholder, fontSize: 11, paddingVertical: 16 },
  skeletons: { gap: 10, paddingHorizontal: 14 },
  skeleton: { gap: 8, padding: 14, borderRadius: 14, backgroundColor: colors.white },
  bar: { height: 10, borderRadius: 5, backgroundColor: '#e5e8ec' },
  empty: { alignItems: 'center', gap: 8, paddingVertical: 50, marginHorizontal: 14, borderRadius: 16, backgroundColor: colors.white },
  emptyText: { color: colors.textMuted, fontSize: 14 },
});
