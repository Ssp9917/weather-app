import React from "react";
import { getDateFromStamp, getTimeDifference } from "./Helper";
import { FaHistory } from "react-icons/fa";

const History = ({ history, setInput, setHistory }) => {
  const reCheckWeather = (h) => {
    setInput(h.name);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <>
      <div className="text-4xl font-bold text-center border-r-2 hidden md:block text-red-500">
        History
      </div>
      <FaHistory className="md:hidden mt-12 text-xl text-red-500 ml-3  " />
      <ul>
        {history.map((h, i) => {
          return (
            <li
              key={i}
              className="relative p-2 shadow-md m-1 hidden md:block"
              onClick={() => reCheckWeather(h)}
            >
              {h.name}
              <span className="absolute right-2">
                {getTimeDifference(h.timeStamp, 1)}
              </span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={clearHistory}
        type="button"
        class={`focus:outline-none ml-10 mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${history.length == 0 ? 'hidden' : 'block'}`}
      >
        Clear History
      </button>
    </>
  );
};

export default History;
