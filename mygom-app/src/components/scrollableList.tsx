import React, { useCallback, useEffect, useRef } from "react";
import "../styles/_scrollableList.scss";


interface ScrollableDivProps {
  onScrollToBottom?: () => void;
  content: string[];
  onDelete: (index: number) => void;
}

const ScrollableList: React.FC<ScrollableDivProps> = ({ onScrollToBottom, content, onDelete}) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = useCallback(() => {
		const scrollContainer = scrollContainerRef.current;

		if (scrollContainer) {
			const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

			if (scrollTop + clientHeight >= scrollHeight) {
				if (onScrollToBottom) {
					onScrollToBottom?.(); 
				}
			}
		}
	}, [onScrollToBottom]);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;

		if (scrollContainer && onScrollToBottom) {
			scrollContainer.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleScroll);
			}
		};
	}, [onScrollToBottom, handleScroll]);

	return (
		<div
			ref={scrollContainerRef}
			style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}
		>
			{content.map((name, index) => (
				<p key={index} style={{margin: '0'}}>{name}
					<button className="delete-btn" onClick={() => onDelete(index)} style={{ marginLeft: "10px" }}>
						Delete
					</button>
				</p>
			))}
		</div>
	);
};

export default ScrollableList;
