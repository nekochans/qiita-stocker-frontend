import { shallowMount } from "@vue/test-utils";
import ConfirmModal from "@/components/ConfirmModal.vue";

describe("ConfirmModal.vue", () => {
  const propsData: {
    isShow: boolean;
    message: string;
    confirmButtonText: string;
    cancelButtonText: string;
  } = {
    isShow: true,
    message: "カテゴリを削除して問題ありませんか？",
    confirmButtonText: "削除",
    cancelButtonText: "キャンセル"
  };

  it("props", () => {
    const wrapper = shallowMount(ConfirmModal, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit confirmModal on onClickConfirm()", () => {
      const wrapper = shallowMount(ConfirmModal, { propsData });

      // @ts-ignore
      wrapper.vm.onClickConfirm();
      expect(wrapper.emitted("confirmModal")).toBeTruthy();
    });

    it("should emit cancelModal on onClickCancel()", () => {
      const wrapper = shallowMount(ConfirmModal, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCancel();
      expect(wrapper.emitted("cancelModal")).toBeTruthy();
    });
  });

  describe("template", () => {
    it("should call onClickConfirm when confirm button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(ConfirmModal, { propsData });

      wrapper.setMethods({
        onClickConfirm: mock
      });

      wrapper
        .findAll("button")
        .at(0)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickCancel when cancel button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(ConfirmModal, { propsData });

      wrapper.setMethods({
        onClickCancel: mock
      });

      wrapper
        .findAll("button")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickCancel when background button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(ConfirmModal, { propsData });

      wrapper.setMethods({
        onClickCancel: mock
      });

      wrapper
        .findAll("div")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });
  });
});
