import Logo from "./Logo.jsx";
import Logo_oaci from "./Logo_oaci.jsx";

const Nav = () => {
  return (
    <nav className="w-[full] h-[75px] sticky top-0 left-0 px-3 md:px-10 flex justify-between items-center bg-white z-50">
      <Logo />
      <Logo_oaci />
    </nav>
  );
};

export default Nav;
