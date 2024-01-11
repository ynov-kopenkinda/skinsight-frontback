import React from "react";
import { IconSearch } from "@tabler/icons-react";

import IconButton from "~/shared/ui/IconButton";

const Nav = () => {
  return (
    <div className="mt-12 flex gap-x-2">
      <IconButton
        icon={<IconSearch size={20} />}
        link="/"
        label="Find doctor"
      />
    </div>
  );
};

export default Nav;
