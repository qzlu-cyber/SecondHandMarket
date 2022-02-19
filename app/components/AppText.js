import React from 'react';
import { Text } from 'react-native';

import defaltStyles from '../config/style';

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defaltStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
