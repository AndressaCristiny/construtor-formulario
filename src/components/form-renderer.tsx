"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Sparkles, Send, Eye } from "lucide-react";
import { Question } from "@/type/question.type";

interface FormData {
  id: number;
  titulo: string;
  descricao: string;
  questions: Question[];
}

interface FormResponse {
  [questionId: string]: {
    value: string | string[];
    openText?: string;
  };
}

interface FormRendererProps {
  formData: FormData;
  onSubmit?: (responses: FormResponse) => void;
}

export function FormRenderer({ formData, onSubmit }: FormRendererProps) {
  const [responses, setResponses] = useState<FormResponse>({});
  const [errors, setErrors] = useState<{ [questionId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize visible questions (non-sub-questions are always visible)
  useEffect(() => {
    const initialVisible = new Set<string>();
    formData.questions.forEach((question) => {
      if (!question.sub_pergunta) {
        initialVisible.add(question.id);
      }
    });
    setVisibleQuestions(initialVisible);
  }, [formData.questions]);

  useEffect(() => {
    const newVisibleQuestions = new Set<string>();

    formData.questions.forEach((question) => {
      if (!question.sub_pergunta) {
        newVisibleQuestions.add(question.id);
      } else if (question.id_pergunta_pai && question.condicao_resposta) {
        const parentResponse = responses[question.id_pergunta_pai];
        if (parentResponse) {
          const parentValue = Array.isArray(parentResponse.value)
            ? parentResponse.value
            : [parentResponse.value];

          const shouldShow = parentValue.some(
            (value) =>
              value.toLowerCase() === question.condicao_resposta?.toLowerCase()
          );

          if (shouldShow) {
            newVisibleQuestions.add(question.id);
          }
        }
      }
    });

    setVisibleQuestions(newVisibleQuestions);
  }, [responses, formData.questions]);

  const handleResponseChange = (
    questionId: string,
    value: string | string[],
    openText?: string
  ) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        value,
        openText,
      },
    }));

    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [questionId: string]: string } = {};

    formData.questions.forEach((question) => {
      if (question.obrigatoria && visibleQuestions.has(question.id)) {
        const response = responses[question.id];
        if (
          !response ||
          !response.value ||
          (Array.isArray(response.value) && response.value.length === 0) ||
          (typeof response.value === "string" && response.value.trim() === "")
        ) {
          newErrors[question.id] = "Esta pergunta é obrigatória";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit?.(responses);
    }
  };

  const renderQuestionInput = (question: Question) => {
    const response = responses[question.id];
    const hasError = errors[question.id];

    switch (question.tipo_pergunta) {
      case "texto_livre":
        return (
          <div className="space-y-2">
            <Textarea
              value={(response?.value as string) || ""}
              onChange={(e) =>
                handleResponseChange(question.id, e.target.value)
              }
              placeholder="Digite sua resposta..."
              className={`transition-all duration-300 border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200"
              }`}
              rows={4}
            />
          </div>
        );

      case "inteiro":
        return (
          <div className="space-y-2">
            <Input
              type="number"
              value={(response?.value as string) || ""}
              onChange={(e) =>
                handleResponseChange(question.id, e.target.value)
              }
              placeholder="Digite um número..."
              className={`transition-all duration-300 border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${
                hasError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200"
              }`}
            />
          </div>
        );

      case "sim_nao":
        return (
          <RadioGroup
            value={(response?.value as string) || ""}
            onValueChange={(value: string) =>
              handleResponseChange(question.id, value)
            }
            className="flex gap-8"
          >
            <div className="flex items-center space-x-3 group">
              <RadioGroupItem
                value="sim"
                id={`${question.id}-sim`}
                className="border-2 border-emerald-300 text-emerald-600 focus:ring-emerald-200 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <Label
                htmlFor={`${question.id}-sim`}
                className="text-lg font-medium text-gray-700 group-hover:text-emerald-600 transition-colors cursor-pointer"
              >
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-3 group">
              <RadioGroupItem
                value="nao"
                id={`${question.id}-nao`}
                className="border-2 border-rose-300 text-rose-600 focus:ring-rose-200 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
              />
              <Label
                htmlFor={`${question.id}-nao`}
                className="text-lg font-medium text-gray-700 group-hover:text-rose-600 transition-colors cursor-pointer"
              >
                Não
              </Label>
            </div>
          </RadioGroup>
        );

      case "unica_escolha":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={(response?.value as string) || ""}
              onValueChange={(value: string) =>
                handleResponseChange(question.id, value, response?.openText)
              }
            >
              {question.opcoes_respostas
                .sort((a, b) => a.ordem - b.ordem)
                .map((option) => (
                  <div key={option.id} className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group">
                      <RadioGroupItem
                        value={option.resposta}
                        id={`${question.id}-${option.id}`}
                        className="border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-200 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                      />
                      <Label
                        htmlFor={`${question.id}-${option.id}`}
                        className="flex-1 text-gray-700 font-medium group-hover:text-indigo-700 transition-colors cursor-pointer"
                      >
                        {option.resposta}
                      </Label>
                    </div>
                    {option.resposta_aberta &&
                      response?.value === option.resposta && (
                        <div className="ml-8 animate-in slide-in-from-top-2 duration-300">
                          <Input
                            value={response?.openText || ""}
                            onChange={(e) =>
                              handleResponseChange(
                                question.id,
                                response.value,
                                e.target.value
                              )
                            }
                            placeholder="Especifique..."
                            className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                          />
                        </div>
                      )}
                  </div>
                ))}
            </RadioGroup>
          </div>
        );

      case "multipla_escolha":
        const selectedValues = (response?.value as string[]) || [];
        return (
          <div className="space-y-4">
            {question.opcoes_respostas
              .sort((a, b) => a.ordem - b.ordem)
              .map((option) => {
                const isSelected = selectedValues.includes(option.resposta);
                return (
                  <div key={option.id} className="space-y-3">
                    <div
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 group ${
                        isSelected
                          ? "border-indigo-300 bg-indigo-50"
                          : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50"
                      }`}
                    >
                      <Checkbox
                        id={`${question.id}-${option.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          let newValues: string[];
                          if (checked) {
                            newValues = [...selectedValues, option.resposta];
                          } else {
                            newValues = selectedValues.filter(
                              (v) => v !== option.resposta
                            );
                            // Clear open text if unchecking
                            if (response?.openText && isSelected) {
                              handleResponseChange(question.id, newValues, "");
                              return;
                            }
                          }
                          handleResponseChange(
                            question.id,
                            newValues,
                            response?.openText
                          );
                        }}
                        className="border-2 border-indigo-300 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 focus:ring-indigo-200"
                      />
                      <Label
                        htmlFor={`${question.id}-${option.id}`}
                        className="flex-1 text-gray-700 font-medium group-hover:text-indigo-700 transition-colors cursor-pointer"
                      >
                        {option.resposta}
                      </Label>
                    </div>
                    {option.resposta_aberta && isSelected && (
                      <div className="ml-8 animate-in slide-in-from-top-2 duration-300">
                        <Input
                          value={response?.openText || ""}
                          onChange={(e) =>
                            handleResponseChange(
                              question.id,
                              selectedValues,
                              e.target.value
                            )
                          }
                          placeholder="Especifique..."
                          className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <CheckCircle className="relative h-20 w-20 text-emerald-500 mx-auto animate-in zoom-in-50 duration-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    Formulário Enviado com Sucesso!
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Obrigado por suas respostas. Elas foram registradas com
                    sucesso.
                  </p>
                </div>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-8 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Responder Novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const visibleQuestionsList = formData.questions
    .filter((q) => visibleQuestions.has(q.id))
    .sort((a, b) => a.ordem - b.ordem);

  const progress =
    (Object.keys(responses).length / visibleQuestionsList.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="w-full flex justify-center p-6">
        <div className="w-full max-w-3xl flex flex-col gap-8">
          {/* Form Header */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-700/90"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            <CardHeader className="relative z-10 pb-8 pt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/80 font-medium">
                  Formulário Dinâmico
                </span>
              </div>
              <CardTitle className="text-3xl font-bold mb-4 leading-tight">
                {formData.titulo}
              </CardTitle>
              <CardDescription className="text-indigo-100 text-lg leading-relaxed">
                {formData.descricao}
              </CardDescription>
              <div className="mt-6 flex items-center gap-4 text-sm text-indigo-200">
                <span>📊 {visibleQuestionsList.length} perguntas</span>
                <span>
                  ⏱️ ~{Math.ceil(visibleQuestionsList.length * 0.5)} min
                </span>
                <span>🔒 Respostas seguras</span>
              </div>
            </CardHeader>
          </Card>

          {/* Questions */}
          {visibleQuestionsList.map((question, index) => (
            <Card
              key={question.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-800 leading-relaxed flex items-center gap-3">
                      {question.titulo}
                      {question.obrigatoria && (
                        <span className="text-rose-500 text-lg">*</span>
                      )}
                      {question.sub_pergunta && (
                        <span className="text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                          Condicional
                        </span>
                      )}
                    </CardTitle>
                    {question.orientacao_resposta && (
                      <CardDescription className="text-gray-600 mt-2 text-base leading-relaxed">
                        {question.orientacao_resposta}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                {renderQuestionInput(question)}
                {errors[question.id] && (
                  <Alert className="mt-4 border-red-200 bg-red-50 animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <AlertDescription className="text-red-700 font-medium">
                      {errors[question.id]}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Submit Button */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="lg"
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Enviar Respostas
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Suas respostas são importantes para nós e serão tratadas com
                  total confidencialidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
