import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [sentMessage, setSentMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_7b1nvlu', 'template_k6m5lrd', form.current, {
        publicKey: '9KovCGutNKYVVoxs5',
      })
      .then(
        () => {
          setSentMessage('Your message has been sent!');
          setTimeout(() => setSentMessage(''), 3000);
          form.current.reset();
        },
        (error) => {
          setSentMessage('Failed to send message. Please try again.');
          setTimeout(() => setSentMessage(''), 3000);
        }
      );
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Message</label>
        <textarea
          name="message"
          rows={10}
          style={{ minHeight: '120px', resize: 'vertical' }}
        />
        <input
          type="submit"
          value="Send"
          style={{ display: 'none' }}
        />
        <button type="submit" className="donate-button" style={{marginTop: '1rem'}}>
          <span className="donate-icon" aria-hidden="true" style={{marginRight: 8}}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          Send
        </button>
      </form>
     <div
       className="sent-message"
       style={{
         minHeight: '1.5em',
         marginTop: '1rem',
         color: sentMessage.startsWith('Failed') ? '#d32f2f' : '#388e3c',
         textAlign: 'center',
         transition: 'opacity 0.3s',
         opacity: sentMessage ? 1 : 0
       }}
     >
       {sentMessage}
     </div>
    </>
  );
};

export default ContactUs;
