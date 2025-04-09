import React, { useState, useEffect } from 'react';

export default function SingleFreshBookingGallery({ project, galleryContent }) {
  const [mainImage, setMainImage] = useState(null);

  // Set the first image from galleryContent when it's available
  useEffect(() => {
    if (galleryContent && galleryContent.length > 0) {
      setMainImage(galleryContent[0]);
    }
  }, [galleryContent]);

  return (
    <>
    <div className='single-fresh-gallery-main'>
    <div className="container " >
      <h3 className="mb-1 Single-fresh-gallery-p">Gallery</h3>
      <h3 className="fw-bold mb-3 Single-fresh-gallery-h3" >
        {project?.projectName}
      </h3>

      <div className="row mb-3 justify-content-center">
        <div className="col-12 d-flex justify-content-center">
        <div 
  className="single-freshbooking-gallery-image-container overflow-hidden border position-relative" 
  style={{ height: 'auto' }}
>
  {/* Blurred Background */}
  <div 
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{ 
      backgroundImage: `url(/img/single-fresh-gallery-bg.png)`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      zIndex: 0 
    }}
  ></div>

  {/* Main Image */}
  {mainImage && (
    <img
      src={mainImage.url}
      alt={mainImage.alt || 'Main Image'}
      className="img-fluid w-100 h-100 rounded shadow position-relative"
      style={{ objectFit: 'contain', zIndex: 1 }}
    />
  )}
</div>


        </div>
      </div>

      <div className="d-flex gap-2  overflow-scroll " style={{scrollbarWidth:'none'}}>
        {galleryContent?.map((image) => (
          <div key={image.id} className="col-6 col-md-4 col-lg-2 ">
            <div
              className={`thumbnail-container ${mainImage?.id === image.id ? 'border border-primary border-3' : ''}`}
              onClick={() => setMainImage(image)}
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
                src={image.url}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: mainImage?.id === image.id ? 1 : 0.7
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}
