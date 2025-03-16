import Image from "next/image";
import HealthcareSection from "@/public/components/HealthcareSection";
import ServiceGrid from "@/public/components/service/ServiceGrid";
import Header from "@/public/components/header/Header";
import ExperienceGrid from "@/public/components/experiences/experienceGrid";
import Footer from "@/public/components/footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HealthcareSection />
      <ServiceGrid />
      <ExperienceGrid />
      <Footer />
    </div>
  );
}
