import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generatePageNumbers = () => {
    const pages = [];
    const visiblePages = 3;

    if (totalPages <= visiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > visiblePages + 1) pages.push("...");
      if (currentPage > visiblePages && currentPage < totalPages - visiblePages)
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      if (currentPage < totalPages - visiblePages) pages.push("...");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }

    return [...new Set(pages)];
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center mt-5 items-center gap-2">
      <button
        className={`p-2 border rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>

      {isMobile ? (
        <span className="px-3 py-1 border rounded-md bg-blue-800 text-white">
          {currentPage}
        </span>
      ) : (
        pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2">...</span>
          ) : (
            <button
              key={index}
              className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-blue-800 text-white" : "hover:bg-gray-200"}`}
              onClick={() => paginate(page)}
            >
              {page}
            </button>
          )
        )
      )}

      <button
        className={`p-2 border rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
