<script setup lang="ts">
import {useGetAllPokemon} from "~/hooks/query";
const {data} = useGetAllPokemon();
</script>

<template>
  <div class="bg-green-500">Hello Home Page</div>

  <ul class="p-2">
    <li
      v-for="pokemon in data?.results"
      :key="pokemon.name"
      class="border py-2">
      <NuxtLink :to="`/pokemon/${pokemon.name}`">
        {{ pokemon.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
