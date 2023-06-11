<template>
  <div>Pokemon Detail Page! {{ name }}</div>
</template>

<script setup>
const { name } = useRoute().params;
</script>
