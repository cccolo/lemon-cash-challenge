import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';

import {CloseIcon, SearchIcon} from '../../../assets/images';

type Props = {
  onCancel: () => void;
  onChangeText: (value: string) => void;
};

export const InputSearch: React.FC<Props> = ({
  onCancel,
  onChangeText,
}: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const setOnChangeTextDebounced = React.useRef(
    _.debounce((text: string) => onChangeText(text), 500),
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setOnChangeTextDebounced.current(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Ingresa nombre o simbolo"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.searchInputCancelContainer}>
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              onCancel();
            }}>
            <CloseIcon style={styles.searchInputCancel} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  searchInput: {
    color: 'white',
    maxWidth: 260,
    paddingLeft: 10,
  },
  searchInputCancelContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  searchInputCancel: {
    color: 'white',
    textAlign: 'right',
  },
});
