<template>
  <div>Pokemon Detail Page {{ name }}!</div>

  <button @click="modalStore.openModal">Open</button>

  <Modal :isOpen="isOpen" :handleClose="modalStore.closeModal" />
</template>

<script lang="ts" setup>
import { useModalStore } from "~/store/modalStore";
import { storeToRefs } from "pinia";

const { name } = useRoute().params;
const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);

useSeoMeta({
  title: `Pokemon - ${name}`,
});

definePageMeta({
  layout: "custom",
});
</script>
