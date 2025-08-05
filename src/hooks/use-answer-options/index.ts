"use client";
import { useState } from "react";
import { AnswerOptionsService } from "@/services/answerOptionsService";
import { UseAnswerOptionsReturn } from "./types/return"; // Corrigido para "Answer"
import { OpcoesRespostaEntity } from "@/type/entities"; // Corrigido para usar a tipagem certa
import { CreateAnswerOptionsDTO } from "@/hooks/use-answer-options/types/dto";

// Instanciando o serviço
const answerOptionsService = new AnswerOptionsService();

export function useAnswerOptions(): UseAnswerOptionsReturn {
  // Renomeando as variáveis de estado para algo mais consistente com o padrão de nomenclatura
  const [answerOptions, setAnswerOptions] = useState<OpcoesRespostaEntity[]>(
    []
  );
  const [selectedAnswerOption, setSelectedAnswerOption] =
    useState<OpcoesRespostaEntity | null>(null);
  const [newAnswerOption, setNewAnswerOption] =
    useState<OpcoesRespostaEntity | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Função para buscar todas as opções de resposta
  const getAllAnswerOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await answerOptionsService.getAll();
      setAnswerOptions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar uma opção de resposta por ID
  const getByIdAnswerOption = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await answerOptionsService.getById(id);
      setSelectedAnswerOption(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova opção de resposta
  const createAnswerOption = async (
    dto: CreateAnswerOptionsDTO
  ): Promise<OpcoesRespostaEntity | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await answerOptionsService.create(dto);
      setNewAnswerOption(data);
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar uma opção de resposta
  const deleteAnswerOption = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await answerOptionsService.delete(id);
      setAnswerOptions((prevAnswerOptions) =>
        prevAnswerOptions.filter((answerOption) => answerOption.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    answerOptions,
    selectedAnswerOption,
    newAnswerOption,
    loading,
    error,
    getAllAnswerOptions,
    getByIdAnswerOption,
    createAnswerOption,
    deleteAnswerOption,
  };
}
