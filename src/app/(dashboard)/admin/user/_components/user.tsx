"use client";

import DataTable from "@/components/common/data-table";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDataTable from "@/hooks/use-data-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { getAllUsers } from "../actions";
import { User } from "@/types/user";
import { HEADER_TABLE_USER } from "@/constants/user-constant";

export default function UserManagement() {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
  } = useDataTable();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const result = await getAllUsers({
        currentPage: (currentPage - 1) * currentLimit,
        currentLimit,
        currentSearch,
      });

      if (result.error)
        toast.error("Get users data failed", {
          description: result.error.message,
        });
      return result?.data;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: User;
    type: "update" | "delete";
  } | null>(null);

  const handleChangeAction = (open: boolean) => {
    if (!open) setSelectedAction(null);
  };

  const filteredData = useMemo(() => {
    return (users?.data || []).map((user: User, index: number) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        user.email,
        user.fullName,
        user.role?.name,
        user.isActive ? "Aktif" : "Non-Aktif",
        formatDate(user.createdAt),
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
                  data: user,
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
                  data: user,
                  type: "delete",
                });
              },
            },
          ]}
        />,
      ];
    });
  }, [users]);

  const totalPages = useMemo(() => {
    return users && users.count !== null
      ? Math.ceil(users.count / currentLimit)
      : 0;
  }, [users]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_USER}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
}
