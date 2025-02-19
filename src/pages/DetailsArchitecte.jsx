import { IoMdRibbon } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config.js";
import { MdConfirmationNumber } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";
import Loading from "../components/Loading.jsx";
import SocialNetwork from "../components/SocialNetwork.jsx";
const DetailsArchitecte = () => {
  const [architecte, setArchitecte] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArchitecte = async () => {
      try {
        const docRef = doc(db, "architectes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArchitecte({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Aucun architecte trouvé avec cet ID");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchArchitecte();
  }, [id]);

  if (!architecte) {
    return <Loading />;
  }

  const goBack = () => {
    navigate("/annuaire");
  };

  return (
    <div className="p-5 md:p-10 flex flex-col items-center gap-5">
      {/* entête */}
      <div className="w-full p-5 flex justify-between items-center bg-slate-300 rounded-lg">
        <div>
          <Tooltip title="Retour à la liste ">
            <TbArrowBack
              size={30}
              onClick={goBack}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
        <div>
          <span className="text-xl uppercase font-semibold">
            Fiche d'Architecte
          </span>
        </div>
      </div>

      <div className="w-full flex bg-white flex-col h-full">
        {/* <div className="h-[60vh] w-full rounded-t-lg bg-amber-100 gap-5"></div> */}
        {/* infos */}
        <div className="flex flex-col md:flex-row gap-5 p-0 md:p-5 items-center border-b border-zinc-400 pb-5 md:h-[300px] ">
          <div className="w-full md:w-1/5 flex flex-col gap-3 items-center justify-center _bg-amber-200 h-full">
            <div className="size-[150px] rounded-2xl overflow-hidden flex justify-center items-center border border-zinc-100">
              <Suspense>
                <img
                  src={architecte.profil_image}
                  alt={architecte.nom_prenoms}
                  className="w-full object-cover"
                />
              </Suspense>
            </div>
            <p className="text-xl font-semibold text-slate-700">
              {architecte.nom_prenoms}
            </p>
          </div>
          <div className="w-full md:w-4/5 flex flex-col  h-full gap-3 md:gap-6 md:h-[150px] _bg-amber-100">
            <div className="h-1/3 flex flex-col md:flex-row justify-start gap-10">
              <p className="text-sm text-zinc-500  flex justify-center items-center gap-2">
                <CiLink size={24} className="font-extrabold text-slate-800" />
                Structure :
                <span className="text-xl font-semibold text-slate-700 uppercase">
                  {architecte.structure}
                </span>
              </p>
              <p className="text-md text-zinc-400 flex justify-center items-center gap-2">
                <IoMdRibbon size={20} className="text-amber-400 " />
                Diplôme :{" "}
                <span className="uppercase text-lg text-slate-700 font-semibold">
                  {architecte.diplome}
                </span>
              </p>
              <p className="text-sm text-zinc-500 flex justify-center items-center gap-2">
                <MdConfirmationNumber
                  size={20}
                  className="text-green-500 font-extrabold"
                />
                <span>N° d'ordre :</span>
                <span className="uppercase text-lg text-slate-700 font-semibold">
                  {architecte.numero_agrement}
                </span>
              </p>
            </div>
            <div className="h-1/3">{architecte.contacts}</div>
            <div className="h-1/3">
              <SocialNetwork />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsArchitecte;
