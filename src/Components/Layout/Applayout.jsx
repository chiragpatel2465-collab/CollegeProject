import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
import {Outlet} from 'react-router-dom';
export default function Applayout(){
  return(
    <>
    <Navbar/>
    <Outlet/>
   
    </>
    );
}