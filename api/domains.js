// GET /api/domains -> Guerrilla Mail er domain list (static, API theke domain ase na)
module.exports = async (req, res) => {
  res.status(200).json([
    { domain: 'guerrillamailblock.com', isActive: true },
    { domain: 'guerrillamail.com', isActive: true },
    { domain: 'guerrillamail.net', isActive: true },
    { domain: 'sharklasers.com', isActive: true }
  ]);
};
