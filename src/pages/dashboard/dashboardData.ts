import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type Tone = 'info' | 'warn' | 'danger' | 'ok';
export type IconName = ComponentProps<typeof Ionicons>['name'];

export const toneColors: Record<Tone, { main: string; soft: string }> = {
  info: {
    main: '#087A68',
    soft: '#E8F7F2',
  },
  warn: {
    main: '#D98B16',
    soft: '#FFF5DF',
  },
  danger: {
    main: '#D4202B',
    soft: '#FDEAEC',
  },
  ok: {
    main: '#0B8F5A',
    soft: '#E6F6EC',
  },
};

export const kpis: {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  icon: IconName;
  trend: string;
}[] = [
  {
    label: 'Calories consumed',
    value: '1,680',
    detail: 'of 2,200 kcal goal',
    tone: 'info',
    icon: 'restaurant-outline',
    trend: '+180',
  },
  {
    label: 'Calories remaining',
    value: '520',
    detail: 'Available today',
    tone: 'ok',
    icon: 'flame-outline',
    trend: '-120',
  },
  {
    label: 'Protein',
    value: '92 g',
    detail: 'Target 110 g',
    tone: 'ok',
    icon: 'barbell-outline',
    trend: '+8 g',
  },
  {
    label: 'Carbohydrates',
    value: '184 g',
    detail: 'Target 240 g',
    tone: 'info',
    icon: 'nutrition-outline',
    trend: '+12 g',
  },
  {
    label: 'Fat',
    value: '54 g',
    detail: 'Target 65 g',
    tone: 'warn',
    icon: 'water-outline',
    trend: '+4 g',
  },
  {
    label: 'Steps',
    value: '6,842',
    detail: 'Goal 8,000 steps',
    tone: 'info',
    icon: 'walk-outline',
    trend: '+842',
  },
  {
    label: 'Calories burned',
    value: '2,410',
    detail: 'Daily expenditure',
    tone: 'ok',
    icon: 'fitness-outline',
    trend: '+140',
  },
  {
    label: 'Active time',
    value: '54 min',
    detail: 'Walking & activities',
    tone: 'info',
    icon: 'timer-outline',
    trend: '+12 min',
  },
];

export const calorieTrend = [
  { label: 'Mon', value: 1940 },
  { label: 'Tue', value: 2110 },
  { label: 'Wed', value: 1780 },
  { label: 'Thu', value: 2250 },
  { label: 'Fri', value: 1680 },
  { label: 'Sat', value: 2040 },
  { label: 'Sun', value: 1890 },
];

export const macroBreakdown = [
  {
    label: 'Protein',
    value: 92,
    target: 110,
    unit: 'g',
    tone: 'ok' as Tone,
  },
  {
    label: 'Carbs',
    value: 184,
    target: 240,
    unit: 'g',
    tone: 'info' as Tone,
  },
  {
    label: 'Fat',
    value: 54,
    target: 65,
    unit: 'g',
    tone: 'warn' as Tone,
  },
];

export const activityBreakdown = [
  {
    label: 'Walking',
    value: 285,
  },
  {
    label: 'Badminton',
    value: 340,
  },
  {
    label: 'Cycling',
    value: 190,
  },
  {
    label: 'Other activity',
    value: 95,
  },
];

export const recentEntries = [
  {
    id: 1,
    meal: 'Breakfast',
    description: '2 Idli, Sambar & Chutney',
    calories: 380,
    protein: 12,
    carbs: 58,
    fat: 9,
    time: '08:30 AM',
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
  },
];

export const weeklySummary = {
  averageCalories: 1956,
  calorieGoal: 2200,
  averageSteps: 7340,
  stepGoal: 8000,
  averageProtein: 96,
  proteinGoal: 110,
  daysTracked: 6,
  totalDays: 7,
};

export const goalProgress = {
  currentWeight: 79.4,
  targetWeight: 75,
  caloriesGoal: 2200,
  proteinGoal: 110,
  stepsGoal: 8000,
};