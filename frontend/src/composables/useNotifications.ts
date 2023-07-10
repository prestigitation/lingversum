import i18n from "../composables/useI18nComposable";

import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const useSuccessHandler = (message: string) => {
  notify({
    title: i18n.$t("SUCCESS.BASE.TITLE").value,
    text: i18n.$t(message).value,
    type: "success",
  });
};
const useErrorHandler = (message: string) => {
  notify({
    title: i18n.$t("ERROR.BASE.TITLE").value,
    text: i18n.$t(message).value,
    type: "error",
  });
};

const useInvalidInputHandler = () => {
  notify({
    title: i18n?.$t("ERROR.BASE.TITLE").value,
    text: i18n?.$t("ERROR.INVALID_INPUT").value,
    type: "error",
  });
};

const useStepWizardErrorHandler = () => {
  notify({
    title: i18n?.$t("ERROR.BASE.TITLE").value,
    text: i18n?.$t("ERROR.INVALID_INPUT").value,
    type: "error",
  });
  PROFILE.STEPS.INITIALS.ERROR.TEXT;
};

export default () => ({
  useSuccessHandler,
  useErrorHandler,
  useInvalidInputHandler,
  useStepWizardErrorHandler,
});
