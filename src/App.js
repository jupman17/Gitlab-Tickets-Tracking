import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');

  const triggerWebhook = async () => {
    try {
      const response = await axios.post('https://hook.eu2.make.com/4nfkgshc4gax0cgbuwn8jt8kkrlgeydv', {
        sheetId: '1qvfI3js5TPud0JZNtOvoJDzHhLEEi9HZwCAysUFc11Y'
      });
      console.log('Webhook triggered:', response.data);
      setMessage('Webhook triggered successfully.');
    } catch (error) {
      console.error('Error triggering webhook:', error);
      setMessage('Error triggering webhook.');
    }
  };

  const downloadGoogleSheet = async () => {
    const sheetId = '1qvfI3js5TPud0JZNtOvoJDzHhLEEi9HZwCAysUFc11Y';
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    try {
      const response = await axios.get(sheetUrl, {
        responseType: 'blob'
      });
      saveAs(response.data, 'google_sheet.csv');
      setMessage('Google Sheet downloaded successfully.');
    } catch (error) {
      console.error('Error downloading Google Sheet:', error);
      setMessage('Error downloading Google Sheet.');
    }
  };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Ixpath Gitlab tickets tracking</h1>
      <button onClick={triggerWebhook}>Enter your gitlab account</button>
      <button onClick={downloadGoogleSheet}>Download Google Sheet</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;