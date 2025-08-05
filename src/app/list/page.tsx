"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  BarChart3,
  Copy,
  Download,
  Share,
  Clock,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface FormItem {
  id: string;
  titulo: string;
  descricao: string;
  status: "ativo" | "rascunho" | "arquivado";
  created_at: string;
  updated_at: string;
  responses_count: number;
  questions_count: number;
  views: number;
}

// Mock data for demonstration
const mockForms: FormItem[] = [
  {
    id: "1",
    titulo: "Pesquisa de Satisfação do Cliente",
    descricao:
      "Formulário para avaliar a satisfação dos clientes com nossos serviços",
    status: "ativo",
    created_at: "2024-01-15",
    updated_at: "2024-01-20",
    responses_count: 127,
    questions_count: 8,
    views: 245,
  },
  // {
  //   id: "2",
  //   titulo: "Avaliação de Treinamento",
  //   descricao: "Formulário para coletar feedback sobre treinamentos realizados",
  //   status: "ativo",
  //   created_at: "2024-01-10",
  //   updated_at: "2024-01-18",
  //   responses_count: 89,
  //   questions_count: 12,
  //   views: 156,
  // },
  // {
  //   id: "3",
  //   titulo: "Cadastro de Fornecedores",
  //   descricao: "Formulário para cadastro e qualificação de novos fornecedores",
  //   status: "rascunho",
  //   created_at: "2024-01-22",
  //   updated_at: "2024-01-22",
  //   responses_count: 0,
  //   questions_count: 15,
  //   views: 12,
  // },
  // {
  //   id: "4",
  //   titulo: "Pesquisa de Mercado - Q1 2024",
  //   descricao: "Pesquisa trimestral sobre tendências do mercado",
  //   status: "arquivado",
  //   created_at: "2024-01-05",
  //   updated_at: "2024-01-15",
  //   responses_count: 234,
  //   questions_count: 20,
  //   views: 567,
  // },
  // {
  //   id: "5",
  //   titulo: "Feedback de Produto",
  //   descricao: "Coleta de opiniões sobre novos produtos lançados",
  //   status: "ativo",
  //   created_at: "2024-01-18",
  //   updated_at: "2024-01-25",
  //   responses_count: 45,
  //   questions_count: 10,
  //   views: 98,
  // },
];

export default function FormulariosPage() {
  const [forms, setForms] = useState<FormItem[]>(mockForms);
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "rascunho":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "arquivado":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "rascunho":
        return "Rascunho";
      case "arquivado":
        return "Arquivado";
      default:
        return status;
    }
  };

  const filteredForms =
    selectedStatus === "todos"
      ? forms
      : forms.filter((form) => form.status === selectedStatus);

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter((form) => form.id !== formId));
  };

  const handleDuplicateForm = (formId: string) => {
    const formToDuplicate = forms.find((form) => form.id === formId);
    if (formToDuplicate) {
      const duplicatedForm: FormItem = {
        ...formToDuplicate,
        id: Date.now().toString(),
        titulo: `${formToDuplicate.titulo} (Cópia)`,
        status: "rascunho",
        created_at: new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString().split("T")[0],
        responses_count: 0,
        views: 0,
      };
      setForms([duplicatedForm, ...forms]);
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Formulários
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.length}
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Respostas Coletadas
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.reduce((acc, form) => acc + form.responses_count, 0)}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Formulários Ativos
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.filter((form) => form.status === "ativo").length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total de Visualizações
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.reduce((acc, form) => acc + form.views, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={selectedStatus === "todos" ? "default" : "outline"}
            onClick={() => setSelectedStatus("todos")}
            className={
              selectedStatus === "todos"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "border-gray-200 hover:bg-gray-50"
            }
          >
            Todos ({forms.length})
          </Button>
          <Button
            variant={selectedStatus === "ativo" ? "default" : "outline"}
            onClick={() => setSelectedStatus("ativo")}
            className={
              selectedStatus === "ativo"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                : "border-gray-200 hover:bg-gray-50"
            }
          >
            Ativos ({forms.filter((f) => f.status === "ativo").length})
          </Button>
          <Button
            variant={selectedStatus === "rascunho" ? "default" : "outline"}
            onClick={() => setSelectedStatus("rascunho")}
            className={
              selectedStatus === "rascunho"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "border-gray-200 hover:bg-gray-50"
            }
          >
            Rascunhos ({forms.filter((f) => f.status === "rascunho").length})
          </Button>
          <Button
            variant={selectedStatus === "arquivado" ? "default" : "outline"}
            onClick={() => setSelectedStatus("arquivado")}
            className={
              selectedStatus === "arquivado"
                ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                : "border-gray-200 hover:bg-gray-50"
            }
          >
            Arquivados ({forms.filter((f) => f.status === "arquivado").length})
          </Button>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form, index) => (
            <Card
              key={form.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`${getStatusColor(
                          form.status
                        )} border font-medium`}
                      >
                        {getStatusLabel(form.status)}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(form.updated_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-gray-800 leading-tight group-hover:text-indigo-700 transition-colors">
                      {form.titulo}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2 line-clamp-2">
                      {form.descricao}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => handleDuplicateForm(form.id)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Compartilhar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </DropdownMenuItem> */}
                      <DropdownMenuItem
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {form.questions_count}
                    </p>
                    <p className="text-xs text-gray-600">Perguntas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {form.responses_count}
                    </p>
                    <p className="text-xs text-gray-600">Respostas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {form.views}
                    </p>
                    <p className="text-xs text-gray-600">Visualizações</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/form/${form.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </Link>
                  <Link href={`/edit/${form.id}`} className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredForms.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Nenhum formulário encontrado
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedStatus === "todos"
                      ? "Você ainda não criou nenhum formulário."
                      : `Não há formulários com status "${getStatusLabel(
                          selectedStatus
                        )}".`}
                  </p>
                </div>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Formulário
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
