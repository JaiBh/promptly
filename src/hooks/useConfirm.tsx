import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JSX, useState } from "react";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>
            <span className="text-present-1 capitalize">{title}</span>
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="pt-2 space-y-2">
          <Button
            onClick={handleConfirm}
            variant={"destructive"}
            className="w-full block"
          >
            Confirm
          </Button>
          <Button onClick={handleCancel} className="w-full" variant={"ghost"}>
            No, Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmDialog, confirm];
};
