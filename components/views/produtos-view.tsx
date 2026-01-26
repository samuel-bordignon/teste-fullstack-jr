"use client";

import { useState } from "react";
import { useProdutos, Produto, FilterProdutoPayload } from "@/hooks/use-produtos";
import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { produtoColumns } from "@/components/produtos/produto-columns";
import { AddProductModal } from "@/components/produtos/produto-add-modal";
import { EditProductModal } from "@/components/produtos/produto-edit-modal";
import { DeleteProductDialog } from "@/components/produtos/produto-delete-dialog";
import { normalizeString } from "@/lib/string-utils";
import FilterTrigger from "../custom/filter-trigger";
import { FilterProductModal } from "../produtos/produto-filter-modal";

export function ProdutosView() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterProdutoPayload>();
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { data: produtos, isLoading, isError, error } = useProdutos(filters);

  const filteredProdutos = produtos?.filter((p) =>
    normalizeString(p.nome).includes(normalizeString(search)) ||
    normalizeString(p.sku).includes(normalizeString(search))||
    normalizeString(p.marca).includes(normalizeString(search))
  );

  const handleEdit = (id: string) => {
    const productToEdit = produtos?.find((prod) => prod.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={produtoColumns}
        data={filteredProdutos || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchComponent={
          <Input
            placeholder="Buscar por nome, SKU e marca"
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
          <Button key="new-product" onClick={() => setIsAddModalOpen(true)}>
            Novo Produto
          </Button>,
        ]}
      />

      <FilterProductModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filters) => {
          setFilters(filters)
        }}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
      />
      <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        productId={productIdToDelete}
      />
    </>
  );
}
