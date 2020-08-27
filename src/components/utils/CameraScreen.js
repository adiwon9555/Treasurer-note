import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions  } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import ProcessIndicator from './ProcessIndicator';

import { normalize } from './utils';
import fonts from '../../utils/fonts';

class CameraScreen extends Component {
    static navigationOptions = { title: 'Camera', header: null };
    constructor(props) {
        super(props);
        this.state = {
            questionDescription: '',
            snapTakenCount: 0,
            loader: false,
            isCroppedPicture: 0,
        };
    }



    handleAfterTakingPicture = () => {
    }
    hanldeTakePicture = () =>{
        if (this.state.snapTakenCount === 0) {
            if (this.camera) {
                this.setState({ loader: true });
                this.setState({ snapTakenCount: 1 }); // to get number of time snap button clicked
                const imageInfo = this.takePicture();
                if (!isEmpty(imageInfo)) {
                    imageInfo.then(imageData => {
                        ImageCropPicker.openCropper({
                            path: imageData.path,
                            hideBottomControls: false,
                            enableRotationGesture: true,
                            cropperCircleOverlay: true,
                            includeExif: false,
                            freeStyleCropEnabled: true,
                            cropperToolbarTitle: 'Crop the image to fit to only 1 question.',
                            cropperActiveWidgetColor: "#ffffff",
                            cropperStatusBarColor: "#000000",
                            cropperToolbarColor: "#000000",
                            freeStyleCropEnabled: true,
                            showCropGuidelines: false,
                        }).then(img => {
                            this.setState({ loader: false });
                            const image = { ...img, uri: img.path, }
                            this.handleOnCroppingPicture(image);
                        }).catch(err => {
                            this.setState({ loader: false, snapTakenCount: 0 });
                        });
                    }).catch(error => console.log(error))
                }
            }
        }
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.3, base64: false, fixOrientation: true, pauseAfterCapture: true, skipProcessing: true };
            const data = await this.camera.takePictureAsync(options);
            return { ...data, path: data.uri, orientation: 0, mime: 'image/jpeg' };
        }
    };


    handleOpenGallery = () =>{
        if (this.state.snapTakenCount === 0) {
            const options = {
                title: 'Select Photo',
                storageOptions: {
                    skipBackup: false,
                    path: 'images',
                },
                rotation: 360,
                mediaType: 'photo',
            };
            ImagePicker.launchImageLibrary(options, (response) => {

                if (!isEmpty(response) && !isEmpty(response.uri)) {
                    ImageCropPicker.openCropper({
                        path: response.uri,
                        hideBottomControls: false,
                        enableRotationGesture: true,
                        cropperCircleOverlay:true,
                        includeExif: false,
                        freeStyleCropEnabled: true,
                        cropperToolbarTitle: 'Crop the image to fit to only 1 question.',
                        cropperActiveWidgetColor: "#ffffff",
                        cropperStatusBarColor: "#000000",
                        cropperToolbarColor: "#000000",
                        freeStyleCropEnabled: true,
                        showCropGuidelines: false,
                    }).then(img => {
                        this.setState({ loader: false });
                        const image = { ...img, uri: img.path, mime: 'image/jpeg', orientation: 0 }
                        this.handleOnCroppingPicture(image);
                        this.setState({ snapTakenCount: 1 });
                    }).catch(err => {
                        this.setState({ loader: false, snapTakenCount: 0 });
                    });
                }
            });
        }
    }

    handleOnCroppingPicture = (image) => {
        if (this.state.isCroppedPicture === 0) {
            this.setState({ isCroppedPicture: 1, loader: false });
            this.handleLoaderVisibility();
            this.props.navigation.navigate('AddMember',{imagePath:image.path});
        }
  }
  deletePresentPic = () =>{
    this.props.navigation.navigate('AddMember',{imagePath:null});
  }

    handleLoaderVisibility = () => {
        setTimeout(() => this.setState({ loader: false }), 500);
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <ProcessIndicator visible={this.state.loader} />
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style={styles.cameraPreview}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    captureAudio={false}
                    type={RNCamera.Constants.Type.front}
                    onPictureTaken={this.handleAfterTakingPicture}
                >
                    <View style={styles.cameraFrameHeader}>
                    </View>
                    <View style={styles.cameraFrameFooter}>
                        <TouchableOpacity onPress={this.handleOpenGallery} style={styles.cameraButtons}>
                            {/* <MaterialIcons name="collections" size={28} color={'#ffffff'} /> */}
                            <Text style={[styles.galleryIcon]}>&#xf302;</Text>
                            <Text style={styles.cameraButtonText}>Pick from gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.hanldeTakePicture} style={styles.clickWrapper}>
                        <Text style={[styles.clickIcon]}>&#xf111;</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.deletePresentPic} style={styles.cameraButtons}>
                            <Text style={[styles.galleryIcon]}>&#xf2ed;</Text>
                            <Text style={styles.cameraButtonText}>Delete Present Pic</Text>
                            {/* <View style={styles.rightFooterStyle}></View> */}
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  cameraPreview: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      // alignItems: 'center',
  },
  cameraFrameHeader: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-around',
      // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cameraFrameHeaderTips: {
      flex: 4,
  },
  backButton: {
      paddingLeft: normalize(20),
      flex: 1,
  },
  tipsTitle: {
      justifyContent: 'center',
      color: '#fff',
      fontSize: 12,
  },
  tips: {
      justifyContent: 'center',
      color: '#fff',
      fontSize: 12,
      // fontFamily: Font.regular,
  },
  cameraFrameFooter: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#000',
  },
  cameraButtons: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // paddingHorizontal: 10,
  },
  cameraButtonText: {
      color: '#fff',
      fontSize: 12,
      // fontFamily: Font.regular,
  },
  imageCropperMainFrame: {
      flex: 1,
      backgroundColor: '#000',
  },
  imageCropperFooter: {
    // flex: 1,
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#000',
      justifyContent: 'space-between',
    // alignSelf: 'stretch',
    // alignItems: 'flex-start',
  },
  galleryIcon: {
    fontFamily: fonts.regularIons,
    fontSize: normalize(25),
    padding: 5,
    color: 'white'
  },
  clickIcon :{
    fontFamily: fonts.regularIons,
    fontSize: normalize(50),
    color: 'white',
  },
  clickWrapper:{
    justifyContent: "center",
    alignContent: "center",
  },
  rightFooterStyle :{width:normalize(70)}
});
export default connect()(CameraScreen);
