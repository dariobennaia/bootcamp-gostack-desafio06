import React from 'react';
import PropTypes from 'prop-types';

import { WebViewGitHub } from './styles';

const GitHub = ({ route, navigation }) => {
  const { title, url: uri } = route.params;
  navigation.setOptions({ title });
  return <WebViewGitHub source={{ uri }} />;
};

GitHub.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.func,
  }).isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
};

export default GitHub;
