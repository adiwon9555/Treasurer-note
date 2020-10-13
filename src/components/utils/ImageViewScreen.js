import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {color} from 'react-native-reanimated';
import GoBackIconHeaderLeft, {ICONSTYLE} from './GoBackIconHeaderLeft';
import {normalize} from './utils';

export default (ImageViewScreen = ({navigation, profileIcon, onModalClose}) => {
  // const profileIcon ={ uri: navigation.getParam('imageUri') };
  const images = [
    {
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
      props: {
        source: profileIcon,
      },
    },
  ];
  return (
    <Modal transparent={true}>
      <ImageViewer
        imageUrls={images}
        renderIndicator={() => null}
        saveToLocalByLongPress={false}
        renderHeader={() => (
              <GoBackIconHeaderLeft
                navigation={navigation}
                onPress={onModalClose}
                iconStyle={null}
                iconExtraStyles={styles.backIconStyle}
                containerStyle={styles.iconContainer}

              />
        )}
      />
    </Modal>
  );
});

const styles = StyleSheet.create({
  iconContainer: {
    position:'absolute',
    marginTop: normalize(15),
    marginLeft: normalize(5),
    elevation:9999,
    zIndex: 9999
    
  },
  backIconStyle: {
    color: 'white',
    paddingLeft: normalize(2),

  },
});
