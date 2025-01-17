import UseAxiosPublic from "@/Hooks/useAxiosPublic";


export const imageData = async (image)=>{
  const axiosPublic = UseAxiosPublic();
  const formData = new FormData();
  formData.append('image',image)
  const {data} = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)
  const image_url=data.data.display_url;
  return image_url;
}