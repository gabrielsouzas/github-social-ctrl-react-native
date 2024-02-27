import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import {
  deleteApiKey,
  getApiKey,
  saveApiKey,
  setItem,
} from '../../utils/asyncStorage';
import { fetchUserData } from '../../requests/userRequests';

export default function Register() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);

  /* const [user, setUser] = useState({
    name: 'Octocat',
    avatar_url: '',
    blog: 'https://github.com/blog',
    location: 'San Francisco',
    email: 'octocat@github.com',
    bio: 'There once was...',
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
  }); */

  useEffect(() => {
    loadUserData();
    loadAcessToken();

    // fetchUserLoggedData();

    console.log(`Username: ${username}`);
    console.log(user);
  }, []);

  const loadUserData = async () => {
    try {
      const response = await AsyncStorage.getItem('username');
      if (response) {
        const username = JSON.parse(response);

        setUsername(username);

        await fetchUserLoggedData(username);
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
        // const acessToken = JSON.parse(response);

        setToken(response);
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
        } else {
          await deleteApiKey();
        }
      }

      fetchUserLoggedData(username);
    } catch (error) {
      console.log(`Erro ao salvar dados. Erro: ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'UserName is required';
    }

    return newErrors;
  };

  // Carrega os dados do usuário assim que fornecidos
  const fetchUserLoggedData = async (username) => {
    try {
      if (username.length > 0) {
        const response = await fetchUserData(username);
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
    <View style={styles.container}>
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
          onChangeText={(newText) => setUsername(newText.toLowerCase())}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Token:</Text>
        <TextInput
          /*ref={textInputTokenRef}*/
          style={styles.input}
          secureTextEntry
          placeholder="Personal Acess Token (Opcional) "
          placeholderTextColor="#e1e2df80"
          onChangeText={(newText) => setToken(newText)}
          /*editable={true}
          onPaste={handlePaste}
          onLongPress={() => handleLongPress()}*/
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

      {user && (
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.avatar}
            source={
              user.avatar_url.length > 0
                ? { uri: user.avatar_url }
                : require('../../images/logo_03.jpg')
            }
          />
          <Text style={styles.name}>{user.name}</Text>

          <View style={styles.top}>
            <Text style={styles.value}>{user.bio || 'No BIO'}</Text>
            <Text style={styles.value}>{user.location || 'No Location'}</Text>
          </View>

          <View style={styles.contact}>
            <Text style={[styles.value, styles.email]}>
              {user.email ? `E-Mail: ${user.email}` : 'No E-Mail'}
            </Text>
            <Text style={[styles.value, styles.blog]}>
              {user.blog ? `Blog: ${user.blog}` : 'No Blog'}
            </Text>
          </View>

          <View style={styles.social}>
            <View style={[styles.card, styles.cardLeft]}>
              <Text style={styles.cardUp}>Followers</Text>
              <Text style={styles.cardDown}>{user.followers || 'None'}</Text>
            </View>

            <View style={[styles.card, styles.cardCenter]}>
              <Text style={styles.cardUp}>Repos</Text>
              <Text style={styles.cardDown}>{user.public_repos || 'None'}</Text>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Text style={styles.cardUp}>Following</Text>
              <Text style={styles.cardDown}>{user.following || 'None'}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
