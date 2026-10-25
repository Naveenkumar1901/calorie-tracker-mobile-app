import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BottomSheet } from '@/shared/components/bottom-sheet';
import { Field } from '@/shared/components/field';
import { colors } from '@/shared/constants/colors';

export interface SelectOption {
  label: string;
  value: string;
  hint?: string;
  color?: string;
}

interface SelectFieldProps {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
}

export function SelectField({ label, value, options, onChange, placeholder, required, error, hint, disabled, clearable, searchable }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = options.find((option) => option.value === value);
  const showSearch = searchable ?? options.length > 7;

  const visibleOptions = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? options.filter((option) => `${option.label} ${option.hint ?? ''}`.toLowerCase().includes(term)) : options;
  }, [options, search]);

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  const choose = (next: string) => {
    onChange(next);
    close();
  };

  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <Pressable style={[styles.trigger, !!error && styles.triggerError, disabled && styles.triggerDisabled]} disabled={disabled} onPress={() => setOpen(true)}>
        {selected?.color ? <View style={[styles.dot, { backgroundColor: selected.color }]} /> : null}
        <Text style={[styles.value, !selected && styles.placeholder]} numberOfLines={1}>{selected?.label ?? placeholder ?? `Select ${label}`}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.placeholder} />
      </Pressable>
      <BottomSheet visible={open} title={label} onClose={close} scroll={false} fullHeight={showSearch}>
        {showSearch ? (
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={colors.placeholder} />
            <TextInput style={styles.searchInput} placeholder="Search…" placeholderTextColor={colors.placeholder} value={search} onChangeText={setSearch} autoCorrect={false} />
          </View>
        ) : null}
        <FlatList
          data={visibleOptions}
          keyExtractor={(option) => option.value}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={showSearch ? styles.list : styles.listAuto}
          ListHeaderComponent={clearable && value ? (
            <Pressable style={styles.option} onPress={() => choose('')}>
              <Ionicons name="close-circle-outline" size={18} color={colors.primary} />
              <Text style={styles.clearText}>Clear selection</Text>
            </Pressable>
          ) : null}
          ListEmptyComponent={<Text style={styles.empty}>No results</Text>}
          renderItem={({ item }) => {
            const active = item.value === value;
            return (
              <Pressable style={[styles.option, active && styles.optionActive]} onPress={() => choose(item.value)}>
                {item.color ? <View style={[styles.dot, { backgroundColor: item.color }]} /> : null}
                <View style={styles.optionText}>
                  <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{item.label}</Text>
                  {item.hint ? <Text style={styles.optionHint}>{item.hint}</Text> : null}
                </View>
                {active ? <Ionicons name="checkmark" size={18} color={colors.primary} /> : null}
              </Pressable>
            );
          }}
        />
      </BottomSheet>
    </Field>
  );
}

const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 42, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface },
  triggerError: { borderColor: colors.primary },
  triggerDisabled: { opacity: 0.55 },
  value: { flex: 1, color: colors.text, fontSize: 14 },
  placeholder: { color: colors.placeholder },
  dot: { width: 8, height: 8, borderRadius: 4 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 42, paddingHorizontal: 12, marginBottom: 8, borderRadius: 10, backgroundColor: '#f1f2f4' },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, padding: 0 },
  list: { flex: 1 },
  listAuto: { flexGrow: 0, marginBottom: 12 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingVertical: 12, borderRadius: 10 },
  optionActive: { backgroundColor: '#fdeaec' },
  optionText: { flex: 1 },
  optionLabel: { color: colors.text, fontSize: 14 },
  optionLabelActive: { color: colors.primary, fontWeight: '700' },
  optionHint: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  clearText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.textMuted, paddingVertical: 24 },
});
