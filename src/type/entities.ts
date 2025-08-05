export interface FormularioEntity {
  id: number;
  titulo: string;
  descricao?: string;
  ordem?: number;
}

export interface PerguntaEntity {
  id: number;
  id_formulario: string;
  titulo?: string;
  codigo?: string;
  orientacao_resposta?: string;
  ordem?: number;
  obrigatoria?: boolean;
  sub_pergunta?: boolean;
  tipo_pergunta?:
    | "sim_não"
    | "mutipla_escolha"
    | "unica_escolha"
    | "texto_livre"
    | "inteiro"
    | "decimal";
}

export interface OpcoesRespostaPerguntaEntity {
  id: number;
  id_opcao_resposta: number;
  id_pergunta: number;
}

export interface OpcoesRespostaEntity {
  id: number;
  id_pergunta: number;
  resposta: string;
  ordem?: number;
  resposta_aberta?: boolean;
}
