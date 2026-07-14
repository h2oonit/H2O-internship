import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { Likes } from "../UI/Likes";

const AuthorItems = () => {
	const { authorId } = useParams();
	const [nftCollection, setNftCollection] = useState([]);
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchData() {
		try {
			const response = await axios.get(
				` https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
			);
			setNftCollection(response.data.nftCollection);
			setUserData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="de_tab_content">
			<div className="tab-1">
				<div className="row">
					{!loading
						? nftCollection.map((nft, index) => (
								<div
									className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
									key={index}
								>
									<div className="nft__item">
										<div className="author_list_pp">
											<Link to="">
												<img
													className="lazy"
													src={userData.authorImage}
													alt=""
												/>
												<i className="fa fa-check"></i>
											</Link>
										</div>
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
											<Link to={`/item-details/${nft.nftId}`}>
												<img
													src={nft.nftImage}
													className="lazy nft__item_preview"
													alt=""
												/>
											</Link>
										</div>
										<div className="nft__item_info">
											<Link to={`/item-details/${nft.nftId}`}>
												<h4>{nft.title}</h4>
											</Link>
											<div className="nft__item_price">
												{nft.price} ETH
												<Likes nftLikes={nft.likes} index={index} />
											</div>
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
				</div>
			</div>
		</div>
	);
};

export default AuthorItems;
