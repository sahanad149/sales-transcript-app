import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
  id: string;
  text: string;
  attachmentUrl?: string;
}

interface TranscriptSection {
  text: string;
  comments: Comment[];
}

const TranscriptViewer: React.FC = () => {
  const [transcript, setTranscript] = useState<TranscriptSection[]>([]);

  useEffect(() => {
    axios.get('/api/transcript')
      .then(response => setTranscript(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddComment = (sectionIndex: number) => {
    // Logic to add a comment to a specific section
  };

  return (
    <div>
      {transcript.map((section, index) => (
        <div key={index}>
          <p>{section.text}</p>
          <button onClick={() => handleAddComment(index)}>Add Comment</button>
          {section.comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.text}</p>
              {comment.attachmentUrl && <a href={comment.attachmentUrl}>View Attachment</a>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TranscriptViewer;