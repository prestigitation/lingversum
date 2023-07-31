<template>
  <div
    :class="[
      'slider_wrapper',
      {
        '!p-0 !border-0': lang.langCode,
      },
    ]"
  >
    <language-selector
      v-if="lang.langCode === ''"
      :modelValue="lang.langCode"
      @update:modelValue="emit('update:language', i, $event)"
      :placeholder="
        i18n.$t('PROFILE.STEPS.LANG_DATA.MAIN_LANGUAGE.PLACEHOLDER').value
      "
    />
    <div v-else>
      <div
        :style="`background: white;opacity:.7;width:100px;height:${
          100 - lang.percent
        }px;`"
        class="absolute pointer-events-none max-h-[100px]"
      ></div>
      <img
        :src="getLanguageImage(lang.langCode)"
        @click="emit('update:percentage', $event, i)"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove($event, i)"
        class="h-[100px] w-[100px]"
        style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
      />
      <div class="mt-1">
        <span
          class="text-red-500"
          @click="decrementPercentage(lang.percent, i)"
          @mousedown="handleMinusMouseDown(lang.percent, i)"
          @mouseup="handleMinusMouseUp"
          @mouseleave="handleMinusMouseUp"
          >-</span
        >
        {{ getLanguageFromLangCode(lang.langCode.toUpperCase()) }}
        <span
          class="text-green-500"
          @click="incrementPercentage(lang.percent, i)"
          @mousedown="handlePlusMouseDown(lang.percent, i)"
          @mouseup="handlePlusMouseUp"
          @mouseleave="handlePlusMouseUp"
          >+</span
        >
      </div>
      <div>
        {{ lang.percent }}% ({{ getLanguageQualification(lang.percent) }})
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LanguageSelector from "../LanguageSelector.vue";
import useI18nComposable from "@/composables/useI18nComposable";
import {
  getLanguageFromLangCode,
  getLanguageQualification,
} from "@/helpers/languageHelper";
import swiperLanguage from "@/interfaces/swiperLanguage";
interface sliderCardProps {
  lang: swiperLanguage;
  i: number;
}
const i18n = useI18nComposable;
const props = defineProps<sliderCardProps>();
const emit = defineEmits(["update:percentage", "update:language"]);

let yStart: number;
const handleTouchStart = (event: TouchEvent) => {
  yStart = event.touches[0].clientY;
};

const handleTouchMove = (event: TouchEvent, i: number) => {
  let yCurrent = event.touches[event.touches.length - 1].clientY;
  let yDifference = yCurrent - yStart;
  if (yDifference > 0) {
    if (event!.target!.y - 100 < yCurrent) {
      emit("update:percentage", 100, i);
    } else {
      const percentage = Math.abs(
        event.target!.y + 100 - (yCurrent - event.target!.y)
      );
      emit("update:percentage", percentage > 100 ? 100 : percentage, i);
    }
  } else {
    if (event!.target!.y - 100 > yCurrent) {
      emit("update:percentage", 100, i);
    } else {
      const percentage = Math.abs(event.target!.y + 100 - yCurrent);
      emit("update:percentage", percentage > 100 ? 100 : percentage, i);
    }
  }
};

const decrementPercentage = (percent: number, i: number) => {
  if (percent >= 1) {
    emit("update:percentage", "-", i);
  } else emit("update:percentage", 0, i);
};

const incrementPercentage = (percent: number, i: number) => {
  if (percent < 100) {
    emit("update:percentage", "+", i);
  } else emit("update:percentage", 100, i);
};

let decrementInterval: any;
let incrementInterval: any;

const handlePlusMouseDown = (percent: number, i: number) => {
  incrementInterval = setInterval(() => {
    incrementPercentage(percent, i);
  }, 100);
};

const handlePlusMouseUp = () => {
  clearInterval(incrementInterval);
};

const handleMinusMouseDown = (percent: number, i: number) => {
  decrementInterval = setInterval(() => {
    decrementPercentage(percent, i);
  }, 100);
};

const handleMinusMouseUp = () => {
  clearInterval(decrementInterval);
};

const getLanguageImage = (langCode: string): string => {
  return "https://flagcdn.com/w160/" + langCode + ".png";
};
</script>
