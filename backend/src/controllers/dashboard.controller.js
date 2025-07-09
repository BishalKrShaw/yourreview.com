
export const userDashboard = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({success: true, user});
  } catch (error) {
    return res.status(400).json({success: false, message: "User not authorized!"});
  }
}