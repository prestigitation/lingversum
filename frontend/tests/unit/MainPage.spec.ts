import { VueWrapper, shallowMount } from "@vue/test-utils";
import MainPage from "@/pages/MainPage.vue";
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
    wrapper = shallowMount(MainPage);
  };

  const createComponentWithMockedAuthenticatedState = () => {
    wrapper = shallowMount(MainPage);
  };

  afterEach(() => {
    wrapper = null;
  });

  it("has title marked as h1", () => {
    createComponent();
    expect(wrapper?.find("h1")).toBeTruthy();
  });

  it("has paragraph shortly describing the product", () => {
    createComponent();
    expect(wrapper?.find("p")).toBeTruthy();
  });

  it("the title comes after the paragraph", () => {
    createComponent();
    expect(wrapper?.find("h1 + p")).toBeTruthy();
  });

  it("renders the button in the right order", () => {
    expect(wrapper?.find("h1 + p + button")).toBeTruthy();
  });

  it("has the text which proceeds us to start", () => {
    expect(wrapper?.find("h1 + p + button").text()).toContain("Get started");
  });
});
