import { useState } from "react";
import { api } from "./api/api";
import type { LessonT } from "./types";
import { Lesson } from "./components/Lessons";
import "./App.css";

export default function App() {

    const [lesson, setLesson] = useState<LessonT | null>(null);
    const [loading, setLoading] = useState(false);

    const delays = [50, 50, 50, 80, 80, 100, 100, 200, 200, 210];

    const roulette = async (step = 0) => {

        try {
            const res = await api.get<LessonT>("");
            setLesson(res.data);

        } catch (err) {
            console.error("API ERROR");
            setLoading(false);
            return;
        }

        if (step < delays.length) {
            setTimeout(() => roulette(step + 1), delays[step]);
        } else {
            setLoading(false); // FINAL STOP
        }
    };

    const getRandomLesson = async () => {

        if (loading) return;

        setLoading(true);

        roulette();
    };

    return (
        <div id="app">

            <div id="main-container">

                {/* HEADER */}
                <img
                    id="header-img"
                    src="/header-image.png"
                    alt="Header"
                />
                  <div className="caution-rule"></div>
                {/* CONTENT AREA */}
                <div id="content-container">

                    {/* LEFT ADS */}
                    <div id="left-ads">
                        <img src="/ad-1.png" />
                    </div>

                    {/* CENTER PANEL (AHORA BOTÓN COMPLETO) */}
                    <div id="center-panel" onClick={getRandomLesson}>

                      

                        {!lesson && !loading && (
                            <div id="lesson-prompt">
                                Click Here <br />
                                To learn your lesson
                            </div>
                        )}

                       

                        {lesson && <Lesson lesson={lesson} />}


                    </div>

                    {/* RIGHT PANEL */}
                    <div id="right-panel">
                        <img src="/credit.png" />
                        <p>THIS SITE DESIGNED BY THE SOLAR OPPOSITES</p>
                    </div>

                </div>

            </div>

            <div id="fire-container"></div>

        </div>
    );
}
