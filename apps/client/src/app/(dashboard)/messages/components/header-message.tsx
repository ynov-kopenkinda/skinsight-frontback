import React from "react";
import { Heading } from "@radix-ui/themes";

const HeaderMessage = () => {
  return (
    <div className="bg-primary -mx-4 -mt-2 flex justify-center px-4 pb-9 pt-9 text-white md:-mx-16 md:px-16 lg:-mx-20 lg:px-20">
      <Heading as="h1" className="font-semibold! text-lg">
        Message
      </Heading>
    </div>
  );
};

export default HeaderMessage;
