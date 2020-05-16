import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.func,
    }).isRequired,
    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    refreshing: false,
    currentPage: 1,
  };

  async componentDidMount() {
    this.handleSetPageTitle();
    const stars = await this.handleLoadStars(1);
    this.setState({ stars });
  }

  handleSetPageTitle = () => {
    const { route, navigation } = this.props;
    const { user } = route.params;
    navigation.setOptions({ title: user.name });
  };

  handleLoadStars = async (page) => {
    const { route } = this.props;
    const { user } = route.params;

    const { data } = await api.get(`/users/${user.login}/starred?page=${page}`);

    return data;
  };

  refreshList = async () => {
    this.setState({ refreshing: true });
    const stars = await this.handleLoadStars(1);
    this.setState({ stars, refreshing: false });
  };

  loadMore = async () => {
    const { stars, currentPage } = this.state;
    const nextPage = currentPage + 1;
    const data = await this.handleLoadStars(nextPage);
    this.setState({ stars: [...stars, ...data], currentPage: nextPage });
  };

  handleRenderView = (title, url) => {
    const { navigation } = this.props;
    navigation.navigate('GitHub', { title, url });
  };

  render() {
    const { route } = this.props;
    const { stars, refreshing } = this.state;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatarUrl }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {stars.length === 0 ? (
          <Loading color="#7159c1" size="large" />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred
                onPress={() => this.handleRenderView(item.name, item.html_url)}
              >
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

export default User;
