import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type NavIcon = ComponentProps<typeof Ionicons>['name'];

export interface NavEntry {
  key: string;
  label: string;
  icon: NavIcon;
  route?: string;
}

export interface NavGroup {
  key: string;
  label: string;
  entries: NavEntry[];
}

export const homeEntry: NavEntry = {
  key: 'dashboard',
  label: 'Dashboard',
  icon: 'grid-outline',
  route: '/home',
};

export const navGroups: NavGroup[] = [
  {
    key: 'nutrition',
    label: 'Nutrition',
    entries: [
      {
        key: 'food-diary',
        label: 'Food Diary',
        icon: 'restaurant-outline',
        route: '/food-diary',
      },
      {
        key: 'meals',
        label: 'Meals',
        icon: 'fast-food-outline',
        route: '/meals',
      },
      {
        key: 'nutrition-summary',
        label: 'Nutrition Summary',
        icon: 'pie-chart-outline',
        route: '/nutrition-summary',
      },
    ],
  },
  {
    key: 'activity',
    label: 'Activity',
    entries: [
      {
        key: 'activity',
        label: 'Steps & Activity',
        icon: 'walk-outline',
        route: '/activity',
      },
      {
        key: 'workouts',
        label: 'Workouts',
        icon: 'fitness-outline',
        route: '/workouts',
      },
    ],
  },
  {
    key: 'progress',
    label: 'Progress',
    entries: [
      {
        key: 'goals',
        label: 'Weight & Goals',
        icon: 'trending-down-outline',
        route: '/goals',
      },
      {
        key: 'progress',
        label: 'Progress Reports',
        icon: 'stats-chart-outline',
        route: '/progress',
      },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    entries: [
      {
        key: 'settings',
        label: 'Settings',
        icon: 'settings-outline',
        route: '/settings',
      },
    ],
  },
];