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
import { ROLE_LIST } from "@/constants/auth-constant";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
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
            name={"name" as Path<T>}
            label="name"
            placeholder="Insert your name"
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"email" as Path<T>}
              label="email"
              placeholder="Insert email here"
              type="email"
            />
          )}

          <FormImage
            form={form}
            name={"avatar_url" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />

          <FormSelect
            form={form}
            name={"role" as Path<T>}
            label="role"
            selectItem={ROLE_LIST}
          />

          {type === "Create" && (
            <FormInput
              form={form}
              name={"password" as Path<T>}
              label="password"
              placeholder="****"
              type="password"
            />
          )}

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
