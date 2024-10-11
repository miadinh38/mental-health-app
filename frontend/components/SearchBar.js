import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ onChange, value, onClickSearch }) {
  return (
    <div className="relative flex flex-nowrap items-stretch w-96">
      <input
        id="search"
        type="search"
        className="relative m-0 flex-auto rounded border border-solid 
          border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] 
          text-base font-normal leading-[1.6] text-neutral-700 outline-none 
          transition duration-200 ease-in-out focus:z-[3] focus:border-primary
          focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] 
          focus:outline-none"
        placeholder="Type to search..."
        name="search"
        value={value}
        onChange={onChange}
      />

      {/* <!--Search icon--> */}
      <span
        className="flex items-center whitespace-nowrap rounded 
          px-3 py-1.5 text-neutral-700 hover:cursor-pointer hover:text-green-500"
      >
        <FontAwesomeIcon icon={faSearch} onClick={onClickSearch} />
      </span>
    </div>
  );
}
