import React, { useEffect, useState } from "react";

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const handleStart = () => {
    setIsStart(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };

  const handleReset = () => {
    setIsStart(false);
    clearInterval(timerId);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;

    if (id === 'hours') {
      setHours(value);
    } else if (id === 'minutes') {
      setMinutes(value);
    } else if (id === 'seconds') {
      setSeconds(value);
    }
  };

  const runTimer = () => {
    if (seconds > 0) {
      setSeconds((s) => s - 1);
    } else if (seconds === 0 && minutes > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (minutes === 0 && hours > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
  };

  useEffect(() => {
    if (isStart && !isPaused) {
      const tid = setInterval(() => {
        runTimer();
      }, 1000);
      setTimerId(tid);

      return () => {
        clearInterval(tid);
      };
    }
  }, [isStart, isPaused, hours, minutes, seconds]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16 gap-8 text-white">
        <div>
          <h1 className="text-6xl">Countdown Timer</h1>
          <p className="text-xl text-center mt-2">Your Time begins</p>
        </div>
        {!isStart && (
          <div className="flex justify-center text-center gap-2">
            <div>
              <input
                onChange={handleInput}
                id="hours"
                className="text-center text-2xl p-3 border-none bg-inherit text-white"
                placeholder="HH"
              />
              <h4>Hours</h4>
            </div>
            <div>
              <input
                onChange={handleInput}
                id="minutes"
                className="text-center text-2xl p-3 border-none bg-inherit text-white"
                placeholder="MM"
              />
              <h4>Minutes</h4>
            </div>
            <div>
              <input
                onChange={handleInput}
                id="seconds"
                className="text-center text-2xl p-3 border-none bg-inherit text-white"
                placeholder="SS"
              />
              <h4>Seconds</h4>
            </div>
            <button
              onClick={handleStart}
              className="text-lg text-white bg-black px-10 py-1"
            >
              Start
            </button>
          </div>
        )}
      </div>

      {isStart && (
        <div className="flex flex-col items-center justify-center text-center gap-2 mt-16 text-white">
          <div className="flex items-center text-6xl gap-8">
            <div>{hours.toString().padStart(2, '0')}</div>
            <span>:</span>
            <div>{minutes.toString().padStart(2, '0')}</div>
            <span>:</span>
            <div>{seconds.toString().padStart(2, '0')}</div>
          </div>

          <div className="space-x-4 mt-8">
            {!isPaused ? (
              <button
                onClick={handlePause}
                className="text-lg text-white bg-black px-10 py-1"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="text-lg text-white bg-black px-10 py-1"
              >
                Resume
              </button>
            )}
            <button
              onClick={handleReset}
              className="text-lg text-white bg-black px-10 py-1"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
