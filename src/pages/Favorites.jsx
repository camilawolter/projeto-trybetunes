import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
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

  checkFavoriteSong = (song) => {
    this.setState({ statusLoading: true }, async () => {
      const { favSongs } = this.state;

      const filterTrack = favSongs.filter((music) => music.trackId !== song.track);

      await removeSong(song);
      this.setState({ statusLoading: false, favSongs: filterTrack });
    });
  }

  render() {
    const { statusLoading, favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Músicas favoritas</h2>
        {
          statusLoading ? <Loading /> : (
            <div>
              {
                favSongs.map((song) => (<MusicCard
                  { ...song }
                  key={ song.trackId }
                  onChange={ () => this.checkFavoriteSong(song) }
                />
                ))
              }
            </div>
          )

        }
      </div>
    );
  }
}

export default Favorites;
