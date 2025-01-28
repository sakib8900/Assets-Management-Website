import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://asset-management-system-server-one.vercel.app"
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;