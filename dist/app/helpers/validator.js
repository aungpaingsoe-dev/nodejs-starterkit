"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validater = void 0;
const validater = async (schema, input) => {
    const { success, error, data } = await schema.safeParseAsync(input);
    if (error) {
        const details = error.errors.map((error) => {
            return {
                field: error.path[0],
                issue: error.message,
            };
        });
        return { success, error: details };
    }
    else {
        return { success, data };
    }
};
exports.validater = validater;
