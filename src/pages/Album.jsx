import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      nameAlbum: '',
      songs: [],
      statusLoading: false,

    };
  }

  componentDidMount() {
    this.songsFromAlbum();
  }

  songsFromAlbum = () => {
    this.setState({ statusLoading: true }, async () => {
      const {
        match: { params: { id } },
      } = this.props;
      const songsGet = await getMusics(id);
      const { artistName, collectionName } = songsGet[0];
      this.setState({
        statusLoading: false,
        songs: songsGet,
        nameAlbum: collectionName,
        nameArtist: artistName,
      });
    });
  }

  render() {
    const { songs, nameAlbum, nameArtist, statusLoading } = this.state;
    return (
      !statusLoading ? (
        <div data-testid="page-album">
          <Header />
          <h2 data-testid="album-name">{nameAlbum}</h2>
          <h2 data-testid="artist-name">{nameArtist}</h2>
          {
            songs.filter((_song, index) => index)
              .map((song, index) => (<MusicCard
                { ...song }
                { ...this.state }
                key={ index }
              />))
          }
        </div>
      ) : <Loading />

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
