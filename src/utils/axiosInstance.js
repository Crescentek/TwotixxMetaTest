import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: "Bearer " + authToken,
  },
});

export default axiosInstance;
