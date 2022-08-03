import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      statusLoading: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ favSongs: await getFavoriteSongs() });
  }

  checkFavoriteSong = () => {
    this.setState({ statusLoading: true }, async () => {
      const { trackId: track } = this.props;
      const { favSongs } = this.state;

      const isFavorite = favSongs.some((song) => song.trackId === track);
      const filterTrack = favSongs.filter(({ trackId }) => trackId !== track);

      if (isFavorite) {
        await removeSong({ ...this.props });
        this.setState({ statusLoading: false, favSongs: filterTrack });
      } else {
        await addSong({ ...this.props });
        this.setState({ statusLoading: false, favSongs: [...favSongs, this.props] });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId, artistName, artworkUrl100 } = this.props;
    const { statusLoading, favSongs } = this.state;

    const isFavorite = favSongs.some((song) => song.trackId === trackId);

    return (
      !statusLoading ? (
        <div>
          <h4>{trackName}</h4>
          <h3>{artistName}</h3>
          <img src={ artworkUrl100 } alt={ artistName } />
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              id={ `checkbox-music-${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isFavorite }
              onChange={ this.checkFavoriteSong }
            />
          </label>
        </div>
      ) : <Loading />

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
