import { APP_NAME } from "@/types/constants/app.constants";
import { VueWrapper, shallowMount } from "@vue/test-utils";
import LayoutHeader from "@/components/ui/LayoutHeader.vue";
import Vue from "vue";

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
