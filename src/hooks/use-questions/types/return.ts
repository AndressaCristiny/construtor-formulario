import { PerguntaEntity } from "@/type/entities";
import { CreateQuestionsDTO } from "./dto";

// Estado retornado pelo hook
export interface UseQuestionsReturn {
  questions: PerguntaEntity[];
  selectedQuestions: PerguntaEntity | null;
  newQuestions: PerguntaEntity | null;
  loading: boolean;
  error: Error | null;
  getAllQuestions: () => Promise<void>;
  getByIdQuestions: (id: number) => Promise<void>;
  createQuestions: (data: CreateQuestionsDTO) => Promise<PerguntaEntity | null>;
  deleteQuestions: (id: number) => Promise<void>;
}
