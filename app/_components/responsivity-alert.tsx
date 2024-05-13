"use client";

import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const ResponsivityAlert = () => {
  const [show, setShow] = useState(false);

  function verifyWindowSize() {
    const { innerWidth: width } = window;

    window.resizeTo(600, 900);

    if (width > 600) setShow(true);
    else setShow(false);
  }

  useEffect(() => {
    verifyWindowSize();
    window.addEventListener("resize", verifyWindowSize);
  }, []);

  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogContent className="flex flex-col items-center justify-center space-y-4 rounded-lg">
        <AlertCircle fill="red" color="white" size={70} />

        <div className="text-center">
          <h1 className="text-lg font-semibold">
            This application is not responsive!
          </h1>
          <span className="mt-3 text-muted-foreground">
            Please, open DevTools and toggle device toolbar to simulate a mobile
            viewport.
          </span>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResponsivityAlert;
