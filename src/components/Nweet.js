import React, { Fragment, useState } from "react";
import { dbService, storageService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this Nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value }
    } = event;

    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        isOwner && (
          <Fragment>
            <form onSubmit={onSubmit}>
              <input
                value={newNweet}
                onChange={onChange}
                placeholder="Edit your Nweet!"
                required
              />
              <input type="submit" value="Update Nweet!" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </Fragment>
        )
      ) : (
        <Fragment>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="abc"
            />
          )}
          {isOwner && (
            <Fragment>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};
export default Nweet;
