import React from 'react'
import '../Component.css';
const Contact = () => {
  return (
    <section>
      <div className="contact-text">
        <input  type="text" placeholder="Enter your name" requiered/>
         <input  type="number" placeholder="Enter your contact Number" requiered/>
          <input  type="email" placeholder="Enter your email" requiered/>
           <textarea type="textarea" placeholder="Enter your message"/>
           <button>submit</button>
      </div>
    </section>
  );
}

export default Contact