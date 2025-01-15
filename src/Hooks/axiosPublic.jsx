import axios from "axios"

const axiosPublic = axios.create({
    baseURL:`${import.meta.env.VITE_API}`
})
export default function UseAxiosPublic() {
  return axiosPublic  

}
