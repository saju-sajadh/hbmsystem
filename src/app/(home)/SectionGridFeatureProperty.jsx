import React from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";
import HeaderFilter from "@/components/HeaderFilter";
import mongoose from "mongoose";
import Place from '@/dbmodels/listing'

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
//


const SectionGridFeatureProperty = async ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
}) => {
  const renderCard = (stay, index) => {
    return <PropertyCardH key={index} className="h-full" data={stay} />;
  };
  await mongoose.connect(process.env.MONGO_URL)
  const places = await Place.find({})
  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {places.map(renderCard)}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
