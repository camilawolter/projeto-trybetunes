import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
      const { music } = this.props;
      await addSong({ music });
      const { favSongs } = this.state;
      this.setState({ statusLoading: false, favSongs: [...favSongs, music] });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { statusLoading, favSongs } = this.state;

    const isFavorite = favSongs.some((song) => song.trackId === trackId);

    return (
      !statusLoading ? (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ `${previewUrl} controls` }>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id="favorite"
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
