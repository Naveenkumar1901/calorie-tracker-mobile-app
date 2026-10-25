import { AppLayout } from '@/layouts/app-layout/AppLayout';
import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type Tone = 'info' | 'warn' | 'danger' | 'ok';

const toneColors: Record<Tone, { main: string; soft: string }> = {
  info: { main: '#087A68', soft: '#EAF7F1' },
  warn: { main: '#D89B24', soft: '#FFF7E6' },
  danger: { main: '#D4202B', soft: '#FDEAEC' },
  ok: { main: '#0B8F5A', soft: '#EAF7F1' },
};

const kpis = [
  { label: 'Calories consumed', value: '1,680', detail: 'of 2,200 kcal goal', tone: 'info' as Tone, icon: 'restaurant-outline' as const, trend: '+180' },
  { label: 'Calories remaining', value: '520', detail: 'Available today', tone: 'ok' as Tone, icon: 'flame-outline' as const, trend: '-120' },
  { label: 'Protein', value: '92 g', detail: 'Target 110 g', tone: 'ok' as Tone, icon: 'barbell-outline' as const, trend: '+8 g' },
  { label: 'Carbohydrates', value: '184 g', detail: 'Target 240 g', tone: 'info' as Tone, icon: 'nutrition-outline' as const, trend: '+12 g' },
  { label: 'Fat', value: '54 g', detail: 'Target 65 g', tone: 'warn' as Tone, icon: 'water-outline' as const, trend: '+4 g' },
  { label: 'Steps', value: '6,842', detail: 'Goal 8,000 steps', tone: 'info' as Tone, icon: 'walk-outline' as const, trend: '+842' },
];

const calorieTrend = [
  { label: 'Mon', value: 1940 },
  { label: 'Tue', value: 2110 },
  { label: 'Wed', value: 1780 },
  { label: 'Thu', value: 2250 },
  { label: 'Fri', value: 1680 },
  { label: 'Sat', value: 2040 },
  { label: 'Sun', value: 1890 },
];

const recentEntries = [
  { meal: 'Breakfast', description: '2 Idli, Sambar & Chutney', calories: 380, protein: 12, carbs: 58, fat: 9, time: '08:30 AM', icon: 'sunny-outline' as const },
  { meal: 'Lunch', description: 'Rice, Chicken Curry & Vegetables', calories: 620, protein: 34, carbs: 76, fat: 18, time: '01:15 PM', icon: 'restaurant-outline' as const },
  { meal: 'Snack', description: 'Banana & Whey Protein', calories: 280, protein: 26, carbs: 31, fat: 4, time: '05:00 PM', icon: 'nutrition-outline' as const },
  { meal: 'Dinner', description: 'Chapati, Paneer & Salad', calories: 400, protein: 20, carbs: 19, fat: 23, time: '08:30 PM', icon: 'moon-outline' as const },
];

const maxCalories = Math.max(...calorieTrend.map((item) => item.value));

function KpiCard({ item }: { item: typeof kpis[number] }) {
  const tone = toneColors[item.tone];

  return (
    <View style={styles.kpiCard}>
      <View style={[styles.kpiIcon, { backgroundColor: tone.soft }]}>
        <Ionicons name={item.icon} size={20} color={tone.main} />
      </View>
      <Text style={styles.kpiLabel}>{item.label}</Text>
      <Text style={styles.kpiValue}>{item.value}</Text>
      <Text style={styles.kpiDetail}>{item.detail}</Text>
      <View style={styles.kpiBottom}>
        <View style={[styles.trendDot, { backgroundColor: tone.main }]} />
        <Text style={[styles.kpiTrend, { color: tone.main }]}>{item.trend}</Text>
      </View>
    </View>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard" activeKey="dashboard" caption="Your daily health overview">
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0B8F5A', '#087A68', '#064C59']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>TODAY'S PROGRESS</Text>
            <Text style={styles.heroTitle}>You're doing great!</Text>
            <Text style={styles.heroSubtitle}>Keep moving and stay consistent with your goals.</Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>1,680</Text>
                <Text style={styles.heroStatLabel}>Calories</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>6,842</Text>
                <Text style={styles.heroStatLabel}>Steps</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>92g</Text>
                <Text style={styles.heroStatLabel}>Protein</Text>
              </View>
            </View>
          </View>
          <View style={styles.heroIcon}>
            <Ionicons name="fitness-outline" size={32} color="#FFFFFF" />
          </View>
        </LinearGradient>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Today's overview</Text>
            <Text style={styles.sectionSubtitle}>Your nutrition and activity at a glance</Text>
          </View>
        </View>
        <View style={styles.kpiGrid}>
          {kpis.map((item) => <KpiCard key={item.label} item={item} />)}
        </View>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Weekly calories</Text>
            <Text style={styles.sectionSubtitle}>Your calorie intake over the last 7 days</Text>
          </View>
          <View style={styles.averageBadge}>
            <Text style={styles.averageValue}>1,956</Text>
            <Text style={styles.averageLabel}>AVG</Text>
          </View>
        </View>
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Calorie intake</Text>
              <Text style={styles.chartGoal}>Daily goal: 2,200 kcal</Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>Calories</Text>
            </View>
          </View>
          <View style={styles.chart}>
            {calorieTrend.map((item) => {
              const height = Math.max(12, (item.value / maxCalories) * 130);
              const active = item.label === 'Fri';
              return (
                <View key={item.label} style={styles.barColumn}>
                  <Text style={styles.barValue}>{item.value}</Text>
                  <View style={styles.barArea}>
                    <View style={[styles.bar, { height }, active && styles.barActive]} />
                  </View>
                  <Text style={[styles.barLabel, active && styles.barLabelActive]}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Macro balance</Text>
            <Text style={styles.sectionSubtitle}>Today's nutrition targets</Text>
          </View>
        </View>
        <View style={styles.macroCard}>
          <MacroRow label="Protein" value={92} target={110} unit="g" icon="barbell-outline" />
          <MacroRow label="Carbohydrates" value={184} target={240} unit="g" icon="nutrition-outline" />
          <MacroRow label="Fat" value={54} target={65} unit="g" icon="water-outline" />
        </View>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent meals</Text>
            <Text style={styles.sectionSubtitle}>Your latest food entries</Text>
          </View>
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>View all</Text>
            <Ionicons name="chevron-forward" size={15} color={colors.primary} />
          </View>
        </View>
        <View style={styles.mealsCard}>
          {recentEntries.map((entry, index) => 
          (<View key={entry.meal} style={[styles.mealRow, index < recentEntries.length - 1 && styles.mealBorder]}>
              <View style={styles.mealIcon}>
                <Ionicons name={entry.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{entry.meal}</Text>
                <Text style={styles.mealDescription} numberOfLines={1}>{entry.description}</Text>
                <Text style={styles.mealTime}>{entry.time}</Text>
              </View>
              <View style={styles.mealCalories}>
                <Text style={styles.mealCaloriesValue}>{entry.calories}</Text>
                <Text style={styles.mealCaloriesLabel}>kcal</Text>
              </View>
            </View>))}
        </View>
        <View style={styles.goalCard}>
          <LinearGradient colors={['#0B8F5A', '#087A68', '#064C59']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.goalGradient}>
            <View style={styles.goalIcon}>
              <Ionicons name="trending-down-outline" size={23} color="#FFFFFF" />
            </View>
            <View style={styles.goalContent}>
              <Text style={styles.goalLabel}>WEIGHT GOAL</Text>
              <Text style={styles.goalTitle}>79.4 kg → 75 kg</Text>
              <Text style={styles.goalSubtitle}>4.4 kg remaining to reach your target</Text>
              <View style={styles.goalTrack}>
                <View style={styles.goalProgress} />
              </View>
            </View>
            <Text style={styles.goalPercent}>32%</Text>
          </LinearGradient>
        </View>
        <View style={styles.bottomSpace} />
      </ScrollView>
    </AppLayout>
  );
};

function MacroRow({ label, value, target, unit, icon }: { label: string; value: number; target: number; unit: string; icon: keyof typeof Ionicons.glyphMap }) {
  const progress = Math.min(value / target, 1);

  return (
    <View style={styles.macroRow}>
      <View style={styles.macroIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.macroInfo}>
        <View style={styles.macroTop}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroValue}>{value}<Text style={styles.macroUnit}> {unit} / {target}{unit}</Text></Text>
        </View>
        <View style={styles.progressTrack}>
          <LinearGradient colors={['#0B8F5A', '#087A68', '#064C59']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  hero: {
    minHeight: 190,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#064C59',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },
  heroContent: {
    flex: 1,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 5,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    maxWidth: 250,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },
  heroStat: {
    minWidth: 62,
  },
  heroStatValue: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  heroStatLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 10,
    marginTop: 2,
  },
  heroDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kpiCard: {
    width: '48.3%',
    minHeight: 145,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#064C59',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  kpiIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  kpiDetail: {
    color: colors.placeholder,
    fontSize: 10,
    marginTop: 2,
  },
  kpiBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  kpiTrend: {
    fontSize: 10,
    fontWeight: '800',
  },
  averageBadge: {
    alignItems: 'flex-end',
  },
  averageValue: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '900',
  },
  averageLabel: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  chartGoal: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 5,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 10,
  },
  chart: {
    height: 190,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barValue: {
    color: colors.textMuted,
    fontSize: 8,
    marginBottom: 5,
  },
  barArea: {
    height: 135,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 19,
    maxHeight: 130,
    minHeight: 10,
    borderRadius: 8,
    backgroundColor: '#A9DCCB',
  },
  barActive: {
    backgroundColor: colors.primary,
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 7,
  },
  barLabelActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  macroCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },
  macroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroRow: {
    marginBottom: 18,
  },
  macroIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
    marginRight: 11,
  },
  macroInfo: {
    flex: 1,
  },
  macroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  macroLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  macroValue: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  macroUnit: {
    color: colors.textMuted,
    fontWeight: '500',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E6F0EC',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    marginRight: 2,
  },
  mealsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mealRow: {
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
    marginRight: 11,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  mealDescription: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
    maxWidth: 200,
  },
  mealTime: {
    color: colors.placeholder,
    fontSize: 9,
    marginTop: 3,
  },
  mealCalories: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  mealCaloriesValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  mealCaloriesLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 1,
  },
  goalCard: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#064C59',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  goalGradient: {
    minHeight: 115,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: 12,
  },
  goalContent: {
    flex: 1,
  },
  goalLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  goalTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 3,
  },
  goalSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    marginTop: 2,
  },
  goalTrack: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  goalProgress: {
    width: '32%',
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  goalPercent: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 10,
  },
  bottomSpace: {
    height: 20,
  },
});