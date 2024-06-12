import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {LeftArroyIcon, ProfileIcon} from '../../assets/images';
import {WHITE_400} from '../../const/colors';

type Props = {
  onBack?: () => void;
  hideBack?: boolean;
  title?: string;
};

export const Header: React.FC<Props> = ({title, hideBack, onBack}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          {!hideBack && (
            <TouchableOpacity onPress={onBack}>
              <LeftArroyIcon />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.settings}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <ProfileIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  settings: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 24,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: WHITE_400,
  },
});
