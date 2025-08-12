import Joi from "joi";

export const InicioDeSesionJoi = Joi.object({
    correo: Joi.string().min(8).max(25).email().required().messages({
        "string.email": "Correo inválido",
        "any.required": "El correo es obligatorio"
    }),
    contrasenia: Joi.string().min(3).max(25).required().messages({
        "string.min": "La contrasenia debe tener al menos 6 caracteres",
        "any.required": "La contrasenia es obligatorio"
    })
})

export class InicioDeSesionDto {
    correo: string
    contrasenia: string
    private body: any
    private errors: any

    constructor(body: any) {
        const { error, value } = InicioDeSesionJoi.validate(body)
        this.contrasenia = ''
        this.correo = ''
        if (error) {
            this.errors = error
        } else {
            this.correo = body.correo
            this.contrasenia = body.contrasenia
        }
    }

    getErrors() {
        if (this.errors) {

            const data = {
                message: "Errores de validación",
                details: this.errors.details.map((err: any) => err.message)
            }
            return data
        }
        else
            return undefined
    }
}