import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constants/menu-constant";
import { MenuForm, menuFormSchema } from "@/validations/menu-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createMenu } from "../actions";
import { Preview } from "@/types/general";
import FormMenu from "./form-menu";

export default function DialogCreateUser({
  refetch,
  open,
}: {
  refetch: () => void;
  open: boolean;
}) {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: INITIAL_MENU,
  });

  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? preview!.file ?? "" : value);
    });

    startTransition(() => {
      createMenuAction(formData);
    });
  });

  useEffect(() => {
    if (createMenuState?.status === "error") {
      toast.error("Create Menu Failed", {
        description: createMenuState.errors?._form?.[0],
      });
    }

    if (createMenuState.status === "success") {
      toast.success("create Menu success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createMenuState]);

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
