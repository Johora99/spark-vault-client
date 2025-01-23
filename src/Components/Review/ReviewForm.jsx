
import { motion } from "motion/react";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { toast } from "react-toastify";


export default function ReviewForm({_id}) {
  const { user } = useAuth(); // Get user data from context
  const axiosSecure = useAxiosSecure();
const handleReview = async (e)=>{
  e.preventDefault();
  const name = user?.displayName;
  const image = user?.photoURL;
  const email = user?.email;
  const description = e.target.description.value;
  const rating = e.target.rating.value;
  const productId = _id;
  const reviewInfo = {
    name,image,email,description,rating,productId
  }

 try {
  const { data } = await axiosSecure.post('/review', reviewInfo);
  console.log(data)
  if (data.result?.insertedId) {
    toast.success('Thank you for your review!');
    e.target.reset();
  }
} catch (error) {
  if (error.response) {
    toast.error(error.response.data.message);
    e.target.reset();
  } else {
    toast.error('Something went wrong. Please try again later.');
  }
}

}
 

  return (
    <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Post a Review</h2>
      <form onSubmit={handleReview} className="space-y-6">
        {/* Reviewer Name */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
             value={user?.displayName}
            readOnly
            className="input-field"
          />
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium">Image</label>
          <input
            type="url"
            value={user?.photoURL}
            readOnly
            className="input-field"
          />
        </div>
      </div>

        {/* Review Description */}
        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
          name="description"
            placeholder="Write your review here..."
            required
            className="input-field"
            rows="4"
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-lg font-medium">Rating</label>
         <input type="number" name="rating" id="" min={1} max={5} className="input-field"/>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn-Style btn-grad"
        >
          Submit Review
        </motion.button>
      </form>
    </div>
  );
}
