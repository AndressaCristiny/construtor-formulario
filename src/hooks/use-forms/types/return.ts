import { FormularioEntity } from "@/type/entities";
import { CreateFormDTO } from "./dto";

// Estado retornado pelo hook
export interface UseFormsReturn {
  forms: FormularioEntity[];
  selectedForm: FormularioEntity | null;
  newForm: FormularioEntity | null;
  loading: boolean;
  error: Error | null;
  getAllForms: () => Promise<void>;
  getByIdForm: (id: number) => Promise<void>;
  createForm: (data: CreateFormDTO) => Promise<FormularioEntity | null>;
  deleteForm: (id: number) => Promise<void>;
}
