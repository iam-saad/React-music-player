import React from 'react';

const Songs = ({ currentSong }) => {
	return (
		<div className='song-container'>
			<div className='img-container'>
				<img src={currentSong.cover} alt='song cover' />
			</div>
			<h2>{currentSong.name}</h2>
			<h3>{currentSong.artist}</h3>
		</div>
	);
};

export default Songs;
