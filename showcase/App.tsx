import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { sys } from '@compsych/mobile-ui';

import type { RootStackParamList } from './src/navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { ButtonScreen } from './src/screens/ButtonScreen';
import { AlertScreen } from './src/screens/AlertScreen';
import { BadgeScreen } from './src/screens/BadgeScreen';
import { CardScreen } from './src/screens/CardScreen';
import { CheckboxScreen } from './src/screens/CheckboxScreen';
import { SnackbarScreen } from './src/screens/SnackbarScreen';
import { SwitchScreen } from './src/screens/SwitchScreen';
import { PlaceholderScreen } from './src/screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const { colorRoles: cr } = sys;

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest },
            headerTintColor: cr.accent.primary.sysPrimary,
            headerTitleStyle: {
              fontFamily: 'GoogleSans_600SemiBold',
              fontSize: 16,
              color: cr.surface.surface.sysOnSurface,
            },
            headerShadowVisible: false,
            headerBackTitle: '',
            contentStyle: { backgroundColor: cr.surface.surface.sysSurface },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'ComPsych DS', headerLargeTitle: true }}
          />

          {/* ── Full playground screens ── */}
          <Stack.Screen name="Button"   component={ButtonScreen}   options={{ title: 'Button' }} />
          <Stack.Screen name="Alert"    component={AlertScreen}    options={{ title: 'Alert' }} />
          <Stack.Screen name="Badge"    component={BadgeScreen}    options={{ title: 'Badge' }} />
          <Stack.Screen name="Card"     component={CardScreen}     options={{ title: 'Card' }} />
          <Stack.Screen name="Checkbox" component={CheckboxScreen} options={{ title: 'Checkbox' }} />
          <Stack.Screen name="Snackbar" component={SnackbarScreen} options={{ title: 'Snackbar' }} />
          <Stack.Screen name="Switch"   component={SwitchScreen}   options={{ title: 'Switch' }} />

          {/* ── Placeholder screens (more coming) ── */}
          <Stack.Screen name="Avatar"          component={PlaceholderScreen} options={{ title: 'Avatar' }} />
          <Stack.Screen name="Breadcrumb"      component={PlaceholderScreen} options={{ title: 'Breadcrumb' }} />
          <Stack.Screen name="Chip"            component={PlaceholderScreen} options={{ title: 'Chip' }} />
          <Stack.Screen name="Divider"         component={PlaceholderScreen} options={{ title: 'Divider' }} />
          <Stack.Screen name="EmptyState"      component={PlaceholderScreen} options={{ title: 'Empty State' }} />
          <Stack.Screen name="Input"           component={PlaceholderScreen} options={{ title: 'Input' }} />
          <Stack.Screen name="Pagination"      component={PlaceholderScreen} options={{ title: 'Pagination' }} />
          <Stack.Screen name="ProgressTracker" component={PlaceholderScreen} options={{ title: 'Progress Tracker' }} />
          <Stack.Screen name="RadioButton"     component={PlaceholderScreen} options={{ title: 'Radio Button' }} />
          <Stack.Screen name="SegmentedControl"component={PlaceholderScreen} options={{ title: 'Segmented Control' }} />
          <Stack.Screen name="Slider"          component={PlaceholderScreen} options={{ title: 'Slider' }} />
          <Stack.Screen name="Tooltip"         component={PlaceholderScreen} options={{ title: 'Tooltip' }} />
          <Stack.Screen name="ActionSheet"     component={PlaceholderScreen} options={{ title: 'Action Sheet' }} />
          <Stack.Screen name="List"            component={PlaceholderScreen} options={{ title: 'List' }} />
          <Stack.Screen name="PlanCard"        component={PlaceholderScreen} options={{ title: 'Plan Card' }} />
          <Stack.Screen name="HeaderText"      component={PlaceholderScreen} options={{ title: 'Header Text' }} />
          <Stack.Screen name="BodyText"        component={PlaceholderScreen} options={{ title: 'Body Text' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
