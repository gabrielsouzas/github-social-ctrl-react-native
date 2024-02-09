import { StyleSheet, StatusBar } from 'react-native';

const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: statusBarHeight, // 22
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '75%',
    gap: 8,
    backgroundColor: '#0D1117',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: '#30363D',
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    color: '#FFF5',
    fontWeight: '700',
    fontSize: 20,
  },
  value: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default styles;
