<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    required: true,
  },
});
const { size } = props;
</script>

<template>
  <div class="absolute w-full h-full flex justify-center items-center">
    <Icon name="ei:spinner-3" :size="size" class="bg-gray-300 animate-spin" />
  </div>
</template>

<style scoped>

</style>