import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PhotoGalleryDetails from './PhotoGalleryDetails';

//_PhotoGalleryContainer.propTypes = {
//  currentCustomer: PropTypes.string,
//};

const _PhotoGalleryContainer = ({ ...props }) => (
  <PhotoGalleryDetails
    id={props.currentCustomer}
    params={props.params}
  />
);

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const PhotoGalleryContainer = compose(
  connect(mapStateToProps, null),
)(_PhotoGalleryContainer);

export default PhotoGalleryContainer;
