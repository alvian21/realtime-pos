import { INITIAL_TABLE, INITIAL_STATE_TABLE } from "@/constants/table-constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTable } from "../actions";
import FormTable from "./form-table";
import { TableForm, tableFormSchema } from "@/validations/table-validation";

export default function DialogCreateTable({
  refetch,
  open,
}: {
  refetch: () => void;
  open: boolean;
}) {
  const form = useForm<TableForm>({
    resolver: zodResolver(tableFormSchema),
    defaultValues: INITIAL_TABLE,
  });

  const [createTableState, createTableAction, isPendingCreateTable] =
    useActionState(createTable, INITIAL_STATE_TABLE);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createTableAction(formData);
    });
  });

  useEffect(() => {
    if (createTableState?.status === "error") {
      toast.error("Create Table Failed", {
        description: createTableState.errors?._form?.[0],
      });
    }

    if (createTableState.status === "success") {
      toast.success("create Table success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createTableState]);

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <FormTable
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateTable}
      type="Create"
    />
  );
}
