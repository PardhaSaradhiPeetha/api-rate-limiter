export const logout = (req, res) => {
    res.clearCookie("auth_token",
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        
    return res.status(200).json({ message: "Logout Successfull" });
}