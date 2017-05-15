import React from 'react';
import _ from 'lodash';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Grid, Row } from 'react-native-easy-grid';
import ImagePickerManager from 'react-native-image-picker';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import photoOptions from '../PhotoPicker/photoOptions';

import PargingSelect from '../../components/Surveys/pargingSelect';
import ConcreteSelect from '../../components/Surveys/concreteSelect';
import ChimneySelect from '../../components/Surveys/chimneySelect';
import BrickSelect from '../../components/Surveys/brickSelect';
import FlashingSelect from '../../components/Surveys/flashingSelect';
import WaterproofingSelect from '../../components/./Surveys/waterproofingSelect';
import WindowsillsSelect from '../../components/Surveys/windowsillsSelect';
import RefacingSelect from '../../components/Surveys/refacingSelect';
import { MasterStyleSheet } from '../../style/MainStyles';
import SurveyPicker from '../../components/Surveys/surveyPicker';
import surveyStyles from '../Style/surveyStyle';
import SurveyNotesModal from '../../components/Surveys/surveyNotesModal';
import SurveyCompleteModal from '../../components/Modals/customerSurveyCompleteModal';

import {
   addSurveyNotes,
   addSurveyPhoto,
   getSurveyPhotos,
   toggleSurveyReady,
   selectSurveyPhotos,
  } from '../../graphql/mutations';

class _SurveyContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'Parging',
      selection: [],
      count: '',
      notes: '',
      photos: [],
      photoCaption: '',
      surveyPhotos: [],
      notesModal: false,
      photoGallery: false,
      photoModal: false,
      surveyCompleteModal: false,
      ready: false,
      notesSelection: '',
      photoSelection: '',
      loading: false,
      imageUploading: false,
    };
  }
  changeSelection = (selection) => {
    this.setState({
      selection: [],
    });

    this.setState({
      selected: selection,
    });
  };
  updateSelection = (selection) => {
    const doesExist = this.state.selection.indexOf(selection);
    if (doesExist !== -1) {
      _.pull(this.state.selection, selection);
    } else {
      this.state.selection.push(selection);
    }
  }
  submitNotes = () => {
    this.props.addSurveyNotes({
      variables: {
        heading: this.state.selected,
        description: this.state.selection,
        text: this.state.notes,
        timestamp: new Date(),
        custid: this.props.currentCustomer,
        userid: this.props.user._id,
        user: `${this.props.user.firstName} ${this.props.user.lastName}`,
      },
    });
    this.setState({ notes: '' });
  };
  importPhoto = () => {
    this.setState({ loading: true });
    ImagePickerManager.showImagePicker(photoOptions, (data) => {
      if (data.didCancel) {
        this.setState({ loading: false });
      }
      if (!data.didCancel) {
        this.setState({ imageUploading: true });
        this.props.addSurveyPhoto({
          variables: {
            heading: this.state.selected,
            description: this.state.photoCaption,
            orginalBase64: data.data,
            timestamp: new Date(),
            custid: this.props.currentCustomer,
            user: `${this.props.user.firstName} ${this.props.user.lastName}`,
          },
        }).then((res) => {
          if (res.data.addSurveyPhoto) {
            this.setState({
              loading: false,
              imageUploading: false,
            });
          }
        });
      }
    });
  };
  toggleReady = () => {
    this.setState({
      ready: !this.state.ready,
    });
    this.props.toggleSurveyReady({
      variables: {
        custid: this.props.currentCustomer,
        userid: this.props.user._id,
      },
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Choose a Photo and wait for upload to complete </Text>
          {this.state.imageUploading ? <ActivityIndicator size="large" /> : null}
        </View>
      );
    }
    return (
      <Grid>
        <Row
          style={{
            backgroundColor: '#4789bb',
            marginTop: 25,
          }}
          size={20}
        >
          <View
            style={surveyStyles.actionButtonGroup}
          >
            <Icon
              name="description"
              color="#517fa4"
              raised
              onPress={() => this.setState({ notesModal: true })}
            />
            <Icon
              name="add-a-photo"
              color="#517fa4"
              raised
              onPress={this.importPhoto}
            />
            <Icon
              name="photo"
              color="#517fa4"
              raised
              onPress={() => Actions.photoGalleryContainer({ params: 'survey' })}
            />
            <Icon
              name="done"
              color="#517fa4"
              raised
              onPress={() => Actions.surveyCompleteContainer({ id: this.props.currentCustomer })}
            />
            <Icon
              name="help-outline"
              color="#517fa4"
              raised
              onPress={() => console.log(this)}
            />
          </View>
        </Row>
        <Row
          style={{
            backgroundColor: '#4786bc',
          }}
          size={30}
        >
          <SurveyPicker
            style={surveyStyles.surveyPicker}
            changeSelection={this.changeSelection}
            selection={this.state.selected}
          />
        </Row>
        <Row
          style={{
            backgroundColor: '#CFCFC2',
          }}
          size={50}
        >
          <ScrollView
            style={MasterStyleSheet.surveyContainerList}
          >
            { this.state.selected === 'Parging' ?
              <PargingSelect updateSelection={this.updateSelection} /> : null }
            { this.state.selected === 'Concrete' ?
              <ConcreteSelect
                count={this.state.count}
                updateCount={this.updateCount}
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Chimney' ?
              <ChimneySelect
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Brick' ?
              <BrickSelect
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Flashing' ?
              <FlashingSelect
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Waterproofing' ?
              <WaterproofingSelect
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Windowsills' ?
              <WindowsillsSelect
                updateSelection={this.updateSelection}
              /> : null }
            { this.state.selected === 'Refacing' ?
              <RefacingSelect
                updateSelection={this.updateSelection}
              /> : null }
          </ScrollView>
        </Row>
        <SurveyNotesModal
          open={this.state.notesModal}
          close={() => this.setState({ notesModal: false })}
          updateText={text => this.setState({ notes: text })}
          updateSelection={notesSelection => this.setState({ notesSelection })}
          submitNotes={this.submitNotes}
          notes={this.state.notes}
          notesSelection={this.state.notesSelection}
          selection={this.state.selection}
          selected={this.state.selected}
        />
        <SurveyCompleteModal
          modal={this.state.surveyCompleteModal}
          close={() => { this.setState({ surveyCompleteModal: false }); }}
          toggleReady={this.toggleReady}
          id={this.props.currentCustomer}
        />
      </Grid>
    );
  }
}
const mapUserToProps = state => ({
  user: state.user,
});

const mapCustomerToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const SurveyContainer = compose(
  connect(mapUserToProps, null),
  connect(mapCustomerToProps, null),
  graphql(selectSurveyPhotos, { name: 'selectSurveyPhotos' }),
  graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
  graphql(getSurveyPhotos, { name: 'getSurveyPhotos' }),
  graphql(addSurveyNotes, { name: 'addSurveyNotes' }),
  graphql(addSurveyPhoto, { name: 'addSurveyPhoto' }),
)(_SurveyContainer);

export default SurveyContainer;
