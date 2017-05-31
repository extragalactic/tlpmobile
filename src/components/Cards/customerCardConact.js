import React from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { MasterStyleSheet } from '../../style/MainStyles';

class _CustomerCardConact extends React.Component{
  render(){
    return (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
    title={this.props.customer.firstName ? `${this.props.customer.firstName} ${this.props.customer.lastName}` : 'Customer'}
  >
    <Button
      icon={{ name: 'phone' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Contact Customer"
      onPress={this.props.ui.isTablet === true ? () => this.props.toggleModal() : this.props.openDrawer}
    />
    <Button
      icon={{ name: 'assignment' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Update Info"
      onPress={this.props.openFormModal}
    />
    <Button
      icon={{ name: 'alarm' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Reminders"
      onPress={this.props.openFollowupModal}
    />
  </Card>
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

const CustomerCardConact = connect(mapStateToProps, mapActionToggleContact)(_CustomerCardConact);

export default CustomerCardConact;

