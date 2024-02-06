import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import PropTypes from 'prop-types';

import { Text } from 'react-native';
import styles from './style';

export default function Select({
  data,
  setItemSelect,
  setIndexSelect,
  activity,
}) {
  const handleOnSelect = (selectedItem, index) => {
    if (setItemSelect) {
      setItemSelect(selectedItem);
    }
    if (setIndexSelect) {
      const indexAux = index;
      setIndexSelect(indexAux);
    }
  };

  const renderItem = (item) => (
    <Text numberOfLines={2} style={{ padding: 10 }}>
      {item}
    </Text>
  );

  return (
    <SelectDropdown
      style={styles.select}
      defaultValueByIndex={0}
      data={data}
      onSelect={(selectedItem, index) => {
        handleOnSelect(selectedItem, index);
      }}
      buttonStyle={styles.dropdownButton}
      buttonTextStyle={styles.dropdownButtonText}
      renderDropdownIcon={(isOpened) => (
        <MaterialCommunityIcons
          name={isOpened ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#e1e2df80"
        />
      )}
      dropdownIconPosition="right"
      dropdownStyle={styles.dropdown}
      // rowStyle={styles.dropdownRow}
      // rowStyle={styles.dropdownRowActivity}
      rowStyle={activity ? styles.dropdownRowActivity : styles.dropdownRow}
      rowTextStyle={
        activity
          ? [styles.dropdownRowText, styles.dropdownRowTextActivity]
          : styles.dropdownRowText
      }
      colStyle={styles.dropdownCol}
      renderCustomRow={renderItem}
    />
  );
}

Select.defaultProps = {
  setItemSelect: () => {}, // Valor padrão, uma função vazia
  setIndexSelect: () => {},
  activity: false,
};

Select.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  setItemSelect: PropTypes.func,
  setIndexSelect: PropTypes.func,
  activity: PropTypes.bool,
};
