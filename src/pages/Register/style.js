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
});

export default styles;
