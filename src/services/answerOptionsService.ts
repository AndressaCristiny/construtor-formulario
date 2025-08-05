// services/AnswerOptionsService.ts
import { supabase } from "@/lib/supabaseClient";
import { OpcoesRespostaEntity } from "@/type/entities";
import { CreateAnswerOptionsDTO } from "@/hooks/use-answer-options/types/dto";

export class AnswerOptionsService {
  // Busca todas as opções de resposta
  async getAll(): Promise<OpcoesRespostaEntity[]> {
    try {
      const { data: opcoes_respostas, error } = await supabase
        .from("opcoes_respostas")
        .select("*");

      if (error) {
        throw new Error(
          `Erro ao buscar todas as opções de resposta: ${error.message}`
        );
      }

      return opcoes_respostas ?? [];
    } catch (err) {
      console.error("Erro ao buscar opções de resposta:", err);
      throw err;
    }
  }

  // Busca uma opção de resposta por ID
  async getById(id: number): Promise<OpcoesRespostaEntity | null> {
    try {
      const { data: opcoes_respostas, error } = await supabase
        .from("opcoes_respostas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(
          `Erro ao buscar opção de resposta com ID ${id}: ${error.message}`
        );
      }

      console.log("Opção de resposta encontrada:", opcoes_respostas);
      return opcoes_respostas ?? null;
    } catch (err) {
      console.error(`Erro ao buscar opção de resposta com ID ${id}:`, err);
      throw err;
    }
  }

  // Cria uma nova opção de resposta
  async create(dto: CreateAnswerOptionsDTO): Promise<OpcoesRespostaEntity> {
    try {
      const { data, error } = await supabase
        .from("opcoes_respostas")
        .insert([dto])
        .select()
        .single();

      if (error) {
        throw new Error(
          `Erro ao criar nova opção de resposta: ${error.message}`
        );
      }

      return data;
    } catch (err) {
      console.error("Erro ao criar opção de resposta:", err);
      throw err;
    }
  }

  // Deleta uma opção de resposta
  async delete(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from("opcoes_respostas")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(
          `Erro ao deletar opção de resposta com ID ${id}: ${error.message}`
        );
      }
    } catch (err) {
      console.error(`Erro ao deletar opção de resposta com ID ${id}:`, err);
      throw err;
    }
  }
}
