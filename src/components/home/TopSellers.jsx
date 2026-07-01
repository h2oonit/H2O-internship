import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useState, useEffect } from "react";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "../../css/Slider.css";

const TopSellers = () => {
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchData() {
		try {
			const response = await axios.get(
				"https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
			);
			setUserData(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching top sellers data:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section id="section-popular" className="pb-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>Top Sellers</h2>
							<div className="small-border bg-color-2"></div>
						</div>
					</div>
					<div className="col-md-12">
						<ol className="author_list">
							{!loading
								? userData.map((user, index) => (
										<li key={index}>
											<div className="author_list_pp">
												<Link to={`/author/${user.authorID}`}>
													<img
														className="lazy pp-author"
														src={user.authorImage}
														alt=""
													/>
													<i className="fa fa-check"></i>
												</Link>
											</div>
											<div className="author_list_info">
												<Link to={`/author/${user.authorID}`}>{user.authorName}</Link>
												<span>{user.price} ETH</span>
											</div>
										</li>
									))
								: new Array(12).fill(0).map((_, index) => (
										<li key={index}>
											<div className="author_list_pp">
                        <div className="skeleton-box pp-author"></div>
											</div>
											<div className="author_list_info">
                        <div className="slim skeleton-box author-name"></div>
                        <div className="slim skeleton-box author-price"></div>
                      </div>
                    </li>
									))}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TopSellers;
