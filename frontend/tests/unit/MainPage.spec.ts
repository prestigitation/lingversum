import { VueWrapper, mount } from "@vue/test-utils";
import MainPage from "@/pages/MainPage.vue";
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
    wrapper = mount(MainPage, {
      global: {
        plugins: [router],
      },
    });
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
    createComponent();
    expect(wrapper?.find("h1 + p + button")).toBeTruthy();
  });

  it("has the text which proceeds us to start", () => {
    createComponent();
    expect(wrapper?.find("h1 + p + button").text()).toContain("Get Started");
  });
});
