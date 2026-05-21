import { HeroSection, HowItWorksSection, BeneficiariesSection, CallToActionSection } from '@/components/home/sections'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="space-y-16 py-8 md:py-12">
        <HeroSection />
        <HowItWorksSection />
        <BeneficiariesSection />
        <CallToActionSection />
      </div>
    </div>
  )
}
