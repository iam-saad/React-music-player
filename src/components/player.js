import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	isPlaying,
	setIsPlaying,
	songInfo,
	audioRef,
}) => {
	
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
					max={songInfo.duration}
					value={songInfo.currentTime}
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className='player-controls'>
				<FontAwesomeIcon className='skip-back' icon={faAngleLeft} size='2x' />
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
				/>
			</div>
		</div>
	);
};

export default Player;
