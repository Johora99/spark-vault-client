// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import Img1 from '../../assets/3b97c78b-f848-415e-8982-ae3b008c7081.avif'
import Img2 from '../../assets/71819a7f-095c-4668-b288-1b433984bf35.avif'
import Img3 from '../../assets/86989b6b-2c5d-4c97-b619-d9ad557cbb64.avif'
import Img4 from '../../assets/8f2cf337-4497-4578-93e7-daa21d8d09d8.avif'
import Img5 from '../../assets/ce937f98-67a8-4578-85a5-f59614191905.avif'
import Img6 from '../../assets/efde8364-5187-466f-a000-1b77f6fe80d6.avif'
import Img7 from '../../assets/ff3e2acf-884a-4f4c-a383-6edfe3de0d88.avif'
import SliderContent from './SliderContent';
export default function Slider() {
  return (
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
    <SwiperSlide>

</SwiperSlide>


        <SwiperSlide>
          <SliderContent Img={Img1} title={' Notion Software Developer OS'} text={' Elevate your productivity with cutting-edge tools designed for developers.'}></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img2} title={'Flatfile'} text={'Extensible API + event based platform for data-file import for developers'}></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img3} title={'Wordware (YC S24)'} text={'AI-powered tools tailored for businesses and creators. Automate writing, editing.'} ></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img4} title={'MobileAction'} text={'Empowers app developers and marketers with cutting-edge tools for app store optimization (ASO).'}></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img5} title={'Codin Game'} text={'Learn and improve your coding skills, while playing games.'}></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img6} title={'SaaS AI Tools'} text={'Evolutionize businesses by providing powerful, cloud-based AI solutions for automation, data analysis, customer support, and decision-making.'}></SliderContent>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContent Img={Img7} title={'Notion'} text={'All-in-one productivity platform designed to streamline your workflow.'}></SliderContent>
        </SwiperSlide> 
      
      </Swiper>
  )
}
