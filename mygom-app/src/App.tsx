import React from 'react';
import "./styles/_main.scss";
import Card from "./components/card";

function App() {
	return (
		<div className="app">
			<Card title="Card" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
		</div>
	);
}

export default App;
