/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './style';
import Select from '../../components/Select';
import {
  fetchAll,
  fetchSearchUser,
  followUser,
  unFollowUser,
} from '../../requests/userRequests';
import ModalMessage from '../../components/ModalMessage';
import ModalUserData from '../../components/ModalUserData';
import { getUserDataAsyncStorage } from '../../utils/asyncStorage';

export default function Home({ navigation }) {
  const [isSearching, setIsSearching] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [itemButtonText, setItemButtonText] = useState('Unfollow');
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('Message');
  const [error, setError] = useState('Error');
  const [searchString, setSearchString] = useState('');

  const [modalUserDataVisible, setModalUserDataVisible] = useState(false);
  const [clickedUsername, setClickedUsername] = useState('');

  useEffect(() => {
    // Verificar se os dados do usuário já foram cadastrados no AsyncStorage
    const checkUserInfo = async () => {
      try {
        const userName = await getUserDataAsyncStorage('username');
        // Se houver dados do usuário, direciona para a Home
        if (!userName) {
          navigation.navigate('Register');
        }
      } catch (error) {
        console.error('Erro ao verificar os dados do usuário:', error);
      }
    };

    checkUserInfo();
  });

  const getData = async (value) => {
    try {
      const data = await fetchAll(value);
      if (data) {
        if ('error' in data) {
          setMessage(data.message);
          setError(`Error: ${data.error}`);
          setModalVisible(true);
        } else return data;
      } else return undefined;
    } catch (error) {
      setMessage('Error trying to get data from API method');
      setError(`Error: ${error}`);
      setModalVisible(true);
      return undefined;
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      // Guide
      /*
        'Select an item',
        'Search user',
        'Following',
        'Followers',
        `Followed who don't follow you`,
        `Followed who don't follow you not organizations`,
        `Followers you don't follow`,
        'Organizations',
      */
      if (selection === 1) {
        if (searchString.length > 0) {
          const users = await fetchSearchUser(searchString);
          if (users) {
            if (users.data.total_count > 0) {
              const following = await getData('following');

              if (following) {
                const search = await setButtonsFollowers(
                  users.data.items,
                  following
                );

                setItemButtonText('Unfollow');
                setData(search);
              }
            }
          }
        }
      } else if (selection === 2) {
        const following = await getData('following');
        if (following) {
          setItemButtonText('Unfollow');
          setData(following);
        }
      } else if (selection === 3) {
        const followers = await getData('followers');
        const following = await getData('following');

        if (followers && following) {
          const newFollowers = await setButtonsFollowers(followers, following);

          setItemButtonText('Unfollow');
          setData(newFollowers);
        }
      } else {
        const following = await getData('following');
        const followers = await getData('followers');

        if (followers && following) {
          if (selection === 4) {
            const followingNotFollowers = await compareFollowersFollowing(
              followers,
              following
            );
            setItemButtonText('Unfollow');
            setData(followingNotFollowers);
          } else if (selection === 5) {
            const followersNotFollowingNotOrg =
              await compareFollowersFollowingNotOrg(followers, following);
            if (followersNotFollowingNotOrg) {
              setItemButtonText('Unfollow');
              setData(followersNotFollowingNotOrg);
            }
          } else if (selection === 6) {
            const followersNotFollowing = await compareFollowersFollowing(
              following,
              followers
            );
            if (followersNotFollowing) {
              setItemButtonText('Follow');
              setData(followersNotFollowing);
            }
          } else if (selection === 7) {
            const organizations = await getOrganizations(following);
            if (organizations) {
              setItemButtonText('Unfollow');
              setData(organizations);
            }
          }
        }
      }
    } catch (error) {
      console.log(`Error searching data. Error: ${error}`);
    } finally {
      setIsSearching(false);
    }
  };

  const setButtonsFollowers = async (followers, following) => {
    try {
      if (followers && following) {
        const followersNotFollowing = await compareFollowersFollowing(
          following,
          followers
        );

        const newfollowersNotFollowing = followers.map((item) => {
          const matchingItem = followersNotFollowing.find(
            (item2) => item2.login === item.login
          );

          if (matchingItem) {
            // Se o item existe em array2, adiciona o novo atributo
            return { ...item, buttonText: 'Follow' };
          }

          // Se não, retorna o item1 sem modificar
          return item;
        });

        return newfollowersNotFollowing;
      }
      return null;
    } catch (error) {
      console.log(`Erro comparing data. Error: ${error.message}`);
      return null;
    }
  };

  function compareFollowersFollowing(content, container) {
    const result = container.filter(
      (obj2) => !content.some((obj1) => obj1.id === obj2.id)
    );

    return result;
  }

  function compareFollowersFollowingNotOrg(content, container) {
    const result = container.filter(
      (obj2) => !content.some((obj1) => obj1.id === obj2.id)
    );

    const filterOrg = result.filter((item) => item.type === 'User');

    return filterOrg;
  }

  function getOrganizations(users) {
    const filterOrg = users.filter((item) => item.type === 'Organization');

    return filterOrg;
  }

  // Break login lines if they exceed size 20
  function breakLine(login) {
    if (login.length > 20) {
      const array = splitString(login, 20);
      let newLogin = '';
      array.forEach((el, index, array2) => {
        if (index === array2.length - 1) {
          newLogin += el;
        } else {
          newLogin += `${el}\n`;
        }
      });
      return newLogin;
    }
    return login;
  }

  // Split a string by a given size
  function splitString(str, size) {
    var result = [];
    for (var i = 0; i < str.length; i += size) {
      result.push(str.substring(i, i + size));
    }
    return result;
  }

  const handleLoginClick = async (username) => {
    setClickedUsername(username);
    setModalUserDataVisible(true);
  };

  // Item representing a user in the fetched list of users
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.itemAvatar} source={{ uri: item.avatar_url }} />
      <Text
        style={styles.itemLogin}
        onPress={() => handleLoginClick(item.login)}
      >
        {breakLine(item.login)}
      </Text>
      <TouchableOpacity
        style={styles.itemButton}
        onPress={() =>
          handleButtonClick(
            item.login,
            item.hasOwnProperty('buttonText') ? item.buttonText : itemButtonText
          )
        }
      >
        {isFetching && clickedUsername === item.login ? (
          <ActivityIndicator
            size="small"
            color="#8B949E"
            style={styles.clickButton}
          />
        ) : (
          <Text style={styles.itemButtonText}>
            {item.hasOwnProperty('buttonText')
              ? item.buttonText
              : itemButtonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const handleButtonClick = async (username, value) => {
    setClickedUsername(username);
    setIsFetching(true);
    try {
      if (value === 'Follow') {
        const response = await followUser(username);
        if (response) {
          if (response.status === 'success') {
            setMessage('User Followed');
            setError(
              'Wait a few seconds for the API to finish the operation and reload the page'
            );
            setModalVisible(true);
            handleSearch();
          } else {
            setMessage(response.message);
            const err = 'error' in response ? response.error : 'Unknow error';
            setError(err);
            setModalVisible(true);
          }
        } else {
          console.log('No response to the request.');
        }
      } else {
        const response = await unFollowUser(username);
        if (response) {
          if (response.status === 'success') {
            console.log(response.message);
            setMessage('User Unfollowed');
            setError(
              'Wait a few seconds for the API to finish the operation and reload the page'
            );
            setModalVisible(true);
            handleSearch();
          } else {
            setMessage(response.message);
            const err = 'error' in response ? response.error : 'Unknow error';
            setError(err);
            setModalVisible(true);
          }
        } else {
          console.log('No response to the request.');
        }
      }
    } catch (error) {
      console.log(
        `Error following/unfollowing user ${username}. Error: ${error}`
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        backgroundColor="#0D1117"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />

      <ModalMessage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={message}
        message={error}
      />

      <ModalUserData
        modalVisible={modalUserDataVisible}
        setModalVisible={setModalUserDataVisible}
        username={clickedUsername}
      />

      <View style={styles.header}>
        <Text style={styles.title}>GitHub Social Manage</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <FontAwesome5
            style={styles.userData}
            name="user-cog"
            size={22}
            color="#30363D"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Select
          data={[
            'Select an item',
            'Search user',
            'Following',
            'Followers',
            `Followed who don't follow you`,
            `Followed who don't follow you not organizations`,
            `Followers you don't follow`,
            'Organizations',
          ]}
          setIndexSelect={setSelection}
          selection
        />
      </View>

      {selection === 1 && (
        <TextInput
          style={styles.input}
          placeholder="User name"
          placeholderTextColor="#e1e2df80"
          value={searchString}
          onChangeText={(newText) => setSearchString(newText)}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.buttonSave}
        >
          {isSearching ? (
            <>
              <Text style={styles.buttonSaveText}>Searching</Text>
            </>
          ) : (
            <Text style={styles.buttonSaveText}>Search</Text>
          )}
        </TouchableOpacity>

        <View style={styles.list}>
          {isSearching ? (
            <ActivityIndicator
              size="large"
              color="#8B949E"
              style={styles.searchingList}
            />
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
}
