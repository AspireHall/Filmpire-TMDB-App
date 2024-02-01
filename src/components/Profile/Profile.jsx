import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp, Favorite } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';
import { RatedCards } from '..';

// Get access to profile name or id from redux state
// display in the profile component

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refectWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refectWatchlisted();

  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          <h1>Profile - {user.username}</h1>
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.lenght
        ? <Typography variant="h5"> Add favorites or watchlist some movies to see them here! </Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="watchlist" data={watchlistMovies} />
          </Box>
        )}
    </Box>

  );
};

export default Profile;
