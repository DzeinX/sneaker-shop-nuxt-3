<script setup lang="ts">
import {
  Carousel, type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { watchOnce } from "@vueuse/core"
import type {ISneaker} from "~/server/data/sneakers.data"
import { Skeleton } from '@/components/ui/skeleton'


const { data: sneakers } = useLazyFetch('/api/sneaker/all')

const route = useRouter().currentRoute.value
const { data: sneaker } = useLazyFetch<ISneaker>('/api/sneaker/' + route.params.article)

useHead({
  title: 'Sneaker | Sneaker Shop',
})

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi)
    return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
          <div class="grid md:grid-cols-1 gap-y-5 lg:grid-cols-2 gap-x-14">
            <div class="w-full">
              <Skeleton class="h-[440px]"/>
            </div>
            <div class="w-full">
              <Skeleton class="h-[100px] mb-[53px]"/>
              <Skeleton class="h-[162px] mb-[53px]"/>
              <Skeleton class="h-[270px] mb-[53px]"/>
            </div>
          </div>
          <div class="mb-14">
            <ListSneakersSkeleton/>
          </div>
      </template>

      <div v-if="sneaker === null">
        <div class="grid md:grid-cols-1 gap-y-5 lg:grid-cols-2 gap-x-14">
          <div class="w-full">
            <Skeleton class="h-[440px]"/>
          </div>
          <div class="w-full">
            <Skeleton class="h-[100px] mb-[53px]"/>
            <Skeleton class="h-[162px] mb-[53px]"/>
            <Skeleton class="h-[270px] mb-[53px]"/>
          </div>
        </div>
        <div class="mb-14">
          <ListSneakersSkeleton/>
        </div>
      </div>

      <div v-if="sneaker !== null">
        <div class="grid md:grid-cols-1 gap-y-5 lg:grid-cols-2 gap-x-14 mb-[53px]">
          <div class="w-full">
            <Carousel :opts="{ loop: true }" @init-api="(val) => emblaMainApi = val">
              <CarouselContent>
                <CarouselItem v-for="url of sneaker?.imgUrls" :key="url">
                  <NuxtImg alt="" :src="`/images/${url}`" class="object-cover object-center h-96 w-full"/>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
            </Carousel>
            <Carousel :opts="{ align: 'start', loop: true }" @init-api="(val) => emblaThumbnailApi = val">
              <CarouselContent class="-ml-3">
                <CarouselItem @click="onThumbClick(index)" class="basis-1/6 pl-3 cursor-pointer"
                              v-for="(url, index) of sneaker?.imgUrls" :key="index">
                  <Card :class="index === selectedIndex ? '' : 'opacity-50'">
                    <CardHeader class="p-2 hover:translate-y-0">
                      <NuxtImg alt="" :src="`/images/${url}`" class="object-cover object-center h-10 w-full"/>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <div class="w-full">
            <div class="text-3xl font-semibold mb-2.5">{{ sneaker?.gender.nameForTitle }} кроссовки {{
                sneaker?.company.name
              }} {{ sneaker?.model }}
            </div>
            <div class="flex justify-between text-gray-500 text-sm mb-[53px]">
              <div>Артикул: {{ sneaker?.article }}</div>
              <div>Страна: {{ sneaker?.country }}</div>
            </div>
            <div class="text-2xl  font-semibold mb-5">{{ convertCurrency(sneaker?.price + '') }}</div>
            <div class="flex  mb-5">
              <div v-for="(size, index) of sneaker?.sizes" :key="index">
                <div v-if="size.amount !== 0"
                     class="h-10 w-10 rounded-lg border border-gray-500 text-gray-500 flex items-center justify-center
                   cursor-pointer hover:-translate-y-0.5 transition-transform mr-1"
                >
                  {{ size.size }}
                </div>
              </div>
            </div>
            <div class="mb-[53px]">
              <Button variant="default">Добавить в корзину</Button>
            </div>
            <Accordion type="single" collapsible v-if="sneaker?.description !== ''">
              <AccordionItem value="item-1">
                <AccordionTrigger>Описание</AccordionTrigger>
                <AccordionContent>{{ sneaker?.description }}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Характеристики</AccordionTrigger>
                <AccordionContent>
                  <div class="mb-2.5">Пол: {{ sneaker?.gender.nameForGender }}</div>
                  <div class="mb-2.5">Страна: {{ sneaker?.country }}</div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Возврат и обмен</AccordionTrigger>
                <AccordionContent>Перед отправкой обмена обязательно свяжитесь с нашим менеджером test@mail.ru
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Доставка</AccordionTrigger>
                <AccordionContent>
                  <div class="mb-2.5">Доставка по Москве</div>
                  <ul class="list-disc list-inside mb-2.5">
                    <li>Доставка курьером в интервал 13:00-20:00 в пределах МКАД 350 руб.</li>
                    <li>Доставка "день в день" в пределах МКАД (при заказе до 16:00).</li>
                  </ul>
                  <div class="mb-2.5">Ориентировочные сроки доставки по России</div>
                  <ul class="list-disc list-inside mb-2.5">
                    <li>Почта России. Срок доставки от 4 до 14 дней.</li>
                    <li>СДЕК. Сроки доставки 3-7 рабочих дней.</li>
                    <li>Боксберри. Сроки доставки 3-7 рабочих дней.</li>
                  </ul>
                  <div>Доставка за границу осуществляется Почтой России по полной предоплате</div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Оплата</AccordionTrigger>
                <AccordionContent>
                  <div class="mb-2.5">Доступные способы оплаты:</div>
                  <ul class="list-disc list-inside mb-2.5">
                    <li>Наличными при получении</li>
                    <li>Оплата онлайн всеми популярными способами (Visa, Mastercard и тд.)</li>
                  </ul>
                  <div>Товары со скидкой отправляются по России только по полной предоплате. Все подробности в разделе
                    оплата
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div class="mb-14">
          <h3 class="text-3xl font-semibold mb-7">Смотрите так же</h3>
          <ListSneakers :sneakers="sneakers"/>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>