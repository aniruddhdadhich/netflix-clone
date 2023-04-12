import React from "react";
import { signOut } from "next-auth/react";
import { sign } from "crypto";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800  ">
      <div className="flex flex-col gap-2">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/default-green.png"
            alt="profile"
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white hover:text-gray-400 text-sm"
      >
        Sign out
      </div>
    </div>
  );
};

export default AccountMenu;
