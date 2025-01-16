import FeatureProduct from "@/Components/FeatureProduct/FeatureProduct";
import Hero from "../Components/Hero/Hero";


export default function HomePage() {
  return (
    <div>
      <section>
        <Hero></Hero>
      </section>
      <section>
        <FeatureProduct></FeatureProduct>
      </section>
    </div>
  )
}
