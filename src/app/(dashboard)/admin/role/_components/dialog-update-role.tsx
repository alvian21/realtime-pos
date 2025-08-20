import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRole, updateRole } from "../actions";
import FormRole from "./form-role";
import { RoleForm, roleFormSchema } from "@/validations/role-validation";
import {
  INITIAL_STATE_ROLE,
  INITIAL_ROLE_FORM,
} from "@/constants/role-constant";
import { Role } from "@/types/role";
import { Dialog } from "@/components/ui/dialog";

export default function DialogUpdateRole({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Role;
  open?: boolean;
  handleChangeAction?: (open: boolean) => void;
}) {
  const form = useForm<RoleForm>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: INITIAL_ROLE_FORM,
  });

  const [updateRoleState, updateRoleAction, isPendingUpdateRole] =
    useActionState(updateRole, INITIAL_STATE_ROLE);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateRoleAction(formData);
    });
  });

  useEffect(() => {
    if (updateRoleState?.status === "error") {
      toast.error("Update role Failed", {
        description: updateRoleState.errors?._form?.[0],
      });
    }

    if (updateRoleState.status === "success") {
      toast.success("Update role success");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateRoleState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name as string);
      form.setValue("alias", currentData.alias as string);
      form.setValue("isActive", Boolean(currentData.isActive));
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormRole
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateRole}
        type="Update"
      />
    </Dialog>
  );
}
