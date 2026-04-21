import { tokenBucket } from "./tokenBucketAlgorithm.js";
import { getLimits } from "./PlanLimitProvider.js";

export const applyRateLimit = async (apiKeyData, requestedCost, ip) =>{
    if(!apiKeyData.active){
        return{
            allowed: false,
            error: "API key deactivated"
        };
    }

    const { capacity, refillRate, maxCost } = getLimits(apiKeyData.plan);

    let cost = requestedCost ?? 1;
    if(cost < 1) cost = 1;

    let warning = null;

    if(cost > maxCost){
        warning = `cost capped to max allowed: ${maxCost}`;
        cost = maxCost;
    }

    const key = `bucket:${apiKeyData.keyHash}:${ip}`;

    const result = await tokenBucket(key,capacity,refillRate,cost);

    return{
        ...result,warning
    }

};