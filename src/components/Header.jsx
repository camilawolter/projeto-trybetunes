import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

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
        <div className="headerOne">
          <h1>TrybeTunes</h1>
          <p data-testid="header-user-name">{userInput}</p>
        </div>

        <nav>
          <Link to="/search" data-testid="link-to-search"><span>Pesquisar</span></Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <span>Favoritos</span>
          </Link>
          <Link to="/profile" data-testid="link-to-profile"><span>Perfil</span></Link>
        </nav>
      </header>
    );
  }
}

export default Header;
