import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [previousWebhookUrl, setPreviousWebhookUrl] = useState('');
  const [sheetId, setSheetId] = useState('');






  const handleWebhookUrlSubmit = (e) => {
    e.preventDefault();
    if (webhookUrl !== previousWebhookUrl) {
      setWebhookUrl(webhookUrl.trim());
      setMessage('Webhook URL updated.');
    } else {
      setMessage('Webhook URL is the same as the previous one.');
    }
  };

  const triggerWebhook = useCallback(async () => {
    try {
      const response = await axios.post(webhookUrl, {
        sheetId
      });
      console.log('Webhook triggered:', response.data);
      setMessage('Webhook added successfuly');
    } catch (error) {
      console.error('Error triggering webhook:', error);
      setMessage('Error triggering webhook.');
    }
  }, [webhookUrl, sheetId]);


  useEffect(() => {
    if (webhookUrl && webhookUrl !== previousWebhookUrl) {
      triggerWebhook();
      setPreviousWebhookUrl(webhookUrl);
    }
  }, [webhookUrl, previousWebhookUrl, triggerWebhook]);

  const downloadGoogleSheet = async () => {
    if (!sheetId) {
      setMessage('Please enter a valid sheet ID.');
      return;
    }

    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    try {
      const response = await axios.get(sheetUrl, {
        responseType: 'blob',
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
      <h1 style={{ textAlign: 'center' }}>Ixpath Gitlab tickets tracking</h1>
      <p>1- Go to <a href="https://eu2.make.com/" target="_blank" rel="noopener noreferrer">Make</a></p>

      <p>2- Create a Scenario </p>
      <p>3- Import Blueprints.json file</p>
      <p>4- Add your gitlab account and your google sheet account</p>
      <p>5- Save the changes</p>
      <form onSubmit={handleWebhookUrlSubmit} className='form'>
        <div className='form-group'>
          <label className='labelwebhook'>Webhook URL:</label>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className='webhookUrl'
            placeholder='Enter your Webhook URL...'
            required
          />
          <input
            type="text"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="Enter Google Sheet URL"
          />
        </div>
      </form>
      <button onClick={downloadGoogleSheet}> Download google sheet </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
