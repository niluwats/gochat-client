import { useEffect, useState } from "react";
import "./Chat.css";
import { verifyContact } from "../services/verifyContact";
import useWebSocket from "react-use-websocket";
import { getContactList } from "../services/getContactList";
import { chatHistory } from "../services/getChatHistory";
import ChatHistory from "./ChatHistory/ChatHistory";

export default function Chat() {
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [contactList, setContactList] = useState([]);
  const [to, setTo] = useState("");
  const [chatHistoryData, setChatHistoryData] = useState([]);

  const socketUrl = "ws://localhost:8081/ws";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFrom(urlParams.get("user"));
  }, []);

  useEffect(() => {
    if (from !== "") {
      getContactList(from)
        .then((data) => setContactList(data))
        .catch((err) => {
          window.alert(err);
        });
    }
  }, [from]);

  useEffect(() => {
    if (to !== "") {
      chatHistory(from, to)
        .then((data) => {
          setChatHistoryData(data);
        })
        .catch((err) => {
          window.alert(err);
        });
    }
  }, [to, from, message]);

  const addContact = async (e) => {
    e.preventDefault();

    verifyContact(contact, from)
      .then(() => {
        if (!contactList.includes(contact)) {
          setContactList((arr) => [contact, ...arr]);
          setContact("");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    const msg = {
      type: "message",
      user: from,
      chat: {
        from,
        to,
        msg: message,
      },
    };

    console.log(msg);
    sendJsonMessage(msg);
    setMessage("");
  };

  return (
    <div className="outerContainer">
      <div className="grid-container">
        <div className="item0">
          <p className="h5 pUsername">{from}</p>
        </div>
        <div className="item1">
          <form onSubmit={addContact}>
            <div className="form-group row">
              <div className="col">
                <input
                  type="text"
                  value={contact}
                  required={true}
                  className="form-control contactInput"
                  placeholder="Add Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-secondary">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="item2">
          <div className="contactTitleContainer">
            <p className="h5">Contact List</p>
          </div>
          {contactList.length > 0 &&
            contactList.map((item, id) => {
              return (
                <div key={id} className="contactContainer">
                  <button
                    className="btn divBtn"
                    key={id}
                    onClick={async (e) => {
                      setTo(e.target.textContent);
                    }}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
        </div>
        <div className="item3">
          <p className="pTo">{to}</p>
          {chatHistoryData !== null && chatHistoryData.length > 0 && (
            <ChatHistory data={chatHistoryData} sender={from} />
          )}
        </div>
        <div className="item4">
          <form onSubmit={handleSendMessage}>
            {to !== "" && (
              <div className="form-group row">
                <div className="col">
                  <textarea
                    className="form-control"
                    required={true}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Type message"
                  ></textarea>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
