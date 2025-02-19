import { IoEyeSharp } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { IoMdRibbon } from "react-icons/io";
import SocialNetwork from "./SocialNetwork.jsx";
const Card = ({ architecte }) => {
  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  return (
    <Link
      to={`/architecte/${architecte.id}`}
      data-aos="zoom-in"
      //   data-aos-offset="0"
      className="relative z-20 flex flex-col justify-between w-[95vw] h-[420px] md:h-[360px] md:w-[250px] overflow-hidden rounded-xl border-t-4 border-t-indigo-600 text-center shadow-sm hover:shadow-md"
    >
      <div className="w-full h-full flex flex-col justify-around items-center px-2">
        <div className="rounded-full shadow-sm size-24 overflow-hidden flex justify-center items-center">
          <Suspense fallback={<Spinner />}>
            <img
              src={architecte.profil_image}
              alt={architecte.nom_prenoms}
              className="w-full object-cover"
              loading="lazy"
            />
          </Suspense>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl">{architecte.nom_prenoms}</p>
          <p className="text-sm text-zinc-500 uppercase flex flex-wrap justify-center items-center gap-2">
            <CiLink size={24} />
            {architecte.structure}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-md text-zinc-400 flex flex-wrap justify-center items-center gap-2">
            <IoMdRibbon size={20} className="text-amber-400" />
            Diplôme :{" "}
            <span className="uppercase text-md text-slate-700 font-semibold">
              {architecte.diplome}
            </span>
          </p>
        </div>
        <SocialNetwork />
      </div>
      <div className="flex h-1/6 rounded-b-xl border-t-1 border-slate-300">
        <div className="w-1/2 flex justify-center items-center bg-zinc-100 border-r-1 border-slate-300">
          <Tooltip title="plus de détails">
            <Link to={`/architecte/${architecte.id}`}>
              <IoEyeSharp size={24} className="text-slate-500" />
            </Link>
          </Tooltip>
        </div>
        <div className="w-1/2 flex justify-center items-center bg-zinc-100">
          <Link to="/">
            <Tooltip title="Mon cabinet">
              <FaIdCard size={24} className="text-slate-500" />
            </Tooltip>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default Card;
