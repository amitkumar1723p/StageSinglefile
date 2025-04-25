import { useState } from "react";
import "./singlefreshbookingtest.css"
// import "./singlefreshfooter.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitFreshProjectLead, submitFreshProjectLead_VerifyOtp } from "../../../../Action/freshProjectAction";



export default function SingleFreshBookingForm() {
    const { id } = useParams();
    const dispatch=useDispatch()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        projectId: id,
        otp: ""
    });

    const [otpSent, setOtpSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
        dispatch(submitFreshProjectLead(formData))
        setOtpSent(true);
      
            console.log(formData,"kl")
        } else {
            dispatch(submitFreshProjectLead_VerifyOtp(formData))
           console.log(formData.otp,"jj")
        
        }
    };

    return (
        <form onSubmit={handleSubmit} className="Single-fresh-form rounded shadow-lg text-light overflow-hidden mb-5">
            <h2 className="text-center mb-2 fw-medium">Let’s Find Your Dream Home!</h2>
            <p className="text-center mb-4">Please fill out the form below, our expert will get back to you soon.</p>

            <div className="d-flex flex-column">
                {/* Name Input */}
                <div className="form__group field position-relative">
                    <img
                      loading="lazy" src="/img/mdi_user.svg" alt="user-icon" className="form__icon" />
                    <input
                        type="text"
                        className="form__field"
                        placeholder="Enter Your Name"
                        id="name"
                        required
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        disabled={otpSent} // lock fields after sending OTP
                    />
                    <label htmlFor="name" className="form__label">Your Name</label>
                </div>

                {/* Email Input */}
                <div className="form__group field position-relative">
                    <img
                      loading="lazy" src="/img/ic_baseline-email.svg" alt="email-icon" className="form__icon" />
                    <input
                        type="email"
                        className="form__field"
                        placeholder="Enter Your Email"
                        id="email"
                        required
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        disabled={otpSent}
                    />
                    <label htmlFor="email" className="form__label">Your Email</label>
                </div>

                {/* Phone Number Input */}
                <div className="form__group field position-relative">
                    <img
                      loading="lazy" src="/img/ic_baseline-phone.svg" alt="phone-icon" className="form__icon" />
                    <input
                        type="tel"
                        className="form__field"
                        placeholder="Enter Your Number"
                        id="contactNumber"
                        pattern="[1-9]{1}[0-9]{9}"
                        maxLength={10}
                        required
                        name="contactNumber"
                        onChange={handleChange}
                        value={formData.contactNumber}
                        disabled={otpSent}
                    />
                    <label htmlFor="contactNumber" className="form__label">Your Number</label>
                </div>

                {/* OTP Input (only visible after OTP sent) */}
                {otpSent && (
                    <div className="form__group field position-relative">
                        <img
                      loading="lazy" src="/img/ic_baseline-lock.svg" alt="otp-icon" className="form__icon" />
                        <input
                            type="text"
                            className="form__field"
                            placeholder="Enter OTP"
                            id="otp"
                            required
                            name="otp"
                            onChange={handleChange}
                            value={formData.otp}
                        />
                        <label htmlFor="otp" className="form__label">OTP</label>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn w-100 mt-3">
                    {otpSent ? "Verify OTP" : "Reserve Your Spot"}
                </button>
            </div>
        </form>
    );
}


{/* <input type="text" name="country_code" title="Error Message" pattern="[1-9]{1}[0-9]{9}">  */ }