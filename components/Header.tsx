import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-no-background.png";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useTheme} from "next-themes";
import {useState, useEffect} from "react";
import Logo from "./Logo"
import {useSession,signIn,signOut} from 'next-auth/react'
const Header = () => {
  const session = useSession();
  console.log(session)
  const login = (e: { preventDefault: () => void; }) =>{
    signIn()

  }
  const logout = (e: { preventDefault: () => void; }) =>{
    signOut()

  }
 
  const [mounted, setMounted] = useState(false);

  useEffect(() =>{
    setMounted(true);
  },[])
  
  const {systemTheme , theme, setTheme} = useTheme ();

  const renderThemeChanger= () => {
    if(!mounted) return null;

      const currentTheme = theme === "system" ? systemTheme : theme ;

      if(currentTheme ==="dark"){
        return (
          <LightModeIcon className="w-10 h-10 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
        )
      }

      else {
        return (
          <DarkModeIcon className="w-10 h-10 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
        )
      }
   };
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          {/* <Image
            className="w-44 object-contain cursor-pointer"
            src={logo}
            alt=""
          /> */}
          <h1 className="text-xl underline mr-3">
            Seas Code
          </h1>
        </Link>
        {/* hidden => hiddden on small  screen */}
        <div className="hidden md:inline-flex items-center space-x-5 ">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-500 px-4 py-1 rounded-full cursor-pointer">
            Follow
          </h3>
          {/* <Logo/> */}
        
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600 ">
      {session.data === null &&  <button className="cursor-pointer text-blue-600 hover:underline" onClick={login}>Login</button> }
       {session.data != null && <div className="flex">
                    <p className=" text-gray-600 dark:text-white pr-6 mt-1 items-center">{session?.data?.user?.name}</p>
                    <img  src={session?.data?.user?.image} className=" mr-4 h-10 w-10 rounded-full" alt="" />
                    <button className="cursor-pointer text-blue-600 hover:underline" onClick={logout}>LogOut</button>
        </div>}
        {/* <h3 className=" cursor-pointer border px-4 py-1 rounded-full border-green-500">
          Get Started
        </h3> */}
        {renderThemeChanger()}
      </div>
    </header>
  );
};

export default Header;
