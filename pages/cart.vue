<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Label} from "@/components/ui/label"
import {Skeleton} from '@/components/ui/skeleton'
import type {ICart} from "~/server/data/cart.data";

useHead({
  title: 'Cart | Sneaker Shop',
})

const {data: cart} = useLazyFetch<ICart>("/api/cart", {
  method: "post",
  body: {userId: 1}
})

const address = ref("г.Вологда, ул.Ленина, д.54, кв.6")
</script>

<template>
  <div>
    <ClientOnly fallback-tag="div">
      <template #fallback>
        <div class="lg:flex lg:justify-between lg:gap-x-8">
          <div class="lg:w-[70%]">
            <div class="mb-5">
              <Skeleton class="grid sm:grid-cols-2 grid-cols-1 h-[210px]"/>
            </div>
            <div class="mb-5">
              <Skeleton class="grid sm:grid-cols-2 grid-cols-1 h-[210px]"/>
            </div>
          </div>
          <div class="lg:w-[30%]">
            <Skeleton class="h-[250px]"/>
          </div>
        </div>
      </template>

      <div v-if="cart === null">
        <div class="lg:flex lg:justify-between lg:gap-x-8">
          <div class="lg:w-[70%]">
            <div class="mb-5">
              <Skeleton class="grid sm:grid-cols-2 grid-cols-1 h-[210px]"/>
            </div>
            <div class="mb-5">
              <Skeleton class="grid sm:grid-cols-2 grid-cols-1 h-[210px]"/>
            </div>
          </div>
          <div class="lg:w-[30%]">
            <Skeleton class="h-[250px]"/>
          </div>
        </div>
      </div>

      <div v-if="cart !== null" class="lg:flex lg:justify-between lg:gap-x-8">
        <div class="lg:w-[70%]">
          <div v-for="(sneaker, index) in cart.sneakers" :key="index" class="mb-5">
            <Card class="grid sm:grid-cols-2 grid-cols-1">
              <CardHeader>
                <NuxtLink :to="{ name: 'sneaker-article', params: {article: sneaker.entity.article} }">
                  <NuxtImg :src="`/${sneaker.entity.imgUrls[0]}`" class="object-cover object-center h-40 w-full"/>
                </NuxtLink>
              </CardHeader>
              <CardContent class="py-5 pr-10">
                <NuxtLink :to="{ name: 'sneaker-article', params: {article: sneaker.entity.article} }">
                  <CardTitle>{{ sneaker.entity.gender.nameForTitle }} кроссовки {{ sneaker.entity.company.name }}
                    {{ sneaker.entity.model }}
                  </CardTitle>
                </NuxtLink>
                <CardDescription class="mb-10">Размер: {{ sneaker.size }}</CardDescription>
                <NumberField id="age" :default-value="sneaker.amount" :min="0">
                  <Label for="age">Количество</Label>
                  <NumberFieldContent>
                    <NumberFieldDecrement/>
                    <NumberFieldInput/>
                    <NumberFieldIncrement/>
                  </NumberFieldContent>
                </NumberField>
              </CardContent>
            </Card>
          </div>
        </div>
        <div class="lg:w-[30%]">
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Input type="text" placeholder="Адрес Доставки" :default-value="address" class="mb-3"/>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ оплаты"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="card-in-get">Картой при получении</SelectItem>
                      <SelectItem value="card-site">Картой на сайте</SelectItem>
                      <SelectItem value="bank">Через мобильное приложени банка</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button">Оформить заказ</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>