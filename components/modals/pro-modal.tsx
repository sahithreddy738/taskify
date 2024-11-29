"use client";

import { useProModal } from "@/hooks/use-promodal";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";


const ProModal = () => {
  const proModal = useProModal();
  const {execute,isLoading}=useAction(stripeRedirect,{
    onSuccess:(data)=>{
        window.location.href=data;
    },
    onError:(error)=>{
      toast.error(error);
    }
  })
  const onSubmit=()=>{
    execute({});
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/promodal.png"
            alt="promodal"
            className="object-cover"
            fill
          ></Image>
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
           <h2 className="font-semibold text-xl">
             Upgrade to Taskify Pro Today!
           </h2>
           <p className="text-xs font-semibold text-neutral-600">
             Explore the best of Taskify
           </p>
           <div className="pl-3">
              <ul className="text-sm list-disc">
                 <li>Unlimited boards</li>
                 <li>Advanced checklists</li>
                 <li>Admin and security featires</li>
                 <li>and more</li>
              </ul>
           </div>
           <Button onClick={onSubmit} className="w-full" variant={"primary"} disabled={isLoading}>
              Upgrade
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
