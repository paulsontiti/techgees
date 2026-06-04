import React from "react";

function SubscriptionDetails({
  expiresAt,
  maxChapters,
}: {
  expiresAt: Date;
  maxChapters: number;
}) {
  return (
    <div>
      <p>{`Your Subscription expires at - ${expiresAt.toUTCString()}`}</p>
      <p>{`You have access to ${maxChapters} Chapters`}</p>
    </div>
  );
}

export default SubscriptionDetails;
