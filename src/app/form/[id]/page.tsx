"use client";

import { useState } from "react";
import { FormRenderer } from "@/components/form-renderer";
import { FormData } from "@/type/formData.type";

export default function FormPage({ params }: { params: { id: string } }) {
  console.log("Form ID:", params.id);

  const mockFormData: FormData = {
    id: 1,
    titulo: "Formulário de exemplo",
    descricao: "Descrição do formulário de exemplo",
    questions: [], // Adicione as perguntas aqui
  };

  const [formData, setFormData] = useState(mockFormData);

  const handleFormSubmit = () => {
    console.log("");
  };

  return <FormRenderer formData={formData} onSubmit={handleFormSubmit} />;
}
