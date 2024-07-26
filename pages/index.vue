<script setup lang="ts">

import type {ISneaker} from "~/server/data/sneakers.data";

useHead({
  title: 'Home | Sneaker Shop',
})

const {data: sneakers} = useLazyFetch<ISneaker[]>('/api/sneaker/all')

</script>

<template>
  <div>
    <ClientOnly fallback-tag="div">
      <template #fallback>
        <ListSneakersSkeleton/>
      </template>

      <div v-if="sneakers === null">
        <ListSneakersSkeleton/>
      </div>

      <div v-if="sneakers !== null">
        <h3 class="text-3xl font-semibold mb-7">Самое популярное</h3>
        <ListSneakers :sneakers="sneakers"/>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>