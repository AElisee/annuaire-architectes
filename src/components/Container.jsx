import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.config.js";
import Search from "./Search.jsx";
import Card from "./Card.jsx";
import Pagination from "./Pagination.jsx";

const Container = () => {
  const [architectes, setArchitectes] = useState([]);
  const [filters, setFilters] = useState({
    nom: "",
    cabinet: "",
    diplome: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const architectsPerPage = 12;

  useEffect(() => {
    const fetchArchitectes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "architectes"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArchitectes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchArchitectes();
  }, []);

  // Remettre la pagination à 1 après filtrage
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filtrage des architectes
  const filteredArchitectes = architectes.filter((architecte) => {
    return (
      (filters.nom === "" ||
        `${architecte.nom_prenoms}`
          .toLowerCase()
          .includes(filters.nom.toLowerCase())) &&
      (filters.cabinet === "" ||
        architecte.structure
          .toLowerCase()
          .includes(filters.cabinet.toLowerCase())) &&
      (filters.diplome === "" ||
        architecte.diplome
          .toLowerCase()
          .includes(filters.diplome.toLowerCase()))
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredArchitectes.length / architectsPerPage);
  const indexOfLastArchitect = currentPage * architectsPerPage;
  const indexOfFirstArchitect = indexOfLastArchitect - architectsPerPage;
  const currentArchitectes = filteredArchitectes.slice(
    indexOfFirstArchitect,
    indexOfLastArchitect
  );

  // Fonction pour changer de page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="relative py-3">
      <div className="h-[280px] md:h-[200px]"></div>
      <Search filters={filters} setFilters={setFilters} />

      {/* Affichage des architectes */}
      <ul className="flex gap-10 flex-wrap px-10 justify-center">
        {currentArchitectes.length > 0 ? (
          currentArchitectes.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <p className="text-center w-full text-slate-600  text-xl">
            Aucun architecte trouvé !
          </p>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default Container;
