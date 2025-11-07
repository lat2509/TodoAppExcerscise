import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { type ListActionComponentProp } from "../../type/todo";
import { IoMdArrowDropright } from "react-icons/io";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ListAction: React.FC<ListActionComponentProp> = ({ col, onSortChange }) => {
  const navigator = useNavigate();

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    onSortChange(col.id, sortBy, sortOrder);
  }

  return (
    <div className='flex flex-row items-center justify-between px-3 py-1'>
      <p className="font-semibold">{col.id.split('_').join(" ")}</p>
      <DropdownMenu.Root
        modal={false}
      >
        <DropdownMenu.Trigger asChild>
          <button className="p-2 rounded-lg hover:cursor-pointer hover:bg-[#091e4224]">
            <BsThreeDots />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            align="start"
            className="z-10 w-64 rounded-md bg-white shadow-lg py-3 flex flex-col items-center">
            <div className="flex w-full justify-between items-center px-2 py-1">
              <h2 className="flex-1 text-center text-gray-700 font-semibold">List Actions</h2>
            </div>
            <DropdownMenu.Item
              onSelect={() => navigator("addNewtodo")}
              className="flex items-center w-full text-start py-1 px-3 border-transparent hover:cursor-pointer hover:bg-[#091e4224]"
            >
              <span className="text-[14px]/[20px]">Add New Todo</span>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="flex items-center w-full">
                <div className="w-full flex justify-between items-center text-start py-1 px-3 hover:cursor-pointer hover:bg-[#091e4224]">
                  <span className="text-[14px]/[20px]">Sort by...</span>
                  <IoMdArrowDropright />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent
                sideOffset={1}
                className="w-64 rounded-md bg-white p-3 shadow-md flex flex-col">
                <DropdownMenu.Item
                  onSelect={() => {
                    handleSortChange("createdAt", "desc");
                  }}
                  className="w-full text-start py-1 px-3 border-transparent hover:cursor-pointer hover:bg-[#091e4224]"
                >
                  <span className="text-[14px]/[20px]">Create At(Desc)</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => {
                    handleSortChange("createdAt", "asc");
                  }}
                  className="w-full text-start py-1 px-3 border-transparent hover:cursor-pointer hover:bg-[#091e4224]"
                >
                  <span className="text-[14px]/[20px]">Create At(Asc)</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => {
                    handleSortChange("priority", "desc");
                  }}
                  className="w-full text-start py-1 px-3 border-transparent hover:cursor-pointer hover:bg-[#091e4224]"
                >
                  <span className="text-[14px]/[20px]">Priority(Desc)</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => {
                    handleSortChange("priority", "asc");
                  }}
                  className="w-full text-start py-1 px-3 border-transparent hover:cursor-pointer hover:bg-[#091e4224]"
                >
                  <span className="text-[14px]/[20px]">Priority(Asc)</span>
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default ListAction;