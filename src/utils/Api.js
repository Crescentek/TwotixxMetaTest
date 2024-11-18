import axios from "axios";

class Api {
  async defaultHeader(object) {
    Object.keys(object).forEach((key) => {
      axios.defaults.headers.common[key] = object[key];
    });
  }

  GET(endpoint, params) {
    return new Promise((resolve) => {
      console.log(
        this.normalizePath(endpoint),
        axios.defaults.headers.common,
        "this.normalizePath(endpoint)"
      );
      console.log(
        this.normalizePath(endpoint),
        axios.defaults.headers,
        "this.normalizePath(endpoint)"
      );
      if (navigator.onLine) {
        axios({
          method: "GET",
          url: this.normalizePath(endpoint),
          params,
          headers: { "Content-Type": "application/json" },
          responseType: "json",
        })
          .then((response) => {
            resolve({
              status: response.status,
              response: response.data,
            });
          })
          .catch((error) => {
            resolve({
              status: error?.response?.status,
              response: error?.response?.data,
            });
          });
      } else {
        resolve({
          status: 502,
          response: "Network Error",
        });
      }
    });
  }

  POST(endpoint, params, headers) {
    return new Promise((resolve) => {
      if (navigator.onLine) {
        axios({
          method: "post",
          url: this.normalizePath(endpoint),
          data: JSON.stringify(params),
          headers: { "Content-Type": "application/json", ...headers },
        })
          .then((response) => {
            resolve({
              status: response.status,
              response: response.data,
            });
          })
          .catch((error) => {
            resolve({
              status: error?.response?.status,
              response: error?.response?.data,
            });
          });
      } else {
        resolve({
          status: 502,
          response: "Network Error",
        });
      }
    });
  }

  PUT(endpoint, params, headers) {
    return new Promise((resolve) => {
      if (navigator.onLine) {
        axios({
          method: "PUT",
          url: this.normalizePath(endpoint),
          data: JSON.stringify(params),
          headers: { "Content-Type": "application/json", ...headers },
        })
          .then((response) => {
            resolve({
              status: response.status,
              response: response.data,
            });
          })
          .catch((error) => {
            resolve({
              status: error?.response?.status,
              response: error?.response?.data,
            });
          });
      } else {
        resolve({
          status: 502,
          response: "Network Error",
        });
      }
    });
  }

  DELETE(endpoint, params, headers) {
    return new Promise((resolve) => {
      if (navigator.onLine) {
        axios({
          method: "DELETE",
          url: this.normalizePath(endpoint),
          data: JSON.stringify(params),
          headers: { "Content-Type": "application/json", ...headers },
        })
          .then((response) => {
            resolve({
              status: response.status,
              response: response.data,
            });
          })
          .catch((error) => {
            resolve({
              status: error.response.status,
              response: error.response?.data,
            });
          });
      } else {
        resolve({
          status: 502,
          response: "Network Error",
        });
      }
    });
  }

  normalizePath(endpoint) {
    return `${process.env.REACT_APP_API_URL}/${endpoint}`;
  }
}

export default new Api();
