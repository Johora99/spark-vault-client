import FeatureProduct from "@/Components/FeatureProduct/FeatureProduct";
import Hero from "../Components/Hero/Hero";
import TrendingProduct from "@/Components/TrendingProduct/TrendingProduct";
import CouponAdvertisment from "@/Components/CouponAdvertis/CouponAdvertisment";


export default function HomePage() {
  return (
    <div>
      <section>
        <Hero></Hero>
      </section>
      <section>
        <FeatureProduct></FeatureProduct>
      </section>
      <section>
        <TrendingProduct></TrendingProduct>
      </section>
      <section>
        <CouponAdvertisment></CouponAdvertisment>
      </section>
    </div>
  )
}
