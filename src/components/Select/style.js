import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  select: {
    height: 'auto',
  },
  dropdownButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(225, 226, 223, 0.5)',
    backgroundColor: 'transparent',
    fontSize: 18,

    height: 40,
    borderRadius: 4,
  },
  dropdownButtonText: {
    color: '#FFF',
    textAlign: 'left',

    fontSize: 18,
    marginLeft: -4,
  },
  dropdown: {
    marginTop: 0,
  },
  dropdownRow: {
    backgroundColor: '#24292F',
    borderBottomWidth: 1,
    borderBottomColor: '#0D1117',
    height: 40,
  },
  dropdownRowText: {
    color: '#e1e2df80',
    textAlign: 'left',
  },
  dropdownRowActivity: {
    backgroundColor: '#434560',
    borderBottomWidth: 1,
    borderBottomColor: '#0D1117',
    height: 40,

    // flex: 1, // Permite o texto ocupar o espaço disponível
    // flexWrap: 'wrap',
  },
  dropdownRowTextActivity: {
    fontSize: 14,
  },
});

export default styles;
