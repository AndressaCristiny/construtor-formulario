// services/QuestionsService.ts
import { supabase } from "@/lib/supabaseClient";
import { PerguntaEntity } from "@/type/entities";
import { CreateQuestionsDTO } from "@/hooks/use-questions/types/dto";

export class QuestionsService {
  // Busca todas as perguntas
  async getAll(): Promise<PerguntaEntity[]> {
    try {
      const { data: pergunta, error } = await supabase
        .from("pergunta")
        .select("*");

      if (error) {
        throw new Error(`Erro ao buscar todas as perguntas: ${error.message}`);
      }

      return pergunta ?? [];
    } catch (err) {
      console.error("Erro ao buscar perguntas:", err);
      throw err;
    }
  }

  // Busca uma pergunta por ID
  async getById(id: number): Promise<PerguntaEntity | null> {
    try {
      const { data: pergunta, error } = await supabase
        .from("pergunta")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(
          `Erro ao buscar pergunta com ID ${id}: ${error.message}`
        );
      }

      console.log("Pergunta encontrada:", pergunta);
      return pergunta ?? null;
    } catch (err) {
      console.error(`Erro ao buscar pergunta com ID ${id}:`, err);
      throw err;
    }
  }

  // Cria uma nova pergunta
  async create(dto: CreateQuestionsDTO): Promise<PerguntaEntity> {
    try {
      const { data: pergunta, error } = await supabase
        .from("pergunta")
        .insert([dto])
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao criar nova pergunta: ${error.message}`);
      }

      return pergunta;
    } catch (err) {
      console.error("Erro ao criar pergunta:", err);
      throw err;
    }
  }

  // Deleta uma pergunta
  async delete(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("pergunta").delete().eq("id", id);

      if (error) {
        throw new Error(
          `Erro ao deletar pergunta com ID ${id}: ${error.message}`
        );
      }
    } catch (err) {
      console.error(`Erro ao deletar pergunta com ID ${id}:`, err);
      throw err;
    }
  }
}
