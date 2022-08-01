import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      isDisabled: true,
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
    const { nameArtist } = this.state;
    const MIN_CARACTER = 2;
    const validateForCaracters = nameArtist.length >= MIN_CARACTER;
    this.setState({
      isDisabled: !validateForCaracters,
    });
  }

  render() {
    const { nameArtist, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <Header />
        <form>
          <input
            type="text"
            name="nameArtist"
            value={ nameArtist }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
