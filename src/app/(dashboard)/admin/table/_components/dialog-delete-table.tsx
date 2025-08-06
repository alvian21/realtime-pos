import DialogDelete from "@/components/common/dialog-delete";
import { startTransition, useActionState, useEffect } from "react";
import { deleteTable } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { Table } from "@/validations/table-validation";

export default function DialogDeleteTable({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Table;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState?.status === "error") {
      toast.error("Delete table Failed", {
        description: deleteTableState.errors?._form?.[0],
      });
    }

    if (deleteTableState.status === "success") {
      toast.success("Delete table success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteTableState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      title="Table"
    />
  );
}
