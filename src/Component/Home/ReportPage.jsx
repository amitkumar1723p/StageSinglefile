import React from 'react'
import VoiceMatters from './VoiceMatters'
import HelpUser from './HelpUser'
import ReportForm from './ReportForm'
import { Helmet } from "react-helmet";
export default function ReportPage() {
  return (
   <>
<Helmet>
<title>Gurgaon Real Estate Market Report</title>
<meta name="description" content="Get the latest insights and trends on Gurgaon’s real estate market for informed buying, selling, and renting decisions."></meta>
<link rel="canonical" href="https://propertydekho247.com/Report/" />
</Helmet>
   <VoiceMatters/>
   <HelpUser/>
   <ReportForm/>
   </>
  )
}
