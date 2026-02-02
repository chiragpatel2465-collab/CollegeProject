import '../Component.css';

export default function Herosection(){
  return(
    <>
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          welcome , <span className="highlight">Jay Swaminarayan</span> 
        </h1>
        <p className="hero-subtitle">
          We are an academic excellent Technical College made up of commited scholer students ,old collegians and staff members our rich history is the foundation for our values.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Get Started</button>
        </div>
      </div>
      
       <div className="hero-image-container">
       <img  
         src="https://ssit.co.in/images/hero/hero-image.jpg" 
          alt="Modern workspace illustration" 
        className="hero-image"
       />
       </div>
    
    </section> 
  
    </>
    );
}