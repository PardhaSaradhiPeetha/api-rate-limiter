const normalizeIp = (value) => {
    if (!value) return "unknown";

    const ip = value.trim();

    if (ip === "::1") return "127.0.0.1";
    if (ip.startsWith("::ffff:")) return ip.slice(7);

    return ip;
};

export const getClientIp = (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    const forwardedIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor?.split(",")[0];

    return normalizeIp(
        req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        forwardedIp ||
        req.ip ||
        req.socket?.remoteAddress
    );
};
