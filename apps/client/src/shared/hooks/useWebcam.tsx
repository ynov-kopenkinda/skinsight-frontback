import { useQuery } from "@tanstack/react-query";

async function getCameraPermission() {
  if (
    !("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
  ) {
    throw new Error("No access to the webcam");
  }

  const cam = await navigator.mediaDevices.getUserMedia({ video: true });

  return cam;
}

const useWebcam = () => {
  return useQuery({
    queryKey: ["PERMISSION_CAM_KEY"],
    queryFn: getCameraPermission,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export default useWebcam;
