import React from 'react';
import '../Component.css'

const ViewCourse = () => {
  const sections = [
    {
      title: "Core Subjects",
      content: (
        <div className="syllabus-content">
        
          <ul>
            <li><h4>Data Structures and Algorithms</h4> : which consists of array , stack and queue</li>
            <li><h4>Database Management System</h4> : which includes SQL Database</li>
            <li><h4>Operating system</h4> : which consitsts of linux</li>
            <li><h4>Computer Networks</h4> : i don't know about this right now</li>
            <li><h4>Object Oriented Programming </h4>: the major programming language is java</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Eligibility Criteria",
      content: (
        <div className="stats-content">
          <p><strong>Average Package:</strong> 8 LPA</p>
          <p>10+2 with PCM, 90% aggregate.</p>
          <p>Entrance: JEE Main</p>
          <p>Top Recruiting Companies: Google, HCL, Wipro</p>
        </div>
      ),
    },
    {
      title: "Infrastructure & Faculty",
      content: (
        <ul>
          <li>Software Dev. Labs</li>
          <li>Cybersecurity Centre</li>
          <li>Full-Stack Development Studios</li>
        </ul>
      ),
    },
    {
      title: "Placement & Outcomes",
      content: (
        <div className="placement-logos">
          <p>Our graduates work at:</p>
          <div className="logo-placeholder">Google | HCL | Wipro | Amazon</div>
        </div>
      ),
    },
    {
      title: "Tuition Fees",
      content: (
        <div className="fees-content">
          <p>Software Dev: ₹3,00,000 /year</p>
          <p>AI Research: Cloud Industry</p>
          <p>Data Scientist Track</p>
        </div>
      ),
    },
    {
      title: "IT vs CS: Finding Your Fit",
      content: <p>IT focuses on applied technologies and systems management, while CS delves into the theoretical foundations of computation.</p>,
    }
  ];

  return (
    <div className="Vcourse-container">
    
      <div className="Vcourse-card">
        <h1 className="Vcourse-title">Information Technology</h1>
        
        <div className="Vhero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200" 
            alt="Students working" 
            className="Vhero-image"
          />
        </div>

        <section className="about-section">
          <h2>About This Course</h2>
          <p>
            Our powerful technology in Information Technology is designed to bridge the gap between 
            theoretical knowledge and industrial application, preparing you for successful careers 
            in digital industries.
          </p>
        </section>

        <div className="info-grid">
          {sections.map((section, index) => (
            <div key={index} className="info-box">
              <h3 className="info-box-header">{section.title}</h3>
              <div className="info-box-body">{section.content}</div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="btn btn-outline">Download Full Brochure</button>
          <button className="btn btn-solid">Apply Now</button>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Primary Focus</th>
                <th>Information Technology (IT)</th>
                <th>Computer Science (CS)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Per Semester Focus</td>
                <td>IT Manager, Cloud Architect</td>
                <td>Hostel Fees: ₹60,000/year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
