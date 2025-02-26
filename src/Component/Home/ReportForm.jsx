import React, {useState} from 'react'
import "./ReportForm.css";
export default function ReportForm() {
   
        const [feedback, setFeedback] = useState({
          type: '',
          description: '',
          file: null
        });
      
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Feedback submitted:', feedback);
    
        };
      
  return (
    <div className='reporting-container'> 
      <div className='reporting-headings'>
      <h2>How Reporting <span>Works</span></h2>
      <p>We Value Your Feedback-Here's How We handle and Resolve Your Reports</p>
      </div>
      <div className='reporting-main-content'>
        <div className='reporting-image-container'>
            <div className='reporting-submit-image-container'>
                    <img src='/img/submit-your-report.svg' alt='submit-report'/>
                 <img src='/img/reporting-right-arrow.svg' alt='arrow'/>
                
               
               
            </div>
            <div className='reporting-review-image-container'>
            <img src="/img/reporting-left-arrow.svg"
                alt="arrow" 
                />
                <img src="/img/review-verification.svg" 
                alt="review-verification" 
                />
            </div>
            <div className='reporting-update-image-container'>
                <img src="/img/resolution-update.svg" alt="resolution-update" />
                <img src="/img/spiral.svg" alt="spiral" />
            </div>
        </div>


        <div className='reporting-form-container'>
        <div className='reporting-form'>
        <label className="reporting-title">Choose your Feedback</label>
      
      <div className="reporting-form-group">
        <select 
          className="reporting-select"
          value={feedback.type}
          onChange={(e) => setFeedback({...feedback, type: e.target.value})}
        >
          <option value="" disabled selected>Type of Feedback</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Service Issue">Service Issue</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="reporting-form-group">
        <label className="reporting-label">Describe</label>
        <input 
          type="text"
          className="reporting-input"
          placeholder="Describe your concern"
          value={feedback.description}
          onChange={(e) => setFeedback({...feedback, description: e.target.value})}
        />
      </div>
      
      <div className="reporting-form-group">
        <label className="reporting-label">Upload File</label>
        <div className="reporting-file-container">
          <input 
            type="text"
            className="reporting-file-text"
            placeholder="Attach File"
            readOnly
            value={feedback.file ? feedback.file.name : ''}
          />
          <label className="reporting-file-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
            </svg>
            <input 
              type="file"
              className="reporting-hidden-file"
              onChange={(e) => setFeedback({...feedback, file: e.target.files[0]})}
            />
          </label>
        </div>
      </div>
      
      <button 
        className="reporting-submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
        </div>
        </div>
       
      </div>
    </div>
  )
}
