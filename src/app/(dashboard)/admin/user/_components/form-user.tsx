import { Preview } from "@/types/general";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "@/components/common/form-input";
import { Form } from "@/components/ui/form";
import FormImage from "@/components/common/form-image";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Role } from "@/types/role";
import FormSwitch from "@/components/common/form-switch";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
  roles,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
  roles: Role[] | undefined | null;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} User</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "register a new user" : "make change a user"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"fullName" as Path<T>}
            label="fullName"
            placeholder="Insert your fullName"
          />
          <FormInput
            form={form}
            name={"email" as Path<T>}
            label="email"
            placeholder="Insert email here"
            type="email"
          />

          <FormInput
            form={form}
            name={"nickname" as Path<T>}
            label="nickname"
            placeholder="Insert your nickname"
          />

          <FormImage
            form={form}
            name={"file" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />

          <FormSelect
            form={form}
            name={"roleId" as Path<T>}
            label="Select Role"
            selectItem={(roles ?? []).map((role: Role) => ({
              value: `${role.id}`,
              label: `${role.name}`,
              disabled: !role.isActive,
            }))}
          />

          <FormInput
            form={form}
            name={"password" as Path<T>}
            label="password"
            placeholder="****"
            type="password"
          />

          <FormSwitch
            form={form}
            name={"isActive" as Path<T>}
            label="isActive"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
