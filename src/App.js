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
		const animatePercentage = ((current / duration) * 100).toFixed(2);

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animatePercentage,
		});
	};

	const songEndHandler = async () => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		await audioRef.current.play();
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<div className={`App ${libraryActive ? 'library-active' : ''} `}>
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
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				audioRef={audioRef}
				libraryActive={libraryActive}
			/>
			<audio
				ref={audioRef}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={songEndHandler}
				src={currentSong.audio}></audio>
		</div>
	);
}

export default App;
