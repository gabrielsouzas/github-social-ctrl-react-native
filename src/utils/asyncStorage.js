import AsyncStorage from '@react-native-async-storage/async-storage';

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
        await AsyncStorage.setItem(
            item,
            JSON.stringify(data),
            (err) => {
              if (err) {
                console.log('Erro ao armazenar dados no AsyncStorage.');
                throw err;
              }
            }
          ).catch((err) => {
            console.log(`Erro: ${err}`);
          });
    } catch (error) {
      return `Erro ao armazenar dados no AsyncStorage. Erro: ${error}`;
    }
  };