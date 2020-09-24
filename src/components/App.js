import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // isLoggedIn is not necessary anymore cause now we have userObj
  // so we can save one rendering

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        const { displayName, uid } = user;
        setUserObj({
          displayName,
          uid,
          updateProfile: args => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const { displayName, uid } = authService.currentUser;
    setUserObj({
      displayName,
      uid,
      updateProfile: args => authService.currentUser.updateProfile(args)
    });
  };
  return (
    <div>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing . . ."
      )}
    </div>
  );
}

export default App;
