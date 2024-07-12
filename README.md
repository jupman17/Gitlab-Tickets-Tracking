you should open 3 terminals:

FIRST ONE :
npm install
npm start

SECOND ONE:
cd server
npm install
node server.js

THIRD ONE:
ngrok config add-authtoken 2iyFWNZO1Bo3yeLfsBdxgwfpOib_3vzoAcxK6VV82aRKQtdXp
ngrok http http://localhost:5000
