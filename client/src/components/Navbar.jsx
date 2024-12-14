import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../image/logo.png" 
import { useState } from "react";

const NavbarItem = ({title, classProps}) => {
    return (
      <li className={`mx-4 cursor-pointer ${classProps}`}>
        {title}
      </li>
    );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
   <nav className="w-full flex md:justify-center justify-between items-center p-3 gap-10">
    <div className="md:flex-[0.5] flex justify-center items-center">
      <img src="https://img.icons8.com/?size=100&id=6FfkEgdcnZ3y&format=png&color=000000" alt="logo" className="w-32 h-20 object-contain cursor-pointer" />
      <h1 className="text-white pr-12 font-bold text-3xl md:text-4xl">KRYPTO</h1>
    </div>

    <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <NavbarItem key={item + index} title={item}/>
        ))}
    </ul>

    <div className="flex relative ">
      <ul>
          {toggleMenu ? 
           <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
           : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
          }
           {toggleMenu && (
            <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="text-xl w-full my-2 cursor-pointer">
            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
              <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
          ))}
            </ul>
          )}
        
      </ul>
    </div>
   </nav>
  )
}

export default Navbar
