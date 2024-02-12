import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';

export default function Register({ navigation }) {
  const navigationStack = useNavigation();

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await AsyncStorage.getItem('userData');
        if (response) {
          const userData = JSON.parse(response);

          fillFields(userData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const fillFields = (data) => {
    setUsername(data.username);
    setToken(data.token);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newErrors = await validateForm();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const userData = {
          username,
          token,
        };

        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(userData),
          (err) => {
            if (err) {
              console.log('Erro ao armazenar dados no AsyncStorage.');
              throw err;
            }
          }
        ).catch((err) => {
          console.log(`Erro: ${err}`);
        });

        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(`Erro ao salvar dados. Erro: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getUserDataAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        return JSON.parse(value);
      }
      return 'Nenhum dado encontrado!';
    } catch (error) {
      return `Erro ao buscar dados do usuário no AsyncStorage. Erro: ${error}`;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'UserName é obrigatório';
    }

    return newErrors;
  };

  return isLoading ? (
    <View style={styles.containerIsLoading}>
      <ActivityIndicator
        size="large"
        color="#FFF"
        style={styles.activityIndicator}
      />
    </View>
  ) : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar
        animated
        backgroundColor="#0D1117"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Insira suas informações</Text>
      </View>

      {errors.username && <Text style={styles.error}>* {errors.username}</Text>}
      <View style={styles.content}>
        <Text style={styles.label}>UserName:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário no GitHub"
          placeholderTextColor="#e1e2df80"
          value={username}
          onChangeText={(newText) => setUsername(newText)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Token:</Text>
        <TextInput
          style={styles.input}
          placeholder="Personal Acess Token (Opcional) "
          placeholderTextColor="#e1e2df80"
          onChangeText={(newText) => setToken(newText)}
          value={token}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSave()}
          style={styles.buttonSave}
        >
          {isSaving ? (
            <>
              <Text style={styles.buttonSaveText}>Salvando</Text>
              <ActivityIndicator size="small" color="#FFF" />
            </>
          ) : (
            <Text style={styles.buttonSaveText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
