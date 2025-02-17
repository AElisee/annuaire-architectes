import { IoEyeSharp } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
// import { MdOutlineMail } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { IoMdRibbon } from "react-icons/io";
const Card = ({ item }) => {
  return (
    <div
      data-aos="zoom-in"
      //   data-aos-offset="0"
      className="flex flex-col justify-between w-[95vw] h-[420px] md:h-[360px] md:w-[250px] overflow-hidden rounded-xl border-t-4 border-t-indigo-600 text-center"
    >
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div className="rounded-full shadow-sm size-30 overflow-hidden flex justify-center items-center">
          <Suspense>
            <img
              src={item.profil_image}
              alt={item.nom_prenoms}
              className="w-full object-cover"
            />
          </Suspense>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl">{item.nom_prenoms}</p>
          <p className="text-sm text-zinc-500 uppercase flex justify-center items-center gap-2">
            <CiLink size={24} />
            {item.structure}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-md text-zinc-400 flex justify-center items-center gap-2">
            <IoMdRibbon size={20} className="text-amber-400" />
            Diplôme :{" "}
            <span className="uppercase text-md text-slate-700 font-semibold">
              {item.diplome}
            </span>
          </p>
          {/* <p>
            <a
              href="tel:+2250151412143"
              className="text-md text-zinc-400 flex justify-center items-center gap-2"
            >
              <FaPhoneAlt />
              01 51 41 21 43
            </a>
          </p> */}
        </div>
      </div>
      <div className="flex h-1/6 rounded-b-xl border-t-1 border-slate-300">
        <div className="w-1/2 flex justify-center items-center bg-zinc-100 border-r-1 border-slate-300">
          <Tooltip title="plus de détails">
            <Link to={`/architecte/${item.id}`}>
              <IoEyeSharp size={24} className="text-slate-500" />
            </Link>
          </Tooltip>
        </div>
        <div className="w-1/2 flex justify-center items-center bg-zinc-100">
          <Link to="/structures/45">
            <Tooltip title="Mon cabinet">
              <FaIdCard size={24} className="text-slate-500" />
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
