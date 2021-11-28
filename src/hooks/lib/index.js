"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./index.css");
var ReactLikePostsFB = function (_a) {
    var imagesOrVideos = _a.imagesOrVideos;
    var _b = react_1.useState(-1), indexDisplay = _b[0], setindexDisplay = _b[1];
    var isVideo = function (src) {
        var videos = ["mp4", "ogg", "mov"];
        return videos.some(function (item) { return src.endsWith("." + item); });
    };
    var renderVideo = function (src) {
        var elemVideo = document.createElement("video");
        elemVideo.controls = true;
        elemVideo.src = src;
        elemVideo.autoplay = true;
        return elemVideo;
    };
    var renderImg = function (src) {
        var elemImg = document.createElement("img");
        elemImg.src = src;
        return elemImg;
    };
    var renderVideoOrImg = react_1.useCallback(function (src) {
        return isVideo(src) ? renderVideo(src) : renderImg(src);
    }, []);
    var removeImgOrVideoClone = function () {
        var _a;
        var elemMainContent = document.querySelector(".main-content");
        (_a = elemMainContent === null || elemMainContent === void 0 ? void 0 : elemMainContent.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
    };
    var handleNext = function (e) {
        e.preventDefault();
        // check only 1 item
        if (imagesOrVideos.length > 1) {
            removeImgOrVideoClone();
            setindexDisplay(function (current) {
                return current === imagesOrVideos.length ? 1 : current + 1;
            });
        }
    };
    var handlePrev = function (e) {
        e.preventDefault();
        // check only 1 item
        if (imagesOrVideos.length > 1) {
            removeImgOrVideoClone();
            setindexDisplay(function (current) {
                return current === 1 ? imagesOrVideos.length : current - 1;
            });
        }
    };
    var handleClose = function (e) {
        e.preventDefault();
        setindexDisplay(-1);
        var elemContainerClone = document.querySelector(".react-like-posts-fb-clone");
        elemContainerClone === null || elemContainerClone === void 0 ? void 0 : elemContainerClone.remove();
    };
    var handleClickItem = function (e, index) {
        e.preventDefault();
        var elemBtnClose = document.createElement("div");
        elemBtnClose.classList.add("btn-close");
        elemBtnClose.addEventListener("click", handleClose);
        var elemPrev = document.createElement("div");
        elemPrev.classList.add("btn-prev");
        elemPrev.addEventListener("click", handlePrev);
        imagesOrVideos.length === 1 && elemPrev.classList.add("only-one");
        var elemMainContent = document.createElement("div");
        elemMainContent.classList.add("main-content");
        var elemBtnNext = document.createElement("div");
        elemBtnNext.classList.add("btn-next");
        elemBtnNext.addEventListener("click", handleNext);
        imagesOrVideos.length === 1 && elemBtnNext.classList.add("only-one");
        var elemtContainer = document.createElement("div");
        elemtContainer.classList.add("react-like-posts-fb-clone");
        elemtContainer.appendChild(elemBtnClose);
        elemtContainer.appendChild(elemPrev);
        elemtContainer.appendChild(elemMainContent);
        elemtContainer.appendChild(elemBtnNext);
        document.body.appendChild(elemtContainer);
        setindexDisplay(index);
    };
    react_1.useEffect(function () {
        var elemMainContent = document.querySelector(".main-content");
        if (elemMainContent && indexDisplay > -1) {
            var el = renderVideoOrImg(imagesOrVideos[indexDisplay - 1]);
            elemMainContent.appendChild(el);
        }
    }, [imagesOrVideos, indexDisplay, renderVideoOrImg]);
    var renderimagesOrVideos = function (src, index) {
        return (react_1.default.createElement("div", { className: "col-" + (imagesOrVideos.length > 5 ? 5 : imagesOrVideos.length) + " " + (imagesOrVideos.length > 5 && index === 5 ? "bigger-5" : ""), "data-count": imagesOrVideos.length - 5, onClick: function (e) { return handleClickItem(e, index); }, onTouchStart: function (e) { return handleClickItem(e, index); } },
            react_1.default.createElement("div", { className: "item" }, isVideo(src) ? (react_1.default.createElement("video", { src: src, controls: true })) : (react_1.default.createElement("img", { src: src, alt: "" })))));
    };
    return (react_1.default.createElement("div", { className: "react-like-posts-fb" }, imagesOrVideos.map(function (item, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index }, index < 5 && renderimagesOrVideos(item, index + 1))); })));
};
exports.default = ReactLikePostsFB;
//# sourceMappingURL=index.js.map