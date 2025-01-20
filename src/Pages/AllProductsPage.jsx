import TrendingProductsCard from "@/Components/TrendingProduct/TrendingProductsCard";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AllProductsPage() {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 6; // Number of items per page

  const { data = { products: [], totalProducts: 0 }, isLoading,refetch } = useQuery({
    queryKey: ["all-products", searchTerm, currentPage,itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/product/Accepted?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return data; // Ensure this matches your backend response structure
    },
  });
  
  const totalPages = Math.ceil(data.totalProducts / itemsPerPage); // Total pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mainContainer my-20">
      <div className="mb-20 text-center">
        <input
          type="search"
          name=""
          id=""
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 border border-appleGreen focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg shadow-sm bg-transparent text-white placeholder-gray-400 lg:w-[40%]"
          placeholder="Search..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : data.result.length > 0 ? (
          data.result.map((product) => (
            <TrendingProductsCard key={product._id} product={product} refetch={refetch}/>
          ))
        ) : (
          <p>No Data Available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-3">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === page + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
