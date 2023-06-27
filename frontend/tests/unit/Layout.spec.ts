import { mount } from "@vue/test-utils";

import { VueWrapper } from "@vue/test-utils";
import LayoutHeader from "@/components/ui/LayoutHeader.vue";
import Vue from "vue";

describe("App Layout", () => {
  let wrapper: VueWrapper<Vue.ComponentPublicInstance> | undefined | null;

  const createComponent = () => {
    wrapper = mount(LayoutHeader);
  };

  afterEach(() => {
    wrapper = null;
  });

  it("has header", () => {
    createComponent();
    expect(wrapper?.html()).toContain("<header");
  });
});
