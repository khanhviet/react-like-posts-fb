"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
require("./index.css");
function ReactLikePostsFB(props) {
    var _a = props.imagesOrVideos, imagesOrVideos = _a === void 0 ? [] : _a;
    var _b = react_2.useState(-1), indexDisplay = _b[0], setIndexDisplay = _b[1];
    var renderVideo = function (src) {
        var elemVideo = document.createElement("video");
        elemVideo.className = "v-item video";
        elemVideo.src = src;
        elemVideo.controls = true;
        elemVideo.autoplay = true;
        return elemVideo;
    };
    var renderImg = function (src) {
        var elemImg = document.createElement("IMG");
        elemImg.className = "v-item img";
        elemImg.src = src;
        return elemImg;
    };
    var handlePrevNext = function (e, type) {
        e.preventDefault();
        var elemContainer = document.querySelector(".v-main-content");
        setIndexDisplay(function (prev) {
            var _a;
            var i = -1;
            imagesOrVideos.length !== 1 && ((_a = elemContainer.firstChild) === null || _a === void 0 ? void 0 : _a.remove());
            if (prev === 0 && type === "prev") {
                i = imagesOrVideos.length - 1;
            }
            if (prev === imagesOrVideos.length - 1 && type === "next") {
                i = 0;
            }
            return i === -1 ? (type === "prev" ? prev - 1 : prev + 1) : i;
        });
    };
    var createElementImgOrVideo = react_2.useCallback(function (type, src) {
        return type === "img" ? renderImg(src) : renderVideo(src);
    }, []);
    var handleClose = function (e) {
        e.preventDefault();
        setIndexDisplay(-1);
        var elemClone = document.querySelector(".v-container-clone");
        elemClone.remove();
    };
    var handleClick = function (e, index) {
        e.preventDefault();
        var elemDiv = document.createElement("div");
        var elemClose = document.createElement("div");
        elemClose.classList.add("v-btn-close");
        elemClose.addEventListener("click", handleClose);
        elemDiv.appendChild(elemClose);
        elemDiv.className = "v-container-clone";
        var elemButtonPrev = document.createElement("div");
        elemButtonPrev.addEventListener("click", function (e) { return handlePrevNext(e, "prev"); });
        elemButtonPrev.classList.add("v-btn-prev");
        imagesOrVideos.length === 1 && elemButtonPrev.classList.add("v-only-one");
        elemDiv.appendChild(elemButtonPrev);
        setIndexDisplay(index);
        var elemDivContainer = document.createElement("div");
        elemDivContainer.classList.add("v-main-content");
        elemDiv.appendChild(elemDivContainer);
        var elemButtonNext = document.createElement("div");
        elemButtonNext.classList.add("v-btn-next");
        elemButtonNext.addEventListener("click", function (e) { return handlePrevNext(e, "next"); });
        imagesOrVideos.length === 1 && elemButtonNext.classList.add("v-only-one");
        elemDiv.appendChild(elemButtonNext);
        document.body.appendChild(elemDiv);
    };
    var renderItem = function (src, index) { return (react_1.default.createElement("div", { id: index.toString(), className: "v-col-" + (imagesOrVideos.length < 6 ? imagesOrVideos.length : 5) + " " + (imagesOrVideos.length === 2 ? "v-height-two" : "") + " " + (index === 0 && imagesOrVideos.length === 3 ? "v-three" : "") + " " + (imagesOrVideos.length >= 5
            ? [0, 1].includes(index)
                ? "v-height-two"
                : "v-three-in-five"
            : "") },
        react_1.default.createElement("div", { "data-index": index === 4 && imagesOrVideos.length > 5
                ? "+ " + (imagesOrVideos.length - 5)
                : "", className: "v-ctn-img-video " + (index === 4 && imagesOrVideos.length > 5 ? "v-bigger-five" : ""), onClick: function (e) { return handleClick(e, index); }, onTouchStart: function (e) { return handleClick(e, index); } }, isVideo(src) ? (react_1.default.createElement("video", { src: src, controls: true })) : (react_1.default.createElement("img", { src: src, alt: src }))))); };
    var isVideo = function (src) {
        var videos = ["mp4", "3gp", "ogg", "mov"];
        var indexVideo = videos.findIndex(function (item) { return src === null || src === void 0 ? void 0 : src.endsWith("." + item); });
        return indexVideo > -1;
    };
    react_2.useEffect(function () {
        var divContainer = document.querySelector(".v-main-content");
        var type = isVideo(imagesOrVideos[indexDisplay]) ? "video" : "img";
        var element = createElementImgOrVideo(type, imagesOrVideos[indexDisplay]);
        divContainer === null || divContainer === void 0 ? void 0 : divContainer.appendChild(element);
    }, [createElementImgOrVideo, imagesOrVideos, indexDisplay]);
    return (react_1.default.createElement("div", { className: "v-container" }, imagesOrVideos.map(function (item, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index }, index < 5 ? renderItem(item, index) : null)); })));
}
exports.default = ReactLikePostsFB;
//# sourceMappingURL=index.js.map