import React from "react";

export const Likes = ({ nftLikes }) => {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(nftLikes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
    }
  };

  return (
    <div className="nft__item_like" onClick={handleLike}>
      <i
        className="fa fa-heart"
        style={{ color: liked ? "red" : "#ddd" }}
      ></i>
      <span>{likes}</span>
    </div>
  );
};