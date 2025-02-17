import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenuOutline, IoCloseSharp } from "react-icons/io5";
import Logo from "./Logo.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    {
      name: "Annnuaire",
      path: "/annuaire",
    },
    {
      name: "Cabinets",
      path: "/cabinets",
    },
    {
      name: "Connexion",
      path: "/login",
    },
  ];
  return (
    <nav className="w-full h-[75px] sticky top-0 left-0 px-3 md:px-10 flex justify-between items-center bg-white z-50">
      <Logo />

      {/* menu sur ordinateur */}
      <div className="hidden md:block">
        <ul className="flex gap-5">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={`${(active) =>
                  active.isActive
                    ? "md:active"
                    : ""} flex justify-center items-center w-full p-1 px-4 rounded-md hover:bg-blue-800 hover:text-white font-semibold`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* menu sur téléphone */}
      <div className="flex md:hidden">
        <div>
          {!open ? (
            <IoMenuOutline
              size={30}
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            />
          ) : (
            // <IoCloseSharp
            //   size={30}
            //   onClick={() => setOpen(false)}
            //   className="cursor-pointer"
            // />
            ""
          )}
        </div>
        {open && (
          <div className="absolute top-0 left-0 w-[60vw] h-[100vh] bg-white md:hiddden">
            <div className="w-full p-3 flex justify-between items-center">
              <Logo />
              <IoCloseSharp
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <ul className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={`flex w-full p-1 px-4 bg-none`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
