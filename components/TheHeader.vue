<script setup lang="ts">
import {Input} from "~/components/ui/input"

const isSearchOpen = ref(false)
</script>

<template>
  <nav
      class="show-nav sticky top-1 w-[80%] bg-gradient-to-r from-[#F3F1F4] to-[#F3F1F4] border border-black
       mx-auto py-4 px-6 rounded-xl mt-3 flex items-center justify-between z-50">
    <NuxtLink to="/" class="flex items-center text-black hover:opacity-60 transition-opacity" title="Главная">
      <Icon name="ph:sneaker-move" color="#aaa" size="35"/>
      <span class="ml-2 font-semibold text-2xl">SƧhop</span>
    </NuxtLink>
    <div class="flex items-center gap-7">
      <div title="Поиск по кроссовкам"
           :class="'hidden md:flex justify-between items-center ' + (isSearchOpen ? 'gap-x-2' : 'gap-x-0')">
        <Icon
            @click="() => isSearchOpen = !isSearchOpen"
            name="lucide:scan-search"
            size="35"
            class="hover:opacity-60 transition-opacity cursor-pointer"
        />
        <Input
            type="text"
            placeholder="Что будем искать?"
            :class="'h-[30px] transition-all ' + (isSearchOpen ? 'w-52 opacity-100' : 'w-0 opacity-0 -mr-5')"
        />
      </div>
<!--      <div title="Меню" class="md:hidden flex justify-between items-center cursor-pointer">-->
<!--        <Icon name="ep:menu" size="35"/>-->
<!--      </div>-->
      <NuxtLink to="/cart" title="Корзина" class="flex items-center hover:opacity-60 transition-opacity">
        <Icon name="mdi:cart-outline" color="#aaa" size="35"/>
      </NuxtLink>
      <NuxtLink to="/profile" title="Профиль" class="flex items-center hover:opacity-60 transition-opacity">
                <Icon name="fluent:person-circle-32-regular" size="35"/>
<!--        <Avatar>-->
<!--          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />-->
<!--          <AvatarFallback>CN</AvatarFallback>-->
<!--        </Avatar>-->
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.show-nav {
  animation: show 0.5s ease-in-out;
}

@keyframes show {
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(0);
  }
}
</style>