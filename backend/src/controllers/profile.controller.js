export const getUserProfile = async (req, res) => {
  try {
    const user = await req.user;
    return res.status(200).json({sucess: true, message: "User profile fetched successfully!", user});
  } catch (error) {
    return res.status(400).json({success: false, ERROR: error.message});
  }
}