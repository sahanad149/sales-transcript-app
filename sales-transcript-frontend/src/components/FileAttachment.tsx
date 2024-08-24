import React, { useState } from 'react';

interface FileAttachmentProps {
  onFileSelect: (file: File) => void;
  existingFileUrl?: string; // URL of the existing attached file, if any
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ onFileSelect, existingFileUrl }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ marginBottom: '10px' }}
      />
      {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )}
      {existingFileUrl && (
        <a href={existingFileUrl} target="_blank" rel="noopener noreferrer">
          View Attached File
        </a>
      )}
    </div>
  );
};

export default FileAttachment;