import { Heading } from "@radix-ui/themes";

import SignInForm from "./components/SignInForm";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary flex h-48 items-center justify-center text-white">
        <Heading as="h1" size={"8"} style={{ letterSpacing: ".125rem" }}>
          skinsight
        </Heading>
      </div>
      <SignInForm />
    </div>
  );
}
