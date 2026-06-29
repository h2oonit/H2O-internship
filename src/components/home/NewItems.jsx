import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Slider.css";

const NewItems = () => {
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [timeLeft, setTimeLeft] = useState(item.expiryDate - Date.now());
	let cancelId;
	let startTime;
	let countdown = 0;
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
		],
	};

	async function fetchData() {
		try {
			const response = await axios.get(
				"https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
			);
			setUserData(response.data);
			console.log(response.data);
			setLoading(false);
			startCountdown();
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	}

	function startCountdown() {
		startTime = Date.now();
		cancelId = requestAnimationFrame(updateTimer);
		let expiryTime = userData.expiryDate
			? new Date(userData.expiryDate).getTime() - startTime
			: 0;
		console.log("started countdown");
	}

	function updateTimer(countdownStart) {
		const maxTime = countdownStart || 0;
		let maxTimeInMs = maxTime;
		let ms = Date.now() - startTime;
		let timeLeftInMs = countdownStart - ms;

		// if (timeLeftInMs <= 0) {
		// 	timeLeftInMs = 0;
		// 	cancelAnimationFrame(cancelId);
		// 	cancelId = null;
		// }
		let secsLeft = Math.floor(timeLeftInMs / 1000);
		let minsLeft = Math.floor(secsLeft / 60);

		let msText = timeLeftInMs % 1000;
		let secsText = secsLeft % 60;
		let minsText = minsLeft;
		// console.log(maxTime);

		if (msText.toString().length < 3) {
			msText = msText.toString().padStart(3, "0");
		}
		if (secsText.toString().length < 2) {
			secsText = secsText.toString().padStart(2, "0");
		}
		if (minsText.toString().length < 2) {
			minsText = minsText.toString().padStart(2, "0");
		}

		cancelId = requestAnimationFrame(updateTimer);
		return (
			<div className="de_countdown">
				{minsText}:{secsText}:{msText}
			</div>
		);
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(item.expiryDate - Date.now());
		}, 1000);

		return () => clearInterval(interval);
	}, [item.expiryDate]);

	return (
		<section id="section-items" className="no-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>New Items</h2>
							<div className="small-border bg-color-2"></div>
						</div>
					</div>
					{!loading ? (
						<Slider {...settings}>
							{userData.map((item, index) => (
								<div className="nft" key={item.nftId}>
									<div className="nft__item">
										<div className="author_list_pp">
											<Link
												to={`/author/${item.authorId}`}
												data-bs-toggle="tooltip"
												data-bs-placement="top"
												title={`Creator: ${item.authorName}`}
											>
												<img className="lazy" src={item.authorImage} alt="" />
												<i className="fa fa-check"></i>
											</Link>
										</div>
										{!loading && item.countdown ? (
											<div className="de_countdown">
												0
											</div>
										) : (
											<div className="de_countdown-empty"></div>
										)}

										<div className="nft__item_wrap">
											<div className="nft__item_extra">
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
											</div>

											<Link to={`/item-details/${item.nftId}`}>
												<img
													src={item.nftImage}
													className="lazy nft__item_preview"
													alt=""
												/>
											</Link>
										</div>
										<div className="nft__item_info">
											<Link to={`/item-details/${item.nftId}`}>
												<h4>{item.nftName}</h4>
											</Link>
											<div className="nft__item_price">{item.price} ETH</div>
											<div className="nft__item_like">
												<i className="fa fa-heart"></i>
												<span>{item.likes}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</Slider>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default NewItems;
