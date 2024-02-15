import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../pages/Home';
import Register from '../pages/Register';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [initialRoute, setInitialRoute] = useState('CheckUserDataScreen'); // Rota inicial padrão

  useEffect(() => {
    // Verificar se os dados do usuário já foram cadastrados no AsyncStorage
    const checkUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');

        // Se houver dados do usuário, direciona para a Home
        if (!userData) {
          setInitialRoute('Register');
        } else {
          setInitialRoute('Home');
        }
      } catch (error) {
        console.error('Erro ao verificar os dados do usuário:', error);
      }
    };

    checkUserInfo();
  });

  return (
    <Stack.Navigator
      initialRouteName={initialRoute} // "HomeScreen" // Controle de rota inicial
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />

      <Stack.Screen
        options={{
          title: 'Registration',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#0D1117',
            borderBottomWidth: 0,
          },
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
}
