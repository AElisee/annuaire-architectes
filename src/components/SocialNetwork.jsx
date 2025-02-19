import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const SocialNetwork = () => {
  const handleSocialClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="flex gap-3 md:gap-5 z-30">
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSocialClick}
      >
        <FaFacebookSquare
          size={22}
          className="text-slate-500 hover:text-blue-800 "
        />
      </a>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSocialClick}
      >
        <FaInstagram
          size={22}
          className="text-slate-500 hover:text-amber-600"
        />
      </a>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSocialClick}
      >
        <FaLinkedin size={22} className="text-slate-500 hover:text-blue-800" />
      </a>
    </div>
  );
};

export default SocialNetwork;
