import Login from "./../../src/components/views/Login.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock;

describe("login.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      methods: {},
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  //   it("does h1 exist", () => {
  //     expect(wrapper.find("h1").text()).toBe("Login");
  //   });

  it("login data, email", () => {
    expect(wrapper.vm.$data.email).toBe(null);
  });

  it("login data, password", () => {
    expect(wrapper.vm.$data.password).toBe(null);
  });

  it("on sign in to correct place", () => {
    wrapper.find(".submitButton").trigger("click");
  });
});
