import { MdMoreHoriz } from "react-icons/md";
import { CiEdit, CiTrash } from "react-icons/ci";

const MoreOptionsDropdown = ({
  currentCommunityUser,
  author,
  isMore,
  handleMore,
  handleEdit,
  handleDelete
}) => {
  return (
    <div className="relative">
      <MdMoreHoriz
        className={`regular-20 cursor-pointer ${
          currentCommunityUser === author ? "" : "opacity-0"
        }`}
        onClick={currentCommunityUser === author ? handleMore : null}
        aria-label="More options"
        role="button"
      />
      {isMore && currentCommunityUser === author && (
        <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-100 rounded shadow-lg z-10">
          <div
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer regular-12"
            onClick={handleEdit}
          >
            <CiEdit className="mr-2" /> Edit
          </div>
          <div
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer regular-12"
            onClick={handleDelete}
          >
            <CiTrash className="mr-2" /> Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreOptionsDropdown;
