import dotenv from 'dotenv'

dotenv.config()

export const url = process.env.MONGO_URI || ''
export const dataBaseName =process.env.DB_NAME || ''
export const baseUrlUtilerias =process.env.baseUrlUtilerias || ''
export const baseUrlBanxico = process.env.baseUrlBanxico || ''
export const port = process.env.PORT || ''
export const plaza = process.env.plaza || ''
export const numeroAbm = process.env.numeroAbm || ''
export const secret = process.env.secret || ''