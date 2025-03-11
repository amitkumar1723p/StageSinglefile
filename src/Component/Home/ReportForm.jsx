import React, { useState } from "react";
import "./ReportForm.css";
import { useDispatch } from "react-redux";
import { ReportPagePostAction } from "../../Action/postAction";

export default function ReportForm() {
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState({
    type: "",
    description: "",
    file: [],
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFeedback((prev) => ({
      ...prev,
      file: [...prev.file, ...files], // Append new files
    }));
  };

  const removeFile = (index) => {
    setFeedback((prev) => ({
      ...prev,
      file: prev.file.filter((_, i) => i !== index), // Remove file by index
    }));
  };

  // alert
  const [feedkacTypeAlert,setFeedkacTypeAlert] = useState(false);
  const [feedbackdescription, setFeedbackDescription] = useState(false);

const handleAlert = ()=>{
  if(!feedback.type){
    console.log(feedback.type)
    setFeedkacTypeAlert(true)
    setTimeout(() => {
      setFeedkacTypeAlert(false)
    }, 1400);
  }
  if(!feedback.description){
     setFeedbackDescription(true)
    setTimeout(() => {
      setFeedbackDescription(false)
    }, 1400);
    return;
  }
}

  return (
    <div className="reporting-container">
      <div className="reporting-headings">
        <h2>
          How Reporting <span>Works</span>
        </h2>
        <p>We Value Your Feedback - Here's How We Handle and Resolve Your Reports</p>
      </div>
      <div className="reporting-main-content">
        <div className="reporting-image-container">
          <div className="reporting-submit-image-container">
            <img src="/img/submit-your-report.svg" alt="submit-report" />
            <img src="/img/reporting-right-arrow.svg" alt="arrow" />
          </div>
          <div className="reporting-review-image-container">
            <img src="/img/reporting-left-arrow.svg" alt="arrow" />
            <img src="/img/review-verification.svg" alt="review-verification" />
          </div>
          <div className="reporting-update-image-container">
            <img src="/img/resolution-update.svg" alt="resolution-update" />
            <img src="/img/spiral.svg" alt="spiral" />
          </div>
        </div>

        <div className="reporting-form-container">
          <div className="reporting-form">
            <label className="reporting-title">Choose your Feedback</label>

            <div className="reporting-form-group">
              <select
              required
                className={`reporting-select ${feedkacTypeAlert? " inputShake":''}`}
                value={feedback.type}
                onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
              >
                <option value="" disabled>
                  Type of Feedback
                </option>
                <option value="Suggestion">Suggestion</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Service Issue">Service Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="reporting-form-group">
              <label className="reporting-label-section">Describe</label>
              <input
                type="text"
                className={`reporting-input-section  ${feedbackdescription? " inputShake":''}`}
                placeholder="Describe your concern"
                value={feedback.description}
                onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
              />
            </div>

            <div className="reporting-form-group">
              <label className="reporting-label">Upload JPEG Images</label>
              <div className="reporting-file-container reporting-input">
                <input placeholder="choose image " type="file"  accept=".jpg,.jpeg,.png,.webp" multiple className="reporting-input" onChange={handleFileChange} />
              </div>

              {/* Display selected files with a remove button */}
              {feedback.file.length > 0 && (
                <div className="reporting-file-list">
                  {feedback.file.map((f, index) => (
                    <div key={index} className="reporting-file-item">
                      <span>{f.name}</span>
                      <button className="reporting-remove-file" onClick={() => removeFile(index)}>
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="reporting-submit" onClick={() => {
              dispatch(ReportPagePostAction(feedback))
              setFeedback({
                type: "",
                description: "",
                file: [],
              })  ; handleAlert()
              }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
