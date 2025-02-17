import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-centera items-center">
      <span
        className="text-lg uppercase font-bold text-blue-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Architectes CI
      </span>
    </div>
  );
};

export default Logo;
