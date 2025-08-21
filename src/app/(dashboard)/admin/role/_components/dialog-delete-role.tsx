import DialogDelete from "@/components/common/dialog-delete";
import { Role } from "@/types/role";
import { startTransition, useActionState, useEffect } from "react";
import { deleteRole } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";

export default function DialogDeleteRole({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Role;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteRoleState, deleteRoleAction, isPendingDeleteRole] =
    useActionState(deleteRole, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    startTransition(() => {
      deleteRoleAction(formData);
    });
  };

  useEffect(() => {
    if (deleteRoleState?.status === "error") {
      toast.error("Delete role Failed", {
        description: deleteRoleState.errors?._form?.[0],
      });
    }

    if (deleteRoleState.status === "success") {
      toast.success("Delete role success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteRoleState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteRole}
      onSubmit={onSubmit}
      title="Role"
    />
  );
}
