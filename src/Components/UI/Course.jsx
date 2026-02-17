import React from 'react';
import '../Component.css';
import Data from '../../API/CourseData';
import {Link} from 'react-router-dom';
const CourseCard = ({icon,title}) => {
 
 return(
   <>
     <section className="CourseCard-container">
       <ul>
         {Data.map((data)=>(
           
    <div className="card-container" key={data.id}>
      {/* Top Image Section */}
      <div className="card-header"  >
      </div>

      {/* Content Section */}
      <div className="card-body">
        <h2 className="course-title">{data.course_name}</h2>
        
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Duration</span>
            <span className="stat-value">🕒{data.duration}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Intake</span>
            <span className="stat-value">👥{data.intakes[0]}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tuition Fees</span>
            <span className="stat-value">💰{data.tuition_fees}</span>
          </div>
        </div>


        <Link to={`/CourseCard/${Data.id}`}><button className="view-details-btn">View Course</button></Link>

      </div>
    </div>
  
         ))}
       </ul>
     </section>
   </>
   );
};

export default CourseCard;
