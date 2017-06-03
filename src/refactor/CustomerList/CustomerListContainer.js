import React, { PropTypes } from 'react';
import DeviceInfo from 'react-native-device-info';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { ScrollView } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { MasterStyleSheet } from '../../style/MainStyles';
import CustomerDetailsContainer from '../../refactor/CustomerDetails/CustomerDetailsContainer';
import { getUserandCustomers } from '../../graphql/queries';

class _CustomerListContainer extends React.Component {
  static propTypes = {
    getMyCustomers: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    saveCustomer: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    currentCustomer: PropTypes.string.isRequired,
  }
  static defaultProps = {
    saveCustomer: () => {},
    getMyCustomers: {},
    data: {},
    params: {},
    id: '',
    currentCustomer: '',
  }
  componentWillUnmount() {
    this.props.saveCustomer('');
  }

  selectCustomer = (selection) => {
    this.props.saveCustomer(selection);
    Actions.customerDetailsContainer({ params: { customerId: selection, userid: this.props.id, type: this.props.params.type } });
  };

  render() {
    if (DeviceInfo.isTablet()) {
      return (
        <Grid>
          <Col style={MasterStyleSheet.ipadViewLeft}>
            <List>
              <ScrollView>
                {this.props.data.getMyCustomers[this.props.params.type].length === 0 ?
                  <Text h2> No customers in here!</Text>
              : null}
                {this.props.data.getMyCustomers ?
                this.props.data.getMyCustomers[this.props.params.type].map((customer, idx) => (
                  <ListItem
                    underlayColor="#72C2E2"
                   containerStyle={{
                     backgroundColor: customer.id === this.props.currentCustomer ? '#779ECB' : null,
                     height: 90,
                   }}
                     subtitleStyle={{
                  color: customer.id === this.props.currentCustomer ? 'white' : 'grey',

                   }}                    key={idx}
                    title={customer.address}
                    subtitle={`${customer.firstName} ${customer.lastName}`}
                    onPress={() => this.props.saveCustomer(customer.id)}
                  />),
              ) : null }
              </ScrollView>
            </List>
          </Col>
          <Col style={MasterStyleSheet.ipadViewRight}>
            <CustomerDetailsContainer
              params={{
                customerId: this.props.currentCustomer,
                type: this.props.params.type }} // params
              userid={this.props.id}
            />
          </Col>
        </Grid>
      );
    }
    return (
      <ScrollView
        style={MasterStyleSheet.list}
      >
        <List >
          {this.props.data.getMyCustomers[this.props.params.type].length === 0 ?
            <Text h4> No Customers Available Yet</Text>
              : null}
          {this.props.data.getMyCustomers ?
            this.props.data.getMyCustomers[this.props.params.type].map((customer, idx) => (
              <ListItem
                   underlayColor="#72C2E2"
                   containerStyle={{
                     backgroundColor: customer.id === this.props.currentCustomer ? '#779ECB' : null,
                     height: 90,
                   }}
                     subtitleStyle={{
                  color: customer.id === this.props.currentCustomer ? 'white' : 'grey',
                   }}               
                   key={idx}
                title={customer.address}
                subtitle={`${customer.firstName} ${customer.lastName}`}
                onPress={() => this.selectCustomer(customer.id)}
              />),
              ) : null}
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapActionsToProps = dispatch => ({
  saveCustomer(currentCustomer) {
    dispatch({ type: 'SAVE_CUSTOMER', payload: currentCustomer });
  },
});

const CustomerListContainer = compose(
  graphql(getUserandCustomers, {
    options: ({ params }) => ({ variables: { id: params.id }, pollInterval: 2000 }),
  }),
   connect(mapStateToProps, mapActionsToProps),
)(_CustomerListContainer);

export default CustomerListContainer;
