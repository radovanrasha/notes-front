import { useState, useEffect } from "react";
import { Button, Modal, Input, notification, Checkbox } from "antd";
import Axios from "axios";
import Cookies from "universal-cookie";

const { TextArea } = Input;

const Notes = () => {
  const cookies = new Cookies();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [publicNote, setPublicNote] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await Axios.get(`${SERVER_URL}/notes/${cookies.get("user")}`);

    setNotes(res.data.items);
    setIsDataFetched(true);
  };

  const handleNewNote = () => {
    setTitle("");
    setContent("");
    setIsNewModalVisible(true);
  };

  const handleCancel = () => {
    setIsNewModalVisible(false);
  };

  const handleEdit = (item) => {
    setContent(item.content);
    setTitle(item.title);
    setNoteId(item._id);
    setPublicNote(item.isPublic);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleChangeTitle = (e) => {
    setTitle(e);
  };

  const handleChangeContent = (e) => {
    setContent(e);
  };

  const handleChangePublicNote = (e) => {
    setPublicNote(e);
  };

  const handleDelete = async (id) => {
    await Axios.delete(`${SERVER_URL}/note/${id}`);

    notification.success({
      message: "Successfully deleted.",
      placement: "bottomRight",
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const submitNewNote = async () => {
    const body = {
      content,
      title,
      isPublic: publicNote,
      createdBy: cookies.get("user"),
    };
    await Axios.post(`${SERVER_URL}/note`, body);

    notification.success({
      message: "Successfully added.",
      placement: "bottomRight",
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleEditNote = async () => {
    const body = { content, title, isPublic: publicNote };
    await Axios.put(`${SERVER_URL}/note/${noteId}`, body);

    notification.success({
      message: "Successfully edited.",
      placement: "bottomRight",
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <Button className="notes-header-button" onClick={handleNewNote}>
          Add new note
        </Button>
        <Button className="notes-header-button">Get idea</Button>
      </div>
      <div className="notes-list">
        {notes &&
          notes.length > 0 &&
          notes.map((item, index) => {
            return (
              <div className="one-note">
                <div className="one-note-header">
                  <p>{item.title}</p>
                  <div>
                    <Button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="delEditButton"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleEdit(item);
                      }}
                      className="delEditButton"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <p>{item.content}</p>
              </div>
            );
          })}

        {isDataFetched && notes && notes.length < 1 && (
          <div className="empty-notes">Wow, so empty. Add new notes. :) </div>
        )}

        {!isDataFetched && <div class="spinner"></div>}
      </div>

      <Modal
        className="new-note-modal"
        footer={[]}
        open={isNewModalVisible}
        title="Add new note"
        onCancel={handleCancel}
      >
        <label>Title:</label>
        <Input
          onChange={(e) => {
            handleChangeTitle(e.target.value);
          }}
        ></Input>
        <label>Content:</label>
        <TextArea
          rows={7}
          onChange={(e) => {
            handleChangeContent(e.target.value);
          }}
          className="input-login-right"
        ></TextArea>
        <label>Is this public note?</label>
        <Checkbox
          style={{ marginLeft: "10px" }}
          onChange={(e) => {
            handleChangePublicNote(e.target.checked);
          }}
        ></Checkbox>
        <p style={{ color: "red" }}>
          *public notes are visible to all user and can be shared
        </p>

        <Button
          onClick={submitNewNote}
          className="submit-note-button"
          type="primary"
        >
          Add note
        </Button>
      </Modal>

      <Modal
        className="new-note-modal"
        footer={[]}
        open={isEditModalVisible}
        title="Edit note"
        onCancel={handleEditCancel}
      >
        <label>Title:</label>
        <Input
          onChange={(e) => {
            handleChangeTitle(e.target.value);
          }}
          value={title}
        ></Input>
        <label>Content:</label>
        <TextArea
          value={content}
          rows={7}
          onChange={(e) => {
            handleChangeContent(e.target.value);
          }}
          className="input-login-right"
        ></TextArea>
        <label>Is this public note?</label>
        <Checkbox
          style={{ marginLeft: "10px" }}
          checked={publicNote}
          onChange={(e) => {
            handleChangePublicNote(e.target.checked);
          }}
        ></Checkbox>
        <p style={{ color: "red" }}>
          *public notes are visible to all user and can be shared
        </p>
        <Button
          onClick={handleEditNote}
          className="login-button"
          type="primary"
        >
          Edit note
        </Button>
      </Modal>
    </div>
  );
};

export default Notes;
