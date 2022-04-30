import { useState, useRef } from 'react';
//Import Styling components
import './styles/app.scss';

//Import Components
import Songs from './components/songs';
import Player from './components/player';
import Library from './components/library';
import Navbar from './components/navbar';
//Import Ulit
import SongsData from './data';

function App() {
	//Refs
	const audioRef = useRef(null);

	//States
	const [songs, setSongs] = useState(SongsData());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [libraryActive, setLibraryActive] = useState(false);

	//Event Handler
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		if (current === duration) {
			console.log('next');
		}
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	return (
		<div className='App'>
			<Navbar
				libraryActive={libraryActive}
				setLibraryActive={setLibraryActive}
			/>
			<Songs currentSong={currentSong} />
			<Player
				songs={songs}
				setSongs={setSongs}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				audioRef={audioRef}
			/>
			<Library
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				audioRef={audioRef}
				libraryActive={libraryActive}
			/>
			<audio
				ref={audioRef}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				src={currentSong.audio}></audio>
		</div>
	);
}

export default App;
