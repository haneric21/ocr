import React, { useState, useCallback } from "react";
import { createWorker } from "tesseract.js";
import { useDropzone } from "react-dropzone";
import { Button } from "semantic-ui-react";
// import sample_form from "./sample_form.jpg";
import "./UploadImageForm.scss";

const UploadImageForm = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(uploadedFiles => {
    setFiles(uploadedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    setLoading(true);
    const worker = createWorker();
    await worker.load();
    for (const file of files) {
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      try {
        const { data } = await worker.recognize(file);
        console.log("data", data);
      } catch (err) {
        console.log("err", err);
      }
    }
    await worker.terminate();
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Upload a file</h1>
      <>
        <div className="dropFileZone" {...getRootProps()}>
          {files.length ? (
            <p>{`${files.length} file${files.length > 1 ? "s" : ""}`}</p>
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
          className={`parseButton ${files.length ? "show" : ""}`}
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
