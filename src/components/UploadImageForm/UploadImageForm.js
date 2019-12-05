import React, { useState, useCallback } from "react";
import { createWorker } from "tesseract.js";
import { useDropzone } from "react-dropzone";
import { Button } from "semantic-ui-react";
// import sample_form from "./sample_form.jpg";
import "./UploadImageForm.scss";

const UploadImageForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(uploadedFile => {
    setFile(uploadedFile[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    setLoading(true);
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    try {
      const { data } = await worker.recognize(file);
      console.log("data", data);
    } catch (err) {
      console.log("err", err);
    }
    await worker.terminate();
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Upload a file</h1>
      <>
        <div className="dropFileZone" {...getRootProps()}>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Upload file</p>
              ) : (
                <p>Drag a file or click here to browse</p>
              )}
            </>
          )}
        </div>
        <Button
          loading={loading}
          className={`parseButton ${file ? "show" : ""}`}
          primary
          onClick={handleSubmit}
        >
          Parse file
        </Button>
      </>
    </div>
  );
};

export default UploadImageForm;
