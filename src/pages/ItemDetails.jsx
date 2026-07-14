import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Likes } from "../components/UI/Likes";

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
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
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
										<h2
											data-aos="fade-up"
											data-aos-offset="200"
											data-aos-delay="0"
											data-aos-duration="1000"
											data-aos-easing="ease-in-out"
											data-aos-mirror="true"
											data-aos-once="false"
										>
											{userData?.title}
										</h2>
									) : (
										<div className="skeleton-title"></div>
									)}

									<div
										className="item_info_counts"
										data-aos="fade-up"
										data-aos-offset="100"
										data-aos-delay="200"
										data-aos-duration="1000"
										data-aos-easing="ease-in-out"
										data-aos-mirror="true"
										data-aos-once="false"
									>
										{!loading ? (
											<div className="item_info_views">
												<i className="fa fa-eye"></i>
												{userData?.views}
											</div>
										) : (
											<div className="skeleton-like"></div>
										)}
										{!loading ? (
											<div className="item_info_like">
												<Likes
													className="item_details-likes"
													nftLikes={userData?.likes}
												/>
											</div>
										) : (
											<div className="skeleton-like"></div>
										)}
									</div>
									{!loading && userData?.description ? (
										<p
											data-aos="fade-up"
											data-aos-offset="100"
											data-aos-delay="400"
											data-aos-duration="1000"
											data-aos-easing="ease-in-out"
											data-aos-mirror="true"
											data-aos-once="false"
										>
											{userData?.description}
										</p>
									) : (
										<div className="skeleton-box"></div>
									)}
									<div className="d-flex flex-row">
										<div className="mr40">
											<h6
												data-aos="fade-up"
												data-aos-offset="100"
												data-aos-delay="500"
												data-aos-duration="1000"
												data-aos-easing="ease-in-out"
												data-aos-mirror="true"
												data-aos-once="false"
											>
												Owner
											</h6>
											<div
												className="item_author"
												data-aos="fade-up"
												data-aos-offset="100"
												data-aos-delay="600"
												data-aos-duration="1000"
												data-aos-easing="ease-in-out"
												data-aos-mirror="true"
												data-aos-once="false"
											>
												<div className="author_list_pp">
													{!loading ? (
														<Link to={`/author/${userData?.ownerId}`}>
															<img
																className="lazy"
																src={userData?.ownerImage}
																alt=""
															/>
															<i className="fa fa-check"></i>
														</Link>
													) : (
														<div className="skeleton-pp"></div>
													)}
												</div>
												<div className="author_list_info">
													{!loading && userData?.ownerName ? (
														<Link to={`/author/${userData?.ownerId}`}>
															{userData?.ownerName}
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
											<h6
												data-aos="fade-up"
												data-aos-offset="100"
												data-aos-delay="700"
												data-aos-duration="1000"
												data-aos-easing="ease-in-out"
												data-aos-mirror="true"
												data-aos-once="false"
											>
												Creator
											</h6>
											<div
												className="item_author"
												data-aos="fade-up"
												data-aos-offset="100"
												data-aos-delay="800"
												data-aos-duration="1000"
												data-aos-easing="ease-in-out"
												data-aos-mirror="true"
												data-aos-once="false"
											>
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
										<h6
											data-aos="fade-up"
											data-aos-offset="100"
											data-aos-delay="1000"
											data-aos-duration="1500"
											data-aos-easing="ease-in-out"
											data-aos-mirror="true"
											data-aos-once="false"
										>
											Price
										</h6>
										<div
											className="nft-item-price"
											data-aos="fade-up"
											data-aos-offset="100"
											data-aos-delay="2500"
											data-aos-duration="1000"
											data-aos-easing="ease-in-out"
											data-aos-mirror="true"
											data-aos-once="false"
										>
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
