import React from "react";
import s from "./App.scss";
import { UploadImageForm } from "./components";

function App() {
  return (
    <div className={s.container}>
      <UploadImageForm />
    </div>
  );
}

export default App;
