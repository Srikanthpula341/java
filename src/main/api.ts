import React, { useRef } from "react";
import { useUploadEligibilityFile } from "../hooks/useUploadEligibilityFile";
import { useFetchEligibilityFiles } from "../hooks/useFetchEligibilityFiles";

const EligibilityFilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error: uploadError } = useUploadEligibilityFile();
  const { files, loading, error: listError, refresh } = useFetchEligibilityFiles();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isTxt = file.name.endsWith(".txt");
    const isValidSize = file.size <= 1024 * 1024;

    if (!isTxt || !isValidSize) {
      alert("Only .txt files under 1MB are allowed.");
      fileInputRef.current!.value = "";
      return;
    }

    const success = await upload("uploadFile", file);
    if (success) await refresh();

    fileInputRef.current!.value = "";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Eligibility File Upload</h2>

      <button onClick={handleUploadClick} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept=".txt"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      {listError && <p style={{ color: "red" }}>{listError}</p>}

      <h3>Uploaded Files</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : (
        <table border={1} cellPadding={5}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploaded By</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Total Records</th>
              <th>Errors</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.fileName}</td>
                <td>{file.uploadedBy}</td>
                <td>{file.uploadDate}</td>
                <td>{file.status}</td>
                <td>{file.totalRecords}</td>
                <td>{file.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EligibilityFilePage;
