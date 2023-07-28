<template>
  <select
    @change="handleLanguageChange"
    class="country_selector--picker vxp-input vxp-input-vars"
    :value="props.modelValue"
  >
    <option disabled value="">
      {{ i18n.$t("INPUT.LANGUAGE.OPTION").value }}
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
interface LanguageSelectorProps {
  modelValue: string;
}
import useI18nComposable from "@/composables/useI18nComposable";
import * as languages from "../../assets/data.json";

const props = defineProps<LanguageSelectorProps>();
const emit = defineEmits(["update:modelValue"]);

const i18n = useI18nComposable;

const handleLanguageChange = (e: any) => {
  emit("update:modelValue", e.target.value);
};

const getFlagEmoji = (countryCode: string) =>
  String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
  );

const validLanguages = () => {
  return languages.filter((el) => el.demonym);
};
</script>
