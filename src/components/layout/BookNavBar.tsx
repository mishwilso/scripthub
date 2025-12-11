import { IoDocumentText } from "react-icons/io5";
import { FaTree } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { IoShare } from "react-icons/io5";

import IconButton from "@/components/ui/IconButton";
import Dropdown from "@/components/ui/Dropdown";

interface BookNavBarProps {
  activeTab: "overview" | "chapters" | "worldbuilding" | "versions";
  onTabChange: (
    tab: "overview" | "chapters" | "worldbuilding" | "versions"
  ) => void;
}

export default function BookNavBar({
  activeTab,
  onTabChange,
}: BookNavBarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: IoHome },
    { id: "chapters", label: "Chapters", icon: IoDocumentText },
    { id: "worldbuilding", label: "World Building", icon: FaTree },
    { id: "versions", label: "Versions", icon: FaCodeBranch },
  ] as const;

  const isActiveStyle =
    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary-dark after:rounded-sm";
  const isInActiveStyle =
    "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-primary-base after:rounded-sm hover:after:w-full after:transition-[width] after:ease-in-out after:duration-300 after:delay-75 hover:font-medium";

  return (
    <nav className="flex flex-1 gap-10 @[600px]:gap-6 justify-between items-center @container">
      <div className="flex flex-1 justify-between @[600px]:justify-normal gap-10 @[600px]:gap-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-shrink-0 p-3 ${
                isActive ? isActiveStyle : isInActiveStyle
              }`}
            >
              <span
                className={`@[600px]:hidden ${
                  isActive
                    ? "font-semibold text-primary-dark"
                    : "text-primary-base"
                }`}
              >
                {" "}
                <Icon size={20} />
              </span>
              <span
                className={`hidden @[600px]:inline ${
                  isActive
                    ? "font-semibold text-primary-dark"
                    : "text-primary-base"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <BookOptions />
    </nav>
  );
}

export function BookOptions() {
  return (
    <Dropdown>
      <Dropdown.Button>
        <IconButton altText="Book options" variant="standard" inert={true}>
          <BsThreeDotsVertical />
        </IconButton>
      </Dropdown.Button>

      <Dropdown.Menu position="top span-left">
        <Dropdown.Option startIcon={<IoSettingsOutline />}>
          Settings
        </Dropdown.Option>

        <Dropdown.Option startIcon={<IoShare />}>Share</Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
