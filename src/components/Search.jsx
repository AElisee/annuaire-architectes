import { RiResetLeftFill } from "react-icons/ri";
const Search = ({ filters, setFilters }) => {
  // Fonction pour mettre à jour les filtres en fonction des inputs
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetInput = () => {
    setFilters({
      nom: "",
      cabinet: "",
      diplome: "",
      ordre: "",
    });
  };

  return (
    <div className="w-[95vw] md:w-[900px] h-[500px] md:h-[300px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 rounded-xl bg-white shadow-xl flex flex-col">
      <div className="h-1/3 md:h-2/5 w-full flex justify-center items-center border-b">
        <p className="uppercase text-xl md:text-3xl font-semibold">
          Rechercher un architecte
        </p>
      </div>
      <form className="h-2/3 md:h-3/5 flex flex-col justify-center px-4 pt-4 md:pt-0">
        <div className="h-2/3 flex flex-col md:flex-row gap-5 items-center justify-center">
          <div className="w-full md:w-1/4 flex flex-col gap-1">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              value={filters.nom}
              onChange={handleChange}
              placeholder="Rechercher par nom et prénom"
              className="p-1 rounded-md border focus:outline-blue-200 focus:outline-4 border-slate-300"
            />
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-1">
            <label htmlFor="cabinet">Cabinet</label>
            <input
              type="text"
              name="cabinet"
              value={filters.cabinet}
              onChange={handleChange}
              placeholder="Rechercher par cabinet"
              className="p-1 rounded-md border focus:outline-blue-200 focus:outline-4 border-slate-300"
            />
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-1">
            <label htmlFor="diplome">Diplôme</label>
            <input
              type="text"
              name="diplome"
              value={filters.diplome}
              onChange={handleChange}
              placeholder="Rechercher par dîplome"
              className="p-1 rounded-md border focus:outline-blue-200 focus:outline-4 border-slate-300"
            />
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-1">
            <label htmlFor="diplome">N° d'ordre</label>
            <input
              type="text"
              name="ordre"
              value={filters.ordre}
              onChange={handleChange}
              placeholder="Rechercher par N° d'ordre"
              className="p-1 rounded-md border focus:outline-blue-200 focus:outline-4 border-slate-300"
            />
          </div>
        </div>
        <div className="h-1/3 flex justify-center items-center">
          <button
            onClick={resetInput}
            type="button"
            className="flex gap-3 items-center p-2 px-5 border rounded-lg w-[170px] bg-blue-800 border-none text-white justify-center cursor-pointer"
          >
            <RiResetLeftFill size={20} className="font-extrabold text-white" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
