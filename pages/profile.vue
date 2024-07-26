<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Progress} from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {convertCurrency} from "~/utils/convertCurrency"
import {BarChart} from '@/components/ui/chart-bar'
import {DonutChart} from '@/components/ui/chart-donut'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion"
import {Skeleton} from '@/components/ui/skeleton'
import type {ICart} from "~/server/data/cart.data";

useHead({
  title: 'Profile | Sneaker Shop',
})

const {data: cart} = useLazyFetch<ICart>("/api/cart", {
  method: "post",
  body: {userId: 1}
})

const complete = ref(75)
const email = ref("test@mail.ru")
const name = ref("Vadim")
const secondName = ref("Pronin")
const address = ref("г.Вологда, ул.Ленина, д.54, кв.6")
const numberPhone = ref("89115268368")

const dataDonut = [
  {name: 'Jordan', total: 1},
  {name: 'ASICS', total: 2},
]

const dataBar = [
  {name: 'Jan', total: 0},
  {name: 'Feb', total: 0},
  {name: 'Mar', total: 0},
  {name: 'Apr', total: 0},
  {name: 'May', total: Math.floor(Math.random() * 2000) + 500},
  {name: 'Feb', total: Math.floor(Math.random() * 2000) + 500},
]
</script>

<template>
  <div>
    <ClientOnly fallback-tag="div">
      <template #fallback>
        <div class="sm:flex sm:justify-between sm:gap-x-7">
          <div class="sm:w-[40%] mb-10">
            <Skeleton class="mb-5 h-[206px]"/>
            <Skeleton class="relative h-[114px]">
            </Skeleton>
          </div>
          <div class="sm:w-[60%]">
            <Skeleton class="mb-5 h-[40px]"/>
            <div>
              <div class="mb-2">
                <Skeleton class="h-[210px]"/>
              </div>
              <div class="mb-2">
                <Skeleton class="h-[210px]"/>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-if="cart === null">
        <div class="sm:flex sm:justify-between sm:gap-x-7">
          <div class="sm:w-[40%] mb-10">
            <Skeleton class="mb-5 h-[206px]"/>
            <Skeleton class="relative h-[114px]">
            </Skeleton>
          </div>
          <div class="sm:w-[60%]">
            <Skeleton class="mb-5 h-[40px]"/>
            <div>
              <div class="mb-2">
                <Skeleton class="h-[210px]"/>
              </div>
              <div class="mb-2">
                <Skeleton class="h-[210px]"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart !== null" class="sm:flex sm:justify-between sm:gap-x-7">
        <div class="sm:w-[40%] mb-10">
          <Card class="mb-5">
            <div class="flex justify-center w-full relative">
              <CardHeader>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue"/>
                  <AvatarFallback class="bg-black w-full h-full text-white flex justify-center items-center">Test
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{{ email }}</CardTitle>
              </CardHeader>
              <div class="absolute top-1 right-1 hover:animate-pulse cursor-pointer">
                <Icon name="ph:camera" size="20"></Icon>
              </div>
            </div>
          </Card>
          <Card class="relative">
            <CardHeader>Профиль заполнен на {{ complete }}%</CardHeader>
            <CardContent>
              <Progress :model-value="complete"/>
            </CardContent>
            <div class="absolute top-1 right-1 cursor-pointer hover:animate-pulse">
              <Icon name="radix-icons:cross-2" size="20"></Icon>
            </div>
          </Card>
        </div>
        <div class="sm:w-[60%]">
          <Tabs default-value="purchasing" class="w-full">
            <TabsList>
              <TabsTrigger value="purchasing">Покупки</TabsTrigger>
              <TabsTrigger value="info">Аккаунт</TabsTrigger>
              <TabsTrigger value="statistic">Статистика</TabsTrigger>
            </TabsList>
            <TabsContent value="purchasing">
              <div v-for="(sneaker, index) in cart?.sneakers" :key="index" class="mb-2">
                <Card class="grid lg:grid-cols-2 grid-cols-1">
                  <CardHeader>
                    <NuxtLink :to="{ name: 'sneaker-article', params: {article: sneaker.entity.article} }">
                      <NuxtImg alt="" :src="`/images/${sneaker.entity.imgUrls[0]}`" class="object-cover object-center h-40 w-full"/>
                    </NuxtLink>
                  </CardHeader>
                  <CardContent class="py-5 pr-10">
                    <NuxtLink :to="{ name: 'sneaker-article', params: {article: sneaker.entity.article} }">
                      <CardTitle class="mb-3">{{ sneaker.entity.gender.nameForTitle }} кроссовки
                        {{ sneaker.entity.company.name }}
                        {{ sneaker.entity.model }}
                      </CardTitle>
                    </NuxtLink>
                    <CardDescription>Размер: {{ sneaker.size }}</CardDescription>
                    <CardDescription>Цена: {{ convertCurrency(sneaker.entity.price) }}</CardDescription>
                    <CardDescription>Дата покупки: {{ $dayjs(new Date()).format("DD MMMM YYYY") }}</CardDescription>
                    <CardDescription>Колличество: {{ sneaker.amount }} шт.</CardDescription>
                    <CardDescription class="font-semibold text-lg text-right">Итого:
                      {{ convertCurrency(sneaker.entity.price * sneaker.amount) }}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <Label for="email" class="mb-1 block">Электронная почта</Label>
                  <div class="flex justify-between items-center gap-5">
                    <Input id="email" class="w-full" :default-value="email" disabled/>
                    <div class="flex items-center">
                      <Dialog>
                        <DialogTrigger class="h-[25px]">
                          <Icon name="raphael:pensil" size="25" class="cursor-pointer hover:animate-pulse"></Icon>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle class="mb-5">Редактирование Электронной Почты</DialogTitle>
                            <DialogDescription>
                              <form>
                                <Label for="old-email" class="mb-1 block">Старый email</Label>
                                <Input id="old-email" :placeholder="`Например: ${email}`" class="mb-3"
                                       :default-value="email" required/>
                                <Label for="new-email" class="mb-1 block">Новый email</Label>
                                <Input id="new-email" :placeholder="`Например: another-${email}`" class="mb-3"
                                       required/>
                                <Label for="password" class="mb-1 block">Пароль</Label>
                                <Input id="password" type="password" class="mb-3" required/>
                                <DialogFooter>
                                  <Button type="submit">Применить</Button>
                                </DialogFooter>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardHeader>
                  <Label for="name" class="mb-1 block">Имя пользователя</Label>
                  <div class="flex justify-between items-center gap-5">
                    <Input id="name" class="w-full" :default-value="name" disabled/>
                    <Input id="second-name" class="w-full" :default-value="secondName" disabled/>
                    <div class="flex items-center">
                      <Dialog>
                        <DialogTrigger class="h-[25px]">
                          <Icon name="raphael:pensil" size="25" class="cursor-pointer hover:animate-pulse"></Icon>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle class="mb-5">Редактирование Имени Пользователя</DialogTitle>
                            <DialogDescription>
                              <form>
                                <Label for="name" class="mb-1 block">Имя</Label>
                                <Input id="name" placeholder="Например: Иван" class="mb-3" :default-value="name"
                                       required/>
                                <Label for="second-name" class="mb-1 block">Фамилия</Label>
                                <Input id="second-name" placeholder="Например: Иванов" class="mb-3"
                                       :default-value="secondName" required/>
                                <Label for="password" class="mb-1 block">Пароль</Label>
                                <Input id="password" type="password" class="mb-3" required/>
                                <DialogFooter>
                                  <Button type="submit">Применить</Button>
                                </DialogFooter>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardHeader>
                  <Label for="address" class="mb-1 block">Адрес Доставки</Label>
                  <div class="flex justify-between items-center gap-5">
                    <Input id="address" class="w-full" :default-value="address" disabled/>
                    <div class="flex items-center">
                      <Dialog>
                        <DialogTrigger class="h-[25px]">
                          <Icon name="raphael:pensil" size="25" class="cursor-pointer hover:animate-pulse"></Icon>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle class="mb-5">Редактирование Адреса Доставки</DialogTitle>
                            <DialogDescription>
                              <form>
                                <Label for="address" class="mb-1 block">Адрес доставки</Label>
                                <Input id="address" :placeholder="`Например: ${address}`" class="mb-3"
                                       :default-value="address" required/>
                                <Label for="password" class="mb-1 block">Пароль</Label>
                                <Input id="password" type="password" class="mb-3" required/>
                                <DialogFooter>
                                  <Button type="submit">Применить</Button>
                                </DialogFooter>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardHeader>
                  <Label for="phone" class="mb-1 block">Номер Телефона</Label>
                  <div class="flex justify-between items-center gap-5">
                    <Input id="phone" class="w-full" :default-value="numberPhone" disabled/>
                    <div class="flex items-center">
                      <Dialog>
                        <DialogTrigger class="h-[25px]">
                          <Icon name="raphael:pensil" size="25" class="cursor-pointer hover:animate-pulse"></Icon>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle class="mb-5">Редактирование Номера Телефона</DialogTitle>
                            <DialogDescription>
                              <form>
                                <Label for="phone" class="mb-1 block">Номер Телефона</Label>
                                <Input id="phone" :placeholder="`Например: ${numberPhone}`" class="mb-3"
                                       :default-value="numberPhone" required/>
                                <Label for="password" class="mb-1 block">Пароль</Label>
                                <Input id="password" type="password" class="mb-3" required/>
                                <DialogFooter>
                                  <Button type="submit">Применить</Button>
                                </DialogFooter>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardHeader>
                  <Label for="password-user" class="mb-1 block">Пароль</Label>
                  <div class="flex justify-between items-center gap-5">
                    <Input id="password-user" type="password" class="w-full" default-value="********" disabled/>
                    <div class="flex items-center">
                      <Dialog>
                        <DialogTrigger class="h-[25px]">
                          <Icon name="raphael:pensil" size="25" class="cursor-pointer hover:animate-pulse"></Icon>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle class="mb-5">Редактирование Пароля</DialogTitle>
                            <DialogDescription>
                              <form>
                                <Label for="password-1" class="mb-1 block">Старый пароль</Label>
                                <Input id="password-1" type="password" class="mb-3" required/>
                                <Label for="password-2" class="mb-1 block">Новый Пароль</Label>
                                <Input id="password-2" type="password" class="mb-3" required/>
                                <DialogFooter>
                                  <Button type="submit">Применить</Button>
                                </DialogFooter>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardHeader>
                  <Accordion type="single" collapsible class="text-[darkred]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Опасная зона</AccordionTrigger>
                      <AccordionContent>
                        <Dialog>
                          <DialogTrigger class="h-[25px] justify-center flex items-center">
                            <Icon name="ph:warning" size="25" class="mr-5"/>
                            Удалить аккаунт
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle class="mb-5">Удаление Аккаунта</DialogTitle>
                              <DialogDescription>
                                <form>
                                  <Label for="" class="mb-5 block text-[darkred]">* Внимание, вы не сможете его
                                    восстановить</Label>
                                  <Label for="password" class="mb-1 block">Пароль</Label>
                                  <Input id="password" type="password" class="mb-3" required/>
                                  <DialogFooter>
                                    <Button type="submit">Удалить</Button>
                                  </DialogFooter>
                                </form>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="statistic">
              <Card>
                <CardHeader>
                  <div class="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-10">
                    <div class="h-full mb-5 xl:mb-0">
                      <Label for="purchasing-bar">Покупки по месецам</Label>
                      <BarChart
                          id="purchasing-bar"
                          :data="dataBar"
                          index="name"
                          :categories="['total']"
                          :y-formatter="(tick, _) => {
                            return typeof tick === 'number'
                              ? convertCurrency(tick).toString()
                              : ''
                          }"
                      />
                    </div>
                    <div class="h-full">
                      <Label for="purchasing-donut">Покупки по брендам</Label>
                      <div class="flex justify-center items-center h-full">
                        <DonutChart
                            id="purchasing-donut"
                            index="name"
                            :category="'total'"
                            :data="dataDonut"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>