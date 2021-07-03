import React from "react";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
type ReactLikePostsFBProps = {
  imagesOrVideos: Array<string>;
};
export default function ReactLikePostsFB(props: ReactLikePostsFBProps) {
  const { imagesOrVideos = [] } = props;
  const [indexDisplay, setIndexDisplay] = useState<number>(-1);

  const renderVideo = (src: string) => {
    const elemVideo = document.createElement("video");
    elemVideo.className = "v-item video";
    elemVideo.src = src;
    elemVideo.controls = true;
    elemVideo.autoplay = true;
    return elemVideo;
  };

  const renderImg = (src: string) => {
    const elemImg = document.createElement("IMG") as HTMLImageElement;
    elemImg.className = "v-item img";
    elemImg.src = src;
    return elemImg;
  };

  const handlePrevNext = (e: any, type: string) => {
    e.preventDefault();
    const elemContainer = document.querySelector(
      ".v-main-content"
    ) as HTMLDivElement;

    setIndexDisplay((prev: number) => {
      let i = -1;
      imagesOrVideos.length !== 1 && elemContainer.firstChild?.remove();
      if (prev === 0 && type === "prev") {
        i = imagesOrVideos.length - 1;
      }
      if (prev === imagesOrVideos.length - 1 && type === "next") {
        i = 0;
      }
      return i === -1 ? (type === "prev" ? prev - 1 : prev + 1) : i;
    });
  };

  const createElementImgOrVideo = useCallback((type: string, src: string) => {
    return type === "img" ? renderImg(src) : renderVideo(src);
  }, []);

  const handleClose = (e: any) => {
    e.preventDefault();
    setIndexDisplay(-1);
    const elemClone = document.querySelector(
      ".v-container-clone"
    ) as HTMLDivElement;
    elemClone.remove();
  };

  const handleClick = (e: any, index: number) => {
    e.preventDefault();
    const elemDiv = document.createElement("div");

    const elemClose = document.createElement("div");
    elemClose.classList.add("v-btn-close");
    elemClose.addEventListener("click", handleClose);
    elemDiv.appendChild(elemClose);

    elemDiv.className = "v-container-clone";
    const elemButtonPrev = document.createElement("div") as HTMLDivElement;
    elemButtonPrev.addEventListener("click", (e) => handlePrevNext(e, "prev"));
    elemButtonPrev.classList.add("v-btn-prev");
    imagesOrVideos.length === 1 && elemButtonPrev.classList.add("v-only-one");
    elemDiv.appendChild(elemButtonPrev);

    setIndexDisplay(index);

    const elemDivContainer = document.createElement("div");
    elemDivContainer.classList.add("v-main-content");
    elemDiv.appendChild(elemDivContainer);

    const elemButtonNext = document.createElement("div");
    elemButtonNext.classList.add("v-btn-next");
    elemButtonNext.addEventListener("click", (e) => handlePrevNext(e, "next"));
    imagesOrVideos.length === 1 && elemButtonNext.classList.add("v-only-one");
    elemDiv.appendChild(elemButtonNext);
    document.body.appendChild(elemDiv);
  };

  const renderItem = (src: string, index: number) =>
    index < 5 ? (
      <div
        id={index.toString()}
        className={`v-col-${
          imagesOrVideos.length < 6 ? imagesOrVideos.length : 5
        } 
        ${imagesOrVideos.length === 2 ? "v-height-two" : ""}
        ${
          index === 0 && [3, 4].includes(imagesOrVideos.length) ? "v-three" : ""
        } 
        ${
          imagesOrVideos.length >= 5
            ? [0, 1].includes(index)
              ? ""
              : "v-three-in-five"
            : ""
        }`}
        data-index={index - 4}
      >
        <div
          data-index={
            index === 4 && imagesOrVideos.length > 5
              ? `+ ${imagesOrVideos.length - 5}`
              : ""
          }
          className={`v-ctn-img-video ${
            index === 4 && imagesOrVideos.length > 5 ? `v-bigger-five` : ""
          }`}
          onClick={(e) => handleClick(e, index)}
          onTouchStart={(e) => handleClick(e, index)}
        >
          {isVideo(src) ? (
            <video src={src} controls></video>
          ) : (
            <img src={src} alt={src} />
          )}
        </div>
      </div>
    ) : null;

  const isVideo = (src: string) => {
    const videos = ["mp4", "3gp", "ogg", "mov"];
    const indexVideo = videos.findIndex((item) => src?.endsWith(`.${item}`));
    return indexVideo > -1;
  };

  useEffect(() => {
    const divContainer = document.querySelector(
      ".v-main-content"
    ) as HTMLDivElement;

    const elemNumerical = document.querySelector(
      ".v-numerical-order"
    ) as HTMLDivElement;
    if (elemNumerical) {
      elemNumerical.innerHTML = (indexDisplay + 1).toString();
    }
    let type = isVideo(imagesOrVideos[indexDisplay]) ? "video" : "img";

    const element = createElementImgOrVideo(type, imagesOrVideos[indexDisplay]);
    divContainer?.appendChild(element);
  }, [createElementImgOrVideo, imagesOrVideos, indexDisplay]);

  return (
    <div className="v-container">
      {imagesOrVideos.map((item: string, index: number) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </div>
  );
}
