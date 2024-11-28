import React, { Suspense } from "react";
import Info from "../../_components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";

const ActivityPage = () => {
  return (
    <div>
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
