/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FetcherOptions extends Partial<RequestInit> {
  prefix?: string;
  apiEndpoint?: string;
}

export class Http {
  private apiEndpoint?: string;
  private prefix?: string;
  private fetchOptions?: Partial<RequestInit>;
  constructor(options?: FetcherOptions) {
    const { apiEndpoint, prefix, ...initOptions } = options ?? {};
    this.apiEndpoint = apiEndpoint ?? import.meta.env.VITE_API_ENDPOINT;
    this.prefix = prefix ?? "api";
    this.fetchOptions = initOptions;
  }

  private concatUrl = (path: string) =>
    `${this.apiEndpoint}${this.prefix}${path}`;

  private generateParams = (url: string, params: Record<string, any>) => {
    const paramsArr: string[] = [];
    Object.keys(params).forEach((key) => {
      const value = typeof params[key] === "undefined" ? "" : params[key];
      paramsArr.push([key, encodeURIComponent(value)].join("="));
    });
    return `${url}?${paramsArr.join("&")}`;
  };
  private mergeOptions = (
    method: string,
    data?: Record<string, any> | FormData,
    options?: RequestInit
  ) => {
    if(localStorage.getItem('token') && this.fetchOptions) {
      this.fetchOptions.headers = {
        ...this.fetchOptions.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
    const result = {
      method,
      ...(this.fetchOptions
        ? Object.assign(this.fetchOptions, options)
        : options),
    };
    if (data) {
      result.body = data instanceof FormData ? data : JSON.stringify(data);
    }
    return result;
  };

  private async parseFetch<T>(res: Response) {
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
    try {
      const parseResult = (await res.json()) as T;
      return parseResult;
    } catch (err) {
      throw new Error("response with no body");
    }
  }

  async get<T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit
  ) {
    return await this.parseFetch<T>(
      await fetch(
        data
          ? this.generateParams(this.concatUrl(path), data)
          : this.concatUrl(path),
        this.mergeOptions("GET", options)
      )
    );
  }

  async post<T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit
  ) {
    return await this.parseFetch<T>(
      await fetch(
        this.concatUrl(path),
        this.mergeOptions("POST", data, options)
      )
    );
  }

  async postFile<T>(path: string, data: FormData) {
    return await this.parseFetch<T>(
      await fetch(
        this.concatUrl(path),
        this.mergeOptions("POST", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      )
    );
  }

  async put<T>(path: string, data: Record<string, any>, options?: RequestInit) {
    return await this.parseFetch<T>(
      await fetch(this.concatUrl(path), this.mergeOptions("PUT", data, options))
    );
  }

  async delete<T>(
    path: string,
    data: Record<string, any>,
    options?: RequestInit
  ) {
    return await this.parseFetch<T>(
      await fetch(
        data
          ? this.generateParams(this.concatUrl(path), data)
          : this.concatUrl(path),
        this.mergeOptions("DELETE", options)
      )
    );
  }
}

export const http = new Http({
  apiEndpoint: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
    ...(!!localStorage.getItem("token") && {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
  },
  prefix: "/api",
});