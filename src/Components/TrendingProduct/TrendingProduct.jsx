
import { useQuery } from "@tanstack/react-query";
import TrendingProductsCard from "./TrendingProductsCard";
import { Link } from "react-router";
import useAxiosPublic from "@/Hooks/useAxiosPublic";


export default function TrendingProduct() {
    const axiosPublic = useAxiosPublic();
  const {data : products = [],refetch} = useQuery({
    queryKey : ['products-by-votes'],
    queryFn : async ()=>{
      const {data} = await axiosPublic.get('/product/Accepted?sortBy=votes')
      return data.result
    }
  })
  return (
    <div className="mainContainer">
      <div className="text-center my-16 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-black clip-path-custom"></div>
  <div className="relative z-10 p-12">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-green-400 mb-6">
      Trending Products
    </h2>
    <p className="text-lg text-gray-300 mx-auto max-w-2xl mb-8">
      Explore the latest products that are creating buzz in the market. These carefully curated items are guaranteed to fuel your creativity and productivity.
    </p>
    <div className="mt-8 flex justify-center">
    <span className="block w-24 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-full"></span>
  </div>
  
  </div>
</div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-20">
          {
  products && products.length > 0
    ? products.map(product => (
        <TrendingProductsCard key={product._id} product={product} refetch={refetch} />
      ))
    : <p>No Products Found</p>
}

         </div>
        <div className="text-center mb-20">
          <Link to='/allProducts' className="btn-grad px-10 py-3 text-lg">See All Products</Link>
        </div>
    </div>
  )
}
