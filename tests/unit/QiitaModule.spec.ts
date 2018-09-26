import { LoginState } from "@/types/login";
import { QiitaModule } from "@/store/modules/qiita";
import axios from "axios";
import { IIssueAccessTokensResponse } from "@/domain/Qiita";

jest.mock("@/domain/Qiita");
jest.mock("axios");

describe("QiitaModule", () => {
  describe("getters", () => {
    let state: LoginState;

    beforeEach(() => {
      state = {
        authorizationCode: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        accessToken: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
      };
    });

    it("should be able to get authorizationCode", () => {
      const wrapper = (getters: any) => getters.authorizationCode(state);
      const authorizationCode: LoginState = wrapper(QiitaModule.getters);

      expect(authorizationCode).toEqual(state.authorizationCode);
    });

    it("should be able to get accessToken", () => {
      const wrapper = (getters: any) => getters.accessToken(state);
      const accessToken: LoginState = wrapper(QiitaModule.getters);

      expect(accessToken).toEqual(state.accessToken);
    });
  });

  describe("mutations", () => {
    let state: LoginState;

    beforeEach(() => {
      state = {
        authorizationCode: "",
        accessToken: ""
      };
    });

    it("should be able to save authorizationCode", () => {
      const wrapper = (mutations: any) =>
        mutations.saveAuthorizationCode(
          state,
          "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"
        );
      wrapper(QiitaModule.mutations);

      expect(state.authorizationCode).toEqual(
        "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"
      );
    });

    it("should be able to save accessToken", () => {
      const wrapper = (mutations: any) =>
        mutations.saveAccessToken(
          state,
          "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        );
      wrapper(QiitaModule.mutations);

      expect(state.accessToken).toEqual(
        "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
      );
    });
  });

  describe("actions", () => {
    it("should be able to fetch AccessTokens from Qiita API", async () => {
      const mockResponse: { data: IIssueAccessTokensResponse } = {
        data: {
          client_id: "4f54451e86041b5c0a29419b4058f44b5ea04ae9",
          scopes: ["read_qiita"],
          token: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        }
      };

      const mockAxios: any = axios;
      mockAxios.post.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const routeQuery = { code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f" };

      const wrapper = (actions: any) =>
        actions.issueAccessToken({ commit }, routeQuery);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveAuthorizationCode", "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"],
        ["saveAccessToken", "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"]
      ]);
    });
  });
});
