import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  length,
  articlesPerPage,
  handlePagination,
  currentPage,
}) => {
  const paginationNumbers = [];
  const totalPages = Math.ceil(length / articlesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="flex flexCenter p-4 m-10">
      <div className="border border-grey-500 rounded-md shadow-sm">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
          className="hover:text-green-50 px-3 rounded-md hover:cursor-pointer text-gray-30"
        />

        {paginationNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={`px-3 py-2 rounded-md hover:bg-gray-10 text-gray-30
            ${currentPage === pageNumber ? "text-green-50 bg-gray-10" : ""}`}
          >
            {pageNumber}
          </button>
        ))}

        <FontAwesomeIcon
          icon={faArrowRight}
          className="hover:text-green-50 px-3 rounded-md hover:cursor-pointer text-gray-30"
          onClick={() =>
            currentPage < totalPages && handlePagination(currentPage + 1)
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
