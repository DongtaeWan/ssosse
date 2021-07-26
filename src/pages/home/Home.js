import React from "react";
import { v4 as uuidv4 } from "uuid";
import { EventSourcePolyfill } from "event-source-polyfill";
import AppLayout from "../../components/AppLayout";

const Home = () => {
  const token = localStorage.getItem("Authorization");

  const url = "http://localhost:8080/sse";

  // Yaffle - EventSource
  // npm install event-source-polyfill

  let eventsource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: token,
      uuid: uuidv4(),
    },
  });

  // let eventsource = new EventSource(url + "/" + token);

  // EventSoucePolyfill
  eventsource.addEventListener("notice", function (e) {
    console.log("e : ", e);
    console.log("data : ", e.data);
    console.log("lase event Id : ", e.lastEventId);
  });

  eventsource.onopen = function () {
    console.log("Polyfills onopen");
  };

  eventsource.onerror = function () {
    console.log("Polyfills onerror");
  };

  return (
    <>
      <AppLayout>
        <h3>인덱스페이지</h3>
        <ul id="ul"></ul>
      </AppLayout>
    </>
  );
};

export default Home;
