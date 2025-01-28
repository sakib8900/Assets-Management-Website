import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://asset-management-system-server-one.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;