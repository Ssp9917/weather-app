import { useEffect, useState } from "react";
import History from "./weather/History";
import Weather from "./weather/Weather";


function App() {
  const [weather,setWeather]= useState(null)
  const [history,setHistory]=useState([])
  const [input,setInput] = useState('')
  const [loading,setLoading] = useState(false)
  const API_KEY = `21805bff7224936fa25d6cec016a0a4b`;


  const featchWeather = async (city) =>{
    console.log(city)
    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data)
    setLoading(false)

    if(data.cod=="200"){

      let historyData =  {
        name:city,
        timeStamp: new Date().getTime()
      }
      setWeather(data);
      setHistory(
        [
          ...history,
          historyData
        ]
      )

    }
    else if(data.cod=="404"){
      setWeather("404")
    }
    else{
      setWeather(null)
    }
  }
  // console.log(weather)

  useEffect(
    ()=>{
      if(history.length != 0){
        localStorage.setItem("history",JSON.stringify(history))
      }
    },[history]
  )

  useEffect(
    () => {
      const lsHistory = localStorage.getItem("history");
      if (lsHistory != null) {
        setHistory(JSON.parse(lsHistory));
      }
    },
    []
  )
  return (
    <div className='max-w-[1200px] mx-auto grid grid-cols-12'>
      <div className="col-span-2 md:col-span-3">
        <History history={history} setInput={setInput} setHistory={setHistory}/>
      </div>
      <div className="col-span-10 md:col-span-9">
        <Weather featchWeather={featchWeather} weather={weather} input={input} loading={loading} setInput={setInput}/>
      </div>
    </div>
  );
}

export default App;
