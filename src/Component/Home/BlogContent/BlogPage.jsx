import React from 'react'
import BlogInsights from './Components/BlogInsights';
import BlogSubscribe from './Components/BlogSubscribe';
import BlogArticles from './Components/BlogArticles';
import { Helmet } from "react-helmet";
export default function BlogPage() {
  return (
    <div>
      <Helmet>
        <title>Real Estate Insights: Your Guide to Gurgaon Buying, Selling & Renting</title>
        <meta name="description" content="Stay updated with expert tips, trends, and insights on buying, selling, and renting properties in Gurgaon."></meta>
        <link rel="canonical" href="https://propertydekho247.com/blog-page/" />
      </Helmet>
      <BlogInsights />
      <BlogArticles />
      <BlogSubscribe />
    </div>
  )
}
