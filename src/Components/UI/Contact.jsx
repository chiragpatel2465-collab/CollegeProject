import React from 'react'
import '../Component.css';
import Herosection from './Herosection';
import CourseCard from './Course';
import ViewCourse from './ViewCourse';
const Contact = () => {
  let contactFieldData = [{
      "id" : 1,
      "fieldName" : "Name",
      "placeholder" : "Enter Name"
    },
  {
      "id" : 2,
      "fieldName" : "Email",
      "placeholder" : "Enter Email Adress"
    },
  {
      "id" : 3,
      "fieldName" : "Phone Number",
      "placeholder" : "Enter Phone Number"

    },
  {
      "id" : 4,
      "fieldName" : "Subject",
      "placeholder" : "Enter Subject"
    }]

  
  return (
        <section className='contact-text'>
     <div>{contactFieldData.map((e)=>{
      return(
        <div  className='contact-text-block' key={e.id}>
          <label>{e.fieldName}</label>
          <input type="text" placeholder={e.placeholder}/>
        </div>
      );
     })}</div>
    <div className='contact-text-block'>
      <label htmlFor="message">Message</label>
      <textarea id="message" placeholder="Enter your message here">Enter your Message</textarea>
      </div>      
      <button className='contact-btn'>Submit</button>

    </section>
  );
}

export default Contact