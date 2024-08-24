import React, { useState } from 'react';
import axios from 'axios';

const CommentManager: React.FC = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('/api/comments/1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h2>Add Comment</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CommentManager;