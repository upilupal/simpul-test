"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface DropdownDeleteProps {
  todoId: number;
  onDelete: (id: number) => void;
}

const DropdownDelete: React.FC<DropdownDeleteProps> = ({
    todoId,
    onDelete
}) => {
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HiOutlineDotsHorizontal />
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="p-0 flex justify-center md:block bg-transparent border-none shadow-none">
          <Button 
            variant={"destructive"} 
            className=""
            onClick={() => onDelete(todoId)}
            >
            Delete
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownDelete;
