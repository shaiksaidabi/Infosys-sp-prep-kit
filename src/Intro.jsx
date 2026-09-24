import { useEffect, useState } from "react";
import "./intro.css";

export default function Intro({ day = 1, onFinish }) {
  const [text, setText] = useState("");

  const message = "WELCOME TO INFOSYS PREPARATION KIT";

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      index++;

      setText(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(typing);

        setTimeout(() => {
          onFinish();
        }, 1800);
      }
    }, 70);

    return () => clearInterval(typing);
  }, [onFinish]);

  const words = text.split(" ");

  return (
    <div className="intro-screen">

      <div className="intro-glow glow-one"></div>
      <div className="intro-glow glow-two"></div>

      <div className="intro-content">

        <div className="intro-welcome">
          {words.map((word, index) => (
            <span key={index}>
              {word}{" "}
            </span>
          ))}
          <span className="cursor">|</span>
        </div>

        {text === message && (
          <div className="intro-day">
            DAY {day}
          </div>
        )}

      </div>

    </div>
  );
}