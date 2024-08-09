import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import mongoose from "mongoose";
import Place from '@/dbmodels/listing'

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);


const SectionGridFeaturePlaces = async ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {
  const renderCard = (stay) => {
   
    return <StayCard2 key={stay._id} data={stay} />;
  };
  await mongoose.connect(process.env.MONGO_URL)
  const places = await Place.find({})
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {places.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
