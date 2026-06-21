import { useEffect, useState } from "react"
import Hero from "./components/Hero"
import Loadingscreen from "./components/Loadingscreen"
import FileExplorer from "./components/FileExplorer"

const loadscreen_session_key = 'hasVisited'

function App() {

  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem(loadscreen_session_key) === null;
  });

  const [isContentVisble, setisContentVisble] = useState(false)

  useEffect(()=>{
    if(loading){
      const loadingTimer = setTimeout(()=>{
        setLoading(false);
        sessionStorage.setItem(loadscreen_session_key,'true')
      },3000);
      return ()=> clearTimeout(loadingTimer);
    }
  },[loading]);

  useEffect(()=>{
    if(!loading){
      const animationDelay = setTimeout(()=>{
        setisContentVisble(true);
      },175);
      return ()=> clearTimeout(animationDelay);
    }
  },[loading])

  if(loading){
    return <Loadingscreen />
  }
    
  return (
    <div className={`transition-opacity duration-700 ${isContentVisble ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <FileExplorer />
    </div>
  )

}

export default App