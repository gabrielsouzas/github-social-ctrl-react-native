import React from 'react';
import { Modal, Text, Pressable, View, TextInput } from 'react-native';

import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function ModalMessage({
  modalVisible,
  setModalVisible,
  title,
  message,
}) {
  const navigation = useNavigation();

  const handleRegistrationClick = () => {
    navigation.navigate('Register');
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
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => handleRegistrationClick()}
            >
              <Text style={styles.textStyle}>Registration</Text>
            </Pressable>

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
