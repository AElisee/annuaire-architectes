import Search from "./Search.jsx";
import Card from "./Card.jsx";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import axios from "axios";
import { useEffect, useState } from "react";

const Container = () => {
  const [architectes, setArchitectes] = useState([]);
  const [filters, setFilters] = useState({
    nom: "",
    cabinet: "",
    localite: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const architectsPerPage = 12;

  useEffect(() => {
    axios
      .get("http://localhost:3000/architectes")
      .then((response) => {
        setArchitectes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  // Filtrage des architectes
  const filteredArchitectes = architectes.filter((architecte) => {
    return (
      (filters.nom === "" ||
        `${architecte.nom} ${architecte.prenoms}`
          .toLowerCase()
          .includes(filters.nom.toLowerCase())) &&
      (filters.cabinet === "" ||
        architecte.cabinet
          .toLowerCase()
          .includes(filters.cabinet.toLowerCase())) &&
      (filters.localite === "" ||
        architecte.localite
          .toLowerCase()
          .includes(filters.localite.toLowerCase()))
    );
  });

  // Pagination
  const indexOfLastArchitect = currentPage * architectsPerPage;
  const indexOfFirstArchitect = indexOfLastArchitect - architectsPerPage;
  const currentArchitectes = filteredArchitectes.slice(
    indexOfFirstArchitect,
    indexOfLastArchitect
  );
  const totalPages = Math.ceil(filteredArchitectes.length / architectsPerPage);

  // Fonction pour changer de page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="relative py-3">
      <Search filters={filters} setFilters={setFilters} />
      <div className="h-[280px] md:h-[200px]"></div>

      {/* Affichage des architectes */}
      <ul className="flex gap-10 flex-wrap px-10 justify-start">
        {currentArchitectes.length > 0 ? (
          currentArchitectes.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <p className="text-center w-full text-gray-500">
            Aucun architecte trouvé
          </p>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <button
            className={`mx-2 px-3 py-1 border border-zinc-300 rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border border-zinc-300 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-800 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`mx-2 px-3 py-1 border border-zinc-300 rounded-md ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
