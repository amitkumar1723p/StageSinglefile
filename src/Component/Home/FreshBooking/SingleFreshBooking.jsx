import React from 'react'
// import "./SingleFreshBooking.css";

import SingleFreshBookingHero from './SingleFreshBookingHero'
import SingleFreshBookingAboutProject from './SingleFreshBookingAboutProject'
import SingleFreshBookingHighlights from './SingleFreshBookingHighlights'
import SingleFreshBookingSizeAndPrice from './SingleFreshBookingSizeAndPrice'
import SingleFreshBookingGallery from './SingleFreshBookingGallery'
import SingleFreshBookingAmenities from './SingleFreshBookingAmenities'
import SingleFreshBookingFloorPlan from './SingleFreshBookingFloorPlan'
import SingleFreshBookingLocationMap from './SingleFreshBookingLocationMap'
import "bootstrap/dist/css/bootstrap.min.css";
import SingleFreshBookingFAQs from './SingleFreshBookingFAQs'
import PostDetails from './PostDetails'
import SingleFreshFooter from './SingleFreshFooter'
export default function SingleFreshBooking() {

  return (
    <div>
      <SingleFreshBookingHero/>
      <SingleFreshBookingAboutProject/>
      <SingleFreshBookingHighlights/>
      <SingleFreshBookingSizeAndPrice/>
      <SingleFreshBookingGallery/>
      <SingleFreshBookingAmenities/>
      <SingleFreshBookingFloorPlan/>
      <SingleFreshBookingLocationMap/>
      {/* <PostDetails/> */}
      {/* <SingleFreshBookingFAQs/> */}
      <SingleFreshFooter/>
    </div>
  )
}
