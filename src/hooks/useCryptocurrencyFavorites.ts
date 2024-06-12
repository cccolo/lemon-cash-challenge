import React from 'react';
import {setData, getData} from '../commons/asyncStorage';

interface Favorites {
  [key: number]: number;
}

const KEY = 'cryptocurrencyFav';

export const useCryptocurrencyFavorites = () => {
  const [favorites, setFavorites] = React.useState<Favorites>({});

  const setFavoriteItems = React.useCallback(
    (id: number) => {
      if (favorites[id]) {
        const newFavorites = {...favorites};
        delete newFavorites[id];
        setData(KEY, Object.values(newFavorites).join(','));
        setFavorites(newFavorites);
        return;
      }

      const newFavorites = {...favorites, [id]: id};
      setData(KEY, Object.values(newFavorites).join(','));
      setFavorites(newFavorites);
    },
    [favorites],
  );

  React.useEffect(() => {
    const init = async () => {
      const cryptocurrencyFavFromStorage = await getData(KEY);
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
    return (await getData(KEY)) || '';
  };

  const clearFavoriteItems = async () => {
    return await setData(KEY, '');
  };

  return {
    setFavoriteItems,
    favorites,
    favoritesToString,
    clearFavoriteItems,
  };
};
