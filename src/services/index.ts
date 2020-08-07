import { DecryptQuery, EncryptQuery } from "@/types"

const isProduction = process.env.VUE_APP_PROD === "true"

const url = isProduction
    ? `https://${process.env.VUE_APP_URL}/api`
    : `http://localhost:${process.env.VUE_APP_API_PORT}/api`

const mode: RequestMode =
    process.env.VUE_APP_PROD === "true" ? "same-origin" : "cors"

const DEFAULT_SETTINGS = {
    method: "POST",
    mode,
    headers: {
        "Content-Type": "application/json",
    },
}

export const encryptApi = async (query: EncryptQuery) => {
    const response = await fetch(`${url}/encrypt`, {
        ...DEFAULT_SETTINGS,
        body: JSON.stringify(query),
    })
    return response.json()
}

export const decryptApi = async (query: DecryptQuery) => {
    const response = await fetch(`${url}/decrypt`, {
        ...DEFAULT_SETTINGS,
        body: JSON.stringify(query),
    })
    return response.json()
}
