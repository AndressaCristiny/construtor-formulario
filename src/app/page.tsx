"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Sparkles, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="relative overflow-hidden w-full">
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* animate-in zoom-in-50 duration-500 */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl mb-8">
                <Sparkles className="h-10 w-10 text-white" />
              </div>

              {/* animate-in slide-in-from-bottom-4 duration-700 */}
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-6">
                Bem-vindo ao Futuro dos Formulários
              </h1>

              {/* animate-in slide-in-from-bottom-4 duration-700 delay-200 */}
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Crie formulários dinâmicos e inteligentes que se adaptam às
                respostas dos usuários.
                <span className="text-indigo-600 font-semibold">
                  {" "}
                  Simples, poderoso e elegante.
                </span>
              </p>

              {/* animate-in slide-in-from-bottom-4 duration-700 delay-400 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleRoute("/builder")}
                >
                  <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                  Criar Novo Formulário
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-semibold text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
                  onClick={() => handleRoute("/list")}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Ver Formulários Existentes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
