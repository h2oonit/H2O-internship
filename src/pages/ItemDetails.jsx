import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = ({ nft }) => {
	const { nftId } = useParams();
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchData() {
		try {
			const response = await axios.get(
				` https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
			);
			setUserData(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			// setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
		window.scrollTo(0, 0);
	}, []);

	return (
		<div id="wrapper">
			<div className="no-bottom no-top" id="content">
				<div id="top"></div>
				<section aria-label="section" className="mt90 sm-mt-0">
					<div className="container">
						<div className="row">
							<div className="col-md-6 text-center">
								{!loading && userData?.nftImage ? (
									<img
										src={userData?.nftImage}
										className="img-fluid img-rounded mb-sm-30 nft-image"
										alt=""
									/>
								) : (
									<div className="skeleton-image"></div>
								)}
							</div>
							<div className="col-md-6">
								<div className="item_info">
									{!loading && userData?.title ? (
										<h2>{userData?.title}</h2>
									) : (
										<div className="skeleton-title"></div>
									)}

									<div className="item_info_counts">
										{!loading ? (
											<div className="item_info_views">
												<i className="fa fa-eye"></i>
												{userData?.views}
											</div>
										) : (
											<div className="skeleton-likes"></div>
										)}
										{!loading ? (
											<div className="item_info_like">
												<i className="fa fa-heart"></i>
												{userData?.likes}
											</div>
										) : (
											<div className="skeleton-likes"></div>
										)}
									</div>
									{!loading && userData?.description ? (
										<p>{userData?.description}</p>
									) : (
										<div className="skeleton-box"></div>
									)}
									<div className="d-flex flex-row">
										<div className="mr40">
											<h6>Creator</h6>
											<div className="item_author">
												<div className="author_list_pp">
													{!loading ? (
														<Link to="/author">
															<img
																className="lazy"
																src={userData?.creatorImage}
																alt=""
															/>
															<i className="fa fa-check"></i>
														</Link>
													) : (
														<div className="skeleton-pp"></div>
													)}
												</div>
												<div className="author_list_info">
													{!loading && userData?.creatorName ? (
														<Link to={`/author/${userData?.creatorId}`}>
															{userData?.creatorName}
														</Link>
													) : (
														<div className="skeleton-title"></div>
													)}
												</div>
											</div>
										</div>
										<div></div>
									</div>
									<div className="de_tab tab_simple">
										<div className="de_tab_content">
											<h6>Creator</h6>
											<div className="item_author">
												<div className="author_list_pp">
													{!loading && userData?.creatorImage ? (
														<Link to={`/author/${userData?.creatorId}`}>
															<img
																className="lazy"
																src={userData?.creatorImage}
																alt=""
															/>
															<i className="fa fa-check"></i>
														</Link>
													) : (
														<div className="skeleton-pp"></div>
													)}
												</div>
												<div className="author_list_info">
													{!loading && userData?.creatorName ? (
														<Link to={`/author/${userData?.creatorId}`}>
															{userData?.creatorName}
														</Link>
													) : (
														<div className="skeleton-title"></div>
													)}
												</div>
											</div>
										</div>
										<div className="spacer-40"></div>
										<h6>Price</h6>
										<div className="nft-item-price">
											{!loading ? (
												<>
													<img src={EthImage} alt="" />
													<span>{userData?.price}</span>
												</>
											) : (
												<div className="skeleton-like"></div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default ItemDetails;
