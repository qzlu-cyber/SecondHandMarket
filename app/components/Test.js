import React from 'react';
import { Image } from 'react-native-expo-image-cache';
import { View } from 'react-native';

// preview can be a local image or a data uri
const preview = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
};
const uri =
  'https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/b47b03a1e22e3f1fd884b5252de1e64a06a14126.png?alt=media&token=d636c423-3d94-440f-90c1-57c4de921641';

export default function test() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{
          height: 200,
          width: 200,
        }}
        {...{ preview, uri }}
      />
    </View>
  );
}
