import { FaThumbsUp } from "react-icons/fa";
import truncateText from "@/api/utilities/textShort";
import { BorderBeam } from "../ui/border-beam";
import { Meteors } from "../ui/Meteor";
import { Link } from "react-router";

export default function FeatureCard({ product }) {
  const {_id, name, image, description, tags, siteLink, votes, timestamp, productAddedBy, reportCount } = product;

  return (
    <div
      className="card-bg glassy-bg"
    >
      <div className="sm:flex sm:justify-between sm:items-center sm:gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm font-medium text-gray-300">By {productAddedBy}</p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt={name}
            src={image}
            className="h-16 w-16 rounded-full border-2 border-purple-500 object-cover shadow-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-300 text-sm">{truncateText(description, 100)}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-700 px-3 py-1 text-xs text-purple-300"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white hover:bg-purple-500 hover:text-white transition"
          >
            <FaThumbsUp className="text-purple-300" />
            {votes}
          </button>
          <Link to={`/product/${_id}`}>
          <button className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white hover:bg-purple-500 hover:text-white transition">Details</button>
          </Link>
        </div>

        {/* Timestamp */}
        <div>
          <p className="text-sm text-gray-300">
            {new Date(timestamp).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <BorderBeam colorFrom="rgb(97, 67, 133)" colorTo="rgb(81, 99, 149)"/>
        <Meteors number={30} className="custom-meteor-class" />
    </div>
  );
}
