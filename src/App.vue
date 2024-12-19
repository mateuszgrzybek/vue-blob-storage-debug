<template>
  <div>
    <button @click="downloadBlob">Download Audio Blob</button>
    <button @click="clearBlob">Clear Audio Blob</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script>
import { useBlobStorageStore } from './stores/blobStorage';

export default {
  name: 'App',
  data() {
    return {
      randomAudioUrl: 'http://localhost:8080/https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    };
  },
  computed: {
    audioUrl() {
      const store = useBlobStorageStore();
      return store.currentTestBlobUrl;
    }
  },
  methods: {
    async downloadBlob() {
      const store = useBlobStorageStore();
      store.clearAudioBlob();
      try {
        const response = await fetch(this.randomAudioUrl);
        const blob = await response.blob();
        store.setAudioBlob(blob);
      } catch (error) {
        console.error('Error downloading audio blob:', error);
      }
    },
    clearBlob() {
      const store = useBlobStorageStore();
      store.clearAudioBlob();
    }
  }
};
</script>

<style>
button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>