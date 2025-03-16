"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
import Service from "./Service";

const ServiceGrid = () => {
  const services = [
    {
      title: "Schedule Consultation",
      description: "Connect Within 60 Seconds.",
      bgColor: "bg-emerald-200",
      imageUrl: "./images/Consultated.jpg",
      imageAlt: "Social media illustration",
      goto:"/consult"
    },
    {
      title: "Experience the Virtual World",
      description: "Get insights to the healthy Ayurvedic Lifestyle.",
      bgColor: "bg-amber-300",
      imageUrl: "./images/3DLandScape.jpg",
      imageAlt: "Empty inbox illustration",
      goto:"/Xverse"
    },
    {
      title: "Authentic Medication",
      description: "Essentials At Your Doorstep with 100% purity.",
      bgColor: "bg-stone-300",
      imageUrl: "./images/store.jpg",
      imageAlt: "Business startup illustration",
      goto:"/shop"
    },
    {
      title: "AI Powered Diagnosis",
      description:
        "Evaluate your wellbeing and health status with AI and get personalised assistance.",
      bgColor: "bg-blue-300",
      imageUrl: "./images/AIDiagnosis.jpg",
      imageAlt: "Business trip illustration",
      goto:"/aiscan"
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Service />
      <section className="flex gap-5 items-start p-5 mx-auto my-0 max-w-[1720px] max-md:flex-wrap max-md:justify-center max-md:max-w-[991px] max-sm:flex-col max-sm:p-2.5 max-sm:max-w-screen-sm">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            bgColor={service.bgColor}
            imageUrl={service.imageUrl}
            imageAlt={service.imageAlt}
            goto={service.goto}
          />
        ))}
      </section>
    </>
  );
};

export default ServiceGrid;
