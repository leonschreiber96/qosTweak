interface ClientInfoState {
   vpId: string | null
   name: string | null
}

export type ClientsInfoState = {
   me: ClientInfoState
   other: ClientInfoState
}
