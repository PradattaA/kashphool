import { useState, useRef, useEffect } from 'react';
import ContactUs from './ContactUs';
import EventModal from './EventModal';
import './App.css';

function App() {
  const publicUrl = process.env.PUBLIC_URL || '';
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
      if (!menuOpen) return;
      function handleClickOutside(e) {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target)
        ) {
          setMenuOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

  // Helper function to parse event dates and calculate days
  const parseEventDate = (dateString) => {
    if (dateString.includes(' - ')) {
      // Multi-day event
      const [startDate, endDate] = dateString.split(' - ');
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return {
        isMultiDay: true,
        days: days,
        startDate: startDate,
        endDate: endDate,
        displayDate: dateString,
        startMonth: startDate.split(' ')[0],
        startDay: startDate.split(' ')[1].replace(',', ''),
        endMonth: endDate.split(' ')[0],
        endDay: endDate.split(' ')[1].replace(',', '')
      };
    } else {
      // Single-day event
      return {
        isMultiDay: false,
        days: 1,
        startDate: dateString,
        endDate: null,
        displayDate: dateString,
        month: dateString.split(' ')[0],
        day: dateString.split(' ')[1].replace(',', '')
      };
    }
  };

  // Events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Saraswati Puja",
      date: "January 23, 2026",
      time: "10:00 AM - 8:00 PM",
      location: "Elite Venue, Dartford",
      description: "Join us for the annual Saraswati Puja, a celebration of the goddess Saraswati, the goddess of knowledge and music.",
      venueLink: "https://maps.google.com/?q=Elite+Venue+Dartford",
      coordinates: { lat: 51.41729019237036, lng: 0.3769888296721462 }
    },
    {
      id: 2,
      title: "Durga Puja",
      date: "October 17, 2026 - October 21, 2026",
      time: "12:00 PM - 8:00 PM",
      location: "Elite Venue, Dartford",
      description: "Join us for the annual Durga Puja, a celebration of the goddess Durga, the goddess of power and strength.",
      venueLink: "https://maps.google.com/?q=Elite+Venue+Dartford",
      coordinates: { lat: 51.41729019237036, lng: 0.3769888296721462 }
    }
  ];

  // Gallery images - add photos to public/gallery/ folder
  const galleryImages = [
    { id: 1, src: `${publicUrl}/gallery/2025_1.jpg`, alt: "Durga Puja 2025" },
    { id: 2, src: `${publicUrl}/gallery/2025_2.jpg`, alt: "Durga Puja 2025" },
    { id: 3, src: `${publicUrl}/gallery/2025_3.jpg`, alt: "Durga Puja 2025" },
    { id: 4, src: `${publicUrl}/gallery/2025_4.jpg`, alt: "Durga Puja 2025" },
    { id: 5, src: `${publicUrl}/gallery/2025_5.jpg`, alt: "Durga Puja 2025" },
    { id: 6, src: `${publicUrl}/gallery/2025_6.jpg`, alt: "Durga Puja 2025" },
  ];

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < galleryImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : galleryImages.length - 1
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (selectedImageIndex !== null) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container">
           <a href="" className="logo-link" aria-label="Home">
                <img src={`${publicUrl}/kashphool_logo.png`} className="logo" alt="Kashphool Logo" />
                <div className="logo-text-container">
                  <span className="logo-text">Kashphool</span>
                  <span className="logo-subtitle">North Kent Bengali Association</span>
                </div>
            </a>
          </div>
          <button className="hamburger"
            ref={hamburgerRef}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
          </button>
          <ul
            className={`nav-menu${menuOpen ? ' open' : ''}`}
            ref={menuRef}>
            <ul className={`nav-menu${menuOpen ? ' open' : ''}`} ref={menuRef}>
              <li>
                <a href="#about">
                  <span style={{verticalAlign: 'middle', marginRight: 6}}>
                    {/* Info icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12" y2="8"/>
                    </svg>
                  </span>
                  About
                </a>
              </li>
              <li>
                <a href="#events">
                  <span style={{verticalAlign: 'middle', marginRight: 6}}>
                    {/* Calendar icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery">
                  <span style={{verticalAlign: 'middle', marginRight: 6}}>
                    {/* Image icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </span>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact">
                  <span style={{verticalAlign: 'middle', marginRight: 6}}>
                    {/* Mail icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  Contact
                </a>
              </li>
              <li>
                <a href="#donate">
                  <span style={{verticalAlign: 'middle', marginRight: 6}}>
                    {/* Heart/Donate icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/>
                    </svg>
                  </span>
                  Donate
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-border-top"></div>
        <div className="hero-border-bottom"></div>
        <div className="hero-border-left"></div>
        <div className="hero-border-right"></div>
        <div className="hero-symbol hero-symbol-left">ॐ</div>
        <div className="hero-symbol hero-symbol-right">ॐ</div>
        <div className="hero-symbol hero-symbol-bottom-left">ॐ</div>
        <div className="hero-symbol hero-symbol-bottom-right">ॐ</div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-prefix">Welcome to </span>
              <span className="hero-title-name">Kashphool</span>
            </h1>
            {/* <p className="hero-subtitle">Britain e Bangaliyana</p> */}
          </div>
          <div className="hero-image">
            <img src={`${publicUrl}/durga_bg_ts.png`} alt="Goddess Durga" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Kashphool is an Indian Bengali Association based in North Kent, dedicated to preserving
                and celebrating our rich cultural heritage. We are a vibrant community organization that
                brings together Bengali families and friends to honor our traditions and create lasting
                connections.
              </p>
              <p>
                Established in 2025, Kashphool organizes various Hindu festivals and community events
                throughout the year. Our mission is to keep our cultural traditions alive while building
                a strong, supportive community in North Kent. We celebrated our first Durga Puja in 2025,
                marking a significant milestone in our journey.
              </p>
              <p>
                Through our events and celebrations, we aim to foster a sense of belonging, share our
                cultural values with future generations, and create a welcoming space for all members
                of our community. Join us as we continue to grow and celebrate our shared heritage together.
              </p>
            </div>
            <div className="about-image">
              <img src={`${publicUrl}/Kashphool_square_transparent.png`} alt="Kashphool Organization" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="section events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map(event => {
              const eventDate = parseEventDate(event.date);

              return (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-date">
                    {eventDate.isMultiDay ? (
                      <>
                        <div className="event-date-range">
                          <div className="event-date-item">
                            <span className="event-month">{eventDate.startMonth}</span>
                            <span className="event-day">{eventDate.startDay}</span>
                          </div>
                          <span className="event-date-separator">-</span>
                          <div className="event-date-item">
                            <span className="event-month">{eventDate.endMonth}</span>
                            <span className="event-day">{eventDate.endDay}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="event-month">{eventDate.month}</span>
                        <span className="event-day">{eventDate.day}</span>
                      </>
                    )}
                  </div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-details">
                      <p><strong>Date:</strong> {eventDate.displayDate}</p>
                      {eventDate.isMultiDay && (
                        <p><strong>Duration:</strong> {eventDate.days} Days</p>
                      )}
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {selectedEvent && (
          <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div onClick={e => e.stopPropagation()}>
              <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            </div>
          </div>
        )}
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">Memories from our past events</p>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <span>{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ×
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <polyline points="18,6 10,14 18,22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <polyline points="10,6 18,14 10,22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
            />
            <div className="lightbox-caption">
              {galleryImages[selectedImageIndex].alt}
            </div>
          </div>
        </div>
      )}

      {/* Sponsors Section */}
      <section id="sponsors" className="section sponsors-section">
        <div className="container">
          <h2 className="section-title">Our Sponsors</h2>
          <p className="section-subtitle">We are grateful to our sponsors for their support</p>
          <div className="sponsors-grid">
            {/* Add your sponsor logos here */}
            <div className="sponsor-item">
              <img src={`${publicUrl}/sponsors/dartford_logo.jpg`} alt="Dartford Council" />
            </div>
            {/* Add more sponsor logos as needed */}
          </div>
        </div>
      </section>

      <section id="contact" className="section message-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <ContactUs />
        </div>
      </section>

      <section id="donate" className="donate-section">
        <div className="container">
          <h2 className="donate-title">Support Us</h2>
          <p className="donate-text">Your contribution helps us make a bigger impact. Thank you for your support!</p>
          <a
            className="donate-button"
            href="https://pay.lopay.com/request/906de5de-220b-4f34-bc56-776c0993ec32" // Replace with your donation link
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="donate-icon" aria-hidden="true">
                <img src={`${publicUrl}/lopay.png`} alt="Lopay" width={28} height={28} style={{borderRadius: 4}} />
              </span>
              Donate
          </a>
        </div>
      </section>


      {/* Contact Section - Footer */}
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Kashphool</h3>
              <p>North Kent Bengali Association</p>
              <img
                src={`${publicUrl}/kashphool_logo.png`}
                alt="Kashphool Logo"
                className="footer-logo"
                style={{ width: 150, height: 150, marginTop: 8 }}
              />
            </div>
            <div className="footer-section contact-section">
              <h4>Contact</h4>
              <p>
                  Email: <a href="mailto:kashphoolbengaliassociation@gmail.com">kashphoolbengaliassociation@gmail.com</a>
                </p>
              <p><strong>Contact Persons:</strong></p>
                <p>Kaushik Banerjee - <a href="tel:07522883400">07522883400</a></p>
                <p>Joy Sen - <a href="tel:07564060471">07564060471</a></p>
                <p>Abhishek Ghosh - <a href="tel:07706345368">07706345368</a></p>
                <p>Tanumoy Talukder - <a href="tel:07923133714">07923133714</a></p>
            </div>
            <div className="footer-section social-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://www.facebook.com/KashphoolUtsav" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/kashphoolutsav" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Kashphool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
