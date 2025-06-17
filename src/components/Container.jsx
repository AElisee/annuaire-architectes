import { useEffect, useState } from "react";
import { supabase } from "./../utils/supabaseClient.js";
import Search from "./Search.jsx";
import Card from "./Card.jsx";
import Pagination from "./Pagination.jsx";

const Container = () => {
  const [architectes, setArchitectes] = useState([]);
  const [filters, setFilters] = useState({
    nom: "",
    cabinet: "",
    // diplome: "",
    ordre: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const architectsPerPage = 12;

  useEffect(() => {
    const fetchArchitectes = async () => {
      try {
        const { data, error } = await supabase.from("architectes").select("*");
        if (error) throw error;

        // Ajouter l'URL publique de l'image pour chaque architecte
        const architectesWithImages = data.map((archi) => {
          const { data: imageData } = supabase.storage
            .from("images-architectes")
            .getPublicUrl(archi.image);

          const publicUrl =
            imageData && imageData.publicUrl
              ? imageData.publicUrl
              : "/images/default-image.png";

          return {
            ...archi,
            imageUrl: publicUrl,
          };
        });

        setArchitectes(architectesWithImages);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données :",
          error.message
        );
      }
    };

    fetchArchitectes();
  }, []);

  // Reset pagination si filtre changé
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filtrage
  const filteredArchitectes = architectes.filter((architecte) => {
    return (
      (filters.nom === "" ||
        `${architecte.nom_prenoms}`
          .toLowerCase()
          .includes(filters.nom.toLowerCase())) &&
      (filters.cabinet === "" ||
        architecte.structure
          ?.toLowerCase()
          .includes(filters.cabinet.toLowerCase())) &&
      (filters.ordre === "" ||
        architecte.numero_agrement
          ?.toLowerCase()
          .includes(filters.ordre.toLowerCase()))
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
          currentArchitectes.map((architecte) => (
            <Card architecte={architecte} key={architecte.id} />
          ))
        ) : (
          <p className="text-center w-full text-slate-600 text-xl">
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
