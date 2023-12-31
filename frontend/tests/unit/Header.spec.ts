import { APP_NAME } from "@/types/constants/app.constants";
import { VueWrapper, mount, shallowMount } from "@vue/test-utils";
import LayoutHeader from "@/components/ui/LayoutHeader.vue";
import Vue from "vue";
import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
let router: any;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push("/");
  await router.isReady();
});
describe("App Header", () => {
  let wrapper: VueWrapper<Vue.ComponentPublicInstance> | undefined | null;

  const createComponent = () => {
    wrapper = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });
  };

  afterEach(() => {
    wrapper = null;
  });

  it("has buttons 'Login' and 'Register' when user is not authenticated", () => {
    createComponent();
    expect(wrapper?.text()).toContain("Login");
    expect(wrapper?.text()).toContain("Register");
  });

  it("has correct app name got from constants file", () => {
    createComponent();
    expect(wrapper?.text()).toContain(APP_NAME);
  });

  it("has button 'Logout' when user is authenticated", () => {
    createComponent();
    expect(wrapper?.text()).toContain("Logout");
    expect(wrapper?.text()).not.toContain("Login");
    expect(wrapper?.text()).not.toContain("Register");
  });
});
