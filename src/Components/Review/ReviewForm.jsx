
import { motion } from "motion/react";
import useAuth from "@/Hooks/useAuth";


export default function ReviewForm() {
  const { user } = useAuth(); // Get user data from context



  return (
    <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Post a Review</h2>
      <form className="space-y-6">
        {/* Reviewer Name */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
          
            readOnly
            className="input-field"
          />
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium">Image</label>
          <input
            type="text"
          
            readOnly
            className="input-field"
          />
        </div>
      </div>

        {/* Review Description */}
        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
          
            
            placeholder="Write your review here..."
            required
            className="input-field"
            rows="4"
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-lg font-medium">Rating</label>
          <select
            required
            className="input-field"
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 ? "s" : ""}
              </option>
            ))}
          </select>
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
