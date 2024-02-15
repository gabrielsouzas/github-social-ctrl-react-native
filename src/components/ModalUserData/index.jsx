import React, { useEffect, useState } from 'react';
import { Modal, Text, Pressable, View, TextInput, Image } from 'react-native';

import styles from './style';
import { fetchUserData } from '../../requests/userRequests';

export default function ModalUserData({
  modalVisible,
  setModalVisible,
  username,
}) {
  const [user, setUser] = useState({
    name: 'monalisa octocat',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    blog: 'https://github.com/blog',
    location: 'San Francisco',
    email: 'octocat@github.com',
    bio: 'There once was...',
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
  });

  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [modalVisible]);

  const fetchData = async () => {
    try {
      const response = await fetchUserData(username);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.value}>{user.bio || 'No BIO'}</Text>
          <Text style={styles.value}>{user.location || 'No Location'}</Text>
          <Text style={styles.value}>
            {user.email ? `E-Mail: ${user.email}` : 'No E-Mail'}
          </Text>
          <Text style={styles.value}>
            {user.blog ? `Blog: ${user.blog}` : 'No Blog'}
          </Text>
          <Text style={styles.value}>
            {user.followers ? `Followers: ${user.followers}` : 'No Followers'}
          </Text>
          <Text style={styles.value}>
            {user.following ? `Following: ${user.following}` : 'No Following'}
          </Text>
          <Text style={styles.value}>
            {user.public_repos
              ? `Repositories: ${user.public_repos}`
              : 'No Repositories'}
          </Text>
          <Text style={styles.value}>
            {user.public_gists ? `Gists: ${user.public_gists}` : 'No Gists'}
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
