'use client';

import {
  Dialog,
  DialogContent,
} from '@/components/ui/shadcn/dialog';
import { Children } from '@/types';

interface ModalProps {
  children: Children;
  onClose: () => void;
  open: boolean;
}

const Modal = ({
  children, onClose, open,
}: ModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="z-[80]">
      {children}
    </DialogContent>
  </Dialog>
);

export default Modal;
