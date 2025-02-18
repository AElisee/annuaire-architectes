const Header = () => {
  return (
    <header
      className="h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpeg')" }}
    >
      <div className="h-full flex justify-center items-center bg-black/50">
        <h1 className="w-[90vw] md:leading-18 md:text-5xl text-3xl uppercase font-extrabold text-center pb-10  text-white drop-shadow-sm ">
          annuaire de l'ordre des architectes de côte d'ivoire
        </h1>
      </div>
    </header>
  );
};

export default Header;
