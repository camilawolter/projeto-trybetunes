import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      statusLoading: false,
    };
  }

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.EnableButton();
    });
  }

  EnableButton = () => {
    const { name } = this.state;
    const MIN_CARACTER = 3;
    const validateForCaracters = name.length >= MIN_CARACTER;
    this.setState({
      isDisabled: !validateForCaracters,
    });
  }

  saveName = async () => {
    const { name } = this.state;
    this.setState({ statusLoading: true }, async () => {
      await createUser({ name });
      this.setState({ statusLoading: false }, () => {
        const { history } = this.props;
        history.push('/search');
      });
    });
  }

  render() {
    const { name, isDisabled, statusLoading } = this.state;

    if (statusLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          <div>
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ ({ target }) => this.handleChange(target) }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.saveName }
            >
              Entrar

            </button>
          </div>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
