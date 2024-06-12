import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GREEN, WHITE} from '../../../const/colors';
import {REGULAR} from '../../../const/fonts';

type Props = {
  title: string;
  description: string | number;
};

export const ItemDetail: React.FC<Props> = ({title, description}) => {
  return (
    <View style={styles.table}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    marginTop: 18,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: GREEN,
    fontFamily: REGULAR,
    fontSize: 12,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  value: {
    color: WHITE,
    fontFamily: REGULAR,
    fontSize: 12,
  },
});
