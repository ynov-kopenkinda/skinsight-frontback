import { fakeUser } from "~/app/(dashboard)/tpmUser"

export const useUser: () => {
  data: typeof fakeUser | undefined;
  isLoading: boolean;
  isError: boolean;

} = () => {
  return {
    data: fakeUser,
    isLoading: false,
    isError: false,
  }
}