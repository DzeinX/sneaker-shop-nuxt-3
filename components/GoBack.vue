<script setup lang="ts">
const props = defineProps({
  innerText: {
    type: String,
    required: false,
  },
});
const { innerText } = props;
</script>

<template>
  <div>
    <NuxtLink to="" @click.prevent="$router.back()">
      <Icon name="ei:arrow-left" class="bg-gray-300 cursor-pointer animate-click" size="50"/>
      <span>{{ innerText }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.animate-click {
  transition: 0.2s ease-in-out;
}
.animate-click:active {

  transform: translateX(-300px);
}
</style>