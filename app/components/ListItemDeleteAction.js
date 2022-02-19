import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

export default function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <AntDesign name="delete" color={colors.white} size={35} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.denger,
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
