import AsyncStorage from '@react-native-async-storage/async-storage';

const handleAsyncStorageError = (
  error: unknown,
  operation: string,
  key: string,
) => {
  console.error(`Error during ${operation} for key "${key}":`, error);
};

export const setData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    handleAsyncStorageError(e, 'saving', key);
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value; // Retorna null si no se encuentra el valor
  } catch (e) {
    handleAsyncStorageError(e, 'reading', key);
    return null; // Retorna null en caso de error
  }
};
