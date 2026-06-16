import React from "react";

function SubscriptionDetails({
  expiresAt,
}: {
  expiresAt: Date;
}) {
  return (
    <div>
      <p>{`Your Subscription expires at - ${expiresAt.toUTCString()}`}</p>
      <p>{`You have Full access to this course`}</p>
    </div>
  );
}

export default SubscriptionDetails;
