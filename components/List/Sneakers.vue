<script setup lang="ts">
import {convertCurrency} from "~/utils/convertCurrency";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "~/components/ui/carousel";
import type {ISneaker} from "~/server/data/sneakers.data";
import type {SerializeObject} from "nitropack"
import type {PropType} from "vue";

const {sneakers} = defineProps({
  sneakers: {
    type: Array as PropType<SerializeObject<ISneaker>[] | null>,
    required: true,
    readonly: true
  }
})

</script>

<template>
  <Carousel :opts="{ align: 'start', loop: false }">
    <CarouselContent class="-ml-3">
      <CarouselItem v-for="(sneaker, index) of sneakers" :key="index"
                    class="md:basis-1/2 xl:basis-1/3 2xl:basis-1/4 pl-3">
        <NuxtLink
            :to="{ name: 'sneaker-article', params: {article: sneaker.article} }"
            class="show-card hover:scale-[1.008] transition-transform"
        >
          <Card>
            <CardHeader class="relative">
              <NuxtImg alt="" :src="'/images/' + sneaker.imgUrls[0]" loading="lazy" class="object-cover object-center h-60"/>
              <span
                  title="Новинка"
                  class="absolute top-2 left-4 flex items-center gap-x-2 h-[40px]"
              >
                    <Icon v-if="sneaker.isPopular" class="hover:animate-pulse" title="Популярное" name="bx:like"
                          size="30"/>
                    <Icon v-if="sneaker.isNew" class="hover:animate-pulse" title="Новинка" name="clarity:new-line"
                          size="40"/>
                  </span>
              <span
                  class="absolute top-3 right-4"
                  title="Добавить в избранное"
                  @click.prevent="console.log('I Like It')"
              >
                    <Icon name="fluent:heart-24-regular" size="30" class="hover:scale-[1.05] transition-transform"/>
                <!--                    fluent:heart-24-filled-->
                  </span>
            </CardHeader>
            <CardContent>
              <CardTitle
                  :title="'Кроссовки ' + sneaker.company.name + ' ' + sneaker.model"
                  class="h-[60px] rows-limit"
              >
                Кроссовки {{ sneaker.company.name }} {{ sneaker.model }}
              </CardTitle>
            </CardContent>
            <CardFooter>
              {{ convertCurrency(+sneaker.price) }}
            </CardFooter>
          </Card>
        </NuxtLink>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious/>
    <CarouselNext/>
  </Carousel>
</template>

<style scoped>
.rows-limit {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.show-card {
  animation: show 0.5s ease-in-out;
}

@keyframes show {
  from {
    opacity: 0.85;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>