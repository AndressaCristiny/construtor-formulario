import { OpcoesRespostaPerguntaEntity } from "@/type/entities";
import { CreateQuestionAnswerOptionsDTO } from "./dto";

export interface UseQuestionAnswerOptionsReturn {
  questionAnswerOptions: OpcoesRespostaPerguntaEntity[];
  selectedQuestionAnswerOption: OpcoesRespostaPerguntaEntity | null;
  newQuestionAnswerOption: OpcoesRespostaPerguntaEntity | null;
  loading: boolean;
  error: Error | null;
  getAllQuestionAnswerOptions: () => Promise<void>;
  getByIdQuestionAnswerOption: (id: number) => Promise<void>;
  createQuestionAnswerOption: (
    data: CreateQuestionAnswerOptionsDTO
  ) => Promise<OpcoesRespostaPerguntaEntity | null>;
  deleteQuestionAnswerOption: (id: number) => Promise<void>;
}
