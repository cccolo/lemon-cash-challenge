import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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

// TODO:
const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    marginTop: 18,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: 'rgb(0, 240, 104)',
    fontFamily: 'NeueMachina-Regular',
    fontSize: 12,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  value: {
    color: 'white',
    fontFamily: 'NeueMachina-Regular',
    fontSize: 12,
  },
});
