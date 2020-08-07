export interface State {
    encrypt: boolean
    key: string
    result: string | null
    loading: boolean
    sourceSelected: boolean
    secretSelected: boolean
}

export enum SelectedImage {
    Source,
    Secret,
}

export interface EncryptQuery {
    source: string
    message: string
    key: string
}

export interface DecryptQuery {
    source: string
    secret: string
    key: string
}

export type Query = EncryptQuery & DecryptQuery
