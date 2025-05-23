import React, { useEffect ,useState} from 'react'
import { useParams,useLocation } from 'react-router-dom';
// import "./SingleFreshBooking.css";
import "./singlefreshbookingtest.css"
import "./singlefreshfooter.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleFreshBookingHero from './SingleFreshBookingHero'
import SingleFreshBookingAboutProject from './SingleFreshBookingAboutProject'
import SingleFreshBookingHighlights from './SingleFreshBookingHighlights'
import SingleFreshBookingSizeAndPrice from './SingleFreshBookingSizeAndPrice'
import SingleFreshBookingGallery from './SingleFreshBookingGallery'
import SingleFreshBookingAmenities from './SingleFreshBookingAmenities'
import SingleFreshBookingNewAmenities from './SingleFreshBookingNewAmenities';
import SingleFreshBookingFloorPlan from './SingleFreshBookingFloorPlan'
import SingleFreshBookingLocationMap from './SingleFreshBookingLocationMap'
import SingleFreshBookingFAQs from './SingleFreshBookingFAQs'
import SingleFreshBookingBuilder from './SingleFreshBookingBuilder';

import SingleFreshFooter from './SingleFreshFooter'
import { useDispatch, useSelector } from 'react-redux'
import { getviewOneProjectAction } from '../../../../Action/freshProjectAction'
import SingleFreshBookingViewMore from './SingleFreshBookingViewMore';
export default function SingleFreshBooking() {
  const dispatch =useDispatch()

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
  const[aboutProjectImage,setaboutProjectImage]=useState()
  const[hightlightImage,sethightlightImage]=useState()
  const[hightlightContent,sethightlightContent]=useState(getFreshProjectdata?.projectData?.projectHightlight?.hightlightContent)
  const[aboutProject,setaboutProject]=useState(getFreshProjectdata?.projectData?.aboutProject)
  const[projectGallery,setprojectGallery]=useState()
  const[projectAmenities,setprojectAmenities]=useState()
  const[projectSitemap,setprojectSitemap]=useState()
  const[projectAboutBuilder,setprojectAboutBuilder]=useState()
  const[projectAboutBuilderImage,setprojectAboutBuilderImage]=useState()
  const[projectFloorplan,setprojectFloorplan]=useState()
  const[projectLocation,setprojectLocation]=useState()
  const[locationImage,setLocationImage] =useState()
  
  useEffect(()=>{
 setprojectLogoImage(getFreshProjectdata?.projectData?.projectLogoImage)
 setbannerImage(getFreshProjectdata?.projectData?.bannerImage)
 setProjectBasicDetail(getFreshProjectdata?.projectData?.projectBasicDetail)
 setProjectPriceSize(getFreshProjectdata?.projectData?.projectPriceSize)
 setaboutProjectImage(getFreshProjectdata?.projectData?.aboutProject?.aboutProjectImage)
 sethightlightImage(getFreshProjectdata?.projectData?.projectHightlight?.hightlightImage)
 setaboutProject(getFreshProjectdata?.projectData?.aboutProject)
 sethightlightContent(getFreshProjectdata?.projectData?.projectHightlight?.hightlightContent)
 setprojectGallery(getFreshProjectdata?.projectData?.projectGallery)
 setprojectAmenities(getFreshProjectdata?.projectData?.projectAmenities)
 setprojectSitemap(getFreshProjectdata?.projectData?.projectSitemap)
 setprojectAboutBuilder(getFreshProjectdata?.projectData?.projectAboutBuilder)
 setprojectAboutBuilderImage(getFreshProjectdata?.projectData?.projectAboutBuilder?.projectAboutBuilderImage)
 setprojectFloorplan(getFreshProjectdata?.projectData?.projectFloorplan)
 setprojectLocation(getFreshProjectdata?.projectData?.projectLocation)
 setLocationImage(getFreshProjectdata?.projectData?.projectLocation?.locationImage)

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


     const { id } = useParams();

 
  return (
    <div className='overflow-hidden'>
      <SingleFreshBookingHero   projectLogoContent= {projectLogoImage}  projectBannerImage = {bannerImage}
      project={projectBasicDetail}
      projectPrice={projectPriceSize} />
      <SingleFreshBookingAboutProject projectHightlight={hightlightImage}  aboutImage={aboutProjectImage} aboutContent={aboutProject}  highlightContent={hightlightContent}   project={projectBasicDetail}/>
      <SingleFreshBookingHighlights />
      <SingleFreshBookingSizeAndPrice   projectPrice={projectPriceSize} project={projectBasicDetail}/>
      <SingleFreshBookingGallery  project={projectBasicDetail} galleryContent={projectGallery}/>
      {/* <SingleFreshBookingAmenities project={projectBasicDetail} amenitiesContent={projectAmenities}/> */}
      <SingleFreshBookingNewAmenities project={projectBasicDetail} amenitiesContent={projectAmenities}/>
      <SingleFreshBookingFloorPlan project={projectBasicDetail} FloorPlanContent={projectFloorplan}/>
      {/* <SingleFreshBookingLocationMap  project={projectBasicDetail} siteMapContent={projectSitemap} builderContent={projectAboutBuilder} builderImage={projectAboutBuilderImage} loctionContent={projectLocation}/>  */}
      {/* <PostDetails/> */}
      {/* <SingleFreshBookingFAQs/> */}
      <SingleFreshBookingLocationMap  sendDataToChild={handleCurrentLocation}  projectLocation={visibleLocation} project={projectBasicDetail} siteMapContent={projectSitemap} builderContent={projectAboutBuilder} builderImage={projectAboutBuilderImage} LocationImageContent={locationImage}  />
      <SingleFreshBookingBuilder   project={projectBasicDetail}   builderContent={projectAboutBuilder}  />
      <SingleFreshBookingViewMore builderContent={projectAboutBuilder}    project={projectBasicDetail} />
      
      <SingleFreshFooter   projectLogoContent= {projectLogoImage} project={projectBasicDetail}/>
      
    </div>
  )
}
