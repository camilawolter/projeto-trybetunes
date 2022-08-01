import React from 'react';
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
        <p data-testid="header-user-name">{userInput}</p>
      </header>
    );
  }
}

export default Header;
