<template>
  <select
    @change="handleLanguageChange"
    class="country_selector--picker vxp-input vxp-input-vars"
    :value="props.modelValue"
  >
    <option disabled value="">
      {{ getSelectPlaceholder() }}
    </option>
    <option
      v-for="(lang, i) in validLanguages()"
      :key="i"
      :value="lang.alpha2Code.toLowerCase()"
    >
      {{ getFlagEmoji(lang.alpha2Code.toLowerCase()) }} &nbsp;
      {{ lang.demonym }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import useI18nComposable from "@/composables/useI18nComposable";
import * as languages from "../../assets/data.json";
import { getFlagEmoji } from "@/helpers/languageHelper";
import swiperLanguage from "@/interfaces/swiperLanguage";

interface LanguageSelectorProps {
  modelValue: string;
  excludedLanguages?: swiperLanguage[];
  placeholder: string;
}

const props = defineProps<LanguageSelectorProps>();
const emit = defineEmits(["update:modelValue"]);

const i18n = useI18nComposable;

const handleLanguageChange = (e: any) => {
  emit("update:modelValue", e.target.value);
};

const getSelectPlaceholder = () =>
  props.placeholder ?? i18n.$t("INPUT.LANGUAGE.OPTION").value;

const validLanguages = () => {
  return languages.filter((el) => {
    if (props.excludedLanguages?.length) {
      return (
        el.demonym &&
        !props.excludedLanguages
          .map((el) => el.langCode.toLowerCase())
          .includes(el.alpha2Code.toLowerCase())
      );
    } else return el.demonym;
  });
};
</script>
