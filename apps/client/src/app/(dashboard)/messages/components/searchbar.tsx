"use client";

import React, { ChangeEvent } from "react";
import { IconButton, TextField } from "@radix-ui/themes";
import { IconSearch } from "@tabler/icons-react";

interface SearchbarProps {
  onSearch: (searchTerm: string) => void;
}

const Searchbar = ({ onSearch }: SearchbarProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="bg-primary -mx-4 -mt-2 mb-8 flex justify-center px-4 pb-10 text-white md:-mx-16 md:px-16 lg:-mx-20 lg:px-20">
      <TextField.Root className="w-full max-w-xl" size={"3"}>
        <TextField.Input
          onChange={handleInputChange}
          radius="medium"
          placeholder="Type the name of a practician..."
          color={"blue"}
          className="placeholder:text-gray-strong text-sm placeholder:text-sm"
        ></TextField.Input>
        <TextField.Slot pr={"3"}>
          <IconButton size="1" variant="ghost">
            <IconSearch height="18" width="18" color="#8a8a8e" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

export default Searchbar;
