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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormSwitch from "@/components/common/form-switch";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} Role</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "register a new role" : "make change a role"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Insert role name"
          />

          <FormInput
            form={form}
            name={"alias" as Path<T>}
            label="Alias"
            placeholder="Insert alias name"
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
