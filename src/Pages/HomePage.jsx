import FeatureProduct from "@/Components/FeatureProduct/FeatureProduct";
import Hero from "../Components/Hero/Hero";
import TrendingProduct from "@/Components/TrendingProduct/TrendingProduct";
import CouponAdvertisment from "@/Components/CouponAdvertis/CouponAdvertisment";
import { Helmet } from "react-helmet";


export default function HomePage() {
  return (
    <>
   <Helmet>
        <title>Spark Vault || Home Page</title>
    </Helmet>
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
    </>
  )
}
