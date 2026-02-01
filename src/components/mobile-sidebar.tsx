"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MobileSidebar({ open, onClose, children }: MobileSidebarProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
          />

          <motion.div
            className="bg-paper absolute top-0 left-0 h-full w-[min(88vw,320px)]"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOutSoft }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
