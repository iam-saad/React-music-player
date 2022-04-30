import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ libraryActive, setLibraryActive }) => {
	//Event Handler
	const libraryToggleHandler = () => {
		setLibraryActive(!libraryActive);
	};

	return (
		<nav className='navbar'>
			<h2>Music Player</h2>
			<button className='library-btn' onClick={libraryToggleHandler}>
				Library <FontAwesomeIcon icon={faMusic} />
			</button>
		</nav>
	);
};

export default Navbar;
