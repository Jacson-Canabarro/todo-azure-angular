export interface TodoItem {

  id?: string;
  assignedFor: string;
  status: State;
  name: string;
  description: string;


}


export enum State {
  Aguardando = 1,
  Andamento = 2,
  Feito = 3

}




