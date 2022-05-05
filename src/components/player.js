import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	songs,
	setSongs,
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	audioRef,
}) => {
	//Functions
	const activeSongHandler = (nextPrev) => {
		//Toggle Active in Songs State
		const newSongs = songs.map((state) => {
			if (state.id === nextPrev.id) {
				return { ...state, active: true };
			} else {
				return { ...state, active: false };
			}
		});
		setSongs(newSongs);
	};

	//Events Handlers
	const playSongHandler = () => {
		if (!isPlaying) {
			audioRef.current.play();
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const skipSongHandler = async (direction) => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeSongHandler(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			if (currentIndex - 1 === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeSongHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeSongHandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
	};

	//functions
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	return (
		<div className='player'>
			<div className='time-controls'>
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className='track'>
					<input
						type='range'
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={dragHandler}
					/>
					<div
						style={{ transform: `translateX(${songInfo.animatePercentage}%)` }}
						className='track-animation'></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className='player-controls'>
				<FontAwesomeIcon
					className='skip-back'
					icon={faAngleLeft}
					size='2x'
					onClick={() => skipSongHandler('skip-back')}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					icon={isPlaying ? faPause : faPlay}
					size='2x'
				/>
				<FontAwesomeIcon
					className='skip-forward'
					icon={faAngleRight}
					size='2x'
					onClick={() => skipSongHandler('skip-forward')}
				/>
			</div>
		</div>
	);
};

export default Player;
