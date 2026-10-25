import { AppLayout } from '@/layouts/app-layout/AppLayout';
import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const meals = [
  {
    id: 1,
    meal: 'Breakfast',
    description: '2 Idli, Sambar & Chutney',
    calories: 380,
    protein: 12,
    carbs: 58,
    fat: 9,
    time: '08:30 AM',
    icon: 'sunny-outline' as const,
  },
  {
    id: 2,
    meal: 'Lunch',
    description: 'Rice, Chicken Curry & Vegetables',
    calories: 620,
    protein: 34,
    carbs: 76,
    fat: 18,
    time: '01:15 PM',
    icon: 'restaurant-outline' as const,
  },
  {
    id: 3,
    meal: 'Snack',
    description: 'Banana & Whey Protein',
    calories: 280,
    protein: 26,
    carbs: 31,
    fat: 4,
    time: '05:00 PM',
    icon: 'nutrition-outline' as const,
  },
  {
    id: 4,
    meal: 'Dinner',
    description: 'Chapati, Paneer & Salad',
    calories: 400,
    protein: 20,
    carbs: 19,
    fat: 23,
    time: '08:30 PM',
    icon: 'moon-outline' as const,
  },
];

const calorieGoal = 2200;
const caloriesConsumed = 1680;
const caloriesRemaining = calorieGoal - caloriesConsumed;

const macros = [
  {
    label: 'Protein',
    value: 92,
    target: 110,
    unit: 'g',
    icon: 'barbell-outline' as const,
    color: colors.primary,
    background: '#EAF7F1',
  },
  {
    label: 'Carbs',
    value: 184,
    target: 240,
    unit: 'g',
    icon: 'nutrition-outline' as const,
    color: '#087A68',
    background: '#E8F7F4',
  },
  {
    label: 'Fat',
    value: 54,
    target: 65,
    unit: 'g',
    icon: 'water-outline' as const,
    color: '#D98B20',
    background: '#FFF6E8',
  },
];

export default function FoodDiaryPage() {
  const insets = useSafeAreaInsets();
  const progress = Math.min(caloriesConsumed / calorieGoal, 1);

  return (
    <AppLayout
      title="Food Diary"
      caption="Monday, 25 October"
      activeKey="food-diary"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 30 },
        ]}
      >
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#0B8F5A', '#087A68', '#064C59']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryTop}>
              <View>
                <Text style={styles.summaryLabel}>Today's calories</Text>
                <View style={styles.calorieRow}>
                  <Text style={styles.calorieValue}>
                    {caloriesConsumed.toLocaleString()}
                  </Text>
                  <Text style={styles.calorieGoal}>
                    / {calorieGoal.toLocaleString()} kcal
                  </Text>
                </View>
              </View>
              <View style={styles.fireIcon}>
                <Ionicons name="flame" size={22} color="#C8FF35" />
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
            <View style={styles.summaryBottom}>
              <View>
                <Text style={styles.remainingValue}>
                  {caloriesRemaining}
                </Text>
                <Text style={styles.remainingLabel}>kcal remaining</Text>
              </View>
              <View style={styles.goalBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#C8FF35"
                />
                <Text style={styles.goalBadgeText}>
                  {Math.round(progress * 100)}% of goal
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Macros</Text>
            <Text style={styles.sectionSubtitle}>
              Your nutrition balance today
            </Text>
          </View>
        </View>
        <View style={styles.macroGrid}>
          {macros.map((macro) => {
            const percentage = Math.min(macro.value / macro.target, 1);

            return (
              <View
                key={macro.label}
                style={[
                  styles.macroCard,
                  { backgroundColor: macro.background },
                ]}
              >
                <View style={styles.macroHeader}>
                  <View
                    style={[
                      styles.macroIcon,
                      { backgroundColor: macro.color },
                    ]}
                  >
                    <Ionicons
                      name={macro.icon}
                      size={14}
                      color={colors.white}
                    />
                  </View>
                  <Text
                    style={[
                      styles.macroPercentage,
                      { color: macro.color },
                    ]}
                  >
                    {Math.round(percentage * 100)}%
                  </Text>
                </View>
                <Text style={styles.macroLabel}>{macro.label}</Text>
                <View style={styles.macroValueRow}>
                  <Text style={styles.macroValue}>{macro.value}</Text>
                  <Text style={styles.macroUnit}>
                    / {macro.target}
                    {macro.unit}
                  </Text>
                </View>
                <View style={styles.macroTrack}>
                  <View
                    style={[
                      styles.macroFill,
                      {
                        width: `${percentage * 100}%`,
                        backgroundColor: macro.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.mealsHeader}>
          <View>
            <Text style={styles.sectionTitle}>Today's meals</Text>
            <Text style={styles.sectionSubtitle}>
              {meals.length} meals logged
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.addSmallButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/meals')}
          >
            <Ionicons
              name="add"
              size={18}
              color={colors.white}
            />
          </Pressable>
        </View>
        <View style={styles.mealList}>
          {meals.map((meal) => (
            <Pressable
              key={meal.id}
              style={({ pressed }) => [
                styles.mealCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.mealIcon}>
                <Ionicons
                  name={meal.icon}
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.mealBody}>
                <View style={styles.mealTop}>
                  <Text style={styles.mealName}>{meal.meal}</Text>
                  <Text style={styles.mealCalories}>
                    {meal.calories} kcal
                  </Text>
                </View>
                <Text
                  style={styles.mealDescription}
                  numberOfLines={1}
                >
                  {meal.description}
                </Text>
                <View style={styles.mealBottom}>
                  <Text style={styles.mealTime}>
                    {meal.time}
                  </Text>
                  <View style={styles.nutrientRow}>
                    <Text style={styles.proteinText}>
                      {meal.protein}g P
                    </Text>
                    <Text style={styles.nutrientDivider}>•</Text>
                    <Text style={styles.carbText}>
                      {meal.carbs}g C
                    </Text>
                    <Text style={styles.nutrientDivider}>•</Text>
                    <Text style={styles.fatText}>
                      {meal.fat}g F
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={17}
                color={colors.placeholder}
              />
            </Pressable>
          ))}
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.addFoodButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/meals')}
        >
          <View style={styles.addFoodIcon}>
            <Ionicons
              name="add"
              size={22}
              color={colors.white}
            />
          </View>
          <View style={styles.addFoodText}>
            <Text style={styles.addFoodTitle}>Add food</Text>
            <Text style={styles.addFoodSubtitle}>
              Search and log your next meal
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.primary}
          />
        </Pressable>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#064C59',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 5,
  },
  summaryGradient: {
    padding: 18,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  calorieValue: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -1,
  },
  calorieGoal: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginLeft: 5,
    fontWeight: '600',
  },
  fireIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  progressTrack: {
    height: 9,
    marginTop: 18,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#C8FF35',
  },
  summaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  remainingValue: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  remainingLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    marginTop: 1,
  },
  goalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  goalBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  macroCard: {
    flex: 1,
    padding: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroIcon: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroPercentage: {
    fontSize: 10,
    fontWeight: '800',
  },
  macroLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 9,
  },
  macroValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  macroValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  macroUnit: {
    color: colors.textMuted,
    fontSize: 9,
    marginLeft: 2,
  },
  macroTrack: {
    height: 4,
    marginTop: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.07)',
    overflow: 'hidden',
  },
  macroFill: {
    height: '100%',
    borderRadius: 5,
  },
  mealsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 10,
  },
  addSmallButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  mealList: {
    gap: 8,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mealIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF7F1',
    marginRight: 10,
  },
  mealBody: {
    flex: 1,
    minWidth: 0,
  },
  mealTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  mealCalories: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  mealDescription: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },
  mealBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  mealTime: {
    color: colors.placeholder,
    fontSize: 9,
    fontWeight: '600',
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proteinText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '700',
  },
  carbText: {
    color: '#087A68',
    fontSize: 9,
    fontWeight: '700',
  },
  fatText: {
    color: '#C17A13',
    fontSize: 9,
    fontWeight: '700',
  },
  nutrientDivider: {
    color: colors.placeholder,
    fontSize: 8,
    marginHorizontal: 4,
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F0FAF5',
    borderWidth: 1,
    borderColor: '#D8EFE4',
  },
  addFoodIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  addFoodText: {
    flex: 1,
    marginLeft: 10,
  },
  addFoodTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  addFoodSubtitle: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.985 }],
  },
});