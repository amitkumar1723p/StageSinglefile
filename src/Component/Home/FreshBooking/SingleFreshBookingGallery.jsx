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
    <div className="container mt-4">
      <h3 className="mb-3 Single-fresh-gallery-p">Gallery</h3>
      <h3 className="fw-bold mb-5 Single-fresh-gallery-h3" style={{ color: '#1D3557' }}>
        {project?.projectName}
      </h3>

      <div className="row mb-3 justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <div className="overflow-hidden" style={{ height: '500px', width: '80%' }}>
            {mainImage && (
              <img
                src={mainImage.url}
                alt={mainImage.alt || 'Main Image'}
                className="img-fluid w-100 h-100 rounded shadow"
                style={{ objectFit: 'contain', backgroundColor: 'darkgrey' }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="row">
        {galleryContent?.map((image) => (
          <div key={image.id} className="col-6 col-md-4 col-lg-2 mb-3">
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
  );
}
