import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const unsubscribe = dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNweets(nweetArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
