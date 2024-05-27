import React, { useState, useCallback, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../../pages/MDM/MDM_Tab_Buttons/Button';

// Code for UploadFiles component
const UploadFiles = ({ title, isMultiple = true, allowedExtensions }) => {
  const [files, setFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);

  const handleFileSelect = useCallback(
    (event) => {
      const fileList = event.target.files;
      const updatedFiles = [...files];
      const updatedInvalidFiles = [...invalidFiles];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const extension = file.name.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(extension)) {
          if (!updatedFiles?.find((f) => f.name === file.name)) {
            updatedFiles.push({
              name: file.name,
              category: '',
            });
          }
        } else {
          updatedInvalidFiles.push(file);
        }
      }

      setFiles(updatedFiles);
      setInvalidFiles(updatedInvalidFiles);
    },
    [files, invalidFiles, allowedExtensions],
  );

  const handleDelete = useCallback(
    (fileName) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
    },
    [files],
  );

  return (
    <div className="upload-files-container">
      <h4>{title}</h4>
      <div>
        <input type="file" multiple={isMultiple} onChange={handleFileSelect} />
      </div>
      <p>{files.length} files selected</p>
      {invalidFiles.length > 0 && (
        <p className="error-message">{invalidFiles.length} invalid files selected</p>
      )}
      {files.length > 0 && (
        <div className="selected-controls">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Action</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={`${file.name}-${index}`}>
                  <td>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon size={30} strokeWidth={1.5} color={'#ffc800'} />}
                      onClick={() => {
                        handleDelete(file.name);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>{file.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
