import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRole } from "../actions";
import FormRole from "./form-role";
import { RoleForm, roleFormSchema } from "@/validations/role-validation";
import { INITIAL_STATE_ROLE, INITIAL_ROLE_FORM } from "@/constants/role-constant";

export default function DialogCreateRole({ refetch }: { refetch: () => void }) {
  const form = useForm<RoleForm>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: INITIAL_ROLE_FORM,
  });

  const [createRoleState, createRoleAction, isPendingCreateRole] =
    useActionState(createRole, INITIAL_STATE_ROLE);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(() => {
      createRoleAction(formData);
    });
  });

  useEffect(() => {
    if (createRoleState?.status === "error") {
      toast.error("Create role Failed", {
        description: createRoleState.errors?._form?.[0],
      });
    }

    if (createRoleState?.status === "success") {
      toast.success("create role success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createRoleState]);

  return (
    <FormRole
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateRole}
      type="Create"
    />
  );
}
