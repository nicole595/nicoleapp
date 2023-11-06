import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { ScreenCadastrar, ScreenLogin } from "../screens"
import { TabNavigation } from './tab.navigation'
import { DrawerNavigation } from './drawer.navigation'
type LoginStackParamList ={
  Login: undefined
  Cadastrar: undefined
}
type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>
export type LoginTypes = {
  navigation: LoginScreenNavigationProp
}
export function LoginNavigation() {
  const Stack = createStackNavigator<LoginStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="Login" component={ScreenLogin} />
      <Stack.Screen name="Cadastrar" component={ScreenCadastrar} />
    </Stack.Navigator>
  );
}
