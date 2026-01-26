"use client";

import { useState } from "react";
import { useCategories, Categoria, FilterCategoriaPayload } from "@/hooks/use-categorias";
import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categoriaColumns } from "@/components/categorias/categoria-columns";
import { AddCategoryModal } from "@/components/categorias/categoria-add-modal";
import { EditCategoryModal } from "@/components/categorias/categoria-edit-modal";
import { DeleteCategoryDialog } from "@/components/categorias/categoria-delete-dialog";
import { normalizeString } from "@/lib/string-utils";
import FilterTrigger from "../custom/filter-trigger";
import { FilterCategoryModal } from "../categorias/categoria-filter-modal";

export function CategoriasView() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterCategoriaPayload>();
  const { data: categories, isLoading, isError, error } = useCategories(filters);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(
    null,
  );
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null,
  );

  const filteredCategories = categories?.filter((c) =>
    normalizeString(c.nome).includes(normalizeString(search)) ||
    normalizeString(c.id).includes(normalizeString(search))
  );

  const handleEdit = (id: string) => {
    const categoryToEdit = categories?.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setSelectedCategory(categoryToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setCategoryIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load categories."}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={categoriaColumns}
        data={filteredCategories || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchComponent={
          <Input
            placeholder="Buscar por nome ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        }
        filterComponent={
          <FilterTrigger
            filters={filters}
            onClear={() => setFilters(undefined)}
            onOpen={() => setIsFilterModalOpen(true)}
          />
        }
        actionButtons={[
          <Button key="new-category" onClick={() => setIsAddModalOpen(true)}>
            Nova Categoria
          </Button>,
        ]}
      />

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <FilterCategoryModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={setFilters}
      />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
      />
      <DeleteCategoryDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        categoryId={categoryIdToDelete}
      />
    </>
  );
}
