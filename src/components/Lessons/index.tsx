import type { LessonT } from "../../types";
import "./style.css";

export const Lesson = (params: { lesson: LessonT }) => {

    const { lesson } = params;

    const number = lesson.wisdom.split(".")[0];
    const text = lesson.wisdom.substring(number.length + 2);

    return (
        <div className="lesson-panel">

            <div id="lesson-number">
                Lesson #{number}
            </div>

            <div id="lesson-text">
                {text}
            </div>

        </div>
    );
};
