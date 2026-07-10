import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);

  async function fetchData() {
		try {
			const response = await axios.get(
				` https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
			);
			setUserData(response.data);
      console.log(response.data);
			setFollowers(response.data.followers);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
    finally {
			setLoading(false);
    }
	}

  function handleFollow() {
    if (followers !== userData.followers) {
      setFollowers(userData.followers);
    }
    else {
      setFollowers((prevFollowers) => prevFollowers + 1);
    }
  }

  useEffect(() => {
    fetchData();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant"
    })
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {!loading ? <img src={userData.authorImage} alt="" /> : <div className="skeleton_author-pp"></div>}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {!loading ? userData.authorName : "Loading..."}
                          <span className="profile_username">
                            {!loading ? "@" + userData.tag : "Loading..."}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {!loading ? userData.address : "Loading..."}
                          </span>
                          &nbsp;
                          <button id="btn_copy" onClick={() => {
                            navigator.clipboard.writeText(userData.address);
                            alert("Text copied successfully!");
                          }} title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{!loading ? followers + " followers": "Loading..."} </div>
                      <Link to="#" onClick={handleFollow} className="btn-main">
                        {!loading ? (
                          userData.followers === followers ? "Follow" : "Unfollow"
                        ) : "Loading..."}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
