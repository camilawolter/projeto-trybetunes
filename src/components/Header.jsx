import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      statusLoading: true,
    };
  }

  async componentDidMount() {
    this.showName();
  }

  showName = () => {
    this.setState({ statusLoading: true }, async () => {
      const user = await getUser();
      this.setState({ statusLoading: false, userInput: user.name });
    });
  }

  render() {
    const { userInput, statusLoading } = this.state;
    if (statusLoading) return <Loading />;

    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <p data-testid="header-user-name">{userInput}</p>
      </header>
    );
  }
}

export default Header;
