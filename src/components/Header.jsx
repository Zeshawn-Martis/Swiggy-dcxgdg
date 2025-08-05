
import React from 'react'; 
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { RiDiscountPercentLine } from "react-icons/ri";
import { TbPokeball } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
export default function Header() {
    const [toggle, setToggle] = React.useState(false);
const showSideMenu = () => {
    setToggle(true);
}
const hideSideMenu = () => {
    setToggle(false);
}
const links=[
  {
    icon: <IoIosSearch />,
    name: 'Search'
  },
  {
    icon: <RiDiscountPercentLine />,
    name: 'Offers',
    sup: 'New'
  },
  {
    icon: <TbPokeball />,
    name:"Help"},
    {
    icon: <IoPersonOutline />,
    name:"Sign In"},
    {
    icon: "",
    name:"Cart"},
]
  return (
    <>
    <div className='black-overlay w-full h-full fixed duration-500' onClick={hideSideMenu}
    style={{
      left: toggle ? "0%" : '-100%',
      opacity: toggle ? 1 : 0,
      visibility: toggle ? 'visible' : 'hidden',
      }}>
        <div onClick={(e) =>{
           e.stopPropagation(); 
        }}
         className='w-[500px] bg-white h-full absolute duration-[400ms]'
         style={{
            left: toggle ? "0%" : '-100%',
            }}></div>
        </div>
    <header className='p-[15px] shadow-xl text-[#686b78] sticky top-0 z-[9999] bg-white'>
<div className='max-w-[1200px] mx-auto  flex items-center'> 
    <div className='w-[100px]'>
        <img src='images/logo.png' alt='logo' className='w-full' />
    </div>

<div className=''>
   <span className='font-bold border-b-[3px] border-[black]'>Andheri</span> Mumbai, Maharashtra, India
   <RxCaretDown onClick={showSideMenu} font-size={25} className='font-bold inline text-[#fc8019] cursor-pointer'/>
</div>

<nav className='hidden md:flex list-none gap-10 ml-auto text-[18px] font-semibold'>
{links.map(
  (link, index) => {
    return <li key={index} className='cursor-pointer flex hover:text-[#fc8019] items-center gap-3'>
    {link.icon}
    {link.name}
    <sup>{link.sup}</sup>
  </li>
})}
</nav>
</div>
    </header>
    </>
  );
}