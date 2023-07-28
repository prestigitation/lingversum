<template>
  <form-wizard>
    <tab-content
      :before-change="handleBeforeValidateInitials"
      :title="i18n.$t('PROFILE.STEPS.INITIALS.TITLE').value"
    >
      <div class="py-4 flex flex-col items-center">
        <img
          v-show="avatar.value?.value"
          id="avatar"
          :src="(avatar.value?.value as any)"
          width="100"
          class="py-2 my-4 h-[100px] profile_step--avatar"
        />
        <Upload
          accept="image/png, image/jpeg"
          @update:file-list="setAvatar"
          allow-drag
        >
          <template #tip>
            <Title :level="5">{{
              i18n.$t("PROFILE.STEPS.INITIALS.AVATAR.TITLE").value
            }}</Title>
          </template>
        </Upload>
        <form-error-message name="avatar" />
      </div>
      <field type="number" placeholder="Your age" name="age" />
      <form-error-message name="age" />
      <field name="country">
        <country-selector
          :modelValue="country"
          @update:modelValue="country.setValue($event)"
          :placeholder="
            i18n.$t('PROFILE.STEPS.INITIALS.COUNTRY.PLACEHOLDER').value
          "
        />
      </field>
      <form-error-message name="country" />
      <field
        type="text"
        :placeholder="i18n.$t('PROFILE.STEPS.INITIALS.CITY.PLACEHOLDER').value"
        name="city"
      />
      <form-error-message name="city" />
    </tab-content>
    <tab-content
      :before-change="handleBeforeValidateLangData"
      :title="i18n.$t('PROFILE.STEPS.LANG_DATA.TITLE').value"
    >
      <field name="mainLanguage">
        <language-selector
          :modelValue="(mainLanguage.value.value as string)"
          @update:modelValue="mainLanguage.setValue($event)"
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
import { FileState, Title, Upload } from "vexip-ui";
import FormErrorMessage from "../FormErrorMessage.vue";
import CountrySelector from "../CountrySelector.vue";
import LanguageSelector from "../LanguageSelector.vue";
import { TabContent, FormWizard } from "vue3-form-wizard";
import { Input } from "vexip-ui";
import { Field, useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ZodRawShape, z } from "zod";
import useNotifications from "../../../composables/useNotifications";
import useI18nComposable from "../../../composables/useI18nComposable";

const i18n = useI18nComposable;

const { useStepWizardErrorHandler } = useNotifications();

const schemas = [
  {
    avatar: z.instanceof(File, {
      message: i18n.$t("PROFILE.STEPS.INITIALS.AVATAR.ERROR").value,
    }),
    age: z.string().regex(/^\d+$/).transform(Number),
    country: z.string().nonempty(),
    city: z.string().nonempty(),
  },
  {
    mainLanguage: z.string().nonempty(),
  },
];

const flattenedArray: ZodRawShape = {};

schemas.forEach((schema) => {
  for (let i = 0; i < Object.keys(schema).length; i++) {
    flattenedArray[Object.entries(schema)[i][0]] = Object.entries(schema)[i][1];
  }
});

const validationSchema = toTypedSchema(
  z.object({
    ...flattenedArray,
  })
);

const form = useForm({
  validationSchema,
});

const age = useField("age");
const mainLanguage = useField("mainLanguage");
const avatar = useField("avatar");
const country = useField("country");
const city = useField("city");

const validateInitials = async (): Promise<boolean> => {
  const { valid: avatarValid } = await avatar.validate();
  const { valid: ageValid } = await age.validate();
  const { valid: cityValid } = await city.validate();
  const { valid: countryValid } = await country.validate();
  return avatarValid && ageValid && cityValid && countryValid;
};

const validateLangData = async (): Promise<boolean> => {
  const { valid: mainLanguageValid } = await mainLanguage.validate();
  return mainLanguageValid;
};

const handleBeforeValidateInitials = async () => {
  return await handleBeforeStepChange(0);
};

const handleBeforeValidateLangData = async () => {
  return await handleBeforeStepChange(1);
};

const handleBeforeStepChange = async (step: number) => {
  let validator;
  switch (step) {
    case 0: {
      validator = validateInitials;
      break;
    }
    case 1: {
      validator = validateLangData;
      break;
    }
    default: {
      validator = async () => {
        return false;
      };
      break;
    }
  }
  if (await validator()) {
    return true;
  } else {
    useStepWizardErrorHandler();
    return false;
  }
};

const setAvatar = (files: Array<FileState>) => {
  if (files.length) {
    avatar.setValue(files[0].source);

    let reader = new FileReader();
    let imgtag = document.getElementById("avatar");

    reader.onload = function (event: any) {
      imgtag!.src = event.target.result;
    };

    reader.readAsDataURL(files[0].source as File);
    document.querySelector(".vxp-upload__control")!.style.display = "none";
  } else {
    avatar.setValue(null);
    document.querySelector(".vxp-upload__control")!.style.display = "block";
  }
};
</script>
<style lang="scss">
.wizard-tab-content {
  @apply xl:flex xl:justify-center;
}
</style>
<style lang="scss" scoped>
@import "../../../styles/mixins.scss";
.profile {
  &_step {
    &--avatar {
      @include avatar;
    }
  }
}
</style>
