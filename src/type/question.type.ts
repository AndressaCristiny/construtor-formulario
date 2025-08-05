import { AnswerOption } from "./answerOption.type";

export interface Question {
  id: string;
  titulo: string;
  codigo: string;
  orientacao_resposta: string;
  ordem: number;
  obrigatoria: boolean;
  sub_pergunta: boolean;
  tipo_pergunta: QuestionType;
  id_pergunta_pai?: number;
  condicao_resposta?: string;
  opcoes_respostas: AnswerOption[];
}

export type QuestionType =
  | "sim_nao"
  | "multipla_escolha"
  | "unica_escolha"
  | "texto_livre"
  | "inteiro"
  | "decimal";
