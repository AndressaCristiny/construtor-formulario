"use client";

import { FormRenderer } from "@/components/form-renderer";
import { useState } from "react";
import { Question } from "@/type/question.type";

interface FormData {
  id: number;
  titulo: string;
  descricao: string;
  questions: Question[];
}

const mockFormData: FormData = {
  id: 1,
  titulo: "Pesquisa de Satisfação do Cliente",
  descricao:
    "Ajude-nos a melhorar nossos serviços respondendo a esta breve pesquisa. Suas respostas são importantes para nós e nos ajudarão a oferecer uma experiência ainda melhor!",
  questions: [
    {
      id: "q1",
      titulo: "Qual é o seu nome?",
      codigo: "nome",
      orientacao_resposta:
        "Digite seu nome completo para personalizar nossa comunicação",
      ordem: 1,
      obrigatoria: true,
      sub_pergunta: false,
      tipo_pergunta: "texto_livre", // Agora um valor do tipo QuestionType
      opcoes_respostas: [],
    },
    {
      id: "2",
      titulo: "Como você avalia nosso atendimento?",
      codigo: "avaliacao_atendimento",
      orientacao_resposta:
        "Selecione uma opção que melhor representa sua experiência conosco",
      ordem: 2,
      obrigatoria: true,
      sub_pergunta: false,
      tipo_pergunta: "unica_escolha", // Agora um valor do tipo QuestionType
      opcoes_respostas: [
        {
          id: 1,
          resposta: "Excelente",
          ordem: 1,
          resposta_aberta: false,
          id_pergunta: "2",
        },
        {
          id: 2,
          resposta: "Bom",
          ordem: 2,
          resposta_aberta: false,
          id_pergunta: "2",
        },
        {
          id: 3,
          resposta: "Regular",
          ordem: 3,
          resposta_aberta: false,
          id_pergunta: "2",
        },
        {
          id: 4,
          resposta: "Ruim",
          ordem: 4,
          resposta_aberta: false,
          id_pergunta: "2",
        },
        {
          id: 5,
          resposta: "Outro",
          ordem: 5,
          resposta_aberta: true,
          id_pergunta: "2",
        },
      ],
    },
    {
      id: "3",
      titulo: "Por que você considera o atendimento ruim?",
      codigo: "motivo_ruim",
      orientacao_resposta:
        "Nos ajude a entender o que podemos melhorar (selecione todas as opções que se aplicam)",
      ordem: 3,
      obrigatoria: true,
      sub_pergunta: true,
      tipo_pergunta: "multipla_escolha", // Agora um valor do tipo QuestionType
      id_pergunta_pai: 2,
      condicao_resposta: "Ruim",
      opcoes_respostas: [
        {
          id: 6,
          resposta: "Demora no atendimento",
          ordem: 1,
          resposta_aberta: false,
          id_pergunta: "3",
        },
        {
          id: 7,
          resposta: "Atendente mal educado",
          ordem: 2,
          resposta_aberta: false,
          id_pergunta: "3",
        },
        {
          id: 8,
          resposta: "Não resolveu meu problema",
          ordem: 3,
          resposta_aberta: false,
          id_pergunta: "3",
        },
        {
          id: 9,
          resposta: "Outros motivos",
          ordem: 4,
          resposta_aberta: true,
          id_pergunta: "3",
        },
      ],
    },
    {
      id: "4",
      titulo: "Qual sua idade?",
      codigo: "idade",
      orientacao_resposta:
        "Esta informação nos ajuda a entender melhor nosso público",
      ordem: 4,
      obrigatoria: false,
      sub_pergunta: false,
      tipo_pergunta: "inteiro", // Agora um valor do tipo QuestionType
      opcoes_respostas: [],
    },
    {
      id: "5",
      titulo: "Você recomendaria nossos serviços?",
      codigo: "recomendaria",
      orientacao_resposta: "Sua opinião é muito valiosa para nós",
      ordem: 5,
      obrigatoria: true,
      sub_pergunta: false,
      tipo_pergunta: "sim_nao", // Agora um valor do tipo QuestionType
      opcoes_respostas: [],
    },
    {
      id: "6",
      titulo: "Por que você não recomendaria nossos serviços?",
      codigo: "motivo_nao_recomenda",
      orientacao_resposta: "Sua opinião sincera nos ajudará a melhorar",
      ordem: 6,
      obrigatoria: true,
      sub_pergunta: true,
      tipo_pergunta: "texto_livre", // Agora um valor do tipo QuestionType
      id_pergunta_pai: 5,
      condicao_resposta: "nao",
      opcoes_respostas: [],
    },
    {
      id: "7",
      titulo: "Quais serviços você já utilizou?",
      codigo: "servicos_utilizados",
      orientacao_resposta:
        "Selecione todos os serviços que você já utilizou conosco",
      ordem: 7,
      obrigatoria: false,
      sub_pergunta: false,
      tipo_pergunta: "multipla_escolha", // Agora um valor do tipo QuestionType
      opcoes_respostas: [
        {
          id: 10,
          resposta: "Suporte Técnico",
          ordem: 1,
          resposta_aberta: false,
          id_pergunta: "7",
        },
        {
          id: 11,
          resposta: "Vendas",
          ordem: 2,
          resposta_aberta: false,
          id_pergunta: "7",
        },
        {
          id: 12,
          resposta: "Consultoria",
          ordem: 3,
          resposta_aberta: false,
          id_pergunta: "7",
        },
        {
          id: 13,
          resposta: "Treinamento",
          ordem: 4,
          resposta_aberta: false,
          id_pergunta: "7",
        },
        {
          id: 14,
          resposta: "Outros",
          ordem: 5,
          resposta_aberta: true,
          id_pergunta: "7",
        },
      ],
    },
  ],
};

export default function FormPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState(mockFormData);

  const handleFormSubmit = () => {
    console.log("");
  };

  return <FormRenderer formData={formData} onSubmit={handleFormSubmit} />;
}
