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
      console.log(`Error saving data. Error: ${error}`);
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
        <Text style={styles.title}>Enter your information</Text>
      </View>

      {errors.username && <Text style={styles.error}>* {errors.username}</Text>}
      <View style={styles.content}>
        <Text style={styles.label}>UserName:</Text>
        <TextInput
          style={styles.input}
          placeholder="GitHub username"
          placeholderTextColor="#e1e2df80"
          value={username}
          onChangeText={(newText) => setUsername(newText.toLowerCase())}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Token:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Personal Acess Token (Optional) "
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
              <Text style={styles.buttonSaveText}>Saving</Text>
              <ActivityIndicator size="small" color="#FFF" />
            </>
          ) : (
            <Text style={styles.buttonSaveText}>Save</Text>
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
