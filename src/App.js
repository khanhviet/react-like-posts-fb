import './App.css';
import Hello from './index.tsx'
import img1 from './img/1.jpeg'
import img2 from './img/2.jpeg'
import video from './img/a.mp4'

const images1 = [
  video,
];
const images2 = [
  video,
  img1
];
const images3 = [
  video,
  img2,
  img1,
];
const images4 = [
  img1,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
  img2,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
];
const images5 = [
  video,
  img2,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
  img1,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
];
const images6 = [
  video,
  img2,
  img1,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
  img1,
  "https://castdj-comingsoon.s3.amazonaws.com/khanhviet12121/posts/Sample_Video_1280x720_1mb_ffa3a53275.mp4",
  img1,
  img1,

];
function App() {
  return (
    <div className="App">
      <div>
        <h1>1</h1>
        <Hello imagesOrVideos={images1} />
        <br />
      </div>
      <div>
        <h1>2</h1>

        <Hello imagesOrVideos={images2} />
        <br />
      </div>

      <div>
        <h1>3</h1>

        <Hello imagesOrVideos={images3} />
        <br />
      </div>

      <div>

        <h1>4</h1>

        <Hello imagesOrVideos={images4} />
        <br />
      </div>

      <div>
        <h1>5</h1>

        <Hello imagesOrVideos={images5} />
        <br />

      </div>
      <div>

        <h1>bigger 5</h1>

        <Hello imagesOrVideos={images6} />
      </div>


    </div >
  );
}

export default App;
