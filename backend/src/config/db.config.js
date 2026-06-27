import "dotenv/config";
import mongoose from "mongoose";

const maskMongoUri = (uri) => {
    try {
        const parsed = new URL(uri);

        if (parsed.password) {
            parsed.password = "****";
        }

        return parsed.toString();
    } catch {
        return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
    }
};

const getMongoUri = () => {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/api-rate-limiter";

    try {
        const parsed = new URL(mongoUri);

        if (parsed.pathname === "/" || parsed.pathname === "") {
            parsed.pathname = "/api-rate-limiter";
        }

        return parsed.toString();
    } catch {
        return mongoUri;
    }
};

const getMongoErrorHint = (err) => {
    const message = `${err?.name || ""} ${err?.code || ""} ${err?.message || ""}`;

    if (message.includes("querySrv") || message.includes("ENOTFOUND")) {
        return "Check your Atlas cluster hostname and internet/DNS connection.";
    }

    if (message.includes("ECONNREFUSED")) {
        return "MongoDB is not running at the configured host/port, or the port is blocked.";
    }

    if (message.includes("Authentication failed") || message.includes("bad auth")) {
        return "Check the MongoDB username/password in MONGO_URI. Encode special characters in the password.";
    }

    if (message.includes("SSL") || message.includes("TLS") || message.includes("alert internal error")) {
        return "For Atlas, whitelist your current IP in Network Access and confirm the connection string is complete.";
    }

    if (message.includes("Invalid scheme") || message.includes("Invalid connection string")) {
        return "MONGO_URI must start with mongodb:// or mongodb+srv://.";
    }

    return "Check MONGO_URI, Atlas Network Access, database user permissions, and your network connection.";
};

const connectDB = async () => {
    const mongoUri = getMongoUri();
    const safeMongoUri = maskMongoUri(mongoUri);

    try {
        console.log(`MongoDB connecting: ${safeMongoUri}`);
        await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    } catch (err) {
        console.error("MongoDB connection failed");
        console.error(`URI: ${safeMongoUri}`);
        console.error(`Reason: ${err.message}`);
        console.error(`Hint: ${getMongoErrorHint(err)}`);
        throw err;
    }
}

export default connectDB;
