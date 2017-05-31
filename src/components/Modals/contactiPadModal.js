import React, { PropTypes } from 'react';
import { Icon, Button } from 'react-native-elements';
import { View, Dimensions } from 'react-native';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { MasterStyleSheet } from '../../style/MainStyles';

const window = Dimensions.get('window');
class _ContactIpadModal extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      query: '',
      price: 0,
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.ui.iPadContactModal}
        onClosed={() => this.props.toggleModal()}
        style={{
                alignItems: 'center',
               height: window.height / 3, 
               width: window.width / 2,
               borderRadius: 30,
        }}
        position={'center'}
      >
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
      {this.props.customer.cphone ?
        <Icon
          name="phone-iphone"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(this.props.customer.hphone, true)}
        /> : null
   }
      {this.props.customer.hphone ?
        <Icon
          name="home"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(this.props.customer.hphone, true)}
        /> : null}
      {this.props.customer.wphone ?
        <Icon
          name="work"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(this.props.customer.wphone, true)}
        /> : null}

      <Icon
        name="sms"
        color="#517fa4"
        raised
        onPress={() => Communications.text(this.props.customer.cphone, true)}
      />
      <Icon
        name="mail-outline"
        color="#517fa4"
        raised
        onPress={() => Communications.email([this.props.customer.email1], null, null, null, 'Three Little Pigs Masonry')}
      />
      {this.props.customer.email2 ? <Icon
        name="email"
        color="#517fa4"
        raised
        onPress={() => Communications.email([this.props.customer.email2], null, null, null, 'Three Little Pigs Masonry')}
      /> : null}
    </View>
      </Modal>

    );
  }
}

const mapActionToggleContact = dispatch => ({
  toggleModal() {
    dispatch({ type: 'TOGGLE_CONTACT_MODAL' });
  },
});

const mapStateToProps = state => ({
  ui: state.ui,
});

const ContactIpadModal = connect(mapStateToProps, mapActionToggleContact)(_ContactIpadModal);

export default ContactIpadModal;
