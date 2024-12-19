import { defineStore } from 'pinia';

export const useBlobStorageStore = defineStore('blobStorageStore', {
  state: () => ({
    audioBlob: null,
    currentBlobUrl: ''
  }),
  getters: {
    currentTestBlobUrl(state) {
      if (state.audioBlob) {
        if (state.currentBlobUrl) {
          window.URL.revokeObjectURL(state.currentBlobUrl);
        }
        const newUrl = window.URL.createObjectURL(state.audioBlob);
        state.currentBlobUrl = newUrl;
        return newUrl;
      } else {
        if (state.currentBlobUrl) {
          window.URL.revokeObjectURL(state.currentBlobUrl);
          state.currentBlobUrl = '';
        }
        return '';
      }
    }
  },
  actions: {
    setAudioBlob(blob) {
      this.audioBlob = blob;
    },
    clearAudioBlob() {
      this.audioBlob = null;
    }
  }
});
