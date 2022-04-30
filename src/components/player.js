import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { playAudio } from './util';

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
	//Effects
	useEffect(() => {
		//Toggle Active in Songs State
		const newSongs = songs.map((state) => {
			if (state.id === currentSong.id) {
				return { ...state, active: true };
			} else {
				return { ...state, active: false };
			}
		});
		setSongs(newSongs);
	}, [currentSong]);

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

	const skipSongHandler = (direction) => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			// console.log(currentIndex - 1);
			if (currentIndex - 1 === -1) {
				setCurrentSong(songs[songs.length - 1]);
				playAudio(isPlaying, audioRef);
				return;
			}
			setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
		playAudio(isPlaying, audioRef);
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
				<input
					type='range'
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					onChange={dragHandler}
				/>
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
