import { useState, useEffect } from "react";
import { Button, Modal, Input, notification, Checkbox } from "antd";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PublicNotes = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [notes, setNotes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchNotes();

    if (cookies.get("user")) {
      fetchUser();
    }
  }, []);

  const fetchNotes = async () => {
    const res = await Axios.get(`${SERVER_URL}/public-notes`);

    setNotes(res.data.items);
    setIsDataFetched(true);
  };

  const fetchUser = async () => {
    const res = await Axios.get(`${SERVER_URL}/user/${cookies.get("user")}`);

    setUser(res.data.item);
    setIsDataFetched(true);
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(
      `https://notes.radovanrasha.com/public-notes/${e}`
    );

    notification.success({
      message: "Note url copied to your clipboard.",
      placement: "bottomRight",
      duration: 2,
    });
  };

  const followUser = async (follow) => {
    await Axios.post(`${SERVER_URL}/follow-user/${follow._id}`, {
      by: user._id,
    });

    notification.success({
      message: `You have successfully followed ${follow.username}.`,
      placement: "bottomRight",
      duration: 2,
    });

    fetchNotes();

    if (cookies.get("user")) {
      fetchUser();
    }
  };

  return (
    <div className="notes-container">
      <div className="publicnotes-list">
        {isDataFetched &&
          notes &&
          notes.length > 0 &&
          notes.map((item, index) => {
            return (
              <div className="one-note">
                <div className="one-note-header">
                  <p>Title: {item.title}</p>
                  <div>
                    <Link to={`/public-notes/${item._id}`}>
                      <Button>View</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        copyToClipboard(item._id);
                      }}
                      className="delEditButton"
                    >
                      Share
                    </Button>
                  </div>
                </div>
                <div className="one-note-header">
                  <p>By: {item.createdBy.username}</p>
                  {user &&
                    user._id !== item.createdBy._id &&
                    !user?.following?.some(
                      (followingItem) =>
                        followingItem._id === item.createdBy._id
                    ) && (
                      <Button
                        onClick={() => {
                          followUser(item.createdBy);
                        }}
                      >
                        Follow
                      </Button>
                    )}
                </div>
                <p>{item.content}</p>
              </div>
            );
          })}

        {isDataFetched && notes && notes.length < 1 && (
          <div className="empty-notes">Wow, so empty. Add new notes. :) </div>
        )}

        {!isDataFetched && <div className="spinner"></div>}
      </div>
    </div>
  );
};

export default PublicNotes;
