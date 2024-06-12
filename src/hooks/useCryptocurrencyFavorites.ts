import React from 'react';
import {setData, getData} from '../commons/asyncStorage';

interface Favorites {
  [key: number]: number;
}

// TODO: mejorar
export const useCryptocurrencyFavorites = () => {
  const [favorites, setFavorites] = React.useState<Favorites>({});

  const setFavoriteItems = React.useCallback(
    (id: number) => {
      if (favorites[id]) {
        const newFavorites: Favorites = {...favorites};
        delete newFavorites[id];
        setFavorites(newFavorites);
        setData('cryptocurrencyFav', Object.values(newFavorites).join(','));
        return;
      }

      setFavorites(prevFavorites => {
        const value = {
          ...prevFavorites,
          [id]: id,
        };
        setData('cryptocurrencyFav', Object.values(value).join(','));
        return value;
      });
    },
    [favorites],
  );

  React.useEffect(() => {
    const init = async () => {
      const cryptocurrencyFavFromStorage = await getData('cryptocurrencyFav');
      const cryptocurrencyFavToArray = cryptocurrencyFavFromStorage?.split(',');
      if (cryptocurrencyFavToArray?.length) {
        const cryptocurrencyFav: Favorites = cryptocurrencyFavToArray.reduce(
          (prev: Favorites, current: any) => {
            prev[current] = current;
            return prev;
          },
          {},
        );
        setFavorites(cryptocurrencyFav);
      }
    };
    init();
  }, []);

  const favoritesToString = async () => {
    return (await getData('cryptocurrencyFav')) || '';
  };

  const clearFavoriteItems = async () => {
    return await setData('cryptocurrencyFav', '');
  };

  return {
    setFavoriteItems,
    favorites,
    favoritesToString,
    clearFavoriteItems,
  };
};
