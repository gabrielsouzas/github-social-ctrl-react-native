import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  containerIsLoading: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    transform: [{ scale: 2.7 }], // Aumenta o tamanho em porcentagem
  },
  header: {
    flexDirection: 'row',
    marginRight: 14,
    marginLeft: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonSettings: {
    backgroundColor: '#30363D',
    marginRight: 4,
    padding: 4,
    borderRadius: 5,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#30363D',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 14,
    marginRight: 14,
    gap: 8,
  },
  label: {
    color: '#FFF',
    fontSize: 18,
    width: 105,
    textAlign: 'right',
  },
  input: {
    flex: 1,
    color: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(225, 226, 223, 0.5)',
    paddingLeft: 5,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 14,
    height: 40,
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30363D',
    marginTop: 20,
    marginRight: 14,
    marginLeft: 14,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textButton: {
    fontSize: 18,
    color: '#FFF',
  },
  buttonIMC: {
    padding: 8,
    backgroundColor: '#30363D',
    borderRadius: 3,
  },
  buttonSave: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30363D',
    padding: 8,
    borderRadius: 3,
    marginRight: 14,
    marginLeft: 14,
  },
  buttonSaveText: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  error: {
    color: '#e76767d5',
    marginLeft: 127,
    marginBottom: 2,
  },

  list: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 5,
    marginRight: 14,
    marginLeft: 14,
    marginTop: 20,
    marginBottom: 20,

    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemLogin: {
    textAlign: 'center',
    color: '#FFF',
  },
  itemButton: {
    backgroundColor: '#30363D',
    borderWidth: 0.5,
    borderColor: '#8B949E',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
    paddingTop: 6,
    paddingRight: 8,
    paddingLeft: 8,

    width: 75,
  },
  itemButtonText: {
    color: '#BFD1D9',
  },
  clickButton: {},
  searchingList: {
    transform: [{ scale: 1.7 }],
  },
});

export default styles;
