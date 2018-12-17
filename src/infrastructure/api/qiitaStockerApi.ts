import axios, { AxiosResponse } from "axios";
import {
  IQiitaStockerApi,
  ICreateAccountRequest,
  ICreateAccountResponse,
  IIssueLoginSessionRequest,
  IIssueLoginSessionResponse,
  IQiitaStockerError,
  ICancelAccountRequest,
  ISaveCategoryRequest,
  ISaveCategoryResponse,
  IFetchCategoriesRequest,
  IFetchCategoriesResponse,
  IUpdateCategoryRequest,
  IUpdateCategoryResponse,
  ISynchronizeStockRequest
} from "@/domain/qiita";

export default class QiitaStockerApi implements IQiitaStockerApi {
  async createAccount(
    request: ICreateAccountRequest
  ): Promise<ICreateAccountResponse> {
    return await axios
      .post<ICreateAccountResponse>(
        `${request.apiUrlBase}/api/accounts`,
        {
          qiitaAccountId: request.qiitaAccountId,
          permanentId: request.permanentId,
          accessToken: request.accessToken
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }

  async cancelAccount(request: ICancelAccountRequest): Promise<void> {
    return await axios
      .delete(`${request.apiUrlBase}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }

  async issueLoginSession(
    request: IIssueLoginSessionRequest
  ): Promise<IIssueLoginSessionResponse> {
    return await axios
      .post<IIssueLoginSessionResponse>(
        `${request.apiUrlBase}/api/login-sessions`,
        {
          qiitaAccountId: request.qiitaAccountId,
          permanentId: request.permanentId,
          accessToken: request.accessToken
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }
  async fetchCategories(
    request: IFetchCategoriesRequest
  ): Promise<IFetchCategoriesResponse[]> {
    return await axios
      .get<IFetchCategoriesRequest>(`${request.apiUrlBase}/api/categories`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }

  async saveCategory(
    request: ISaveCategoryRequest
  ): Promise<ISaveCategoryResponse> {
    return await axios
      .post<ISaveCategoryResponse>(
        `${request.apiUrlBase}/api/categories`,
        { name: request.name },
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }

  async updateCategory(
    request: IUpdateCategoryRequest
  ): Promise<IUpdateCategoryResponse> {
    return await axios
      .patch<IUpdateCategoryResponse>(
        `${request.apiUrlBase}/api/categories/${request.categoryId}`,
        { name: request.name },
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }

  async synchronizeStock(request: ISynchronizeStockRequest): Promise<void> {
    return await axios
      .put(
        `${request.apiUrlBase}/api/stocks`,
        {},
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`
          }
        }
      )
      .then(() => {
        return Promise.resolve();
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }
}
