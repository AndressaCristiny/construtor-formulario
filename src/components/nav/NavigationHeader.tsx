"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Palette,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationHeader() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const isBuilder = pathname === "/builder";
  const isList = pathname === "/list";
  const isInit = pathname === "/";

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Main Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Construtor de Formulários</h1>
              <p className="text-indigo-100 mt-1">
                Crie e gerencie formulários dinâmicos e interativos
              </p>
            </div>
          </div>

          {/* {isList && (
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar formulários..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
              />
            </div>
          )} */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/builder">
              <Button
                variant={isBuilder ? "secondary" : "ghost"}
                className={`px-6 py-3 font-semibold transition-all duration-300 cursor-pointer ${
                  isBuilder
                    ? "bg-white text-indigo-700 shadow-lg hover:bg-gray-50"
                    : "text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                }`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Novo Formulário
              </Button>
            </Link>

            <Link href="/list" className="cursor-pointer">
              <Button
                variant={isList ? "secondary" : "ghost"}
                className={`px-6 py-3 font-semibold transition-all duration-300 cursor-pointer ${
                  isList
                    ? "bg-white text-indigo-700 shadow-lg hover:bg-gray-50"
                    : "text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                Formulários
              </Button>
            </Link>
          </div>

          {/* {isList && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <div className="flex border border-white/20 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-none border-r border-white/20"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
