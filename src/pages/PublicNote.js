import { useState, useEffect } from "react";
import { Button, Modal, Input, notification, Checkbox } from "antd";
import Axios from "axios";

const { TextArea } = Input;

const PublicNote = ({ isNew }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [data, setData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchNoteData();
  }, []);

  const fetchNoteData = async () => {
    const res = await Axios.get(
      `${SERVER_URL}/note/${window.location.pathname.substring(14)}`
    );

    setData(res.data.item);
    setIsDataFetched(true);
  };

  return (
    <div className="publicnote-page-container">
      {data && data.title && data.createdBy && (
        <div className="one-publicnote-container">
          <div className="one-publicnote-title">Title: {data.title} </div>
          <div className="one-publicnote-by">
            By: {data.createdBy.username}{" "}
          </div>
          <div className="one-publicnote-content">Content: {data.content}</div>
        </div>
      )}

      {!isDataFetched && <div className="spinner"></div>}
    </div>
  );
};

export default PublicNote;
