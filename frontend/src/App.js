import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import Routers from "./utils/Routers";
import { CometChat } from "@cometchat-pro/chat";
import { appID, region } from "./components/Common/constans.js";

export default function App() {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    (res) => {
      console.log("Initialization success:", res);
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );

  return (
      <ScrollToTop>
        <Routers />
      </ScrollToTop>
  );
}
