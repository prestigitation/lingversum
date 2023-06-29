import { APP_NAME } from "@/types/constants/app.constants";
import { VueWrapper, mount, shallowMount } from "@vue/test-utils";
import LayoutHeader from "@/components/ui/LayoutHeader.vue";
import Vue from "vue";
import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
let router;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
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
    wrapper = shallowMount(LayoutHeader);
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
