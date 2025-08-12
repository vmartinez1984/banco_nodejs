import { Request, Response, NextFunction } from "express";
import { generateGUID } from "../helpers/guid";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const guid = generateGUID()
    // Guardar datos originales de res.send para interceptar la respuesta
    const originalSend = res.send;

    let responseBody: any;

    res.send = function (body) {
        responseBody = body;
        return originalSend.call(this, body);
    };

    // Log de request
    console.log("📥 Request:");
    console.log({
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        guid: guid
    });

    // Cuando la respuesta termina
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log("📤 Response:");
        console.log({
            statusCode: res.statusCode,
            durationMs: duration,
            body: responseBody,
            guid: guid
        });
        console.log("───────────────────────────────");
    });

    next();
}