interface ClientInfoState {
   vpId: string | null;
   name: string | null;
}

export default interface ClientsInfoState {
   me: ClientInfoState;
   other: ClientInfoState;
}