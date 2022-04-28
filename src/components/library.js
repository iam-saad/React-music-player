import React from 'react';
import LibrarySong from './librarySong';

const Library = ({
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
}) => {
	return (
		<div className='library'>
			<h1>Library</h1>
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
