import React from 'react';
import { playAudio } from './util';

const LibrarySong = ({
	song,
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
}) => {
	//Event Handlers
	const songSelectHandler = () => {
		setCurrentSong(song);
		playAudio(isPlaying, audioRef);
		//Toggle Active in Songs State
		const newSongs = songs.map((state) => {
			if (state.id === song.id) {
				return { ...state, active: true };
			} else {
				return { ...state, active: false };
			}
		});
		setSongs(newSongs);
	};

	return (
		<div
			className={`librarySong-container ${song.active ? 'selected' : ''}`}
			onClick={songSelectHandler}>
			<img src={song.cover} alt='song cover' />
			<div className='song-info'>
				<h2>{song.name}</h2>
				<h3>{song.artist}</h3>
			</div>
		</div>
	);
};

export default LibrarySong;
