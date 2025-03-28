import React from 'react'
import { useState } from 'react'
export default function SingleFreshBookingGallery() {
 const [count, setCount] = useState(0);
    const images = [
        { id: 1, src: "/img/indoor-hotel-view.jpg", alt: "Shopping mall interior with curved levels" },
        { id: 2, src: "https://storage.googleapis.com/a1aa/image/at8AKoRAMua-NuOPQWvk8N3V45hchfdEtQmdVKfEZrk.jpg", alt: "Modern library interior" },
        { id: 3, src: "/img/square-front-modern-office-buildings.jpg", alt: "Circular skylight in building" },
        { id: 4, src: "/img/mall-america-scenes-cinematic-style.jpg", alt: "Shopping mall with glass ceiling" },
        { id: 5, src: "/img/square-front-modern-office-buildings.jpg", alt: "Holiday decorations in mall" },
        { id: 6, src: "/img/square-front-modern-office-buildings.jpg", alt: "Mall with Christmas decorations" }
      ];
    const [mainImage, setMainImage] = useState(images[0]);
    
  
      const handleThumbnailClick = (image) => {
        setMainImage(image);
      };
    
  return (
  <>
    <div className="container mt-4">
  <h3 className=" mb-3 Single-fresh-gallery-p">Gallery</h3>
  <h3 className="fw-bold  mb-5 Single-fresh-gallery-h3" style={{color: '#1D3557'}}>DLF Primus Images</h3>
  <div className="row mb-3 justify-content-center">
  <div className="col-12 d-flex justify-content-center">
    <div className="overflow-hidden" style={{ height: '500px', width: '80%' }}>
      <img 
        src={mainImage.src} 
        alt={mainImage.alt} 
        className="img-fluid w-100 h-100 rounded shadow" 
        style={{ objectFit: 'contain' , backgroundColor: 'darkgrey' }}
      />
    </div>
  </div>
</div>
      
   
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-6 col-md-4 col-lg-2 mb-3">
            <div 
              className={`thumbnail-container ${mainImage.id === image.id ? 'border border-primary border-3' : ''}`}
              onClick={() => handleThumbnailClick(image)}
              style={{ 
                width: '100%',
                height: '100px',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '4px',
                padding: '2px'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: mainImage.id === image.id ? 1 : 0.7
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
