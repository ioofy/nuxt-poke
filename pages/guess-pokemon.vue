<template>
  <div>
    <button @click="playSound">Play Sound</button>
  </div>
</template>

<script lang="ts">
import {Howl} from "howler";

export default {
  methods: {
    playSound() {
      const sound = new Howl({
        src: "/mp3/whos-that-pokemon.mp3",
      });
      sound.play();
    },
  },
};
</script>
