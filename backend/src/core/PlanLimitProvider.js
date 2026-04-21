
const TIME_WINDOW = 60; //seconds

const PLAN_LIMITS = {
    free: {
        capacity:7,
        maxCost: 3 
    },
    paid: {
        capacity: 15,
        maxCost: 10
    }
}

export const getLimits = (plan) => {
    const config = PLAN_LIMITS[plan] || PLAN_LIMITS["free"];

    return {
        capacity: config.capacity,
        refillRate: config.capacity/TIME_WINDOW,
        maxCost: config.maxCost
    }
};