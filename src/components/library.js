import React from 'react';
import LibrarySong from './librarySong';

const Library = ({
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
	libraryActive,
}) => {
	return (
		<div className={`library ${libraryActive ? 'active' : ''}`}>
			<h1>Songs</h1>
			{songs.map((song) => (
				<LibrarySong
					song={song}
					songs={songs}
					setSongs={setSongs}
					setCurrentSong={setCurrentSong}
					isPlaying={isPlaying}
					key={song.id}
					audioRef={audioRef}
				/>
			))}
		</div>
	);
};
export default Library;
