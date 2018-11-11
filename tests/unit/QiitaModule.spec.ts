import { LoginState } from "@/types/login";
import { QiitaModule } from "@/store/modules/qiita";
import axios from "axios";
import {
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IAuthorizationResponse
} from "@/domain/Qiita";

jest.mock("@/domain/Qiita");
jest.mock("axios");

describe("QiitaModule", () => {
  describe("getters", () => {
    let state: LoginState;

    beforeEach(() => {
      state = {
        authorizationCode: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        accessToken: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0",
        permanentId: "1",
        isLoggedIn: false
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

    it("should be able to get permanentId", () => {
      const wrapper = (getters: any) => getters.permanentId(state);
      const permanentId: LoginState = wrapper(QiitaModule.getters);

      expect(permanentId).toEqual(state.permanentId);
    });
  });

  describe("mutations", () => {
    let state: LoginState;

    beforeEach(() => {
      state = {
        authorizationCode: "",
        accessToken: "",
        permanentId: "",
        isLoggedIn: false
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

    it("should be able to save permanentId", () => {
      const wrapper = (mutations: any) => mutations.savePermanentId(state, "1");
      wrapper(QiitaModule.mutations);

      expect(state.permanentId).toEqual("1");
    });
  });

  describe("actions", () => {
    it("should be able to create account", async () => {
      const mockPostResponse: { data: IIssueAccessTokensResponse } = {
        data: {
          client_id: "4f54451e86041b5c0a29419b4058f44b5ea04ae9",
          scopes: ["read_qiita"],
          token: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        }
      };

      const mockGetResponse: { data: IFetchAuthenticatedUserResponse } = {
        data: {
          permanent_id: "1"
        }
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockGetResponse);
      mockAxios.post.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();
      const dispatch = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "89bd7d77-b352-45f8-9585-388939d426ad",
        localState: "89bd7d77-b352-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { dispatch, commit },
          { params: params, accountAction: "signUp" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveAuthorizationCode", "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"],
        ["saveAccessToken", "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"],
        ["savePermanentId", "1"]
      ]);

      expect(dispatch.mock.calls).toEqual([["createAccount"]]);
    });

    it("should be able to login", async () => {
      const mockPostResponse: { data: IIssueAccessTokensResponse } = {
        data: {
          client_id: "4f54451e86041b5c0a29419b4058f44b5ea04ae9",
          scopes: ["read_qiita"],
          token: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        }
      };

      const mockGetResponse: { data: IFetchAuthenticatedUserResponse } = {
        data: {
          permanent_id: "1"
        }
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockGetResponse);
      mockAxios.post.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();
      const dispatch = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "89bd7d77-b352-45f8-9585-388939d426ad",
        localState: "89bd7d77-b352-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { dispatch, commit },
          { params: params, accountAction: "login" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveAuthorizationCode", "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"],
        ["saveAccessToken", "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"],
        ["savePermanentId", "1"]
      ]);

      expect(dispatch.mock.calls).toEqual([["issueLoginSession"]]);
    });

    it("should not commit when callbackState don't match localState", async () => {
      const commit = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "callbackState-45f8-9585-388939d426ad",
        localState: "localState-52-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { commit },
          { params: params, accountAction: "signUp" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([]);
    });
  });
});
