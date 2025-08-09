import { Question } from "@/type/question.type";

export interface FormData {
  id: number;
  titulo: string;
  descricao: string;
  questions: Question[];
}
