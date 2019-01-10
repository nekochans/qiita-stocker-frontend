import { shallowMount } from "@vue/test-utils";
import AlertModal from "@/components/AlertModal.vue";

describe("AlertModal.vue", () => {
  const propsData: {
    isShow: boolean;
    message: string;
  } = {
    isShow: true,
    message: "アラートメッセージ",
  };

  it("props", () => {
    const wrapper = shallowMount(AlertModal, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit closeModal on onClickClose()", () => {
      const wrapper = shallowMount(AlertModal, { propsData });

      // @ts-ignore
      wrapper.vm.onClickClose();
      expect(wrapper.emitted("closeModal")).toBeTruthy();
    });
  });

  describe("template", () => {
    it("should call onClickClose when cancel button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(AlertModal, { propsData });

      wrapper.setMethods({
        onClickClose: mock
      });

      wrapper.find("button").trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickClose when background button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(AlertModal, { propsData });

      wrapper.setMethods({
        onClickClose: mock
      });

      wrapper
        .findAll("div")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });
  });
});
