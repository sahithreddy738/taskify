import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { generateLogMessages } from "@/lib/generate-log-message";
import { AuditLog } from "@prisma/client";
import { format } from "date-fns";

interface ActivityItemProps {
  item: AuditLog;
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.userImage} />
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {item.userName}
          </span>{" "}
          {generateLogMessages(item)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d,yyyy 'at' h:mm a")}
        </p>
        <Separator className="my-0.5 mt-1"/>
      </div>
    </li>
  );
};

export default ActivityItem;
