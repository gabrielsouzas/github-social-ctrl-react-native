import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getUserDataAsyncStorage = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return `Erro ao buscar dados no AsyncStorage. Erro: ${error}`;
  }
};

export const setItem = async (item, data) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(data), (err) => {
      if (err) {
        console.log('Erro ao armazenar dados no AsyncStorage.');
        throw err;
      }
    }).catch((err) => {
      console.log(`Erro: ${err}`);
    });
  } catch (error) {
    return `Erro ao armazenar dados no AsyncStorage. Erro: ${error}`;
  }
};

export const getApiKey = async (acessToken) => {
  try {
    const apiKey = await SecureStore.getItemAsync(acessToken);
    if (apiKey) {
      console.log('Chave de API recuperada com sucesso.');
      return apiKey;
    } else {
      console.log('Nenhuma chave de API encontrada.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao recuperar a chave de API:', error);
    return null;
  }
};

export const saveApiKey = async (apiKey) => {
  try {
    if (apiKey) {
      if (apiKey.length > 0) {
        await SecureStore.setItemAsync('acessToken', apiKey);
        console.log('Chave de API salva com sucesso.');
      }
    }
  } catch (error) {
    console.error('Erro ao salvar a chave de API:', error);
  }
};

export const deleteApiKey = async () => {
  try {
    await SecureStore.deleteItemAsync('acessToken');
    console.log('Chave de API excluída com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir a chave de API:', error);
  }
};
