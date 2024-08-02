import "./App.css";
import { useState } from "react";
import MainContainer from "./components/MainContainer";
import { ImagesChange } from "./components/ImagesChange";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const [images, setImages] = useState([
    { src: "/images/image01.jpg", start: 0, end: 2.5, id: 1 },
    { src: "/images/image02.jpg", start: 2.5, end: 4.4, id: 2 },
    { src: "/images/image03.jpg", start: 4.4, end: 6.2, id: 3 },
    { src: "/images/image04.jpg", start: 6.2, end: 8, id: 4 },
    { src: "/images/image05.jpg", start: 8, end: 9.8, id: 5 },
    { src: "/images/image06.jpg", start: 9.8, end: 11.7, id: 6 },
    { src: "/images/image07.jpg", start: 11.7, end: 13.6, id: 7 },
    { src: "/images/image08.jpg", start: 13.6, end: 15.5, id: 8 },
    { src: "/images/image09.jpg", start: 15.5, end: 17.3, id: 9 },
    { src: "/images/image10.jpg", start: 17.3, end: 19.1, id: 10 },
    { src: "/images/image01.jpg", start: 19.1, end: 21, id: 11 },
    { src: "/images/image02.jpg", start: 21, end: 22.8, id: 12 },
    { src: "/images/image03.jpg", start: 22.8, end: 24.6, id: 13 },
    { src: "/images/image04.jpg", start: 24.6, end: 26.4, id: 14 },
    { src: "/images/image05.jpg", start: 26.4, end: 28.2, id: 15 },
    { src: "/images/image06.jpg", start: 28.2, end: 30, id: 16 },
  ]);

  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <ul style={{ display: "flex" }}>
              <li style={{ listStyle: "none", marginRight: "50px" }}>
                <Link to="/">ホーム</Link>
              </li>
              <li style={{ listStyle: "none" }}>
                <Link to="/music">音楽へ</Link>
              </li>
              <li style={{ listStyle: "none", marginLeft: "50px" }}>
                <Link to="/change">画像順番変更</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<MainContainer images={images} />} />
            <Route
              path="/change"
              element={<ImagesChange images={images} setImages={setImages} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

function Home() {
  return;
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default App;
