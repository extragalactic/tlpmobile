import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PhotoGalleryDetails from './PhotoGalleryDetails';

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
