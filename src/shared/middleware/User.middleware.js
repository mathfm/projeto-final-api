import { schemaMiddleware } from "./Schema.middleware.js";
import { verityEmailAndUsername } from "./validation/EmailUserValidation.js";

export  const userMiddlewareList = (req, res, next) => {
    const middlewaresList = [verityEmailAndUsername, schemaMiddleware];

    const runMiddleware = index => {
        if (index < middlewaresList.length) {
            const currentMiddleware = middlewaresList[index];
            currentMiddleware(req, res, () => runMiddleware(index + 1));
        } else {
            next();
        }
    };
    runMiddleware(0);
};