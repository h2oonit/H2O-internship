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
import { Countdown } from "../UI/Countdown";

const NewItems = () => {
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
	const variableValue = isMobile ? 1 : isTablet ? 2 : 4;
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
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 480);
			setIsTablet(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
										{!loading && item.expiryDate ? (
											<Countdown expiryTime={item.expiryDate} />
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
					) : (
						new Array(variableValue).fill(0).map((_, index) => (
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
						))
					)}
					;
				</div>
			</div>
		</section>
	);
};

export default NewItems;
