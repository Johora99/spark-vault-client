
import { useQuery } from "@tanstack/react-query"
import FeatureCard from "./FeatureCard";
import BgImage from "@/ShareComponents/BgImage";
import bgImg from '../../assets/home6-trending-jobs-bg.png'
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export default function FeatureProduct() {
  const axiosPublic = useAxiosPublic();
  const {data : products = []} = useQuery({
    queryKey : ['products-by-time'],
    queryFn : async ()=>{
      const {data} = await axiosPublic.get('/product?sortBy=timestamp')
      return data.result
    }
  })
  return (
    <BgImage bgImg={bgImg}>
      <div className="w-full">
      <div className="mainContainer my-20">
<div className="relative text-center py-12 px-6 sm:py-16 sm:px-10 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-purple-900/30 shadow-2xl rounded-tl-full rounded-br-full backdrop-blur-lg my-10">
  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-green-400 mb-6">
    Featured Products
  </h2>
  <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
    Uncover groundbreaking products designed to empower creativity and maximize productivity. 
    From tech marvels to innovative tools, explore what the future has to offer.
  </p>
  <div className="mt-8 flex justify-center">
    <span className="block w-24 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-full"></span>
  </div>
</div>



    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-20">
      {
        products.length > 0 ? products?.map(product =><FeatureCard key={product._id} product={product}></FeatureCard>) : <p>No Products Found</p>
      }
    </div>
    </div>
    </div>
    </BgImage>
  )
}
