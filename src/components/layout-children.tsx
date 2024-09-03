
"use client"
import React from "react";
import useNetworkStatus from "../../hooks/network-status";

function LayoutChildren({ children }: { children: React.ReactNode }) {
  const { isOnline } = useNetworkStatus();
  if (!isOnline) return <div>You are offline</div>;
  return children;
}

export default LayoutChildren;
