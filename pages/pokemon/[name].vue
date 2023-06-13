<template>
  <div>Pokemon Detail Page {{ name }}!</div>

  <button @click="modalStore.openModal">Open</button>

  <Modal :isOpen="isModalOpen" :handleClose="modalStore.closeModal" />
</template>

<script lang="ts" setup>
import {useActivity} from "~/store";
import {storeToRefs} from "pinia";

const {name} = useRoute().params;
const modalStore = useActivity();

const {isModalOpen} = storeToRefs(modalStore);

useSeoMeta({
  title: `Pokemon - ${name}`,
  description: `Pokemon ${name}`,
});

definePageMeta({
  layout: "custom",
});
</script>
