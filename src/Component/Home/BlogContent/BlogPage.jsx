import React from 'react'
import BlogInsights from './Components/BlogInsights';
import BlogSubscribe from './Components/BlogSubscribe';
import BlogArticles from './Components/BlogArticles';

export default function BlogPage() {
  return (
    <div>
      <BlogInsights/>
      <BlogArticles/>
      <BlogSubscribe/>
    </div>
  )
}
