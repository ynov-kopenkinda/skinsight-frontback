import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Card, Text } from "@radix-ui/themes";

export const AppFooter = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const currentYear = new Date().getFullYear();
  return (
    <Card {...props} ref={ref}>
      <Text>Copyright &copy; {currentYear}</Text>
    </Card>
  );
});
