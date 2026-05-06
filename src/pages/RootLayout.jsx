import {Outlet} from 'react-router-dom';
import Nav from '../Components/Nav';
const rootLayout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    
    </>
  )
}

export default rootLayout