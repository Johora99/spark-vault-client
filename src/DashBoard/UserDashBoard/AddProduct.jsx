import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";



export default function AddProduct() {
const {register,handleSubmit,watch,formState: { errors },reset,setError,clearErrors} = useForm();
const navigate = useNavigate();
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();
      const [tags, setTags] = useState([]);

  const KeyCodes = { comma: 188, enter: 13 }; // Key codes for delimiters
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  // Handle tag addition
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
      // Clear error if tags exist
  if (tags.length + 1 > 0) {
    clearErrors("tags");
  }
  };

  // Handle tag deletion
const handleDelete = (index) => {
  const newTags = tags.filter((_, i) => i !== index);
  setTags(newTags);

  // Set error if no tags left
  if (newTags.length === 0) {
    setError("tags", { type: "manual", message: "At least one tag is required" });
  }
};
  const onSubmit = async (data) => {

  const productInfo = {
    ...data,
    tags: tags.map((tag) => tag.text),  
    timestamp:new Date(),
    votes : 0,
    reportCount: 0,
  }
  try {
  const res = await axiosSecure.post('/product', productInfo);


  if (res.data?.insertedId) {
    toast.success('Product has been submitted and is under review!');
    navigate('/dashBoard/myAddedProduct');
    reset();
  } else if (res.data?.message) {
    toast.warning(res.data?.message);
    navigate('/dashBoard/myAddedProduct');
  } else {
    toast.error('Unexpected server response.');
  }
} catch (error) {
  if (error.response?.data?.message) {
    // Display custom error message from server
    toast.error(error.response.data.message);
  } else {
    // Generic error message
    toast.error('Failed to submit the product. Please try again later.');
  }
}

  }

  return (
    <div className="mainContainer mt-20">
           <motion.h2
                animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-semibold mb-5 text-center"
              >
                Add Your Product
              </motion.h2>
        <div className="lg:w-[60%] mx-auto mt-10 mb-20 p-8 rounded-lg shadow-lg glassy-bg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
        {/* Reviewer Name */}
      

        {/* Review Description */}
      
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium">Product Owner Name</label>
          <input
            type="text"
             {...register("owner_name",{ required: true})}
             value={user?.displayName}
            readOnly
            className="input-field"
          />

        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium">Product Owner Image</label>
          <input
            type="url"
            {...register("owner_image",{ required: true})}
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
            {...register("owner_email",{ required: true})}
            readOnly
             value={user?.email}
            className="input-field"
          />
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium mt-5">Product Name</label>
          <input
            type="text"
             {...register("product_name",{ required: true})}
            className="input-field"
          />
          {errors.product_name && errors.product_name.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Enter Your Product Name</span>}
        </div>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium mt-5">Product Image</label>
          <input
            type="url"
         {...register("product_image",{ required: true})}
            className="input-field"
          />
          {errors.product_image && errors.product_image.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Enter Your Product Image</span>}
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium mt-5">Website link</label>
          <input
            type="url"
              {...register("web_link",{ required: true})}
            className="input-field"
          />
          {errors.web_link && errors.web_link.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Enter Your Product Web Link </span>}
        </div>
      </div>
        <div >

      <div>
          <label className="block text-lg font-medium mt-5">Product Description</label>
          <textarea
          name="description"
            placeholder="Write your review here..."
             {...register("description",{ required: true})}
            className="input-field"
            rows="4"
          ></textarea>
          {errors.description && errors.description.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Give Product Description</span>}
        </div>



   <div className="app">
      <label className="block text-lg font-medium mt-5">Product Tags</label>

      {/* ReactTags Component */}
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder="Add a tag and press Enter"
      
        classNames={{
    tags: "tags-container", // Container for all tags
    tagInput: "tag-input-container", // Input container
    tagInputField: "input-field", // Applying your custom Tailwind class here
    tag: "tag-item", // Styling for individual tag items
    remove: "tag-remove", // Styling for remove button
  }}
      />
      {errors.tags && <span className="text-red-500 mt-1 inline-block">{errors.tags.message}</span>}
    </div>
        </div>
        {/* Submit Button */}
        <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn-Style btn-grad"
          >
            Submit
          </motion.button>
      </form>
    </div>
    </div>
  )
}
