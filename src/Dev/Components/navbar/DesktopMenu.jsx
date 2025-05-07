import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DesktopMenu({ menu }) {
  const [isHover, toggleHover] = useState(false);
  

  const index = menu.id

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.li
      className="group/link relative"
      onHoverStart={() => {
        toggleHover(true);
      }}
      onHoverEnd={() => {
        toggleHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        toggleHover((prev) => !prev);
        document.querySelectorAll(".group/link").forEach((el) => {
          if (el !== e.currentTarget) {
            el.querySelector(".sub-menu")?.style.setProperty("display", "none");
          }
        });
      }}
      key={menu.name}
    >
      <span className="flex text-sm hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer px-3 py-1 rounded-xl text-white">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className={`sub-menu absolute top-full px-10 mt-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-lg shadow-lg w-max z-50`}
          style={{
            marginLeft: index === 0 ? '0px' : `-${index * 150}px`,
            transition: 'margin-left 0.3s ease',
          }}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid ${
              menu.gridCols === 3
                ? "grid-cols-3 gap-6"
                : menu.gridCols === 2
                ? "grid-cols-2 gap-5"
                : "grid-cols-1 gap-4"
            }`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => (
                <Link key={i} href={submenu.link || "#"}>
                  <div className="relative cursor-pointer" key={i}>
                    {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                      <p className="mb-3 text-gray-500 text-2xl">
                        {menu?.subMenuHeading?.[i]}
                      </p>
                    )}
                    <div className="flex items-center gap-4 group/menubox">
                      <div className="bg-white w-fit p-2 rounded-md group-hover/menubox:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 group-hover/menubox:text-white text-black duration-300">
                        {submenu.icon && <submenu.icon />}
                      </div>
                      <div>
                        <h6 className="font-semibold text-black">{submenu.name}</h6>
                        <p className="text-sm text-black">{submenu.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}