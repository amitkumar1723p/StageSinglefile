import React from 'react'
import "./HelpUser.css"
export default function HelpUser() {
  return (
    <div className='help-user-main-container'>
    <div className='help-user-container'>
      <div className='help-user-headings'>
        <h2> How it  <span>Help</span> Users</h2>
        <p>Our reporting and feedback system ensures a seamless and reliable real estate experience. By addressing concerns, improving accuracy, and refining services, we strive to make property transactions smoother and more trustworthy for everyone.</p>
      </div>
      <div className='help-user-cards'>

        <div className='help-user-cards-one'>
           <div className='user-cards-counter'>
            <div className='user-card-count'>1</div>
           </div>
            <div>
              <h3>Enhancing User Experience</h3>
            </div>
           <div>
              <p>Provides Users with a structured way to report platform issues, incorrect property details, or service concerns.</p>
              </div> 
           </div>

           <div className='help-user-cards-one'>
           <div className='user-cards-counter'>
            <div className='user-card-count'>2</div>
           </div>
            <div>
              <h3>Improving Services</h3>
            </div>
           <div>
              <p>Collects feedback on buyer, seller, tenant, and channel partner experience to refine the platform.</p>
              </div> 
           </div>

           <div className='help-user-cards-one'>
           <div className='user-cards-counter'>
            <div className='user-card-count'>3</div>
           </div>
            <div>
              <h3>Ensuring Accuracy</h3>
            </div>
           <div>
              <p>Allows users to flag inaccurate listings, pricing errors, or misleading property information for correction.</p>
              </div> 
           </div>

           <div className='help-user-cards-one'>
           <div className='user-cards-counter'>
            <div className='user-card-count'>4</div>
           </div>
            <div>
              <h3>Building Trust</h3>
            </div>
           <div>
              <p>Encourages transparency by allowing users to report fraudulent listings, unresponsive agents, or unfair pratices</p>
              </div> 
           </div>
      </div>
    </div>
    </div>
  )
}
