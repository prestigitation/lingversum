<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-4 font-bold">Welcome back to {{ APP_NAME }}!</span>
    <Form
      class="flex !flex-col w-min !items-center"
      :validation-schema="validationSchema"
      @submit="onSubmit"
      @invalid-submit="useInvalidInputHandler"
    >
      <div class="form_field--wrapper">
        <Field
          placeholder="E-mail"
          class="form-field"
          name="email"
          v-bind="email"
        />
        <FormErrorMessage name="email" />
      </div>

      <div class="form_field--wrapper">
        <Field
          placeholder="Password"
          class="form-field"
          name="password"
          v-bind="password"
        />
        <FormErrorMessage name="password" />
      </div>

      <div class="mb-4 mt-8">
        <span>Not yet registered?&nbsp;</span>
        <RouterLink to="/register" class="text-blue-500">Register!</RouterLink>
      </div>
      <Button button-type="submit" color="primary">Sign In</Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { APP_NAME } from "@/types/constants/app.constants";
import { Input, Button } from "vexip-ui";
import { RouterLink, useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Field, useForm, Form } from "vee-validate";
import { useInstance } from "../composables/useAxiosClient";
import useNotications from "../composables/useNotifications";
import FormErrorMessage from "@/components/ui/FormErrorMessage.vue";
import { AxiosResponse } from "axios";
import { login } from "@/composables/useAuth";
import jwt_decode from "jwt-decode";
const { useInvalidInputHandler } = useNotications();
const axios = useInstance();
const router = useRouter();

const validationSchema = toTypedSchema(
  z.object({
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

async function onSubmit(values: any) {
  await axios
    .post("login", { email: values.email, password: values.password })
    .then((response: AxiosResponse) => {
      login(response);
      router.push({ name: "profile" });
      return;
    });
}
</script>
<style lang="scss" scoped src="../styles/auth.scss"></style>
