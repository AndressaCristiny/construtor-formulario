"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForms } from "@/hooks/use-forms";
import { useQuestions } from "@/hooks/use-questions";
import { useAnswerOptions } from "@/hooks/use-answer-options";
import { useQuestionAnswerOptions } from "@/hooks/use-question-answer-options";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Edit,
  CirclePlus,
  Trash2,
  GripVertical,
  Sparkles,
  Save,
  CheckCircle,
  PartyPopper,
} from "lucide-react";
// Drag & Drop
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableQuestion from "@/components/sortable-question";

import { Question, QuestionType } from "@/type/question.type";
import { AnswerOption } from "@/type/answerOption.type";

export default function FormBuilder() {
  // Hooks
  const router = useRouter();
  const { createForm } = useForms();
  const { createQuestions } = useQuestions();
  const { createAnswerOption } = useAnswerOptions();
  const { createQuestionAnswerOption } = useQuestionAnswerOptions();

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // Enviando formulários
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [savedQuestionsCount, setSavedQuestionsCount] = useState<number>(0);

  // Formulário
  const [title, setTitle] = useState("Formulário sem título");
  const [description, setDescription] = useState("Formulário sem descrição");
  const [formQuestions, setFormQuestions] = useState<Question[]>([]);

  // Questões
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    titulo: "",
    codigo: "",
    orientacao_resposta: "",
    tipo_pergunta: "texto_livre",
    obrigatoria: false,
    sub_pergunta: false,
    opcoes_respostas: [],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const addQuestion = () => {
    if (!newQuestion.titulo) return;

    const question: Question = {
      id: Date.now().toString(),
      titulo: newQuestion.titulo || "",
      codigo: newQuestion.codigo || `q_${Date.now()}`,
      orientacao_resposta: newQuestion.orientacao_resposta || "",
      ordem: formQuestions.length + 1,
      obrigatoria: newQuestion.obrigatoria || false,
      sub_pergunta: newQuestion.sub_pergunta || false,
      tipo_pergunta: newQuestion.tipo_pergunta || "texto_livre",
      id_pergunta_pai: newQuestion.id_pergunta_pai,
      condicao_resposta: newQuestion.condicao_resposta,
      opcoes_respostas: newQuestion.opcoes_respostas || [],
    };

    setFormQuestions([...formQuestions, question]);
    setNewQuestion({
      titulo: "",
      codigo: "",
      orientacao_resposta: "",
      tipo_pergunta: "texto_livre",
      obrigatoria: false,
      sub_pergunta: false,
      opcoes_respostas: [],
    });
    setShowQuestionForm(false);
  };

  const removeQuestion = (questionId: string) => {
    setFormQuestions(formQuestions.filter((q) => q.id !== questionId));
  };

  const addAnswerOption = () => {
    const newOption: AnswerOption = {
      id: Date.now(),
      id_pergunta: String(newQuestion.id),
      resposta: "",
      ordem: (newQuestion.opcoes_respostas?.length || 0) + 1,
      resposta_aberta: false,
    };

    setNewQuestion({
      ...newQuestion,
      opcoes_respostas: [...(newQuestion.opcoes_respostas || []), newOption],
    });
  };

  const updateAnswerOption = (
    optionId: number,
    field: keyof AnswerOption,
    value: string
  ) => {
    const updatedOptions =
      newQuestion.opcoes_respostas?.map((option) =>
        option.id === optionId ? { ...option, [field]: value } : option
      ) || [];

    setNewQuestion({
      ...newQuestion,
      opcoes_respostas: updatedOptions,
    });
  };

  const removeAnswerOption = (optionId: number) => {
    const updatedOptions =
      newQuestion.opcoes_respostas?.filter(
        (option) => option.id !== optionId
      ) || [];
    setNewQuestion({
      ...newQuestion,
      opcoes_respostas: updatedOptions,
    });
  };

  const needsAnswerOptions = (type: QuestionType) => {
    return type === "multipla_escolha" || type === "unica_escolha";
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels = {
      texto_livre: "Texto Livre",
      multipla_escolha: "Múltipla Escolha",
      unica_escolha: "Única Escolha",
      numero: "Número",
      sim_nao: "Sim/Não",
    };
    return labels[type];
  };

  const getQuestionTypeIcon = (type: QuestionType) => {
    const icons = {
      texto_livre: "📝",
      multipla_escolha: "☑️",
      unica_escolha: "🔘",
      numero: "🔢",
      sim_nao: "✅",
    };
    return icons[type];
  };

  const resetForm = () => {
    setTitle("Formulário sem título");
    setDescription("Formulário sem descrição");
    setFormQuestions([]);
    setShowQuestionForm(false);
    setNewQuestion({
      titulo: "",
      codigo: "",
      orientacao_resposta: "",
      tipo_pergunta: "texto_livre",
      obrigatoria: false,
      sub_pergunta: false,
      opcoes_respostas: [],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setFormQuestions((prev) => {
      const oldIndex = prev.findIndex((q) => q.id === active.id);
      const newIndex = prev.findIndex((q) => q.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      return reordered.map((q, idx) => ({ ...q, ordem: idx + 1 }));
    });
  };

  const handleSaveForms = async () => {
    const idMap = new Map<string, number>();

    console.log("Formulários salvos:", formQuestions);

    try {
      // 1. Cria o formulário
      const createdForm = await createForm({
        titulo: title,
        descricao: description,
        ordem: 1,
      });

      if (!createdForm?.id) {
        console.error("❌ newForm não foi atribuído após createForm");
        return;
      }

      // 2. Cria perguntas
      for (const question of formQuestions) {
        const { id: tempId, opcoes_respostas = [], ...rest } = question;

        const createdQuestion = await createQuestions({
          id_formulario: createdForm.id,
          titulo: rest.titulo,
          codigo: rest.codigo,
          orientacao_resposta: rest.orientacao_resposta,
          ordem: rest.ordem,
          obrigatoria: rest.obrigatoria,
          sub_pergunta: rest.sub_pergunta,
          tipo_pergunta: rest.tipo_pergunta,
          id_pergunta_pai: rest.id_pergunta_pai
            ? idMap.get(rest.id_pergunta_pai.toString())
            : undefined,
          condicao_resposta: rest.condicao_resposta,
        });

        if (!createdQuestion?.id) {
          console.error(
            "❌ createdQuestion não foi atribuído após createQuestions"
          );
          continue;
        }

        idMap.set(tempId, createdQuestion.id);

        // 3. Cria opções de resposta
        if (opcoes_respostas.length > 0) {
          for (const option of opcoes_respostas) {
            const createdOption = await createAnswerOption({
              id_pergunta: createdQuestion.id,
              resposta: option.resposta,
              ordem: option.ordem,
              resposta_aberta: option.resposta_aberta,
            });

            if (!createdOption?.id) {
              console.error(
                "❌ createdOption não foi atribuído após createAnswerOption"
              );
              continue;
            }

            await createQuestionAnswerOption({
              id_pergunta: createdQuestion.id,
              id_opcao_resposta: createdOption.id,
            });
          }
        }
      }

      console.log("✅ Formulário salvo com sucesso.");
      setShowSuccessMessage(true);
      setShowSuccessOverlay(true);
      setSavedQuestionsCount(formQuestions.length);

      setTimeout(() => {
        resetForm();
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("❌ Erro ao salvar formulários:", error);
    }
  };

  return (
    <div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-4 duration-300">
          <Alert className="border-emerald-200 bg-emerald-50 shadow-lg">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <AlertDescription className="text-emerald-700 font-medium">
              Formulário salvo com sucesso! Reiniciando editor...
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Success Overlay Dialog */}
      <Dialog open={showSuccessOverlay} onOpenChange={setShowSuccessOverlay}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <PartyPopper className="h-7 w-7 text-emerald-600" />
            </div>
            <DialogTitle className="text-center mt-2">
              Formulário salvo com sucesso
            </DialogTitle>
            <DialogDescription className="text-center">
              Seu formulário{" "}
              <span className="font-medium text-foreground">{title}</span> foi
              salvo com{" "}
              <span className="font-medium">{savedQuestionsCount}</span>{" "}
              pergunta
              {savedQuestionsCount === 1 ? "" : "s"}.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
            • Você pode começar um novo formulário, visualizar a lista de
            formulários ou fechar esta mensagem.
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-center">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              onClick={() => {
                resetForm();
                setShowSuccessOverlay(false);
              }}
            >
              Criar novo formulário
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessOverlay(false);
                router.push("/list");
              }}
              className="cursor-pointer"
            >
              Ver formulários
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowSuccessOverlay(false)}
              className="cursor-pointer"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full flex justify-center p-6">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          {/* Cabeçalho do formulário */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg">
              <CardTitle>
                <div className="flex items-center gap-3">
                  <Edit className="h-6 w-6 text-indigo-600" />
                  <Input
                    type="text"
                    placeholder="Título do formulário"
                    value={title}
                    onChange={handleTitleChange}
                    className="border-0 shadow-none leading-[2.5rem] bg-transparent text-2xl font-bold text-gray-800 focus:ring-2 focus:ring-indigo-200 rounded-lg"
                  />
                </div>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center mt-4">
                  <Textarea
                    value={description}
                    placeholder="Descrição do formulário"
                    onChange={handleDescriptionChange}
                    className="border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50"
                    style={{
                      fontSize: "1.1rem",
                      minHeight: "100px",
                      paddingTop: "0.75rem",
                    }}
                  />
                </div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Perguntas existentes */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={formQuestions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              {formQuestions.map((question, index) => (
                <SortableQuestion key={question.id} id={question.id}>
                  {({ attributes, listeners, setActivatorNodeRef }) => (
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                      <CardHeader className="bg-gradient-to-r from-gray-50/50 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                ref={setActivatorNodeRef}
                                {...attributes}
                                {...listeners}
                                className="text-gray-400 hover:text-indigo-600 cursor-grab active:cursor-grabbing"
                                title="Arraste para reordenar"
                              >
                                <GripVertical className="h-5 w-5" />
                              </Button>
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {getQuestionTypeIcon(question.tipo_pergunta)}
                              </span>
                              <div>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                  {getQuestionTypeLabel(question.tipo_pergunta)}
                                </span>
                                {question.obrigatoria && (
                                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                    Obrigatória
                                  </span>
                                )}
                                {question.sub_pergunta && (
                                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                                    Condicional
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardTitle className="text-xl text-gray-800 mt-4">
                          {question.titulo}
                        </CardTitle>
                        {question.orientacao_resposta && (
                          <CardDescription className="text-gray-600 text-base">
                            {question.orientacao_resposta}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                              Código: {question.codigo}
                            </span>
                          </div>
                          {needsAnswerOptions(question.tipo_pergunta) &&
                            question.opcoes_respostas.length > 0 && (
                              <div className="mt-6">
                                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                                  Opções de resposta:
                                </Label>
                                <div className="space-y-3">
                                  {question.opcoes_respostas.map(
                                    (option, optIndex) => (
                                      <div
                                        key={option.id}
                                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200"
                                      >
                                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                          {optIndex + 1}
                                        </span>
                                        <span className="text-gray-700 font-medium flex-1">
                                          {option.resposta}
                                        </span>
                                        {option.resposta_aberta && (
                                          <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
                                            + Texto livre
                                          </span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </SortableQuestion>
              ))}
            </SortableContext>
          </DndContext>

          {/* Adicionar pergunta no formulário */}
          {showQuestionForm && (
            <Card className="border-2 border-indigo-300 shadow-xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-xl text-indigo-800 flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  Nova Pergunta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="question-title"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Título da Pergunta *
                    </Label>
                    <Input
                      id="question-title"
                      value={newQuestion.titulo || ""}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          titulo: e.target.value,
                        })
                      }
                      placeholder="Digite o título da pergunta"
                      className="mt-2 border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="question-code"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Código
                    </Label>
                    <Input
                      id="question-code"
                      value={newQuestion.codigo || ""}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          codigo: e.target.value,
                        })
                      }
                      placeholder="Ex: q_nome, q_idade"
                      className="mt-2 border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="question-type"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Tipo de Pergunta
                  </Label>
                  <Select
                    value={newQuestion.tipo_pergunta}
                    onValueChange={(value: QuestionType) =>
                      setNewQuestion({ ...newQuestion, tipo_pergunta: value })
                    }
                  >
                    <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="texto_livre">
                        📝 Texto Livre
                      </SelectItem>
                      <SelectItem value="multipla_escolha">
                        ☑️ Múltipla Escolha
                      </SelectItem>
                      <SelectItem value="unica_escolha">
                        🔘 Única Escolha
                      </SelectItem>
                      <SelectItem value="numero">🔢 Número</SelectItem>
                      <SelectItem value="sim_nao">✅ Sim/Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="question-guidance"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Orientação de Resposta
                  </Label>
                  <Textarea
                    id="question-guidance"
                    value={newQuestion.orientacao_resposta || ""}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        orientacao_resposta: e.target.value,
                      })
                    }
                    placeholder="Instruções adicionais para o respondente"
                    className="mt-2 border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  />
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="required"
                      checked={newQuestion.obrigatoria}
                      onCheckedChange={(checked) =>
                        setNewQuestion({
                          ...newQuestion,
                          obrigatoria: checked as boolean,
                        })
                      }
                      className="border-2 border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <Label
                      htmlFor="required"
                      className="font-medium text-gray-700"
                    >
                      Pergunta obrigatória
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="sub-question"
                      checked={newQuestion.sub_pergunta}
                      onCheckedChange={(checked) =>
                        setNewQuestion({
                          ...newQuestion,
                          sub_pergunta: checked as boolean,
                        })
                      }
                      className="border-2 border-amber-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label
                      htmlFor="sub-question"
                      className="font-medium text-gray-700"
                    >
                      Sub-pergunta
                    </Label>
                  </div>
                </div>

                {/* Lógica Condicional */}
                {newQuestion.sub_pergunta && formQuestions.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div>
                      <Label className="text-sm font-semibold text-amber-800">
                        Pergunta Pai
                      </Label>
                      <Select
                        value={newQuestion.id_pergunta_pai?.toString() || ""}
                        onValueChange={(value) =>
                          setNewQuestion({
                            ...newQuestion,
                            id_pergunta_pai: parseInt(value, 10),
                          })
                        }
                      >
                        <SelectTrigger className="mt-2 border-amber-200 focus:border-amber-400">
                          <SelectValue placeholder="Selecione a pergunta pai" />
                        </SelectTrigger>
                        <SelectContent>
                          {formQuestions.map((q) => (
                            <SelectItem key={q.id} value={q.id}>
                              {q.titulo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-amber-800">
                        Condição (Resposta)
                      </Label>
                      <Input
                        value={newQuestion.condicao_resposta || ""}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            condicao_resposta: e.target.value,
                          })
                        }
                        placeholder="Valor da resposta que ativa esta pergunta"
                        className="mt-2 border-amber-200 focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                {/* Opções de resposta */}
                {needsAnswerOptions(
                  newQuestion.tipo_pergunta || "texto_livre"
                ) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-700">
                        Opções de Resposta
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addAnswerOption}
                        className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 bg-transparent"
                      >
                        <CirclePlus className="h-4 w-4 mr-2" />
                        Adicionar Opção
                      </Button>
                    </div>

                    {newQuestion.opcoes_respostas?.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-3 p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-200 transition-all duration-300"
                      >
                        <span className="text-sm text-gray-500 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <Input
                          value={option.resposta}
                          onChange={(e) =>
                            updateAnswerOption(
                              option.id,
                              "resposta",
                              e.target.value
                            )
                          }
                          placeholder="Texto da opção"
                          className="flex-1 border-gray-200 focus:border-indigo-400"
                        />
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={option.resposta_aberta}
                            onCheckedChange={(checked: boolean) =>
                              updateAnswerOption(
                                option.id,
                                "resposta_aberta",
                                checked ? "true" : "false"
                              )
                            }
                            className="border-2 border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <Label className="text-sm font-medium text-gray-700">
                            Permite texto livre
                          </Label>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnswerOption(option.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-6">
                  <Button
                    onClick={addQuestion}
                    disabled={!newQuestion.titulo}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Adicionar Pergunta
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowQuestionForm(false)}
                    className="border-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botão Adicionar Pergunta */}
          {!showQuestionForm && (
            <Card className="border-2 border-dashed border-indigo-300 hover:border-indigo-400 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80">
              <div className="flex justify-center py-12">
                <Button
                  variant="ghost"
                  className="w-full max-w-md flex items-center justify-center gap-3 py-8 text-lg font-medium text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 transition-all duration-300 cursor-pointer"
                  onClick={() => setShowQuestionForm(true)}
                >
                  <CirclePlus className="h-12 w-12 text-indigo-500" />
                  <div className="text-center">
                    <div>Adicionar nova pergunta</div>
                    <div className="text-sm text-gray-500 font-normal">
                      Clique para criar uma nova pergunta
                    </div>
                  </div>
                </Button>
              </div>
            </Card>
          )}

          {/* Ações de formulário */}
          {formQuestions.length > 0 && (
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="px-8 py-4 bg-white text-indigo-700 hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={handleSaveForms}
                  >
                    <Save className="h-5 w-5 mr-3" />
                    Salvar Formulário
                  </Button>
                </div>
                <p className="text-center text-indigo-100 mt-4 text-sm">
                  {formQuestions.length} pergunta
                  {formQuestions.length !== 1 ? "s" : ""} criada
                  {formQuestions.length !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
