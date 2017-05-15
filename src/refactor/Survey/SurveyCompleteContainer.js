import React from 'react';
import { View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { Icon, Text, Button, Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { getFinishedSurvey } from '../../graphql/queries';
import { toggleSurveyReady, deleteSurveyNotes } from '../../graphql/mutations';
import { MasterStyleSheet } from '../../style/MainStyles';
import ZoomViewModal from '../../components/photoGallery/zoomViewModal';

const window = Dimensions.get('window');

class _SurveyCompleteContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomModal: false,
      currentSelection: '',
    };
  }
  toggleReady = () => {
    if (this.props.data.customer.surveyReadyforPrice) {
      AlertIOS.alert(
      'Are you sure?',
       'Survey will be removed from queue',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Set to not ready',
            onPress: () => {
              this.props.toggleSurveyReady({
                variables: {
                  custid: this.props.data.customer.id,
                  userid: this.props.profile,
                },
              });
            },
          },
        ],
      );
    } else {
      AlertIOS.alert(
      'Are you sure?',
       'Survey will be sent to estimator',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Send to Estimator',
            onPress: () => {
              this.props.toggleSurveyReady({
                variables: {
                  custid: this.props.data.customer.id,
                  userid: this.props.profile,
                },
              });
            },
          },
        ],
    );
    }
  };

  deleteNote = (index) => {
    AlertIOS.alert(
      'Are you sure?',
       'Note will be removed',
      [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete',
          onPress: () => {
            this.props.deleteSurveyNotes({
              variables: {
                custid: this.props.data.customer.id,
                index,
              },

            });
          },
        },
      ],
    );
  }
 selectImage = (image) => {
    this.setState({
      currentSelection: image,
      zoomModal: true,
    });
  }
  render() {
    return (
      <Grid>
        <Row
          style={{
            backgroundColor: '#b0c4de',
          }}
          size={15}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}
          >
            <Text h4>Review survey, make ready</Text>
          </View>
        </Row>
        <Row
          style={{
            backgroundColor: '#dcdcdc',
          }}
          size={60}
        >
          <Swiper showsButtons>
            { this.props.data.getFinishedSurveyQuery.map((survey, idx) => (
              <Grid >
                <Row
                  size={40}
                >
                  <Card
                    containerStyle={{
                      width: window.width - 35,
                      marginRight: 400,
                      borderRadius: 15,
                    }}
                    title={survey.heading}
                  >
                    { survey.photos.length === 0 ? <Text> No Photos</Text> : null}
                    <Swiper>
                      { survey.photos.map(photo => (
                        <View
                          key={survey.photos.length + 1}
                        >
                         <TouchableHighlight
                            onPress={() => this.selectImage(photo.url)}
                          >
                          <Image
                            style={MasterStyleSheet.surveyResultPhotosSurvey}
                            source={{ uri: photo.url }}
                          />
                          </TouchableHighlight>
                        </View>
          ))}
                    </Swiper>
                  </Card>
                </Row>
                <Row
                  size={50}
                >
                  <Card
                    containerStyle={{
                      backgroundColor: '#FFFFA5',
                      width: window.width - 30,
                      height: window.height / 5,
                      borderRadius: 15,
                    }}
                  >
                    <ScrollView
                      contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                    >
                      { survey.notes.map((note, i) => (
                        <View key={i}>
                          <Icon
                            name={'close'}
                            onPress={() => this.deleteNote(i)}
                          />
                          { note.description ? <Text h4> {note.description}</Text> : null }
                          <Text h5> {note.text}</Text>
                        </View>
                ))}
                    </ScrollView>
                  </Card>
                </Row>
              </Grid>
        ))}
          </Swiper>
        </Row>
        <Row
          style={{
            backgroundColor: '#f5f5f5',
            margin: 1,
          }}
          size={12}
        >
          <Button
            buttonStyle={MasterStyleSheet.surveyResultsButton}
            icon={{ name: 'check-circle' }}
            backgroundColor={this.props.data.customer.surveyReadyforPrice ? '#01DF3A' : '#03A9F4'}
            title={this.props.data.customer.surveyReadyforPrice ? 'Survey is Ready' : 'Make Ready'}
            onPress={this.toggleReady}
          />
        </Row>
          <ZoomViewModal
          open={this.state.zoomModal}
          close={() => { this.setState({ zoomModal: false }); }}
          photo={this.state.currentSelection}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const SurveyCompleteContainer = compose(
 graphql(getFinishedSurvey, {
   options: ({ id }) => ({ variables: { id }, pollInterval: 2000 }),
 }),
graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
graphql(deleteSurveyNotes, { name: 'deleteSurveyNotes' }),
connect(mapStateToProps, null),
)(_SurveyCompleteContainer);

export default SurveyCompleteContainer;
