import FeatureProduct from "@/Components/FeatureProduct/FeatureProduct";
import Hero from "../Components/Hero/Hero";
import TrendingProduct from "@/Components/TrendingProduct/TrendingProduct";


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
    </div>
  )
}
