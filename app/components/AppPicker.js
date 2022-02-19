import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

import colors from '../config/colors';

function AppPicker({ icon, width = '100%' }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState('选择');
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          <TextInput
            editable={false}
            placeholderTextColor={colors.medium}
            placeholder={
              categories === '选择' ? '分类' : `已选${categories}用品`
            }
          />
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={colors.medium}
            style={styles.iconArrow}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ height: '30%', width: '100%', marginTop: 50 }}>
          <Picker
            selectedValue={categories}
            onValueChange={(itemValue, itemIndex) => setCategories(itemValue)}>
            <Picker.Item label="请选择" value="选择" />
            <Picker.Item label="生活用品" value="生活" />
            <Picker.Item label="学习用品" value="学习" />
            <Picker.Item label="娱乐用品" value="娱乐" />
          </Picker>
        </View>
        <Button title="关闭" onPress={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.light,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  iconArrow: {
    position: 'absolute',
    right: 20,
  },
});

export default AppPicker;
