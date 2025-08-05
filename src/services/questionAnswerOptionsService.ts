// services/QuestionAnswerOptionsService.ts
import { supabase } from "@/lib/supabaseClient";
import { OpcoesRespostaPerguntaEntity } from "@/type/entities";
import { CreateQuestionAnswerOptionsDTO } from "@/hooks/use-question-answer-options/types/dto";

export class QuestionAnswerOptionsService {
  // Busca todas as opções de resposta de perguntas
  async getAll(): Promise<OpcoesRespostaPerguntaEntity[]> {
    try {
      const { data: opcoes_resposta_pergunta, error } = await supabase
        .from("opcoes_resposta_pergunta")
        .select("*");

      if (error) {
        throw new Error(
          `Erro ao buscar todas as opções de resposta de perguntas: ${error.message}`
        );
      }

      return opcoes_resposta_pergunta ?? [];
    } catch (err) {
      console.error("Erro ao buscar opções de resposta de perguntas:", err);
      throw err;
    }
  }

  // Busca uma opção de resposta de pergunta por ID
  async getById(id: number): Promise<OpcoesRespostaPerguntaEntity | null> {
    try {
      const { data: opcoes_resposta_pergunta, error } = await supabase
        .from("opcoes_resposta_pergunta")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(
          `Erro ao buscar opção de resposta de pergunta com ID ${id}: ${error.message}`
        );
      }

      console.log(
        "Opção de resposta de pergunta encontrada:",
        opcoes_resposta_pergunta
      );
      return opcoes_resposta_pergunta ?? null;
    } catch (err) {
      console.error(
        `Erro ao buscar opção de resposta de pergunta com ID ${id}:`,
        err
      );
      throw err;
    }
  }

  // Cria uma nova opção de resposta de pergunta
  async create(
    dto: CreateQuestionAnswerOptionsDTO
  ): Promise<OpcoesRespostaPerguntaEntity> {
    try {
      const { data, error } = await supabase
        .from("opcoes_resposta_pergunta")
        .insert([dto])
        .select()
        .single();

      if (error) {
        throw new Error(
          `Erro ao criar nova opção de resposta de pergunta: ${error.message}`
        );
      }

      return data;
    } catch (err) {
      console.error("Erro ao criar opção de resposta de pergunta:", err);
      throw err;
    }
  }

  // Deleta uma opção de resposta de pergunta
  async delete(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from("opcoes_resposta_pergunta")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(
          `Erro ao deletar opção de resposta de pergunta com ID ${id}: ${error.message}`
        );
      }
    } catch (err) {
      console.error(
        `Erro ao deletar opção de resposta de pergunta com ID ${id}:`,
        err
      );
      throw err;
    }
  }
}
