"use client";

import { ReactNode } from "react";

function PaymentOption({
  children,
}: {
  children: ReactNode;
}) {
  

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* <Button onClick={() => {
                setPaystack(true);
                setWallet(false);
              }}>Pay With Paystack</Button> */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button  className="flex items-center gap-4">
            Select payment option <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Select payment option</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-2 z-50">
            <DropdownMenuItem
              onClick={() => {
                setPaystack(true);
                setWallet(false);
              }}
            >
              Pay with Paystack
              <DropdownMenuShortcut>
                <PaystackIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu> */}
      {/* {wallet && (
        <WalletPaymentForm
          courseId={courseId}
          redirecturl={redirectUrl || ""}
          scholarshipId={scholarshipId}
        />
      )} */}
      {/* {paystack && ( */}
        <div className="mx-2 flex items-center justify-center flex-col gap-4">
          {/* <Banner label="Please close the Paystack browser window after payment. This to enable redirection to the course page" /> */}
          {children}
        </div>
      {/* )} */}
    </div>
  );
}

export default PaymentOption;
