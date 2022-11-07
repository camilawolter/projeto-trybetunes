import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      isDisabled: true,
      albuns: [],
      statusLoading: false,
      artistValue: '',
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

  searchArtists = () => {
    const { nameArtist } = this.state;
    this.setState({ statusLoading: true, artistValue: nameArtist }, async () => {
      const foundAlbuns = await searchAlbumsAPIs(nameArtist);
      this.setState({
        albuns: foundAlbuns,
        statusLoading: false,
        nameArtist: '',
      });
    });
  }

  render() {
    const { nameArtist, isDisabled, albuns, artistValue, statusLoading } = this.state;

    if (statusLoading) return <Loading />;

    return (
      <div data-testid="page-search">
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
            onClick={ this.searchArtists }
          >
            Pesquisar

          </button>
        </form>
        <div>
          {
            (albuns.length) ? (
              <div>
                <h2>
                  {
                    `Resultado de álbuns de: ${artistValue}`
                  }
                </h2>

                {albuns.map(({
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <div key={ collectionId }>

                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ artistName } />
                    </Link>

                    <p>{collectionName}</p>

                    <h3>{artistName}</h3>

                  </div>
                ))}
              </div>
            ) : (
              <h3>Nenhum álbum foi encontrado</h3>
            )
          }
        </div>
      </div>
    );
  }
}

export default Search;
