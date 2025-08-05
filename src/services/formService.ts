// services/FormService.ts
import { supabase } from "@/lib/supabaseClient";
import { FormularioEntity } from "@/type/entities";
import { CreateFormDTO } from "@/hooks/use-forms/types/dto";

export class FormService {
  // Busca todos os formulários
  async getAll(): Promise<FormularioEntity[]> {
    try {
      const { data: formulario, error } = await supabase
        .from("formulario")
        .select("*");

      if (error) {
        throw new Error(
          `Erro ao buscar todos os formulários: ${error.message}`
        );
      }

      return formulario ?? [];
    } catch (err) {
      console.error("Erro ao buscar formulários:", err);
      throw err;
    }
  }

  // Busca um formulário por ID
  async getById(id: number): Promise<FormularioEntity | null> {
    try {
      const { data: formulario, error } = await supabase
        .from("formulario")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(
          `Erro ao buscar formulário com ID ${id}: ${error.message}`
        );
      }

      console.log("Formulário encontrado:", formulario);
      return formulario ?? null;
    } catch (err) {
      console.error(`Erro ao buscar formulário com ID ${id}:`, err);
      throw err;
    }
  }

  // Cria um novo formulário
  async create(form: CreateFormDTO): Promise<FormularioEntity> {
    try {
      const { data: formulario, error } = await supabase
        .from("formulario")
        .insert([form])
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao criar novo formulário: ${error.message}`);
      }

      return formulario;
    } catch (err) {
      console.error("Erro ao criar formulário:", err);
      throw err;
    }
  }

  // Deleta um formulário
  async delete(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("formulario").delete().eq("id", id);

      if (error) {
        throw new Error(
          `Erro ao deletar formulário com ID ${id}: ${error.message}`
        );
      }
    } catch (err) {
      console.error(`Erro ao deletar formulário com ID ${id}:`, err);
      throw err;
    }
  }
}
