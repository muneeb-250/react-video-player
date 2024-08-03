import { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoMdPlay, IoMdPause, IoMdRepeat } from "react-icons/io";

function App() {
  const videRef = useRef<HTMLVideoElement>(null)

  type State = {
    isPlaying: boolean
    isPaused: boolean
    isMuted: boolean
    isEnded: boolean
    speed: number
  }
  const [state, setState] = useState<State>({
    isPlaying: false,
    isPaused: false,
    isMuted: false,
    isEnded: false,
    speed: 1

  })

  const togglePlay = () => {
    setState({ ...state, isPlaying: !state.isPlaying, isPaused: false })
  }

  useEffect(() => {
    if (videRef.current) {
      videRef.current.ended && setState({ ...state, isEnded: true, isPlaying: false })
    }
  })

  useEffect(() => {
    state.isPlaying ?
      videRef.current?.play() :
      videRef.current?.pause()
  }, [state.isPlaying])

  return <main className='bg-rose-300 flex flex-col justify-center items-center h-screen gap-y-2'>
    <h1 className='text-3xl font-bold text-white drop-shadow-lg'>My Useless Video Player</h1>
    <div className='border-4  rounded-lg overflow-clip relative hover:border-black cursor-pointer group shadow-xl'>
      <video ref={videRef} width={900} >
        <source src="src/assets/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='w-full h-10 bg-white/30 items-center backdrop-blur-md absolute -bottom-12 flex px-2 group-hover:bottom-0 transition-all duration-300'>
        <button onClick={togglePlay}>
          {
            state.isPlaying ? <IoMdPause className='text-white size-6' /> : <IoMdPlay className='text-white size-6' />}
        </button>
      </div>
    </div>

  </main>
}

export default App
