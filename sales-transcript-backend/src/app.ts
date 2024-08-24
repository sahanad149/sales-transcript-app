import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import multer from 'multer';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const upload = multer({ dest: 'uploads/' });

app.post('/api/comments/:sectionIndex', upload.single('file'), async (req: Request, res: Response) => {
  const { sectionIndex } = req.params;
  const { text } = req.body;
  const file = req.file;

  const commentId = `comment-${Date.now()}`;
  let attachmentUrl = '';

  if (file) {
    const uploadParams = {
      Bucket: 'your-bucket-name',
      Key: `transcripts/${sectionIndex}/comments/${commentId}/${file.originalname}`,
      Body: file.buffer
    };
    const result = await s3.upload(uploadParams).promise();
    attachmentUrl = result.Location;
  }

  const params = {
    TableName: 'CommentsTable',
    Item: {
      CommentId: commentId,
      SectionIndex: sectionIndex,
      Text: text,
      AttachmentUrl: attachmentUrl,
      Timestamp: new Date().toISOString()
    }
  };

  await dynamoDb.put(params).promise();
  res.status(201).json({ message: 'Comment added' });
});

app.get('/api/transcript', async (req: Request, res: Response) => {
  // Retrieve transcript data (example data)
  res.json([{ sectionIndex: 1, text: 'This is a sample transcript' }]);
});

app.post('/api/summarize', async (req: Request, res: Response) => {
  const transcript: string = req.body.transcript;
  const summary = await generateSummary(transcript);
  res.json({ summary });
});

async function generateSummary(transcript: string): Promise<string> {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'gpt-3.5-turbo',
    prompt: transcript,
    max_tokens: 150,
  }, {
    headers: {
      Authorization: `Bearer YOUR_OPENAI_API_KEY`
    }
  });

  return response.data.choices[0].text.trim();
}

export default app;