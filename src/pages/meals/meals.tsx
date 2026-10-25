import { AppLayout } from '@/layouts/app-layout/AppLayout';
import { colors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type Meal = {
    id: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    icon: keyof typeof Ionicons.glyphMap;
};

const meals: Meal[] = [
    {
        id: 1,
        name: 'Breakfast',
        description: '2 Idli, Sambar & Chutney',
        calories: 380,
        protein: 12,
        carbs: 58,
        fat: 9,
        icon: 'sunny-outline',
    },
    {
        id: 2,
        name: 'Lunch',
        description: 'Rice, Chicken Curry & Vegetables',
        calories: 620,
        protein: 34,
        carbs: 76,
        fat: 18,
        icon: 'restaurant-outline',
    },
    {
        id: 3,
        name: 'Evening Snack',
        description: 'Banana & Whey Protein',
        calories: 280,
        protein: 26,
        carbs: 31,
        fat: 4,
        icon: 'nutrition-outline',
    },
    {
        id: 4,
        name: 'Dinner',
        description: 'Chapati, Paneer & Salad',
        calories: 400,
        protein: 20,
        carbs: 19,
        fat: 23,
        icon: 'moon-outline',
    },
];

const mealTemplates = [
    {
        name: 'High Protein Breakfast',
        description: 'Eggs, oats & whey',
        calories: 420,
        protein: 32,
        icon: 'barbell-outline' as const,
    },
    {
        name: 'Balanced Lunch',
        description: 'Rice, chicken & vegetables',
        calories: 620,
        protein: 38,
        icon: 'restaurant-outline' as const,
    },
    {
        name: 'Light Evening Snack',
        description: 'Fruit & protein',
        calories: 250,
        protein: 22,
        icon: 'nutrition-outline' as const,
    },
];

const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

export default function Meals() {
    return (
        <AppLayout title="Meals" activeKey="meals" caption="Plan and manage your meals">
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={['#0B8F5A', '#087A68', '#064C59']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.heroContent}>
                        <Text style={styles.heroEyebrow}>TODAY'S MEALS</Text>
                        <Text style={styles.heroTitle}>Stay on track</Text>
                        <Text style={styles.heroSubtitle}>
                            Plan your meals and keep your nutrition balanced throughout the day.
                        </Text>
                    </View>
                    <View style={styles.heroIcon}>
                        <Ionicons name="restaurant-outline" size={30} color={colors.white} />
                    </View>
                </LinearGradient>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryMain}>
                        <View style={styles.summaryIcon}>
                            <Ionicons name="flame-outline" size={21} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.summaryLabel}>Today's calories</Text>
                            <Text style={styles.summaryValue}>{totalCalories} kcal</Text>
                            <Text style={styles.summaryTarget}>of 2,200 kcal goal</Text>
                        </View>
                    </View>
                    <View style={styles.summaryProgress}>
                        <LinearGradient
                            colors={['#0B8F5A', '#087A68', '#064C59']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.summaryProgressFill}
                        />
                    </View>
                </View>

                <View style={styles.macroSummary}>
                    <MacroSummary
                        label="Protein"
                        value={`${totalProtein}g`}
                        target="110g"
                        icon="barbell-outline"
                    />
                    <MacroSummary
                        label="Carbs"
                        value={`${totalCarbs}g`}
                        target="240g"
                        icon="nutrition-outline"
                    />
                    <MacroSummary
                        label="Fat"
                        value={`${totalFat}g`}
                        target="65g"
                        icon="water-outline"
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Today's meals</Text>
                        <Text style={styles.sectionSubtitle}>Your meals planned for today</Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{meals.length} meals</Text>
                    </View>
                </View>

                <View style={styles.mealsCard}>
                    {meals.map((meal, index) => (
                        <MealRow key={meal.id} meal={meal} last={index === meals.length - 1} />
                    ))}
                </View>

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Quick meal ideas</Text>
                        <Text style={styles.sectionSubtitle}>Easy meals to add to your day</Text>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.templateScroll}
                >
                    {mealTemplates.map((meal) => (
                        <MealTemplate key={meal.name} meal={meal} />
                    ))}
                </ScrollView>

                <View style={styles.actionSection}>
                    <LinearGradient
                        colors={['#0B8F5A', '#087A68', '#064C59']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.addMealButton}
                    >
                        <View style={styles.addMealIcon}>
                            <Ionicons name="add" size={20} color={colors.white} />
                        </View>
                        <View style={styles.addMealText}>
                            <Text style={styles.addMealTitle}>Add a meal</Text>
                            <Text style={styles.addMealSubtitle}>
                                Log your next meal or create a custom meal
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={19} color={colors.white} />
                    </LinearGradient>
                </View>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </AppLayout>
    );
}

function MealRow({ meal, last }: { meal: Meal; last: boolean }) {
    return (
        <View style={[styles.mealRow, !last && styles.mealRowBorder]}>
            <View style={styles.mealIcon}>
                <Ionicons name={meal.icon} size={21} color={colors.primary} />
            </View>
            <View style={styles.mealInfo}>
                <View style={styles.mealTitleRow}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                </View>
                <Text style={styles.mealDescription} numberOfLines={1}>
                    {meal.description}
                </Text>
                <View style={styles.mealMacros}>
                    <MacroTag label="P" value={`${meal.protein}g`} />
                    <MacroTag label="C" value={`${meal.carbs}g`} />
                    <MacroTag label="F" value={`${meal.fat}g`} />
                </View>
            </View>
            <View style={styles.chevron}>
                <Ionicons name="chevron-forward" size={16} color={colors.placeholder} />
            </View>
        </View>
    );
}

function MacroTag({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.macroTag}>
            <Text style={styles.macroTagLabel}>{label}</Text>
            <Text style={styles.macroTagValue}>{value}</Text>
        </View>
    );
}

function MacroSummary({
    label,
    value,
    target,
    icon,
}: {
    label: string;
    value: string;
    target: string;
    icon: keyof typeof Ionicons.glyphMap;
}) {
    return (
        <View style={styles.macroSummaryItem}>
            <View style={styles.macroSummaryIcon}>
                <Ionicons name={icon} size={17} color={colors.primary} />
            </View>
            <Text style={styles.macroSummaryLabel}>{label}</Text>
            <Text style={styles.macroSummaryValue}>{value}</Text>
            <Text style={styles.macroSummaryTarget}>/ {target}</Text>
        </View>
    );
}

function MealTemplate({
    meal,
}: {
    meal: {
        name: string;
        description: string;
        calories: number;
        protein: number;
        icon: keyof typeof Ionicons.glyphMap;
    };
}) {
    return (
        <View style={styles.templateCard}>
            <View style={styles.templateIcon}>
                <Ionicons name={meal.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.templateName} numberOfLines={1}>
                {meal.name}
            </Text>
            <Text style={styles.templateDescription} numberOfLines={1}>
                {meal.description}
            </Text>
            <View style={styles.templateBottom}>
                <Text style={styles.templateCalories}>{meal.calories} kcal</Text>
                <Text style={styles.templateProtein}>{meal.protein}g P</Text>
            </View>
            <View style={styles.templateAdd}>
                <Ionicons name="add" size={16} color={colors.primary} />
                <Text style={styles.templateAddText}>Add</Text>
            </View>
        </View>
    );
}

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
        minHeight: 155,
        borderRadius: 23,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        shadowColor: '#064C59',
        shadowOpacity: 0.17,
        shadowRadius: 13,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    heroContent: {
        flex: 1,
        paddingRight: 15,
    },
    heroEyebrow: {
        color: 'rgba(255,255,255,0.68)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.1,
    },
    heroTitle: {
        color: colors.white,
        fontSize: 27,
        fontWeight: '900',
        marginTop: 5,
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.78)',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 6,
    },
    heroIcon: {
        width: 55,
        height: 55,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    summaryCard: {
        backgroundColor: colors.surface,
        borderRadius: 19,
        padding: 16,
        marginTop: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    summaryMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryIcon: {
        width: 43,
        height: 43,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceSoft,
        marginRight: 11,
    },
    summaryLabel: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '600',
    },
    summaryValue: {
        color: colors.text,
        fontSize: 21,
        fontWeight: '900',
        marginTop: 1,
    },
    summaryTarget: {
        color: colors.placeholder,
        fontSize: 9,
        marginTop: 1,
    },
    summaryProgress: {
        height: 7,
        borderRadius: 4,
        backgroundColor: '#E6F0EC',
        marginTop: 13,
        overflow: 'hidden',
    },
    summaryProgressFill: {
        width: '76%',
        height: '100%',
        borderRadius: 4,
    },
    macroSummary: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 8,
    },
    macroSummaryItem: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 15,
        padding: 11,
        borderWidth: 1,
        borderColor: colors.border,
    },
    macroSummaryIcon: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: colors.surfaceSoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    macroSummaryLabel: {
        color: colors.textMuted,
        fontSize: 9,
        fontWeight: '600',
    },
    macroSummaryValue: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '900',
        marginTop: 2,
    },
    macroSummaryTarget: {
        color: colors.placeholder,
        fontSize: 8,
        marginTop: 1,
    },
    sectionHeader: {
        marginTop: 23,
        marginBottom: 11,
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
        fontSize: 10,
        marginTop: 3,
    },
    countBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.surfaceSoft,
    },
    countText: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '800',
    },
    mealsCard: {
        backgroundColor: colors.surface,
        borderRadius: 19,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    mealRow: {
        minHeight: 83,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    mealIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceSoft,
        marginRight: 11,
    },
    mealInfo: {
        flex: 1,
    },
    mealTitleRow: {
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
        fontSize: 11,
        fontWeight: '800',
    },
    mealDescription: {
        color: colors.textMuted,
        fontSize: 10,
        marginTop: 3,
        paddingRight: 5,
    },
    mealMacros: {
        flexDirection: 'row',
        marginTop: 6,
        gap: 5,
    },
    macroTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: '#F4F8F6',
    },
    macroTagLabel: {
        color: colors.primary,
        fontSize: 8,
        fontWeight: '900',
        marginRight: 2,
    },
    macroTagValue: {
        color: colors.textMuted,
        fontSize: 8,
        fontWeight: '600',
    },
    chevron: {
        marginLeft: 7,
    },
    templateScroll: {
        gap: 10,
    },
    templateCard: {
        width: 190,
        backgroundColor: colors.surface,
        borderRadius: 17,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    templateIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: colors.surfaceSoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    templateName: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '800',
    },
    templateDescription: {
        color: colors.textMuted,
        fontSize: 9,
        marginTop: 3,
    },
    templateBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    templateCalories: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '800',
    },
    templateProtein: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '800',
    },
    templateAdd: {
        height: 31,
        borderRadius: 9,
        backgroundColor: colors.surfaceSoft,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    templateAddText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 3,
    },
    actionSection: {
        marginTop: 20,
    },
    addMealButton: {
        minHeight: 70,
        borderRadius: 18,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addMealIcon: {
        width: 40,
        height: 40,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginRight: 11,
    },
    addMealText: {
        flex: 1,
    },
    addMealTitle: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '800',
    },
    addMealSubtitle: {
        color: 'rgba(255,255,255,0.68)',
        fontSize: 9,
        marginTop: 2,
    },
    bottomSpace: {
        height: 15,
    },
});