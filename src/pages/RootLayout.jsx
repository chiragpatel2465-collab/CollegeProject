import {Outlet} from 'react-router-dom';
import Nav from '../Components/Nav';
import Footer from '../Components/UI/Footer';
const rootLayout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}

export default rootLayout