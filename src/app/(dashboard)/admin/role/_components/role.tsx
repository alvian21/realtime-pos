"use client";

import DataTable from "@/components/common/data-table";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HEADER_TABLE_ROLE } from "@/constants/role-constant";
import useDataTable from "@/hooks/use-data-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { getAllRoles } from "../actions";
import { Role } from "@/types/role";

export default function RoleManagement() {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
  } = useDataTable();
  const {
    data: roles,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["roles", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const result = await getAllRoles({currentPage: (currentPage - 1) * currentLimit, currentLimit, currentSearch});

      if (result.error)
        toast.error("Get role data failed", {
          description: result.error.message,
        });

      console.log('result', result);
      return result?.data;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: Role;
    type: "update" | "delete";
  } | null>(null);

  const handleChangeAction = (open: boolean) => {
    if (!open) setSelectedAction(null);
  };

  const filteredData = useMemo(() => {
    return (roles?.data || []).map((role: Role, index: number) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        role.name,
        role.alias,
        role.isActive ? 'Aktif' : 'Non-Aktif',
        formatDate(role.createdAt),
        <DropdownAction
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil />
                  Edit
                </span>
              ),
              action: () => {
                setSelectedAction({
                  data: role,
                  type: "update",
                });
              },
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  <Trash2 className="text-red-400" />
                  Delete
                </span>
              ),
              variant: "destructive",
              action: () => {
                setSelectedAction({
                  data: role,
                  type: "delete",
                });
              },
            },
          ]}
        />,
      ];
    });
  }, [roles]);

  const totalPages = useMemo(() => {
    return roles && roles.count !== null
      ? Math.ceil(roles.count / currentLimit)
      : 0;
  }, [roles]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
            {/* <DialogCreateUser refetch={refetch} /> */}
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_ROLE}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
      {/* <DialogUpdateUser
        open={selectedAction !== null && selectedAction.type === "update"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      />

      <DialogDeleteUser
        open={selectedAction !== null && selectedAction.type === "delete"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      /> */}
    </div>
  );
}