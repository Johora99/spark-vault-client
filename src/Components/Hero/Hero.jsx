
import Slider from "../Slider/Slider";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

export default function Hero() {
  return (
    <div className="relative">
      <div className="mainContainer relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-20">
          {/* Text Section */}
          <div>
            <TextGenerateEffect
              words={"Discover, Share, and Illuminate Tech Innovations"}
            ></TextGenerateEffect>
            <p className="text-white mt-10 font-light">
              Discover, share, and celebrate the latest tech products and ideas.
              SparkVault is a thriving community where innovators and
              enthusiasts connect to explore groundbreaking creations, spark
              collaborations, and inspire change.
            </p>
            <button className="btn-grad py-3 px-10 mt-10 shadow-custom">
              Explore More
            </button>
          </div>

          {/* Slider Section */}
          <div>
            <Slider></Slider>
          </div>
        </div>
      
      </div>
    </div>
  );
}
