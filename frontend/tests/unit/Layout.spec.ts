import { mount } from "@vue/test-utils";

import { VueWrapper } from "@vue/test-utils";
import LayoutHeader from "@/components/ui/LayoutHeader.vue";
import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";

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

let router: any;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push("/");
  await router.isReady();
});

describe("App Layout", () => {
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

  it("has header", () => {
    createComponent();
    expect(wrapper?.html()).toContain("<header");
  });
});
