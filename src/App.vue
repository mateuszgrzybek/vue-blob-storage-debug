<template>
  <div>
    <button @click="downloadBlob">Download Audio Blob</button>
    <button @click="clearBlob">Clear Audio Blob</button>
    <button @click="changeUrl">Change Audio URL</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script>
import { useBlobStorageStore } from './stores/blobStorage';

export default {
  name: 'App',
  data() {
    return {
      audioUrl: '', // Initialize with an empty string
      audioSource: 'http://localhost:8080/https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Initial audio source
    };
  },
  computed: {
    store() {
      return useBlobStorageStore();
    }
  },
  watch: {
    'store.currentTestBlobUrl': {
      handler(newUrl) {
        this.audioUrl = newUrl;
      },
      immediate: true // Ensure watcher runs on initialization
    }
  },
  methods: {
    async downloadBlob() {
      const store = useBlobStorageStore();
      store.clearAudioBlob();
      try {
        const response = await fetch(this.audioSource);
        const blob = await response.blob();
        store.setAudioBlob(blob);
      } catch (error) {
        console.error('Error downloading audio blob:', error);
      }
    },
    clearBlob() {
      const store = useBlobStorageStore();
      store.clearAudioBlob();
    },
    changeUrl() {
      // Change the audio source to a different URL
      this.audioSource = `http://localhost:8080/https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${this.audioSource.includes('Song-1') ? '2' : '1'}.mp3`;
      console.log('Audio source changed to:', this.audioSource);
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