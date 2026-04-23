const maxApiKeys = 5;
const  capacity = 50;
const  timeWindow = 60; //seconds
const  maxCost = 5;

export const getLimits = () => {
    const config = PLAN_LIMITS["free"];

    return {
        maxApiKeys: maxApiKeys,
        capacity: capacity,
        refillRate: capacity/timeWindow,
        maxCost: maxCost
    }
};