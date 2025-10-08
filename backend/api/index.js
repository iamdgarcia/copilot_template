// Vercel Serverless function for root endpoint
module.exports = (req, res) => {
  res.status(200).json({ message: 'Copilot Template Backend (Vercel Serverless)' });
};
