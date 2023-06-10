import { useRouter } from "next/router";
import { useState } from "react";

const NavBarList = [
  { navItem: "올해의 공휴일", url: "/public-holidays" },
  { navItem: "내 달력", url: "/my-calendar" },
];

export default function NavBar() {
  const [focusedItem, setFocusedItem] = useState(NavBarList[0].navItem);

  const router = useRouter();

  return (
    <div className="flex gap-2 mb-5">
      {NavBarList.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            setFocusedItem(item.navItem);
            router.push(item.url);
          }}
          className={`font-bold text-lg border-b-4 pb-1 px-2 cursor-pointer ${
            focusedItem == item.navItem
              ? "text-orange-500 border-orange-500"
              : "border-gray-200"
          }`}
        >
          {item.navItem}
        </div>
      ))}
    </div>
  );
}
