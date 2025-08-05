export interface CreateAnswerOptionsDTO {
  id_pergunta: number;
  resposta: string;
  ordem?: number;
  resposta_aberta?: boolean;
}
