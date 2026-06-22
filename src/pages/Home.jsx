
import AIChatBot from '@/components/AIChatBot/AIChatBot'
import BannerSlider from '@/components/BannerSlider'
import AiChat from '@/components/Home/AiChat'
import Astrologers from '@/components/Home/Astrologers'
import Banner from '@/components/Home/Banner'
import BannerCopy from '@/components/Home/BannerCopy'
import Counter from '@/components/Home/Counter'
import Faq from '@/components/Home/Faq'
import FeaturedFaqsStatic from '@/components/Home/FeaturedFaqsStatic'

import Services from '@/components/Home/Services'
import Testmonial from '@/components/Home/Testmonial'
import ZodiacPredictions from '@/components/Home/ZodiacPredictions'
import TestmonialCard from '@/components/TestmonialCard'
import { AirVent } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <>

      <Banner />
      <BannerCopy />
      <BannerSlider />
      {/* <AiChat /> */}
      <Astrologers />
      <ZodiacPredictions />
      <Services />
      <Counter />
      <Testmonial />
      <FeaturedFaqsStatic />
      <Faq />
      <BannerSlider />
    </>
  )
}

export default Home








