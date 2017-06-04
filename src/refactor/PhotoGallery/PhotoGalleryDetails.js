import React from 'react';
import PropTypes from 'prop-types';
import {
  ActionSheetIOS,
  CameraRoll,
  AlertIOS,
  Modal,
  View,
  Share } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PhotoBrowser from 'react-native-photo-browser';
import ImagePickerManager from 'react-native-image-picker';
import { graphql, compose } from 'react-apollo';

import { getBase64, addSurveyPhoto, selectSurveyPhotos } from '../../graphql/mutations';
import { getMyCustomer } from '../../graphql/queries';
import photoOptions from '../PhotoPicker/photoOptions'; // move this!
import PhotoEditorContainer from './PhotoEditorContainer';


const BUTTONS = [
  'Edit',
  'Save',
  'Share',
  'Add',
  'Cancel',
];

class _PhotoGalleryDetails extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    selectSurveyPhotos: PropTypes.func.isRequired,
    addSurveyPhoto: PropTypes.func.isRequired,
    getBase64: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      clicked: '',
      zoomModal: false,
      currentSelection: '',
      isEditorOpen: false,
    };
    this.selectedDocID = '';
  }
  componentDidMount() {
  }

  downloadImage = (image) => {
    this.props.getBase64({
      variables: {
        docID: image.docID,
      },
    }).then((base64) => {
      CameraRoll.saveToCameraRoll(base64.data.getImageBase64.base64, 'photo');
      AlertIOS.alert('Photo Saved');
    });
  };

  shareImage = (image) => {
    const customerAddress = this.props.data.customer.address;
    const customerName = `${this.props.data.customer.firstName} ${this.props.data.customer.lastName}`;

    Share.share({
      message: `Check out this photo for ${customerName} at ${customerAddress}.`,
      url: image.photo,
      title: `Photo for ${customerAddress}`,
      subject: `Photo for ${customerAddress}`,
    }, {
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
      ],
      tintColor: 'green',
    })
    .then(() => {})
    .catch((error) => {
      console.log(`Could not share photo: ${error.message}`);
    });
  }

  uploadImage = () => {
    ImagePickerManager.launchImageLibrary(photoOptions, (data) => {
      this.props.addSurveyPhoto({
        variables: {
          heading: 'DirectUpload',
          description: this.state.photoCaption,
          orginalBase64: data.data,
          timestamp: new Date(),
          custid: this.props.id,
          user: `${this.props.user.firstName} ${this.props.user.lastName}`,
        },
      });
    });
  };

  showActionSheet = (media, index) => {
    this.setState({ currentSelection: this.props.data.customer.survey.photos[index].photo });
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
    },
    (buttonIndex) => {
      const selection = BUTTONS[buttonIndex];
      if (selection === 'Edit') {
        // launch editor
        this.selectedDocID = this.props.data.customer.survey.photos[index].docID;
        this.setState({
          isEditorOpen: true,
        });
      }
      if (selection === 'Save') {
        // saves locally to device gallery
        this.downloadImage(media);
      }
      if (selection === 'Share') {
        // share image via text message, email, etc.
        this.shareImage(media);
      }
      if (selection === 'Add') {
        this.uploadImage();
      }
      if (selection === 'Delete') {
        // delete... coming soon
      }
      if (selection === 'Cancel') {
        // do nothing (cancel)
      }
    });
  };

  togglePhotoSelection = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.id,
        index,
      },
    });
  };

  returnToPhotoBrowser = () => {
    this.setState({
      isEditorOpen: false,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PhotoBrowser
          style={{
            flex: 1,
          }}
          mediaList={this.props.data.customer.survey.photos}
          alwaysShowControls
          onBack={() => Actions.pop()}
          displayActionButton
          displayNavArrows
          displaySelectionButtons={!(this.props.params === 'survey')}
          startOnGrid
          onActionButton={(media, index) => this.showActionSheet(media, index)}
          onSelectionChanged={(media, index, isSelected) => {
            this.togglePhotoSelection(index);
          }}
        />
        <Modal
          style={{ flex: 1 }}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          isOpen={this.state.isEditorOpen}
          visible={this.state.isEditorOpen}
        >
          <PhotoEditorContainer
            style={{
              flex: 1,
              marginTop: 200,
            }}
            onBack={this.returnToPhotoBrowser}
            custID={this.props.data.customer.id}
            docID={this.selectedDocID}
          />
        </Modal>
      </View>
    );
  }
}

const mapUserToProps = state => ({
  user: state.user,
});

const PhotoGalleryDetails = compose(
  connect(mapUserToProps, null),
  graphql(getMyCustomer, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
  }),
  graphql(getBase64, { name: 'getBase64' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
)(_PhotoGalleryDetails);

export default PhotoGalleryDetails;
