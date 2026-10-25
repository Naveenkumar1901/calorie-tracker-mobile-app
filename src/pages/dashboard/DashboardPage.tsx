import { AppLayout } from '@/layouts/app-layout/AppLayout';
import { SectionCard } from '@/shared/components/section-card';
import { goTo } from '@/shared/utils/navigation';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { activityBreakdown, calorieTrend, goalProgress, kpis, macroBreakdown, recentEntries, weeklySummary } from './dashboardData';

const theme = {
  primary: '#0B8F5A',
  secondary: '#087A68',
  dark: '#064C59',
  lime: '#C8FF35',
  background: '#F5FAF8',
  surface: '#FFFFFF',
  border: '#DDEDE7',
  text: '#064C59',
  muted: '#71807D',
  softGreen: '#F0FAF5',
  softTeal: '#E8F7F3',
  softLime: '#F4FBD8',
};

const iconColors = [
  '#0B8F5A',
  '#087A68',
  '#D97706',
  '#2563EB',
];

export default function DashboardPage() {
  const insets = useSafeAreaInsets();
  const [showAllMeals, setShowAllMeals] = useState(false);

  const visibleMeals = (showAllMeals ? recentEntries : recentEntries.slice(0, 3));

  const caloriePercentage = Math.min(
    Math.round((goalProgress.caloriesGoal > 0  ? 1680 / goalProgress.caloriesGoal  : 0) * 100),
    100,
  );

  const stepPercentage = Math.min(
    Math.round(
      (weeklySummary.averageSteps / weeklySummary.stepGoal) * 100,
    ),
    100,
  );

  const weightDifference = (goalProgress.currentWeight - goalProgress.targetWeight);
  const maxActivity = Math.max(...activityBreakdown.map((item) => item.value),);
  const maxCalorie = Math.max(...calorieTrend.map((item) => item.value),);

  return (
    <AppLayout title="Dashboard" activeKey="dashboard">
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <View style={styles.greetingText}>
            <Text style={styles.eyebrow}>TODAY's PROGRESS</Text>
            <Text style={styles.title}>Stay on track 👋</Text>
            <Text style={styles.subtitle}>
              Keep moving towards your health goals.
            </Text>
          </View>
          <View style={styles.dateBadge}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.primary}
            />
            <Text style={styles.dateText}>Today</Text>
          </View>
        </View>
        <View style={styles.calorieCard}>
          <View style={styles.calorieTop}>
            <View>
              <Text style={styles.calorieLabel}>CALORIES TODAY</Text>
              <View style={styles.calorieValueRow}>
                <Text style={styles.calorieValue}>1,680</Text>
                <Text style={styles.calorieUnit}>kcal</Text>
              </View>
              <Text style={styles.calorieGoal}>
                Goal {goalProgress.caloriesGoal.toLocaleString()} kcal
              </Text>
            </View>
            <View style={styles.fireCircle}>
              <Ionicons
                name="flame"
                size={27}
                color={theme.lime}
              />
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${caloriePercentage}%` },
              ]}
            />
          </View>
          <View style={styles.calorieBottom}>
            <Text style={styles.remainingText}>
              {goalProgress.caloriesGoal - 1680} kcal remaining
            </Text>
            <Text style={styles.percentageText}>
              {caloriePercentage}%
            </Text>
          </View>
        </View>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <Pressable
              key={kpi.label}
              style={({ pressed }) => [
                styles.kpiCard,
                pressed && styles.pressed,
              ]}
              onPress={() => goTo('/home')}
            >
              <View
                style={[
                  styles.kpiIcon,
                  {
                    backgroundColor:
                      index % 2 === 0
                        ? theme.softGreen
                        : theme.softTeal,
                  },
                ]}
              >
                <Ionicons
                  name={kpi.icon}
                  size={19}
                  color={
                    index % 2 === 0
                      ? theme.primary
                      : theme.secondary
                  }
                />
              </View>
              <Text style={styles.kpiLabel} numberOfLines={1}>
                {kpi.label}
              </Text>
              <Text style={styles.kpiValue}>
                {kpi.value}
              </Text>
              <Text style={styles.kpiDetail} numberOfLines={1}>
                {kpi.detail}
              </Text>
              <View style={styles.trendRow}>
                <Ionicons
                  name="trending-up"
                  size={12}
                  color={theme.primary}
                />
                <Text style={styles.trendText}>
                  {kpi.trend}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <SectionCard title="Macros">
          <View style={styles.sectionIntro}>
            <Text style={styles.sectionDescription}>
              Your nutrition progress for today
            </Text>
          </View>
          <View style={styles.macroList}>
            {macroBreakdown.map((macro) => {
              const percentage = Math.min(
                Math.round((macro.value / macro.target) * 100),
                100,
              );

              return (
                <View key={macro.label} style={styles.macroItem}>
                  <View style={styles.macroHeader}>
                    <View style={styles.macroNameRow}>
                      <View
                        style={[
                          styles.macroDot,
                          {
                            backgroundColor:
                              macro.tone === 'ok' ? theme.primary : macro.tone === 'info'  ? '#2563EB'  : '#D97706',
                          },
                        ]}
                      />
                      <Text style={styles.macroName}>
                        {macro.label}
                      </Text>
                    </View>
                    <Text style={styles.macroValue}>
                      {macro.value}
                      <Text style={styles.macroTarget}>
                        {' '}
                        / {macro.target}
                        {macro.unit}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.macroTrack}>
                    <View
                      style={[
                        styles.macroFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor:
                            macro.tone === 'ok'  ? theme.primary  : macro.tone === 'info' ? '#2563EB' : '#D97706',
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </SectionCard>
        <SectionCard title="Weekly calories">
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartAverage}>
                {weeklySummary.averageCalories.toLocaleString()} kcal
              </Text>
              <Text style={styles.chartSubtitle}>
                Average daily intake
              </Text>
            </View>
            <View style={styles.goalBadge}>
              <Text style={styles.goalBadgeText}>
                Goal {weeklySummary.calorieGoal}
              </Text>
            </View>
          </View>
          <View style={styles.barChart}>
            {calorieTrend.map((day) => {
              const height = Math.max(18,(day.value / maxCalorie) * 125);

              const isAboveGoal = (day.value > weeklySummary.calorieGoal);

              return (
                <View key={day.label} style={styles.barColumn}>
                  <Text style={styles.barValue}>
                    {day.value >= 2000 ? `${Math.round(day.value / 100) / 10}k` : day.value}
                  </Text>
                  <View style={styles.barArea}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor: isAboveGoal ? '#D97706': theme.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>
                    {day.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </SectionCard>
        <SectionCard title="Activity">
          <View style={styles.activitySummary}>
            <View style={styles.activityMain}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name="footsteps-outline"
                  size={22}
                  color={theme.primary}
                />
              </View>
              <View>
                <Text style={styles.activityValue}>
                  {weeklySummary.averageSteps.toLocaleString()}
                </Text>
                <Text style={styles.activityLabel}>
                  average steps
                </Text>
              </View>
            </View>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>
                {stepPercentage}%
              </Text>
            </View>
          </View>
          <View style={styles.stepTrack}>
            <View
              style={[
                styles.stepFill,
                { width: `${stepPercentage}%` },
              ]}
            />
          </View>
          <View style={styles.activityList}>
            {activityBreakdown.map((activity, index) => {
              const percentage = ((activity.value / maxActivity) * 100);

              return (
                <View
                  key={activity.label}
                  style={styles.activityRow}
                >
                  <View style={styles.activityNameContainer}>
                    <View
                      style={[
                        styles.activityDot,
                        {
                          backgroundColor:
                            iconColors[index % iconColors.length],
                        },
                      ]}
                    />
                    <Text style={styles.activityName}>
                      {activity.label}
                    </Text>
                  </View>
                  <View style={styles.activityBarContainer}>
                    <View style={styles.activityBarTrack}>
                      <View
                        style={[
                          styles.activityBarFill,
                          {
                            width: `${percentage}%`,
                            backgroundColor:
                              iconColors[
                                index % iconColors.length
                              ],
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={styles.activityCalories}>
                    {activity.value} kcal
                  </Text>
                </View>
              );
            })}
          </View>
        </SectionCard>
        <SectionCard
          title="Recent meals"
          actionLabel={ showAllMeals ? 'Show less' : `View all ${recentEntries.length}`}
          onAction={() =>
            setShowAllMeals((value) => !value)
          }
        >
          <View style={styles.mealList}>
            {visibleMeals.map((meal, index) => (
              <Pressable
                key={meal.id}
                style={({ pressed }) => [
                  styles.mealRow,
                  pressed && styles.pressed,
                ]}
                onPress={() => goTo('/home')}
              >
                <View
                  style={[
                    styles.mealIcon,
                    {
                      backgroundColor: index % 2 === 0 ? theme.softGreen : theme.softTeal,
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      meal.meal === 'Breakfast'
                        ? 'sunny-outline'
                        : meal.meal === 'Lunch'
                          ? 'restaurant-outline'
                          : meal.meal === 'Snack'
                            ? 'nutrition-outline'
                            : 'moon-outline'
                    }
                    size={19}
                    color={theme.primary}
                  />
                </View>
                <View style={styles.mealContent}>
                  <View style={styles.mealHeader}>
                    <Text style={styles.mealName}>
                      {meal.meal}
                    </Text>
                    <Text style={styles.mealTime}>
                      {meal.time}
                    </Text>
                  </View>
                  <Text
                    style={styles.mealDescription}
                    numberOfLines={1}
                  >
                    {meal.description}
                  </Text>
                  <View style={styles.mealMacros}>
                    <Text style={styles.mealCalories}>
                      {meal.calories} kcal
                    </Text>
                    <Text style={styles.mealMacroText}>
                      P {meal.protein}g
                    </Text>
                    <Text style={styles.mealMacroText}>
                      C {meal.carbs}g
                    </Text>
                    <Text style={styles.mealMacroText}>
                      F {meal.fat}g
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={theme.muted}
                />
              </Pressable>
            ))}
          </View>
        </SectionCard>
        <View style={styles.bottomGrid}>
          <View style={styles.goalCard}>
            <View style={styles.goalIcon}>
              <Ionicons
                name="scale-outline"
                size={20}
                color={theme.primary}
              />
            </View>
            <Text style={styles.goalTitle}>
              Weight goal
            </Text>
            <Text style={styles.weightValue}>
              {goalProgress.currentWeight} kg
            </Text>
            <Text style={styles.weightTarget}>
              Target {goalProgress.targetWeight} kg
            </Text>
            <View style={styles.weightProgress}>
              <View
                style={[
                  styles.weightProgressFill,
                  {
                    width: `${Math.min(
                      100,
                      Math.max(0, 100 -(weightDifference / goalProgress.currentWeight) * 100,),
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.goalCard}>
            <View style={styles.goalIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={theme.primary}
              />
            </View>
            <Text style={styles.goalTitle}>
              Tracking
            </Text>
            <Text style={styles.trackingValue}>
              {weeklySummary.daysTracked}/
              {weeklySummary.totalDays}
            </Text>
            <Text style={styles.weightTarget}>
              days completed
            </Text>
            <View style={styles.trackingDots}>
              {Array.from({
                length: weeklySummary.totalDays,
              }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.trackingDot,
                    index < weeklySummary.daysTracked &&
                      styles.trackingDotActive,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    backgroundColor: theme.background,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greetingText: {
    flex: 1,
  },
  eyebrow: {
    color: theme.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 3,
  },
  title: {
    color: theme.dark,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  subtitle: {
    color: theme.muted,
    fontSize: 12,
    marginTop: 3,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  dateText: {
    color: theme.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  calorieCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: theme.dark,
    marginBottom: 12,
    shadowColor: '#003F38',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 6,
  },
  calorieTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  calorieValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  calorieValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  calorieUnit: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 5,
  },
  calorieGoal: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 11,
    marginTop: 2,
  },
  fireCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200,255,53,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(200,255,53,0.22)',
  },
  progressTrack: {
    height: 7,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.14)',
    overflow: 'hidden',
    marginTop: 18,
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: theme.lime,
  },
  calorieBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  remainingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  percentageText: {
    color: theme.lime,
    fontSize: 11,
    fontWeight: '800',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  kpiCard: {
    width: '48.5%',
    minHeight: 142,
    padding: 13,
    borderRadius: 17,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  kpiLabel: {
    color: theme.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  kpiValue: {
    color: theme.dark,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 2,
  },
  kpiDetail: {
    color: '#8A9794',
    fontSize: 9,
    marginTop: 1,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 7,
  },
  trendText: {
    color: theme.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  sectionIntro: {
    marginBottom: 14,
  },
  sectionDescription: {
    color: theme.muted,
    fontSize: 11,
  },
  macroList: {
    gap: 15,
  },
  macroItem: {
    gap: 7,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  macroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  macroName: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '700',
  },
  macroValue: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '800',
  },
  macroTarget: {
    color: theme.muted,
    fontWeight: '500',
  },
  macroTrack: {
    height: 7,
    borderRadius: 99,
    backgroundColor: '#EAF0ED',
    overflow: 'hidden',
  },
  macroFill: {
    height: '100%',
    borderRadius: 99,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartAverage: {
    color: theme.dark,
    fontSize: 22,
    fontWeight: '900',
  },
  chartSubtitle: {
    color: theme.muted,
    fontSize: 10,
    marginTop: 2,
  },
  goalBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: theme.softGreen,
  },
  goalBadgeText: {
    color: theme.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  barChart: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barValue: {
    color: theme.muted,
    fontSize: 8,
    marginBottom: 4,
  },
  barArea: {
    height: 130,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    minHeight: 8,
    borderRadius: 6,
  },
  barLabel: {
    color: theme.muted,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 6,
  },
  activitySummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.softGreen,
  },
  activityValue: {
    color: theme.dark,
    fontSize: 20,
    fontWeight: '900',
  },
  activityLabel: {
    color: theme.muted,
    fontSize: 10,
  },
  stepBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: theme.softLime,
  },
  stepBadgeText: {
    color: theme.primary,
    fontSize: 11,
    fontWeight: '900',
  },
  stepTrack: {
    height: 7,
    borderRadius: 99,
    backgroundColor: '#EAF0ED',
    overflow: 'hidden',
    marginTop: 14,
    marginBottom: 16,
  },
  stepFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: theme.primary,
  },
  activityList: {
    gap: 12,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityNameContainer: {
    width: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  activityName: {
    color: theme.text,
    fontSize: 10,
    fontWeight: '600',
  },
  activityBarContainer: {
    flex: 1,
  },
  activityBarTrack: {
    height: 6,
    borderRadius: 99,
    backgroundColor: '#EDF2F0',
    overflow: 'hidden',
  },
  activityBarFill: {
    height: '100%',
    borderRadius: 99,
  },
  activityCalories: {
    width: 55,
    textAlign: 'right',
    color: theme.muted,
    fontSize: 9,
    fontWeight: '700',
  },
  mealList: {
    gap: 3,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealContent: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '800',
  },
  mealTime: {
    color: theme.muted,
    fontSize: 9,
  },
  mealDescription: {
    color: theme.muted,
    fontSize: 10,
    marginTop: 2,
  },
  mealMacros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 5,
  },
  mealCalories: {
    color: theme.primary,
    fontSize: 9,
    fontWeight: '800',
  },
  mealMacroText: {
    color: '#8A9794',
    fontSize: 8,
    fontWeight: '600',
  },
  bottomGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  goalCard: {
    flex: 1,
    padding: 14,
    borderRadius: 17,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  goalIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.softGreen,
    marginBottom: 9,
  },
  goalTitle: {
    color: theme.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  weightValue: {
    color: theme.dark,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  weightTarget: {
    color: theme.muted,
    fontSize: 9,
    marginTop: 1,
  },
  weightProgress: {
    height: 5,
    borderRadius: 99,
    backgroundColor: '#EAF0ED',
    overflow: 'hidden',
    marginTop: 10,
  },
  weightProgressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: theme.primary,
  },
  trackingValue: {
    color: theme.dark,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  trackingDots: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 10,
  },
  trackingDot: {
    flex: 1,
    height: 5,
    borderRadius: 99,
    backgroundColor: '#E5ECE9',
  },
  trackingDotActive: {
    backgroundColor: theme.primary,
  },
});