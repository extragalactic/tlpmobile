import React, {
  Component,
} from 'react';
import { graphql, compose } from 'react-apollo';

import {
  LayoutAnimation,
  UIManager,
  View,
  AlertIOS,
} from 'react-native';
import { connect } from 'react-redux';

import FoldView from 'react-native-foldview';

import InfoCard from './components/InfoCard';
import PhotoCard from './components/PhotoCard';
import ProfileCard from './components/ProfileCard';

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ROW_HEIGHT = 280;

const Spacer = ({ height }) => (
  <View
    pointerEvents="none"
    style={{
      height,
    }}
  />
);

class _Row extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      height: ROW_HEIGHT,
    };
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    this.renderFrontface = this.renderFrontface.bind(this);
    this.renderBackface = this.renderBackface.bind(this);
  }
  refresh = () => {
    this.setState(this.state);
  }
  flip() {
    if (this.props.priceDetails.description0) {
      AlertIOS.alert(
      'Unsaved Work!',
       'You didnt submit your price, are you sure you want to exit?',
      [{ text: 'YES', onPress: () => {
        this.setState({
          expanded: !this.state.expanded,
        });
        this.props.editPriceAction({ description: ' ', amount: ' ' });
        this.props.clearPriceDetails();
        
      } },
        { text: 'NO',
          onPress: () => console.log("No"),
        },
      ],
      );
    } else {
      this.setState({
        expanded: !this.state.expanded,
      });
      this.props.editPriceAction({ description: ' ', amount: ' ' });
    }
  }

  handleAnimationStart(duration, height) {
    const isExpanding = this.state.expanded;

    const animationConfig = {
      duration,
      update: {
        type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.height,
      },
    };

    LayoutAnimation.configureNext(animationConfig);

    this.setState({
      height,
    });
  }

  renderFrontface() {
    return (
      <InfoCard
        createPDFPreview={this.props.top ? this.props.createPDFPreview : (() => {})}
        sendEstimate={this.props.top ? this.props.sendEstimate : (() => {})}
        onPress={this.flip}
         customer={this.props.customer}
        top={this.props.top}
        second={this.props.second}
        price={this.props.price}
      />
    );
  }

  renderBackface() {
    return (
      <ProfileCard
        customer={this.props.customer} refresh={this.refresh} index={this.props.index} top={this.props.top}
        second={this.props.second} onPress={this.flip}
      />
    );
  }

  render() {
    const { height } = this.state;
    const { zIndex } = this.props;

    const spacerHeight = height - ROW_HEIGHT;

    return (
      <View
        style={{
          flex: 1,
          zIndex,
        }}
      >
        <View
          style={{
            height: ROW_HEIGHT,
            margin: 10,
          }}
        >
          <FoldView
            expanded={this.state.expanded}
            onAnimationStart={this.handleAnimationStart}
            perspective={1000}
            renderBackface={this.renderBackface}
            renderFrontface={this.renderFrontface}
          >
            <PhotoCard
              refresh={this.refresh}
              onPress={this.flip}
              top={this.props.top}
              second={this.props.second}
              price={this.props.price}
              index={this.props.index}
            />
          </FoldView>

        </View>

        <Spacer height={spacerHeight} />
      </View>
    );
  }
}

const mapPriceDetailsStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const mapActionClearPriceDetails = dispatch => ({
  clearPriceDetails(priceDetails) {
    dispatch({ type: 'CLEAR_PRICE_DETAILS', payload: priceDetails });
  },
});

const mapActionEditPrice = dispatch => ({
  editPriceAction(price) {
    dispatch({ type: 'EDIT_PRICE', payload: price });
  },
});

const Row = compose(
connect(null, mapActionClearPriceDetails),
 connect(null, mapActionEditPrice),
 connect(mapPriceDetailsStateToProps),
)(_Row);

export default Row;
