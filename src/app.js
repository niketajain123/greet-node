
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'greet-app', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello from greet-app 👋');
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
