import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useState, useEffect } from "react";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { Countdown } from "../UI/Countdown";
import { Likes } from "../UI/Likes";

const ExploreItems = () => {
	const [userData, setUserData] = useState([]);
	const [loadMore, setLoadMore] = useState(8);
	const [loading, setLoading] = useState(true);

	async function fetchData() {
		try {
			const response = await axios.get(
				"https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
			);
			setUserData(response.data);
		} catch (error) {
			console.error("Error fetching explore data:", error);
		} finally {
			setLoading(false);
		}
	}

	async function fetchFilteredData(selectedFilter) {
		try {
			const response = await axios.get(
				`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`,
			);
			setUserData(response.data);
		} catch (error) {
			console.error("Error fetching explore data:", error);
		} finally {
			setLoading(false);
		}
	}

	function handleFilterChange(event) {
		setLoading(true);
		const selectedFilter = event.target.value;
		fetchFilteredData(selectedFilter);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div>
				<select id="filter-items" onChange={handleFilterChange} defaultValue="">
					<option value="">Default</option>
					<option value="price_low_to_high">Price, Low to High</option>
					<option value="price_high_to_low">Price, High to Low</option>
					<option value="likes_high_to_low">Most liked</option>
				</select>
			</div>
			{!loading
				? userData.slice(0, loadMore).map((user, index) => (
						<div
							key={index}
							className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
							style={{ display: "block", backgroundSize: "cover" }}
						>
							<div className="nft__item">
								<div className="author_list_pp">
									<Link
										to={`/author/${user.authorId}`}
										data-bs-toggle="tooltip"
										data-bs-placement="top"
									>
										<img className="lazy" src={user.authorImage} alt="" />
										<i className="fa fa-check"></i>
									</Link>
								</div>
								{!loading && user.expiryDate ? (
									<Countdown expiryTime={user.expiryDate} />
								) : (
									<div className="de_countdown-empty"></div>
								)}

								<div className="nft__item_wrap">
									{/* <div className="nft__item_extra">
										<div className="nft__item_buttons">
											<button>Buy Now</button>
											<div className="nft__item_share">
												<h4>Share</h4>
												<a href="" target="_blank" rel="noreferrer">
													<i className="fa fa-facebook fa-lg"></i>
												</a>
												<a href="" target="_blank" rel="noreferrer">
													<i className="fa fa-twitter fa-lg"></i>
												</a>
												<a href="">
													<i className="fa fa-envelope fa-lg"></i>
												</a>
											</div>
										</div>
									</div> */}
									<Link to={`/item-details/${user.nftId}`}>
										<img
											src={user.nftImage}
											className="lazy nft__item_preview"
											alt=""
										/>
									</Link>
								</div>
								<div className="nft__item_info">
									<Link to={`/item-details/${user.nftId}`}>
										<h4>{user.nftName}</h4>
									</Link>
									<div className="nft__item_price">{user.price} ETH</div>
									<Likes nftLikes={user.likes} index={index} />
								</div>
							</div>
						</div>
					))
				: new Array(8).fill(0).map((_, index) => (
						<div className="nft skeleton_nft" key={index}>
							<div className="nft_coll skeleton-card">
								<div className="nft_wrap">
									<div className="skeleton skeleton-img"></div>
								</div>
								<div className="nft_coll_pp">
									<div className="skeleton skeleton-avatar"></div>
								</div>
								<div className="nft_coll_info">
									<div className="skeleton skeleton-title"></div>
									<div className="skeleton skeleton-subtitle"></div>
								</div>
							</div>
						</div>
					))}

			{!loading ? (
				<div className="col-md-12 text-center">
					<Link
						to=""
						id="loadmore"
						onClick={() => setLoadMore(loadMore + 4)}
						className="btn-main lead"
					>
						Load more
					</Link>
				</div>
			) : (
				<div className="col-md-12 text-center">
					<div className="skeleton-box load-more-btn"></div>
				</div>
			)}
		</>
	);
};

export default ExploreItems;
