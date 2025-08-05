"use client";
import { useState } from "react";
import { QuestionAnswerOptionsService } from "@/services/questionAnswerOptionsService";
import { UseQuestionAnswerOptionsReturn } from "./types/return";
import { OpcoesRespostaPerguntaEntity } from "@/type/entities";
import { CreateQuestionAnswerOptionsDTO } from "@/hooks/use-question-answer-options/types/dto";

const questionAnswerOptionsService = new QuestionAnswerOptionsService();

export function useQuestionAnswerOptions(): UseQuestionAnswerOptionsReturn {
  const [questionAnswerOptions, setQuestionAnswerOptions] = useState<
    OpcoesRespostaPerguntaEntity[]
  >([]);
  const [selectedQuestionAnswerOption, setSelectedQuestionAnswerOption] =
    useState<OpcoesRespostaPerguntaEntity | null>(null);
  const [newQuestionAnswerOption, setNewQuestionAnswerOption] =
    useState<OpcoesRespostaPerguntaEntity | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Função para buscar todas as opções de resposta para as perguntas
  const getAllQuestionAnswerOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionAnswerOptionsService.getAll();
      setQuestionAnswerOptions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar uma opção de resposta por ID
  const getByIdQuestionAnswerOption = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionAnswerOptionsService.getById(id);
      setSelectedQuestionAnswerOption(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova opção de resposta para uma pergunta
  const createQuestionAnswerOption = async (
    dto: CreateQuestionAnswerOptionsDTO
  ): Promise<OpcoesRespostaPerguntaEntity | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionAnswerOptionsService.create(dto);
      setNewQuestionAnswerOption(data);
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar uma opção de resposta
  const deleteQuestionAnswerOption = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await questionAnswerOptionsService.delete(id);
      setQuestionAnswerOptions((prevOptions) =>
        prevOptions.filter((option) => option.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    questionAnswerOptions,
    selectedQuestionAnswerOption,
    newQuestionAnswerOption,
    loading,
    error,
    getAllQuestionAnswerOptions,
    getByIdQuestionAnswerOption,
    createQuestionAnswerOption,
    deleteQuestionAnswerOption,
  };
}
