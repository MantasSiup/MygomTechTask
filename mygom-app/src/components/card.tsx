import React, { useState } from "react";
import "../styles/_card.scss";
import Dialog from "./dialog";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
	const [isDialogOpened, setIsDialogOpened] = useState(false);

	const openDialog = () => {
		setIsDialogOpened(true);
	};

	const closeDialog = () => {
		setIsDialogOpened(false);
	};

	return (
		<div className="card">
			<h2>{title}</h2>
			<p>{content}</p>
			<button className="card-btn" onClick={openDialog}>Open Dialog</button>
			{isDialogOpened && <Dialog onClose={closeDialog} />}
		</div>
	);
};

export default Card;
