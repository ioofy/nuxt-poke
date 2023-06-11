<script setup lang="ts">
const { data } = useFetch<TPokemon>(
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
);
</script>

<template>
  <div class="bg-green-500">Hello Home Page</div>
  <ul class="p-2">
    <li
      v-for="pokemon in data?.results"
      :key="pokemon.name"
      class="border py-2"
    >
      <NuxtLink :to="`/pokemon/${pokemon.name}`">
        {{ pokemon.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
