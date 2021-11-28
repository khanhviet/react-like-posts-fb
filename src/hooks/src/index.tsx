import React, { useState, useEffect, useCallback } from "react";
import "./styles.scss";
type ReactLikePostsFBProps = {
  imagesOrVideos: Array<string>;
};

const ReactLikePostsFB = ({ imagesOrVideos }: ReactLikePostsFBProps) => {
  const [indexDisplay, setindexDisplay] = useState<number>(-1);

  const isVideo = (src: string) => {
    const videos = ["mp4", "ogg", "mov"];
    return videos.some((item) => src.endsWith(`.${item}`));
  };

  const renderVideo = (src: string) => {
    const elemVideo = document.createElement("video") as HTMLVideoElement;
    elemVideo.controls = true;
    elemVideo.src = src;
    elemVideo.autoplay = true;
    return elemVideo;
  };

  const renderImg = (src: string) => {
    const elemImg = document.createElement("img") as HTMLImageElement;
    elemImg.src = src;
    return elemImg;
  };

  const renderVideoOrImg = useCallback((src: string) => {
    return isVideo(src) ? renderVideo(src) : renderImg(src);
  }, []);

  const removeImgOrVideoClone = () => {
    const elemMainContent = document.querySelector(
      ".main-content"
    ) as HTMLDivElement;
    elemMainContent?.firstChild?.remove();
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    // check only 1 item
    if (imagesOrVideos.length > 1) {
      removeImgOrVideoClone();
      setindexDisplay((current) =>
        current === imagesOrVideos.length ? 1 : current + 1
      );
    }
  };

  const handlePrev = (e: any) => {
    e.preventDefault();
    // check only 1 item
    if (imagesOrVideos.length > 1) {
      removeImgOrVideoClone();
      setindexDisplay((current) =>
        current === 1 ? imagesOrVideos.length : current - 1
      );
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    setindexDisplay(-1);
    const elemContainerClone = document.querySelector(
      ".react-like-posts-fb-clone"
    );
    elemContainerClone?.remove();
  };

  const handleClickItem = (e: any, index: number) => {
    e.preventDefault();
    const elemBtnClose = document.createElement("div");
    elemBtnClose.classList.add("btn-close");
    elemBtnClose.addEventListener("click", handleClose);

    const elemPrev = document.createElement("div");
    elemPrev.classList.add("btn-prev");
    elemPrev.addEventListener("click", handlePrev);
    imagesOrVideos.length === 1 && elemPrev.classList.add("only-one");

    const elemMainContent = document.createElement("div");
    elemMainContent.classList.add("main-content");

    const elemBtnNext = document.createElement("div");
    elemBtnNext.classList.add("btn-next");
    elemBtnNext.addEventListener("click", handleNext);
    imagesOrVideos.length === 1 && elemBtnNext.classList.add("only-one");

    const elemtContainer = document.createElement("div");
    elemtContainer.classList.add("react-like-posts-fb-clone");

    elemtContainer.appendChild(elemBtnClose);
    elemtContainer.appendChild(elemPrev);
    elemtContainer.appendChild(elemMainContent);
    elemtContainer.appendChild(elemBtnNext);

    document.body.appendChild(elemtContainer);
    setindexDisplay(index);
  };

  useEffect(() => {
    const elemMainContent = document.querySelector(".main-content");
    if (elemMainContent && indexDisplay > -1) {
      const el = renderVideoOrImg(imagesOrVideos[indexDisplay - 1]);
      elemMainContent.appendChild(el);
    }
  }, [imagesOrVideos, indexDisplay, renderVideoOrImg]);

  const renderimagesOrVideos = (src: string, index: number) => {
    return (
      <div
        className={`col-${
          imagesOrVideos.length > 5 ? 5 : imagesOrVideos.length
        } ${imagesOrVideos.length > 5 && index === 5 ? "bigger-5" : ""}`}
        data-count={imagesOrVideos.length - 5}
        onClick={(e) => handleClickItem(e, index)}
        onTouchStart={(e) => handleClickItem(e, index)}
      >
        <div className="item">
          {isVideo(src) ? (
            <video src={src} controls />
          ) : (
            <img src={src} alt="" />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="react-like-posts-fb">
      {imagesOrVideos.map((item, index) => (
        <React.Fragment key={index}>
          {index < 5 && renderimagesOrVideos(item, index + 1)}
        </React.Fragment>
      ))}
    </div>
  );
};
export default ReactLikePostsFB;
