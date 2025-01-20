import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { motion } from "motion/react";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";

export default function UpdatePage() {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for product data
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // ReactTags State
  const [tags, setTags] = useState([]);



  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/product/byId/${id}`);
        setProduct(data);
        setTags(data.tags.map((tag) => ({ id: tag, text: tag })));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        toast.error("Failed to load product data.");
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  // Key codes for delimiters
  const KeyCodes = { comma: 188, enter: 13 };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  // Handle tag addition
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  // Handle tag deletion
  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const  owner_name= e.target.owner_name.value;
    const  owner_image=e.target.owner_image.value;
    const  owner_email= e.target.owner_email.value;
    const  product_name= e.target.product_name.value;
    const  product_image= e.target.product_image.value;
    const  web_link= e.target.web_link.value;
    const  description= e.target.description.value;
  
    const  timestamp=new Date();
    const  votes= product.votes || 0;
    const  reportCount= product.reportCount || 0;
    const  status= product.status || "pending";
    const featured = product.featured || false;
  
     const productInfo = {
      owner_name,owner_email,owner_image,product_name,product_image,web_link,description,tags:tags.map((tag) => tag.text) || [],timestamp,votes,reportCount,status,featured
     }
      const res = await axiosSecure.put(`/product/${id}`, productInfo);
      if(res.data?.modifiedCount > 0){
        toast.success('Your Product Information Updated Successfully');
        navigate('/dashBoard/myAddedProduct')
      }
    
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer mt-20">
      <motion.h2
        animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl font-semibold mb-5 text-center"
      >
        Update Your Product
      </motion.h2>
      <div className="lg:w-[60%] mx-auto mt-10 mb-20 p-8 rounded-lg shadow-lg glassy-bg">
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-lg font-medium">Product Owner Name</label>
              <input
                type="text"
                name="owner_name"
                value={user?.displayName}
                readOnly
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Product Owner Image</label>
              <input
                type="url"
                name="owner_image"
                value={user?.photoURL}
                readOnly
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-lg font-medium mt-5">Product Owner Email</label>
              <input
                type="email"
                name="owner_email"
                value={user?.email}
                readOnly
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mt-5">Product Name</label>
              <input
                type="text"
                name="product_name"
                defaultValue={product?.product_name}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-lg font-medium mt-5">Product Image</label>
              <input
                type="url"
                name="product_image"
                  defaultValue={product?.product_image}
              
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mt-5">Website Link</label>
              <input
                type="url"
                name="web_link"
               defaultValue={product?.web_link}
          
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mt-5">Product Description</label>
            <textarea
              name="description"
            defaultValue={product?.description}
      
              className="input-field"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-lg font-medium mt-5">Product Tags</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              delimiters={delimiters}
              placeholder="Add a tag and press Enter"
              classNames={{
                tags: "tags-container",
                tagInput: "tag-input-container",
                tagInputField: "input-field",
                tag: "tag-item",
                remove: "tag-remove",
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn-Style btn-grad"
          >
            Update
          </motion.button>
        </form>
      </div>
    </div>
  );
}
