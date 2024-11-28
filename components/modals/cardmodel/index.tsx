"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModel } from "@/hooks/use-card-model";
import { fetcher } from "@/lib/fetcher";
import { CardsWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CardHeader from "./header";
import CardDescription from "./description";
import CardActions from "./actions";
import { AuditLog } from "@prisma/client";
import Activity from "./activity";

const CardModel = () => {
  const id = useCardModel((state) => state.id);
  const isOpen = useCardModel((state) => state.isOpen);
  const onClose = useCardModel((state) => state.onClose);
  const { data: cardData } = useQuery<CardsWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/card/${id}`),
  });
  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/card/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? (
          <CardHeader data={cardData}></CardHeader>
        ) : (
          <CardHeader.skeleton />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescription.skelton />
              ) : (
                <CardDescription data={cardData} />
              )}
              {!auditLogData ? (
                <Activity.skeleton />
              ) : (
                <Activity data={auditLogData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <CardActions.skelton />
          ) : (
            <CardActions data={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModel;
