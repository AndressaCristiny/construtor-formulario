export interface CreateQuestionsDTO {
  id_formulario?: number;
  titulo?: string;
  codigo?: string;
  orientacao_resposta?: string;
  ordem?: number;
  obrigatoria?: boolean;
  sub_pergunta?: boolean;
  tipo_pergunta?:
    | "sim_nao"
    | "multipla_escolha"
    | "unica_escolha"
    | "texto_livre"
    | "numero";
  condicao_resposta?: string;
  id_pergunta_pai?: number;
}
