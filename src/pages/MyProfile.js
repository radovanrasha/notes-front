import { useState, useEffect } from "react";
import { Button, Modal, Input, notification, Checkbox } from "antd";
import Axios from "axios";
import Cookies from "universal-cookie";
import profile from "../assets/profile.png";

const MyProfile = ({ isNew }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("myprofile");
  const [viewState, setViewState] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await Axios.get(`${SERVER_URL}/user/${cookies.get("user")}`);

    setUsername(res.data.item.username);
    setPhone(res.data.item.phone);
    setData(res.data.item);
    setIsDataFetched(true);
  };

  const unfollowUser = async (unfollow) => {
    await Axios.post(`${SERVER_URL}/unfollow-user/${unfollow._id}`, {
      by: data._id,
    });

    notification.success({
      message: `You have successfully unfollowed ${unfollow.username}.`,
      placement: "bottomRight",
      duration: 2,
    });

    fetchData();
  };

  const deleteFollower = async (follower) => {
    await Axios.post(`${SERVER_URL}/delete-follower/${follower._id}`, {
      by: data._id,
    });

    notification.success({
      message: `You have successfully deleted ${follower.username}.`,
      placement: "bottomRight",
      duration: 2,
    });

    fetchData();
  };

  return (
    <div className="myprofile-container">
      {isDataFetched && (
        <div className="myprofile-container">
          <div className={"header-div"}>MY PROFILE</div>
          <div className="myprofile-buttons">
            <div
              className={
                activeTab === "myprofile"
                  ? "active-div-myprofile"
                  : "inactive-div-myprofile"
              }
              onClick={() => {
                setActiveTab("myprofile");
              }}
            >
              {username}
            </div>
            <div
              className={
                activeTab === "followers"
                  ? "active-div-myprofile"
                  : "inactive-div-myprofile"
              }
              onClick={() => {
                setActiveTab("followers");
              }}
            >
              Followers
            </div>
            <div
              className={
                activeTab === "following"
                  ? "active-div-myprofile"
                  : "inactive-div-myprofile"
              }
              onClick={() => {
                setActiveTab("following");
              }}
            >
              Following
            </div>
          </div>

          {activeTab === "myprofile" && (
            <div className="myprofile-div-container">
              <div
                className={
                  viewState
                    ? "myprofile-div"
                    : "myprofile-div edit-my-profile-div"
                }
              >
                Username: <Input disabled={viewState} value={username}></Input>
              </div>
              <div
                className={
                  viewState
                    ? "myprofile-div"
                    : "myprofile-div edit-my-profile-div"
                }
              >
                Email: {data.email}
              </div>
              <div
                className={
                  viewState
                    ? "myprofile-div"
                    : "myprofile-div edit-my-profile-div"
                }
              >
                Phone number: <Input disabled={viewState} value={phone}></Input>
              </div>
              {viewState && (
                <button
                  onClick={() => {
                    setViewState(false);
                  }}
                >
                  <span>Edit</span>
                </button>
              )}
              {!viewState && (
                <div>
                  <button
                    onClick={() => {
                      setViewState(true);
                    }}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={() => {
                      setViewState(true);
                    }}
                  >
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "followers" && (
            <>
              {data.followers && data.followers.length > 0 ? (
                <div className="follow-cards">
                  {data.followers.map((item, index) => {
                    return (
                      <div className="follower-card">
                        <img
                          className="follower-card-profilepic"
                          src={profile}
                          alt="Profile"
                        />
                        <div>{item.username}</div>
                        <Button
                          onClick={() => {
                            deleteFollower(item);
                          }}
                          className="unfollow-button"
                        >
                          Delete follower
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="message-info">
                  You don't have any followers yet.
                </div>
              )}
            </>
          )}

          {activeTab === "following" && (
            <>
              {data.following && data.following.length > 0 ? (
                <div className="follow-cards">
                  {data.following.map((item, index) => {
                    return (
                      <div className="follower-card">
                        <img
                          className="follower-card-profilepic"
                          src={profile}
                          alt="Profile"
                        />
                        <div>{item.username}</div>
                        <Button
                          onClick={() => {
                            unfollowUser(item);
                          }}
                          className="unfollow-button"
                        >
                          Unfollow
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="message-info">
                  You are not following any account yet.
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!isDataFetched && <div className="spinner"></div>}
    </div>
  );
};

export default MyProfile;
