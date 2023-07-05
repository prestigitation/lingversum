<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-6 font-bold">Register</span>
    <Form
      class="flex !flex-col w-[20%] !gap-4 !items-center"
      :validation-schema="validationSchema"
      @submit="onSubmit"
      @invalid-submit="useInvalidInputHandler"
    >
      <div class="form_field--wrapper_register">
        <Field
          placeholder="Your nickname"
          class="form-field"
          name="name"
          v-bind="name"
        />
        <FormErrorMessage name="email" />
      </div>
      <div class="form_field--wrapper_register">
        <Field
          placeholder="E-mail"
          class="form-field"
          name="email"
          v-bind="email"
        />
        <FormErrorMessage name="email" />
      </div>
      <div class="form_field--wrapper_register">
        <Field
          placeholder="Password"
          class="form-field !w-full"
          name="password"
          v-bind="password"
        />
        <FormErrorMessage name="email" />
      </div>
      <span class="mt-8">
        <span>Registered yet?&nbsp;</span>
        <RouterLink to="/login" class="text-blue-500">Sign In!</RouterLink>
      </span>
      <Button button-type="submit" color="green">Register</Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Input, Button } from "vexip-ui";
import { RouterLink, routerKey, useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Field, useForm, Form } from "vee-validate";
import { useInstance } from "../composables/useAxiosClient";

import useNotifications from "@/composables/useNotifications";

import FormErrorMessage from "@/components/ui/FormErrorMessage.vue";
import useI18nComposable from "@/composables/useI18nComposable";
import { login } from "@/composables/useAuth";
import { AxiosResponse } from "axios";

const axios = useInstance();
const router = useRouter();
const { useSuccessHandler, useInvalidInputHandler } = useNotifications();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
);

const form = useForm({
  validationSchema,
});
const defineInputBinds = form.defineComponentBinds;

const email = defineInputBinds("email");
const password = defineInputBinds("password");
const name = defineInputBinds("name");

async function onSubmit(values: any) {
  await axios
    .post("register", {
      name: values.name,
      email: values.email,
      password: values.password,
    })
    .then((response: AxiosResponse) => {
      useSuccessHandler(useI18nComposable.$t("USER.REGISTER.SUCCESS").value);
      login(response);
      router.push({ name: "profile" });
      return;
    });
}
</script>
<style lang="scss" scoped src="../styles/auth.scss"></style>
