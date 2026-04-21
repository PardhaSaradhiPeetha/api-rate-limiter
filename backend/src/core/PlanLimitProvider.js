
const PLAN_LIMITS = {
    free: {
        maxApiKeys:5,
        capacity:50,
        timeWindow:60,
        maxCost: 5 
    },
    paid: {
        maxApiKeys:10,
        capacity: 100,
        timeWindow:60,
        maxCost: 10
    }
}

export const getLimits = (plan) => {
    const config = PLAN_LIMITS[plan] || PLAN_LIMITS["free"];

    return {
        maxApiKeys: config.maxApiKeys,
        capacity: config.capacity,
        refillRate: config.capacity/config.timeWindow,
        maxCost: config.maxCost
    }
};