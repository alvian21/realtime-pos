import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  updateRole,
  getListPermissions,
  getListRolePermissions,
  assignRolePermission,
} from "../actions";
import {
  RoleForm,
  roleFormSchema,
  RolePermission,
  rolePermissionSchema,
} from "@/validations/role-validation";
import {
  INITIAL_STATE_ROLE_PERMISSION,
  INITIAL_ROLE_PERMISSION_FORM,
} from "@/constants/role-constant";
import { Role } from "@/types/role";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";

type Permission = {
  id: string;
  name: string;
  alias: string;
};

export default function DialogUpdatePermission({
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
  console.log(currentData);
  const [permissionList, setPermissionList] = useState(null);
  const [selectedPermissionRoleId, setSelectedPermissionRoleId] = useState<
    Permission[]
  >([]);
  const [loading, setLoading] = useState(true);

  const handleGetListPermissions = async () => {
    setLoading(true);
    try {
      const response = await getListPermissions();
      const detailRolePermission = await getListRolePermissions(
        currentData?.id as string
      );
      console.log("detail", detailRolePermission);
      const dataPermission = Object.values(detailRolePermission);
      const permissionId = [];
      for (let i = 0; i < dataPermission.length; i++) {
        const permissionData: Permission[] = dataPermission[i] as any;
        for (let j = 0; j < permissionData.length; j++) {
          permissionId.push(permissionData[j]);
        }
      }
      setSelectedPermissionRoleId(permissionId);
      setPermissionList(response);
      setLoading(false);
    } catch (error) {}

    setLoading(false);
  };

  useEffect(() => {
    if (currentData?.id) {
      handleGetListPermissions();
    }
  }, [currentData]);

  const [updateRoleState, updateRoleAction, isPendingUpdateRole] =
    useActionState(assignRolePermission, INITIAL_STATE_ROLE_PERMISSION);

  const onSubmit = (() => {
    const formData = new FormData();
    const permissionId = selectedPermissionRoleId.map((val) => {
      return val.id;
    });

    formData.append("permissionIds", JSON.stringify(permissionId));

    formData.append("roleId", currentData?.id ?? "");
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
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateRoleState]);

  const selectPermission = (
    eventChecked: boolean,
    valuePermission: Permission
  ) => {
    if (eventChecked) {
      const dataSelected = {
        id: valuePermission.id,
        name: valuePermission.name,
        alias: valuePermission.alias,
      };

      setSelectedPermissionRoleId((prevPermissions) => [
        ...prevPermissions,
        dataSelected,
      ]);
    } else {
      const newSelectedPermissions = selectedPermissionRoleId.filter(
        (permission) => permission.id !== valuePermission.id
      );
      setSelectedPermissionRoleId(newSelectedPermissions);
    }
  };

  const mappingPermissionState = (statePermission: any) => {
    return statePermission.map((val: Permission) => {
      const isChecked = selectedPermissionRoleId.some(
        (permission) => permission.id === val.id
      );
      return (
        <div className="justify-between flex items-center mb-6" key={val.id}>
          <p className="font-semibold">{val.name}</p>
          <Switch
            checked={isChecked}
            onCheckedChange={(checked) => selectPermission(checked, val)}
          />
        </div>
      );
    });
  };

  const mappingPermissionRole = (dataList: any) =>
    Object.keys(dataList).map((val, index) => {
      return (
        <AccordionItem key={index} value={val}>
          <AccordionTrigger className="capitalize">{val}</AccordionTrigger>
          <AccordionContent>
            {mappingPermissionState(Object.values(dataList)[index])}
          </AccordionContent>
        </AccordionItem>
      );
    });

  const loadingPermission = (number: number) =>
    Array.from({ length: number }, (_, i) => {
      return (
        <div key={i}>
          <Skeleton className="h-6" />
        </div>
      );
    });

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <DialogContent className="sm:max">
        <DialogHeader>
          <DialogTitle>Update permission</DialogTitle>
        </DialogHeader>
        {loading ? (
          loadingPermission(8)
        ) : (
          <ScrollArea>
            <Accordion type="single" collapsible>
              {mappingPermissionRole(permissionList)}
            </Accordion>
          </ScrollArea>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button type="submit" onClick={onSubmit}>
            {isPendingUpdateRole ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Simpan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
