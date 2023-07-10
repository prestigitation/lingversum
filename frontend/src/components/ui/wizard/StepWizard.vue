<template>
  <form-wizard>
    <tab-content
      :beforeChange="handleStepChange"
      :title="i18n.$t('PROFILE.STEPS.INITIALS.TITLE').value"
    >
      <field placeholder="Your age" name="age" />
      <form-error-message name="age" />
      <field name="mainLanguage">
        <country-selector
          :modelValue="mainLanguage"
          @update:modelValue="setMainLanguage"
          :placeholder="
            i18n.$t('PROFILE.STEPS.INITIALS.MAIN_LANGUAGE.PLACEHOLDER').value
          "
        />
      </field>
      <form-error-message name="mainLanguage" />
    </tab-content>
    <tab-content />
  </form-wizard>
</template>
<script lang="ts" setup>
import FormErrorMessage from "../FormErrorMessage.vue";
import CountrySelector from "../CountrySelector.vue";
import { TabContent, FormWizard } from "vue3-form-wizard";
import { Input } from "vexip-ui";
import { Field, useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { boolean, string, z } from "zod";
import { ref } from "vue";
import useNotifications from "../../../composables/useNotifications";
import useI18nComposable from "../../../composables/useI18nComposable";

const i18n = useI18nComposable;

const { useStepWizardErrorHandler } = useNotifications();

const currentFormIndex = ref<number>(0);

const schemas = [
  {
    age: z.string().nonempty().min(1),
    mainLanguage: z.string().nonempty(),
  },
];

const spreadedSchema = schemas.reduce(
  (accum, obj) => (accum = { ...accum, ...obj })
);

const validationSchema = toTypedSchema(
  z.object({
    ...spreadedSchema,
  })
);

const form = useForm({
  validationSchema,
});

const age = useField("age");
const mainLanguage = useField("mainLanguage");

const validateInitials = async (): Promise<boolean> => {
  console.log(await age.validate(), await mainLanguage.validate());
  const { valid: ageValid } = await age.validate();
  const { valid: langValid } = await mainLanguage.validate();
  return ageValid && langValid;
};

const handleStepChange = async (prevIndex: number, nextIndex: number) => {
  console.log(await validateInitials());
  if (await validateInitials()) {
    currentFormIndex.value = nextIndex;
    return true;
  } else {
    useStepWizardErrorHandler();
    return false;
  }
};
const setMainLanguage = (languageCode: string) => {
  mainLanguage.setValue(languageCode);
};
</script>
<style lang="scss">
.wizard-tab-content {
  @apply xl:flex xl:justify-center;
}
</style>
