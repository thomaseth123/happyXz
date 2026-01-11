import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

// 🔴 CHANGE THESE ONLY
const PERSON_NAME = "Swastika";
const HERO_MESSAGE = "Happy Birthday ❤️ This is just for you.";
const CLOSING_NAME = "Arnav";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [birthdayReached, setBirthdayReached] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const musicPlayerRef = useRef(null);

  const goToPage = (pageNumber) => {
    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const current = refs[currentPage];
    const next = refs[pageNumber];

    gsap.to(current.current, {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
    });

    gsap.set(next.current, {
      x: "100%",
      opacity: 0,
      visibility: "visible",
    });

    gsap.to(next.current, {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        setCurrentPage(pageNumber);
        gsap.set(current.current, { visibility: "hidden", x: "0%" });
        window.scrollTo(0, 0);
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 8000);
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />

      {/* PAGE 1 */}
      <div ref={page1Ref} className="page" style={{ visibility: "visible" }}>
        <section className="hero">
          <h1>
            {birthdayReached ? (
              <>Happy Birthday <span className="highlight">{PERSON_NAME}</span> 🎂</>
            ) : (
              <>Counting down to <span className="highlight">{PERSON_NAME}ʼs</span> special day 🎂</>
            )}
          </h1>
          <p>{HERO_MESSAGE}</p>
        </section>

        <Countdown
          birthdayReached={birthdayReached}
          onBirthdayReached={handleBirthdayReached}
        />

        <button
          className="celebrate-btn"
          disabled={!birthdayReached}
          onClick={() => goToPage(2)}
        >
          🎀 Let’s Celebrate
        </button>
      </div>

      {/* PAGE 2 */}
      <div ref={page2Ref} className="page" style={{ visibility: "hidden" }}>
        <CelebrationPage onComplete={() => goToPage(3)} />
      </div>

      {/* PAGE 3 */}
      <div ref={page3Ref} className="page" style={{ visibility: "hidden" }}>
        <MessageCard />
        <button onClick={() => goToPage(4)}>📸 View Memories</button>
      </div>

      {/* PAGE 4 */}
      <div ref={page4Ref} className="page" style={{ visibility: "hidden" }}>
        <Gallery />
        <h2>💖 Forever Yours — {CLOSING_NAME} 💖</h2>
      </div>

      {showEffects && <Effects />}
    </div>
  );
}
export default App;
