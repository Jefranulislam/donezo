import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ tabs, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      Tabs
      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={index + tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  " w-xs py-2.5 text-sm font-medium leading-5 text-blue-700 rounded-lg items-center justify-center flex gap-2",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-blue-500 shadow text-white"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-700"
                )
              }
            >
              {tab.icon}
              <span> {tab.title}</span>
            </Tab>
          ))}
        </TabList>

        <TabPanels className="w-full mt-2">{children}</TabPanels>
      </TabGroup>
    </div>
  );
};

export default Tabs;
