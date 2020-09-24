import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };
  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt", "desc")
  //     .get();
  //   console.log(nweets.docs.map(doc => doc.data()));
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Change Your Profile"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogout}>Log Out</button>
    </React.Fragment>
  );
};

export default Profile;
