import React from 'react';
import { Card, Button, Text } from 'react-native-elements';
import { View, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';
import { MasterStyleSheet } from '../../style/MainStyles';
import { getUserQuery } from '../../graphql/queries';
import { toggleNoReply } from '../../graphql/mutations';

class _CustomerCardStatus extends React.Component {
  state = {
    trueSwitchIsOn: this.props.customer.status == 1,
  }
  toggleStatus = () => {
    this.setState({trueSwitchIsOn: !this.state.trueSwitchIsOn})
    this.props.toggleNoReply({
      variables: {
        custid: this.props.customer.id,
        userid: this.props.id,
      }
    })
  }
  render() {
    return (
        <Card
        containerStyle={MasterStyleSheet.cardStyle}
        title={"Status"}
        >
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
      }}
    >
    <Text>No Reply</Text>
    <Switch
          onValueChange={()=> this.toggleStatus()}
          value={this.state.trueSwitchIsOn} />
    </View>
  </Card>
    )

  }

}

const CustomerCardStatus = compose(
  graphql(getUserQuery, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
  graphql(toggleNoReply, {name: 'toggleNoReply' } ),
 )(_CustomerCardStatus);

export default CustomerCardStatus;
