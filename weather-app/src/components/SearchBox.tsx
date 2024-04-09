"use client";
import { IoSearch } from "react-icons/io5";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const SearchBox = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
