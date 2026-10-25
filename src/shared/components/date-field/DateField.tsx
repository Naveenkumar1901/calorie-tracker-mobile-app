import { Ionicons } from '@expo/vector-icons';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/shared/components/bottom-sheet';
import { Field } from '@/shared/components/field';
import { colors } from '@/shared/constants/colors';

interface DateFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  minDate?: string;
  readOnly?: boolean;
}

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const buildMonthCells = (month: Dayjs) => {
  const start = month.startOf('month');
  const offset = start.day();
  return Array.from({ length: 42 }, (_, index) => start.add(index - offset, 'day'));
};

export function DateField({ label, value, onChange, required, error, disabled, minDate, readOnly }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(dayjs(value || undefined).startOf('month'));
  const selected = value ? dayjs(value) : undefined;
  const min = minDate ? dayjs(minDate) : undefined;

  const show = () => {
    setMonth(dayjs(value || undefined).startOf('month'));
    setOpen(true);
  };

  const pick = (date: string) => {
    onChange(date);
    setOpen(false);
  };

  return (
    <Field label={label} required={required} error={error}>
      <Pressable style={[styles.trigger, !!error && styles.triggerError, (disabled || readOnly) && styles.triggerDisabled]} disabled={disabled || readOnly} onPress={show}>
        <Ionicons name="calendar-outline" size={16} color={colors.primary} />
        <Text style={[styles.value, !selected && styles.placeholder]}>{selected ? selected.format('DD MMM YYYY') : readOnly ? '—' : 'Select date'}</Text>
        {value && !disabled && !readOnly ? (
          <Pressable hitSlop={10} onPress={() => onChange('')}>
            <Ionicons name="close-circle" size={16} color={colors.placeholder} />
          </Pressable>
        ) : null}
      </Pressable>
      <BottomSheet visible={open} title={label} onClose={() => setOpen(false)}>
        <View style={styles.monthRow}>
          <Pressable style={styles.monthButton} onPress={() => setMonth(month.subtract(1, 'month'))}>
            <Ionicons name="chevron-back" size={18} color={colors.text} />
          </Pressable>
          <Text style={styles.monthTitle}>{month.format('MMMM YYYY')}</Text>
          <Pressable style={styles.monthButton} onPress={() => setMonth(month.add(1, 'month'))}>
            <Ionicons name="chevron-forward" size={18} color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.weekRow}>
          {weekdays.map((day, index) => <Text key={`${day}${index}`} style={styles.weekday}>{day}</Text>)}
        </View>
        <View style={styles.grid}>
          {buildMonthCells(month).map((date) => {
            const inMonth = date.month() === month.month();
            const isSelected = !!selected && date.isSame(selected, 'day');
            const isToday = date.isSame(dayjs(), 'day');
            const blocked = !!min && date.isBefore(min, 'day');
            return (
              <Pressable key={date.format('YYYY-MM-DD')} style={styles.cell} disabled={blocked} onPress={() => pick(date.format('YYYY-MM-DD'))}>
                <View style={[styles.day, isSelected && styles.daySelected, isToday && !isSelected && styles.dayToday]}>
                  <Text style={[styles.dayText, !inMonth && styles.dayMuted, blocked && styles.dayBlocked, isSelected && styles.dayTextSelected]}>{date.date()}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <Pressable style={styles.todayButton} onPress={() => pick(dayjs().format('YYYY-MM-DD'))}>
          <Text style={styles.todayText}>Today</Text>
        </Pressable>
      </BottomSheet>
    </Field>
  );
}

const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 42, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface },
  triggerError: { borderColor: colors.primary },
  triggerDisabled: { backgroundColor: '#f1f2f4' },
  value: { flex: 1, color: colors.text, fontSize: 14 },
  placeholder: { color: colors.placeholder },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  monthButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2f4' },
  monthTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  weekRow: { flexDirection: 'row' },
  weekday: { width: '14.2857%', textAlign: 'center', color: colors.textMuted, fontSize: 11, fontWeight: '700', paddingVertical: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: '14.2857%', alignItems: 'center', paddingVertical: 2 },
  day: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: colors.primary },
  dayToday: { borderWidth: 1.5, borderColor: colors.primary },
  dayText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  dayMuted: { color: colors.placeholder, fontWeight: '400' },
  dayBlocked: { color: '#d1d5db' },
  dayTextSelected: { color: colors.white, fontWeight: '800' },
  todayButton: { alignSelf: 'center', marginTop: 10, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 999, backgroundColor: '#fdeaec' },
  todayText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
});
