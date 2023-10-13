import React, { useState, useEffect } from "react";

const GreenLightRedLight = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setGameStarted(true);
    setTimeLeft(y);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    console.log("Form submitted:", formData);
  };
  const difficultySettings = {
    easy: { n: 10, y: 40 },
    medium: { n: 15, y: 40 },
    hard: { n: 25, y: 40 },
  };

  const { n, y } = difficultySettings[difficulty];

  useEffect(() => {
    let colorChangeInterval;
    let countdownInterval;

    if (gameStarted && !gameOver) {
      // Start the color change interval
      colorChangeInterval = setInterval(() => {
        const randomColor = Math.random() < 0.5 ? "red" : "green";
        setBoxColor(randomColor);
      }, 1000 + Math.random() * 1000);

      // Start the game timer
      let time = y;
      countdownInterval = setInterval(() => {
        setTimeLeft(time);
        time--;

        if (time < 0) {
          clearInterval(countdownInterval);
          clearInterval(colorChangeInterval);
          setGameOver(true);
        }
      }, 1000);
    }

    // Clean up intervals on component unmount or game over
    return () => {
      clearInterval(colorChangeInterval);
      clearInterval(countdownInterval);
    };
  }, [gameStarted, gameOver, y]);

  const [boxColor, setBoxColor] = useState("red");

  const handleRestartGame = () => {
    setGameStarted(false);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const renderGameControls = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexFlow: "column",
        }}
      >
        <h1>GreenLightRedLight Game</h1>
        {/* <div id="firstCont"> */}
        <form id="firstCont" onSubmit={handleSubmit} autoComplete="off">
          <label>
            Name :
            <input
              onChange={inputEvent}
              name="name"
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              required
              autoComplete="off"
            />
            <br />
          </label>
          <label>
            Email ID :
            <input
              onChange={inputEvent}
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              required
              autoComplete="off"
            />
            <br />
          </label>
          <label>
            Mobile:
            <input
              onChange={inputEvent}
              name="mobile"
              type="tel"
              placeholder="Enter Mobile No."
              value={formData.mobile}
              required
              autoComplete="off"
            />
            <br />
          </label>
          <label>
            Select Difficulty:
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button
            type="submit"
            style={{
              marginTop: "2rem",
              padding: "0.5rem 2rem",
              backgroundColor: "#fff",
              color: "cadetblue",
              fontWeight: "700",
              fontSize: "1.3rem",
              border: "none",
              borderRadius: "10px",
              boxShadow: "2px 3px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            Start Game
          </button>
        </form>
        {/* </div> */}
      </div>
    );
  };

  const handleBoxClick = () => {
    if (boxColor === "green") {
      setScore(score + 1);

      if (score + 1 === n) {
        setGameWon(true);
        setGameStarted(false);
      }
    } else {
      setGameOver(true);
      setGameStarted(false);
    }
  };
  return (
    <div>
      {!gameStarted ? (
        renderGameControls()
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexFlow: "column",
            // backgroundColor: "cadetblue",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "2rem",
              width: "100%",
              height: "70px",
              alignItems: "center",
              justifyContent: "space-around",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p>
              Difficulty Level:<span>{difficulty}</span>
            </p>
            <p>
              Score:
              <span>{score}</span>
            </p>
            <p>
              Time Left:
              <span>{timeLeft} seconds</span>
            </p>
          </div>
          {formData.name && formData.email && formData.mobile && (
            <div style={{ marginBottom: "2rem" }}>
              <p>
                Username : <span>{formData.name}</span>
              </p>
              <br />
              <p>
                Email id: <span>{formData.email}</span>{" "}
              </p>
              <br />
              <p>
                Mobile : <span>{formData.mobile}</span>
              </p>
            </div>
          )}
          <div
            onClick={handleBoxClick}
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: boxColor,
              cursor: "pointer",
              boxShadow: "2px 4px 13px rgba(0, 0, 0, 0.3)",
              borderRadius: "2px",
            }}
          ></div>
          {gameOver && (
            <p style={{ fontWeight: "700", fontSize: "1.7rem", color: "red" }}>
              Game Over!😥
            </p>
          )}
          {gameWon && (
            <p
              style={{
                fontWeight: "700",
                fontSize: "1.7rem",
                color: "cadetblue",
              }}
            >
              You Win!😄
            </p>
          )}

          <button
            onClick={handleRestartGame}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 2rem",
              color: "#fff",
              backgroundColor: "cadetblue",
              fontWeight: "700",
              fontSize: "1.3rem",
              border: "none",
              borderRadius: "10px",
              boxShadow: "2px 4px 13px rgba(0, 0, 0, 0.3)",
            }}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GreenLightRedLight;
