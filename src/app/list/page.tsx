"use client";

import { useEffect } from "react";
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
  BarChart3,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";

import { useForms } from "@/hooks/use-forms";

export default function FormulariosPage() {
  const { forms, getAllForms, deleteForm } = useForms();

  useEffect(() => {
    getAllForms();
  }, []);

  const handleDeleteForm = (formId: number) => {
    deleteForm(formId);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* grid-cols-4 */}
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
                    Formulários Ativos
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {forms.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form, index) => (
            <Card
              key={form.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group animate-in slide-in-from-bottom-4"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`bg-emerald-100 text-emerald-700 border-emerald-200 border font-medium`}
                      >
                        Ativo
                      </Badge>
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/form/${form.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 bg-transparent cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </Link>
                  <div className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                      disabled
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {forms.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Nenhum formulário encontrado
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Você ainda não criou nenhum formulário.
                  </p>
                </div>
                <Link href="/builder">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white cursor-pointer">
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
