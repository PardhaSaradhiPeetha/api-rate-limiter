export const logout = (req, res) => {
    res.clearCookie("auth_token",
        {
            httpOnly: true,
            secure: process.env.ENV === "production",
            sameSite: process.env.ENV === "production" ? "none" : "lax",
            path: "/"
        });

    return res.status(200).json({ message: "Logout Successfull" });
}