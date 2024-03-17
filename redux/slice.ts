import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface SavedPhotosState {
  photos: Photo[];
}

const initialState: SavedPhotosState = {
  photos: [],
};

const savedPhotosSlice = createSlice({
  name: 'savedPhotos',
  initialState,
  reducers: {
    savePhoto(state, action: PayloadAction<Photo>) {
      state.photos.push(action.payload);
    },
  },
});

export const { savePhoto } = savedPhotosSlice.actions;

export default savedPhotosSlice.reducer;

// Selectors
export const selectSavedPhotos = (state: RootState) => state.savedPhotos.photos;
