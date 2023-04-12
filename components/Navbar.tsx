import React, { useCallback, useState, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const OFFSET = 66;

const Navbar = () => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const [showNavBG, setShowNavBG] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= OFFSET) {
        setShowNavBG(true);
      } else {
        setShowNavBG(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Unmounting the scroll function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobMenu = useCallback(() => {
    setShowMobMenu((current) => !current);
  }, []);

  const toggleAccMenu = useCallback(() => {
    setShowAccMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed w-full z-40 ">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showNavBG ? "bg-zinc-900 bg-opacity-90" : ""
        } `}
      >
        <img src="/images/logo.png" alt="logo" className="h-4 lg:h-7" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="TV Shows" />
          <NavbarItem label="Movies" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobMenu}
          className="lg:hidden flex flex-row gap-2 items-center ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobMenu} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-green.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
