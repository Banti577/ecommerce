import React, { useState } from "react";
import AddProducts from './AddProducts'
import ViewProducts from "./ViewProducts";
import ViewSell from "./ViewSell";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Add Products"); 
  const menuItems = ["Add Products", "View Products", "View Sell"];

  const renderContent = () => {
    switch (activeTab) {
      case "Add Products":
        return <AddProducts />;
      case "View Products":
        return <ViewProducts />;
      case "View Sell":
        return <ViewSell />;

    }
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden ">
      <aside className="w-60 bg-white p-4 position sticky top-0">
        <h2 className="text-2xl font-bold text-red-500 mb-6">Dashboard</h2>
        <nav className="">
          <ul>
            {menuItems.map((item) => (
              <li key={item} className="mb-2">
                <button
                  onClick={() => setActiveTab(item)}
                  className={`block w-full text-left p-3 rounded transition cursor-pointer ${
                    activeTab === item
                      ? "bg-pink-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex justify-between sticky top-0">
          <h1 className="text-xl font-semibold">{activeTab}</h1>
          <span className="bg-gray-200 px-3 py-1 rounded-full">Admin</span>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-6 overflow-y-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
