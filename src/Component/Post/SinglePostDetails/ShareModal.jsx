import React from 'react';
import "./ShareModal.css"
import { FaTelegram } from "react-icons/fa6";
import { IoIosCopy, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io';
import { toast } from 'react-toastify';
const ShareModal = ({ isOpen, onClose, propid }) => {

    const shareUrl = () => {
        navigator.clipboard.writeText(propid);
        toast.success("link copied",{
            style: {
                background: "",  // Custom green background
                color: "#fff"           // White text
              }
        })
        // You could add a toast notification here
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Share Property with Your Friends!</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <p className="subtitle">Choose a platform to share this property:</p>

                    <div className="share-options">
                        <a
                            href={`https://wa.me/?text=${propid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-item whatsapp"
                        >
                            <i className="fab fa-whatsapp"><IoLogoWhatsapp /></i>
                            <span>WhatsApp</span>
                        </a>

                        <a
                            href={`https://t.me/share/url?url=${propid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-item telegram"
                        >
                            <i className="fab fa-telegram-plane"><FaTelegram /></i>
                            <span>Telegram</span>
                        </a>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${propid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-item facebook"
                        >
                            <i className="fab fa-facebook"><IoLogoFacebook /></i>
                            <span>Facebook</span>
                        </a>

                  

                        <a
                            href="https://www.instagram.com/direct/inbox/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-item instagram"
                        >
                            <i className="fab fa-instagram"><IoLogoInstagram /> </i>
                            <span>Instagram</span>
                        </a>


                    </div>
                </div>


                <div className="modal-footer  ">
                    <div className='copy-field' contentEditable={true}>{propid}</div>
                    <button className=" copy-link" onClick={shareUrl}>
                        <IoIosCopy />
                        <span>Copy Link</span>
                    </button>

                    <button className="close-button-share-modal" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ShareModal;