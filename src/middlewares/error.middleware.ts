import { Request, Response, NextFunction } from "express";

// Middleware global de manejo de errores
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error("❌ Error capturado:", err);

  // Si ya se envió la respuesta, no hacemos nada más
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: "Error interno del servidor",
    error: err.message // en prod podrías ocultar esto
  });
}
