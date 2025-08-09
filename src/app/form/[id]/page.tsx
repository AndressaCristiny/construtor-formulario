"use client";

import React, { useState } from "react";
import { FormRenderer } from "@/components/form-renderer";
import { FormData } from "@/type/formData.type";

export default function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const mockFormData: FormData = {
    id: 1,
    titulo: "Pesquisa de Satisfação do Cliente",
    descricao:
      "Ajude-nos a melhorar nossos serviços respondendo a esta breve pesquisa. Suas respostas são importantes para nós e nos ajudarão a oferecer uma experiência ainda melhor!",
    questions: [
      {
        id: 1,
        titulo: "Qual é o seu nome?",
        codigo: "nome",
        orientacao_resposta:
          "Digite seu nome completo para personalizar nossa comunicação",
        ordem: 1,
        obrigatoria: true,
        sub_pergunta: false,
        tipo_pergunta: "texto_livre" as const,
        opcoes_respostas: [],
      },
      {
        id: 2,
        titulo: "Como você avalia nosso atendimento?",
        codigo: "avaliacao_atendimento",
        orientacao_resposta:
          "Selecione uma opção que melhor representa sua experiência conosco",
        ordem: 2,
        obrigatoria: true,
        sub_pergunta: false,
        tipo_pergunta: "unica_escolha" as const,
        opcoes_respostas: [
          {
            id: 1,
            id_pergunta: "q2",
            resposta: "Excelente",
            ordem: 1,
            resposta_aberta: false,
          },
          {
            id: 2,
            id_pergunta: "q2",
            resposta: "Bom",
            ordem: 2,
            resposta_aberta: false,
          },
          {
            id: 3,
            id_pergunta: "q2",
            resposta: "Regular",
            ordem: 3,
            resposta_aberta: false,
          },
          {
            id: 4,
            id_pergunta: "q2",
            resposta: "Ruim (essa opção exibirá uma questão condicional)",
            ordem: 4,
            resposta_aberta: false,
          },
          {
            id: 5,
            id_pergunta: "q2",
            resposta: "Outro",
            ordem: 5,
            resposta_aberta: true,
          },
        ],
      },
      {
        id: 3,
        titulo: "Por que você considera o atendimento ruim?",
        codigo: "motivo_ruim",
        orientacao_resposta:
          "Nos ajude a entender o que podemos melhorar (selecione todas as opções que se aplicam)",
        ordem: 3,
        obrigatoria: true,
        sub_pergunta: true,
        tipo_pergunta: "multipla_escolha" as const,
        id_pergunta_pai: 2,
        condicao_resposta: "Ruim",
        opcoes_respostas: [
          {
            id: 6,
            id_pergunta: "q3",
            resposta: "Demora no atendimento",
            ordem: 1,
            resposta_aberta: false,
          },
          {
            id: 7,
            id_pergunta: "q3",
            resposta: "Atendente mal educado",
            ordem: 2,
            resposta_aberta: false,
          },
          {
            id: 8,
            id_pergunta: "q3",
            resposta: "Não resolveu meu problema",
            ordem: 3,
            resposta_aberta: false,
          },
          {
            id: 9,
            id_pergunta: "q3",
            resposta: "Outros motivos",
            ordem: 4,
            resposta_aberta: true,
          },
        ],
      },
      {
        id: 4,
        titulo: "Qual sua idade?",
        codigo: "idade",
        orientacao_resposta:
          "Esta informação nos ajuda a entender melhor nosso público",
        ordem: 4,
        obrigatoria: false,
        sub_pergunta: false,
        tipo_pergunta: "numero" as const,
        opcoes_respostas: [],
      },
      {
        id: 5,
        titulo: "Você recomendaria nossos serviços?",
        codigo: "recomendaria",
        orientacao_resposta: "Sua opinião é muito valiosa para nós",
        ordem: 5,
        obrigatoria: true,
        sub_pergunta: false,
        tipo_pergunta: "sim_nao" as const,
        opcoes_respostas: [],
      },
      {
        id: 6,
        titulo: "Por que você não recomendaria nossos serviços?",
        codigo: "motivo_nao_recomenda",
        orientacao_resposta: "Sua opinião sincera nos ajudará a melhorar",
        ordem: 6,
        obrigatoria: true,
        sub_pergunta: true,
        tipo_pergunta: "texto_livre" as const,
        id_pergunta_pai: 5,
        condicao_resposta: "nao",
        opcoes_respostas: [],
      },
      {
        id: 7,
        titulo: "Quais serviços você já utilizou?",
        codigo: "servicos_utilizados",
        orientacao_resposta:
          "Selecione todos os serviços que você já utilizou conosco",
        ordem: 7,
        obrigatoria: false,
        sub_pergunta: false,
        tipo_pergunta: "multipla_escolha" as const,
        opcoes_respostas: [
          {
            id: 10,
            id_pergunta: "q7",
            resposta: "Suporte Técnico",
            ordem: 1,
            resposta_aberta: false,
          },
          {
            id: 11,
            id_pergunta: "q7",
            resposta: "Vendas",
            ordem: 2,
            resposta_aberta: false,
          },
          {
            id: 12,
            id_pergunta: "q7",
            resposta: "Consultoria",
            ordem: 3,
            resposta_aberta: false,
          },
          {
            id: 13,
            id_pergunta: "q7",
            resposta: "Treinamento",
            ordem: 4,
            resposta_aberta: false,
          },
          {
            id: 14,
            id_pergunta: "q7",
            resposta: "Outros",
            ordem: 5,
            resposta_aberta: true,
          },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState(mockFormData);

  const handleFormSubmit = () => {
    console.log("Form submitted, params:", params);
  };

  return <FormRenderer formData={formData} onSubmit={handleFormSubmit} />;
}
