import React from 'react'
import { Link } from "react-router-dom";
import "./BlogArticles.css";
export default function BlogArticles() {
    const formatTitleForURL = (title) => {
        return title.split(" ").join("-").toLowerCase(); 
    };
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      };
    const Blogs=[
        {
            id:1,
            date:"22 Jan 2025",
            title:"BUYING TIPS",
            heading:"A Guide: How to Buy a House in Gurgaon?",
            content:"A step-by-step guide to purchasing property in one of India's top real estate markets.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/buying-tips.svg",
        },
        {
            id:2,
            date:"12 Feb 2025",
            title:"INVESTMENT INSIGHTS",
            heading:"Is 2025 the Right Year to Invest in Real Estate?",
            content:"Experts weigh in on whether this year is ideal for real estate investment. Experts weigh in on whether this year is ideal for real estate investment.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/investment.svg",
        },
        {
            id:3,
            date:"15 Jan 2025",
            title:"HOME DECORS",
            heading:"Top Home Décor Trends for 2025",
            content:"Discover the latest styles and interior design ideas for your home. Discover the latest styles and interior design ideas for your home.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/home-decors.svg",
        },
        {
            id:4,
            date:"19 Dec 2024",
            title:"LIFESTYLE & LIVINGS",
            heading:"Urban vs. Suburban Living",
            content:"Comparing the benefits of living in cities versus suburbs in India. Comparing the benefits of living in cities versus suburbs in India.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/lifestyle.svg",
        },
        {
            id:5,
            date:"24 Feb 2025",
            title:"ARCHITECTURE & DESIGN",
            heading:"Modern Architecture Trends for 2025",
            content:"Key architectural styles and trends shaping real estate in India.Key architectural styles and trends shaping real estate in India.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/architecture.svg",
        },
        {
            id:6,
            date:"15 sept 2024",
            title:"FINANCIAL ADVICE",
            heading:"Understanding Home Loans",
            content:"A guide to securing the best home loan with lower interest rates. Discover the latest styles and interior design ideas for your home.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/financial.svg",
        },
        {
            id:7,
            date:"14 Aug 2024",
            title:"LUXURY HOMES",
            heading:"Ultra Luxury Apartments in Gurgaon",
            content:"Exploring the premium real estate market in Gurgaon.Exploring the premium real estate market in Gurgaon.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/luxuary-homes.png",
        },
        {
            id:8,
            date:"14 Aug 2024",
            title:"MARKET TRENDS",
            heading:"Real Estate Market Predictions for 2025",
            content:"What experts forecast for the real estate industry in the coming years.What experts forecast for the real estate industry in the coming years.",
            imgUrl:"https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/luxuary-homes.png",
        },

    ]

  return (
    <div className='blogs-main-container'>
        <div className='blogs-heading'>
            <h3>Trending Blogs</h3>
        </div>
        
        <div className='blog-container'>
            <div className='blog-filter'></div>

            <div className='blog-card-container'>
            {Blogs.map(blog =>(
                <div className={`blog-card blog-card-${blog.id}`}>
                    <div className='blog-card-image-container'><img src={blog.imgUrl} alt="blog-image" /></div>
                    <div className='blog-card-data'>
                        <div className='blog-card-title-date'>
                            <div className='blog-card-title'><p>{blog.title}</p></div>
                            <div className='blog-card-date'><p>{blog.date}</p></div>
                        </div>
                        <div className='blog-card-heading'><h2>{blog.heading}</h2></div>
                        <div className='blog-card-description'> <p>{truncateText(blog.content, 69)}</p></div>
                        <div className='blog-card-button'><Link to={`/blog-page/${formatTitleForURL(blog.title)}`}><button>Read More <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/blog-readmore-logo.svg" ></img> </button></Link> </div>
                    </div>
                
                </div>
        ))
}
            </div>
        </div>

    </div>















   
   
    
  )
}
