"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import { TimezoneComboBox } from "@/components/TimezoneComboBox";
import { useQuery } from "@tanstack/react-query";
import SkelletonWrapper from "@/components/SkelletonWrapper";
import { UserSettings } from "@prisma/client";

const CombinedComboBox = () => {
  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-4">
      <SkelletonWrapper isLoading={userSettings.isFetching}>
        <CurrencyComboBox userSettings={userSettings.data} />
      </SkelletonWrapper>
      <SkelletonWrapper isLoading={userSettings.isFetching}>
        <TimezoneComboBox userSettings={userSettings.data} />
      </SkelletonWrapper>
    </div>
  );
};

export default CombinedComboBox;
