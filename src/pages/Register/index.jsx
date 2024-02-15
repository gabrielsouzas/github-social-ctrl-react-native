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
import { getApiKey, saveApiKey, setItem } from '../../utils/asyncStorage';

export default function Register({ navigation }) {
  // const navigationStack = useNavigation();

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadAcessToken();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await AsyncStorage.getItem('username');
      if (response) {
        const username = JSON.parse(response);

        setUsername(username);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAcessToken = async () => {
    try {
      const response = await getApiKey('acessToken');
      if (response) {
        const acessToken = JSON.parse(response);

        setToken(acessToken);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        await setItem('username', username);

        if (token.length > 0) {
          await saveApiKey(token);
        }
      }
    } catch (error) {
      console.log(`Erro ao salvar dados. Erro: ${error}`);
    } finally {
      setIsSaving(false);
      // navigation.navigate('Home');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'UserName is required';
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
