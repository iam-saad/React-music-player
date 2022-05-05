import React from 'react';

const LibrarySong = ({
	song,
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
	currentSong,
}) => {
	//Event Handlers
	const songSelectHandler = async () => {
		setCurrentSong(song);
		//Toggle Active in Songs State
		const newSongs = songs.map((state) => {
			if (state.id === song.id) {
				return { ...state, active: true };
			} else {
				return { ...state, active: false };
			}
		});
		await setSongs(newSongs);
		if (isPlaying) audioRef.current.play();
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
