import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../pages/Home';
import Register from '../pages/Register';
import { getUserDataAsyncStorage } from '../utils/asyncStorage';
import ModalMessage from '../components/ModalMessage';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [initialRoute, setInitialRoute] = useState('CheckUserDataScreen'); // Rota inicial padrão

  useEffect(() => {
    // Verificar se os dados do usuário já foram cadastrados no AsyncStorage
    const checkUserInfo = async () => {
      try {
        const userName = await getUserDataAsyncStorage('username');

        // Se houver dados do usuário, direciona para a Home
        if (!userName) {
          console.log('register');
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

      <Stack.Screen name="ModalMessage" component={ModalMessage} />
    </Stack.Navigator>
  );
}
