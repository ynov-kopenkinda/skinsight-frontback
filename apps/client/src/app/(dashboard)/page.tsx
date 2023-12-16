"use client";

import { useState } from "react";
import { Button, Card, Flex, Grid } from "@radix-ui/themes";

export default function HomePage() {
  const [show, setShow] = useState(0);
  return (
    <Grid columns="12" gap="2" height="100%">
      <Card className="col-span-12 md:col-span-2">
        <Flex gap="1" className="max-h-12 flex-row md:max-h-full md:flex-col">
          <Button variant="ghost" onClick={() => setShow(0)}>
            Files
          </Button>
          <Button variant="ghost" onClick={() => setShow(1)}>
            Other feature
          </Button>
          <Button variant="ghost" onClick={() => setShow(2)}>
            2
          </Button>
          <Button variant="ghost" onClick={() => setShow(3)}>
            3
          </Button>
          <Button variant="ghost" onClick={() => setShow(4)}>
            7
          </Button>
        </Flex>
      </Card>
      <Card className="col-span-12 md:col-span-10">
        {show === 0 && <div>Files</div>}
        {show === 1 && <div>Other feature</div>}
        {show === 2 && <div>2</div>}
        {show === 3 && <div>3</div>}
        {show === 4 && <div>7</div>}
      </Card>
    </Grid>
  );
}
