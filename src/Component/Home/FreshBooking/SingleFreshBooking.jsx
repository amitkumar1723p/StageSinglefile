import React, { useEffect ,useState} from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getviewOneProjectAction } from '../../../Action/freshProjectAction'
export default function SingleFreshBooking() {
  const dispatch =useDispatch()
let id='67ebd7bb60d7d81302754d0c'

  useEffect(()=>{
   dispatch(getviewOneProjectAction(id))
  },[])

  const { data:getFreshProjectdata  } = useSelector((state) => {
    return state.getFreshProject;
  });

  const[projectLogoImage,setprojectLogoImage]=useState()
  const[bannerImage,setbannerImage]=useState()
  const[projectBasicDetail,setProjectBasicDetail]=useState()
  const[projectPriceSize,setProjectPriceSize]=useState()
  const[hightlightImage,sethightlightImage]=useState()
  const[hightlightContent,sethightlightContent]=useState()
  const[projectGallery,setprojectGallery]=useState()
  const[projectAmenities,setprojectAmenities]=useState()
  const[projectSitemap,setprojectSitemap]=useState()
  const[projectAboutBuilder,setprojectAboutBuilder]=useState()
  const[projectAboutBuilderImage,setprojectAboutBuilderImage]=useState()
  const[projectFloorplan,setprojectFloorplan]=useState()
  const[projectLocation,setprojectLocation]=useState()
  const[locationImage,setlocationImage]=useState()
  
  useEffect(()=>{
 setprojectLogoImage(getFreshProjectdata?.projectData?.projectLogoImage)
 setbannerImage(getFreshProjectdata?.projectData?.bannerImage)
 setProjectBasicDetail(getFreshProjectdata?.projectData?.projectBasicDetail)
 setProjectPriceSize(getFreshProjectdata?.projectData?.projectPriceSize)
 sethightlightImage(getFreshProjectdata?.projectData?.projectHightlight?.hightlightImage)
 sethightlightContent(getFreshProjectdata?.projectData?.projectHightlight?.hightlightContent)
 setprojectGallery(getFreshProjectdata?.projectData?.projectGallery)
 setprojectAmenities(getFreshProjectdata?.projectData?.projectAmenities)
 setprojectSitemap(getFreshProjectdata?.projectData?.projectSitemap)
 setprojectAboutBuilder(getFreshProjectdata?.projectData?.projectAboutBuilder)
 setprojectAboutBuilderImage(getFreshProjectdata?.projectData?.projectAboutBuilder?.projectAboutBuilderImage)
 setprojectFloorplan(getFreshProjectdata?.projectData?.projectFloorplan)
 setprojectLocation(getFreshProjectdata?.projectData?.projectLocation)
 setlocationImage(getFreshProjectdata?.projectData?.projectLocation?.locationImage)

  }     ,[getFreshProjectdata])

   const [visibleLocation,setVisibleLocation]=useState()
   const [locationStatus,setLocationStatus]=useState()
   const handleCurrentLocation=(data)=>{
    setLocationStatus(data)
  }
   useEffect(() => {
     // This will run whenever locationContent or selectedCategory changes
     if (projectLocation && projectLocation[locationStatus]) {
      setVisibleLocation([projectLocation[locationStatus]])
      // projectLocation[locationStatus].map((item) => {
      //    setVisibleLocation(item)
      //   // console.log(item)
      //  });
     } else {
       console.log("No valid category or data.");
     }
   }, [projectLocation, locationStatus]); 


  return (
    <div>
      <SingleFreshBookingHero   projectLogoContent= {projectLogoImage}  projectBannerImage = {bannerImage}
      project={projectBasicDetail}
      projectPrice={projectPriceSize} />
      <SingleFreshBookingAboutProject projectHightlight={hightlightImage} projectContent={hightlightContent}   project={projectBasicDetail}/>
      <SingleFreshBookingHighlights />
      <SingleFreshBookingSizeAndPrice   projectPrice={projectPriceSize} project={projectBasicDetail}/>
      <SingleFreshBookingGallery  project={projectBasicDetail} galleryContent={projectGallery}/>
      <SingleFreshBookingAmenities project={projectBasicDetail} amenitiesContent={projectAmenities}/>
      <SingleFreshBookingFloorPlan project={projectBasicDetail} FloorPlanContent={projectFloorplan}/>
      {/* <SingleFreshBookingLocationMap  project={projectBasicDetail} siteMapContent={projectSitemap} builderContent={projectAboutBuilder} builderImage={projectAboutBuilderImage} loctionContent={projectLocation}/>  */}
      {/* <PostDetails/> */}
      {/* <SingleFreshBookingFAQs/> */}
      <SingleFreshBookingLocationMap  sendDataToChild={handleCurrentLocation}  projectLocation={visibleLocation} project={projectBasicDetail} siteMapContent={projectSitemap} builderContent={projectAboutBuilder} builderImage={projectAboutBuilderImage} locationImageContent= {locationImage} />
      <SingleFreshFooter project={projectBasicDetail}    />
    </div>
  )
}
