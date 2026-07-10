import React from "react";

export const Likes = ({ nftLikes, index }) => {
	const [likes, setLikes] = React.useState(nftLikes);
    const heart = document.querySelector(".fa-heart");

	const handleLike = () => {
		if (likes !== nftLikes ) {
			setLikes(nftLikes);
            heart.style.color = "#ddd";
		} else {
			setLikes((prevLikes) => prevLikes + 1);
            heart.style.color = "red";
		}
	};
	return (
		<div className="nft__item_like" onClick={handleLike}>
			<i className="fa fa-heart"></i>
			<span>{likes}</span>
		</div>
	);
};
