<template>
  <div class="slider_container">
    <slider-card
      v-for="(lang, i) in modelValue"
      @update:percentage="changePercentage"
      @update:language="changeLanguage"
      :key="i"
      :lang="lang"
      :i="i"
      :excludedLanguages="modelValue"
    />
    <div
      v-if="languagesFilled"
      class="slider_wrapper slider_wrapper--add"
      @click="addLanguage"
    >
      <div class="slider_empty--plus">+</div>
      <div>
        {{ i18n.$t("INPUT.COUNTRY_SELECTOR.SWIPER.EMPTY.LABEL").value }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useI18nComposable from "@/composables/useI18nComposable";
import swiperLanguage from "@/interfaces/swiperLanguage";
import sliderCard from "@/components/ui/slider/sliderCard.vue";
import { computed } from "vue";

type titleSign = "+" | "-";

interface countrySelectSlideSwiperProps {
  modelValue: swiperLanguage[];
}

const props = defineProps<countrySelectSlideSwiperProps>();
const emit = defineEmits(["update:modelValue"]);
const i18n = useI18nComposable;

const languagesFilled = computed(() =>
  props.modelValue.every((lang) => lang.langCode !== "")
);

const changePercentage = (
  target: Event | titleSign | number,
  i: number
): void => {
  const languages = props.modelValue;
  if (target instanceof Event) {
    languages[i].percent = Math.abs(event.target!.y + 100 - event.clientY);
    emit("update:modelValue", languages);
  } else if (typeof target == "number") {
    languages[i].percent = target;
    emit("update:modelValue", languages);
  } else if (target === "+" || target === "-") {
    if (target === "+" && languages[i].percent < 100) {
      languages[i].percent = languages[i].percent + 1;
      emit("update:modelValue", languages);
    } else if (target === "-" ?? languages[i].percent > 0) {
      languages[i].percent = languages[i].percent - 1;
      emit("update:modelValue", languages);
    }
  }
};

const changeLanguage = (i: number, newLangCode: string): void => {
  const languages = props.modelValue;
  languages[i].langCode = newLangCode;
  emit("update:modelValue", languages);
};

const addLanguage = () => {
  emit("update:modelValue", [
    ...props.modelValue,
    {
      langCode: "",
      percent: 0,
    },
  ]);
};
</script>
<style lang="scss" scoped>
.slider {
  &_empty {
    &--plus {
      color: #a2a2a2;
    }
  }
  &_container {
    .slider_wrapper {
      @apply max-w-[200px];
    }
    @apply grid gap-y-4 xl:gap-y-12 xl:mt-4 items-baseline;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }
  &_wrapper {
    &--add,
    &--empty {
      @apply w-[100px] h-[100px];
      align-self: normal;
    }
    @apply flex flex-col justify-center mx-auto hover:cursor-pointer p-2 mt-2;
    border: 1px dashed;
  }
}
</style>
