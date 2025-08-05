"use client";
import { useState } from "react";
import { FormService } from "@/services/formService";
import { UseFormsReturn } from "./types/return";
import { FormularioEntity } from "@/type/entities";
import { CreateFormDTO } from "@/hooks/use-forms/types/dto";

const formService = new FormService();

export function useForms(): UseFormsReturn {
  const [forms, setForms] = useState<FormularioEntity[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormularioEntity | null>(
    null
  );
  const [newForm, setNewForm] = useState<FormularioEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Função para buscar todos os formulários
  const getAllForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await formService.getAll();
      setForms(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar um formulário pelo ID
  const getByIdForm = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await formService.getById(id);
      setSelectedForm(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar um novo formulário
  const createForm = async (
    dto: CreateFormDTO
  ): Promise<FormularioEntity | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await formService.create(dto);
      setNewForm(data);
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um formulário
  const deleteForm = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await formService.delete(id);
      setForms((prevForms) => prevForms.filter((form) => form.id !== id));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    forms,
    selectedForm,
    newForm,
    loading,
    error,
    getAllForms,
    getByIdForm,
    createForm,
    deleteForm,
  };
}
