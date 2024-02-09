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
  Alert,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import styles from './style';
import Select from '../../components/Select';
import {
  fetchAll,
  followUser,
  unFollowUser,
} from '../../requests/userRequests';
import ModalMessage from '../../components/ModalMessage';
import ModalUserData from '../../components/ModalUserData';

// import followers from '../../dataTests/followers';
// import following from '../../dataTests/following';

export default function Home(/*{ navigation }*/) {
  // const navigationStack = useNavigation();

  // const [username, setUsername] = useState('');
  // const [token, setToken] = useState('');
  // const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [itemButtonText, setItemButtonText] = useState('Unfollow');
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('Message');
  const [error, setError] = useState('Error');

  const [modalUserDataVisible, setModalUserDataVisible] = useState(false);
  const [clickedUsername, setClickedUsername] = useState('');

  /*const handleSearch = async () => {
    setIsSearching(true);
    try {
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
            followers,
            following
          );
          setData(followingNotFollowers);
        } else if (selection === 4) {
          const followersNotFollowing = await compareFollowersFollowing(
            following,
            followers
          );
          setData(followersNotFollowing);
        }
      }
    } catch (error) {
      console.log(`Error searching data. Error: ${error}`);
    } finally {
      setIsSearching(false);
    }
  };*/

  const handleSearch = async () => {
    setIsSearching(true);

    try {
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
        if (value === 'following') {
          const following = await fetchAll('following');
          setItemButtonText('Unfollow');
          setData(following);
        } else {
          const followers = await fetchAll('followers');
          const following = await fetchAll('following');

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

          setItemButtonText('Unfollow');
          setData(newfollowersNotFollowing);
        }
      } else {
        const following = await fetchAll('following');
        const followers = await fetchAll('followers');

        if (selection === 3) {
          const followingNotFollowers = await compareFollowersFollowing(
            followers,
            following
          );
          setItemButtonText('Unfollow');
          setData(followingNotFollowers);
        } else if (selection === 4) {
          const followersNotFollowingNotOrg =
            await compareFollowersFollowingNotOrg(followers, following);
          setItemButtonText('Unfollow');
          setData(followersNotFollowingNotOrg);
        } else if (selection === 5) {
          const followersNotFollowing = await compareFollowersFollowing(
            following,
            followers
          );
          setItemButtonText('Follow');
          setData(followersNotFollowing);
        }
      }
    } catch (error) {
      console.log(`Error searching data. Error: ${error}`);
    } finally {
      setIsSearching(false);
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
        {isFetching ? (
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
    setIsFetching(true);
    try {
      if (value === 'Follow') {
        const response = await followUser(username);
        if (response) {
          if (response.status === 'success') {
            console.log(response.message);
            setMessage('User Followed');
            setError(
              'Wait a few seconds for the API to finish the operation and reload the page'
            );
            setModalVisible(true);
            handleSearch();
          } else {
            console.log(response.message);
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
            console.log(response.message);
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
      </View>

      <View style={styles.content}>
        <Select
          data={[
            'Select an item',
            'Followers',
            'Following',
            `Followed who don't follow you`,
            `Followed who don't follow you not organizations`,
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
