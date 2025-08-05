import { OpcoesRespostaEntity } from "@/type/entities";
import { CreateAnswerOptionsDTO } from "./dto";

export interface UseAnswerOptionsReturn {
  answerOptions: OpcoesRespostaEntity[];
  selectedAnswerOption: OpcoesRespostaEntity | null;
  newAnswerOption: OpcoesRespostaEntity | null;
  loading: boolean;
  error: Error | null;
  getAllAnswerOptions: () => Promise<void>;
  getByIdAnswerOption: (id: number) => Promise<void>;
  createAnswerOption: (
    data: CreateAnswerOptionsDTO
  ) => Promise<OpcoesRespostaEntity | null>;
  deleteAnswerOption: (id: number) => Promise<void>;
}
