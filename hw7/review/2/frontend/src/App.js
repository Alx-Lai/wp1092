import './App.css';
import { useState, useEffect } from 'react'
import ChatRoom from './Containers/ChatRoom'
import SignIn from './Containers/SignIn'

const LOCALSTORAGE_KEY = 'save-me'

const App = () => {
	const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
	const [signedIn, setSignedIn] = useState(false)
	const [me, setMe] = useState(savedMe || "")
	useEffect(() => {
		if (signedIn) {
			localStorage.setItem(LOCALSTORAGE_KEY, me)
		}
	}, [signedIn])
	return (
		<div className='App'>
			{signedIn? (<ChatRoom me={me}/>) : (
				<SignIn 
					me={me}
					setMe={setMe}
					setSignedIn={setSignedIn}
				/>)}
		</div>
	)
}

export default App;
