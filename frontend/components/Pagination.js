import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  length,
  articlesPerPage,
  handlePagination,
  currentPage,
}) => {
  const paginationNumbers = [];
  const totalPages = Math.min(Math.ceil(length / articlesPerPage), 10);

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="flex flexCenter p-4 my-10 xs:px-0 xs:mx-0">
      <div className="border border-grey-500 rounded-md shadow-sm xs:text-sm md:text-sm">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
          className="hover:text-green-50 px-3 rounded-md hover:cursor-pointer text-gray-30 xs:px-1.5"
        />

        {paginationNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={`px-2.5 py-2 rounded-md hover:bg-gray-10 text-gray-30 xs:px-1.5 md:px-2
            ${currentPage === pageNumber ? "text-green-50 bg-gray-10" : ""}`}
          >
            {pageNumber}
          </button>
        ))}

        <FontAwesomeIcon
          icon={faArrowRight}
          className="hover:text-green-50 px-3 rounded-md hover:cursor-pointer text-gray-30 xs:px-1.5"
          onClick={() =>
            currentPage < totalPages && handlePagination(currentPage + 1)
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
