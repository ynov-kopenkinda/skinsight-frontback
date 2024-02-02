"use client";

import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import {
  IconCamera,
  IconFile,
  IconLoader,
  IconRefresh,
  IconReload,
  IconUpload,
} from "@tabler/icons-react";
import Webcam from "react-webcam";

import useWebcam from "~/shared/hooks/useWebcam";

function PhotoWrapper() {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const [isFileLoading, setIsFileLoading] = useState(false);
  const { isError, isLoading } = useWebcam();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  } satisfies MediaTrackConstraints;

  const capture = useCallback(() => {
    if (imgUrl) {
      console.log("toto");
    }

    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc === null) return;
    setImgUrl(imageSrc);
  }, [webcamRef, imgUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      setIsFileLoading(true);
      const imageUrl = URL.createObjectURL(file);
      setTimeout(() => {
        setImgUrl(imageUrl);
      }, 1000);
    }
  };

  const triggerFileInputClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleImageLoaded = () => {
    setIsFileLoading(false);
  };

  return (
    <div>
      <Heading as="h1" className="text-sm" mb="4">
        Take a photo of your skin
      </Heading>
      {isError && (
        <Text as="p" mb={"4"}>
          You have to enabled the camera permission or upload a file.
        </Text>
      )}
      {isLoading && <IconLoader size={32} className="animate-spin" />}
      <div className="relative">
        {!imgUrl && !isError && !isLoading && (
          <Webcam
            audio={false}
            className={`${facingMode === "user" ? "-scale-x-100" : ""}`}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
        )}
        {imgUrl && (
          <img
            src={imgUrl}
            className={`${facingMode === "user" ? "-scale-x-100" : ""}`}
            alt="image"
            onLoad={handleImageLoaded}
          />
        )}
        {isFileLoading && (
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <IconLoader
              color={`${isError || isLoading ? "black" : "white"}`}
              className="animate-spin"
              size={48}
            />
          </span>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <div
          className={`${
            isError || isLoading
              ? "mt-4"
              : "absolute bottom-2 left-1/2 mt-4 flex w-full -translate-x-1/2 justify-center gap-x-2"
          }`}
        >
          {!imgUrl && (
            <Button size={"3"} onClick={triggerFileInputClick}>
              <IconFile />
            </Button>
          )}
          {!isError && !isLoading && (
            <Button size={"3"} onClick={capture}>
              {imgUrl ? <IconUpload /> : <IconCamera />}
            </Button>
          )}
          {(isError || isLoading) && imgUrl && (
            <Button size={"3"} onClick={capture}>
              {imgUrl ? <IconUpload /> : <IconCamera />}
            </Button>
          )}
          {imgUrl && (
            <Button
              size={"3"}
              variant="surface"
              className="border border-black"
              onClick={() => setImgUrl("")}
            >
              <IconReload />
            </Button>
          )}
          {!isError && !isLoading && !imgUrl && (
            <Button
              size={"3"}
              onClick={() =>
                facingMode === "environment"
                  ? setFacingMode("user")
                  : setFacingMode("environment")
              }
            >
              <IconRefresh />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoWrapper;
