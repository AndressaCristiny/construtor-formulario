"use client";
import { useState } from "react";
import { QuestionsService } from "@/services/questionsService";
import { UseQuestionsReturn } from "./types/return";
import { PerguntaEntity } from "@/type/entities";
import { CreateQuestionsDTO } from "@/hooks/use-questions/types/dto";

const questionsService = new QuestionsService();

export function useQuestions(): UseQuestionsReturn {
  const [questions, setQuestions] = useState<PerguntaEntity[]>([]);
  const [selectedQuestions, setSelectedQuestions] =
    useState<PerguntaEntity | null>(null);
  const [newQuestions, setNewQuestions] = useState<PerguntaEntity | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Função para buscar todas as questões
  const getAllQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionsService.getAll();
      setQuestions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar uma questão por ID
  const getByIdQuestions = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionsService.getById(id);
      setSelectedQuestions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova questão
  const createQuestions = async (
    dto: CreateQuestionsDTO
  ): Promise<PerguntaEntity | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionsService.create(dto);
      setNewQuestions(data);
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir uma questão
  const deleteQuestions = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await questionsService.delete(id);
      // Atualizando a lista de questões após a exclusão
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    selectedQuestions,
    newQuestions,
    loading,
    error,
    getAllQuestions,
    getByIdQuestions,
    createQuestions,
    deleteQuestions,
  };
}
