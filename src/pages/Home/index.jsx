/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import Select from '../../components/Select';
import { fetchAll } from '../../requests/userRequests';

export default function Home(/*{ navigation }*/) {
  // const navigationStack = useNavigation();

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [itemButtonText, setItemButtonText] = useState('Unfollow');

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

        // navigation.navigate('Home');
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

  const handleSearch = async () => {
    let value = null;
    switch (selection) {
      case 1:
        value = 'followers';
        break;
      case 2:
        value = 'following';
        break;

      default:
        break;
    }

    if (value) {
      const following = await fetchAll(value);

      setData(following);
    } else {
      const following = await fetchAll('following');
      const followers = await fetchAll('followers');
      if (selection === 3) {
        const followingNotFollowers = await compareFollowersFollowing(
          following,
          followers
        );
        console.log(followingNotFollowers);
      }
    }
  };

  function compareFollowersFollowing(content, container) {
    const commonKeys = Object.keys(content).filter((key) =>
      container.hasOwnProperty(key)
    );
    const result = Object.fromEntries(
      commonKeys.map((key) => [key, content[key]])
    );
    return result;
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.itemAvatar} source={{ uri: item.avatar_url }} />
      <Text style={styles.itemLogin}>{item.login}</Text>
      <TouchableOpacity
        style={styles.itemButton}
        onPress={() => handleButtonClick(item.id)}
      >
        <Text style={styles.itemButtonText}>{itemButtonText}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleButtonClick = (userId) => {
    console.log(`Botão pressionado para o usuário ${userId}`);
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
        <Text style={styles.title}>GitHub Social Manage</Text>
      </View>

      <View style={styles.content}>
        <Select
          data={[
            'Select an item',
            'Followers',
            'Following',
            `Followed who don't follow you`,
            `Followers you don't follow`,
            'Organizations',
          ]}
          setIndexSelect={setSelection}
          selection
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.buttonSave}
        >
          {isSaving ? (
            <>
              <Text style={styles.buttonSaveText}>Searching</Text>
              <ActivityIndicator size="small" color="#FFF" />
            </>
          ) : (
            <Text style={styles.buttonSaveText}>Search</Text>
          )}
        </TouchableOpacity>

        <View style={styles.list}>
          {data ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>Select an item an click on Search</Text>
          )}
        </View>
      </View>
    </View>
  );
}
