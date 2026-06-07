"use client";

import React from "react";
import AuthHeader from "@/app/components/header";

const summaryCards = [
  { label: "Today Revenue", value: "$42,860", change: "+12.4%", tone: "text-green-700 bg-green-50" },
  { label: "Open Orders", value: "128", change: "18 urgent", tone: "text-blue-700 bg-blue-50" },
  { label: "Inventory Value", value: "$1.28M", change: "4.2k SKUs", tone: "text-indigo-700 bg-indigo-50" },
  { label: "Pending Approvals", value: "34", change: "7 overdue", tone: "text-amber-700 bg-amber-50" },
];

const modules = [
  { name: "Sales", detail: "Quotes, orders, invoices", icon: "S", color: "bg-green-600" },
  { name: "Purchasing", detail: "PR, PO, supplier bills", icon: "P", color: "bg-blue-600" },
  { name: "Inventory", detail: "Stock, transfers, counts", icon: "I", color: "bg-violet-600" },
  { name: "Finance", detail: "Cash, GL, receivables", icon: "F", color: "bg-slate-700" },
  { name: "HR", detail: "Attendance, payroll, teams", icon: "H", color: "bg-rose-600" },
  { name: "Reports", detail: "KPIs, audit, exports", icon: "R", color: "bg-cyan-700" },
];

const tasks = [
  { title: "Approve purchase request", owner: "Operations", due: "Today", status: "High" },
  { title: "Review low stock forecast", owner: "Warehouse", due: "Today", status: "Medium" },
  { title: "Post customer payments", owner: "Finance", due: "Tomorrow", status: "Normal" },
  { title: "Confirm supplier shipment", owner: "Purchasing", due: "Jun 10", status: "Normal" },
];

const orders = [
  { id: "SO-1048", customer: "Apex Trading", amount: "$8,420", stage: "Ready to ship" },
  { id: "SO-1047", customer: "North Star Retail", amount: "$12,100", stage: "Credit review" },
  { id: "SO-1046", customer: "Mandalay Foods", amount: "$5,760", stage: "Picking" },
  { id: "SO-1045", customer: "City Mart", amount: "$19,340", stage: "Invoiced" },
];

const stockAlerts = [
  { item: "A4 Copy Paper", code: "INV-2201", stock: "18 boxes", level: "Reorder" },
  { item: "Thermal Label Roll", code: "INV-1180", stock: "42 rolls", level: "Watch" },
  { item: "Barcode Scanner", code: "AST-0312", stock: "3 units", level: "Critical" },
];

const activity = [
  "Finance posted 24 customer receipts.",
  "Warehouse completed cycle count for Zone B.",
  "Sales order SO-1048 moved to fulfillment.",
  "Supplier MegaParts accepted PO-8821.",
];

const quickActions = ["Create Sales Order", "Receive Stock", "Pay Supplier", "Run Month End"];

function StatusBadge({ value }: { value: string }) {
  const styles =
    value === "High" || value === "Critical"
      ? "bg-red-50 text-red-700"
      : value === "Medium" || value === "Reorder"
        ? "bg-amber-50 text-amber-700"
        : "bg-gray-100 text-gray-700";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>{value}</span>;
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <AuthHeader />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">ERP Workspace</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">Business Operations Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Monitor orders, approvals, cash movement, and inventory from one working screen.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export Report
            </button>
            <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
              Create Transaction
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article key={card.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-950">{card.value}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${card.tone}`}>{card.change}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-950">ERP Modules</h2>
                <p className="text-sm text-gray-500">Common departments and daily workflows.</p>
              </div>
              <button className="text-sm font-medium text-green-700 hover:text-green-800">Manage</button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => (
                <button
                  key={module.name}
                  className="flex min-h-24 items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 text-left hover:border-green-300 hover:bg-green-50"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white ${module.color}`}>
                    {module.icon}
                  </span>
                  <span>
                    <span className="block font-semibold text-gray-950">{module.name}</span>
                    <span className="mt-1 block text-sm text-gray-500">{module.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Quick Actions</h2>
            <div className="mt-4 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-green-300 hover:bg-green-50"
                >
                  {action}
                  <span aria-hidden="true" className="text-green-700">+</span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-950">Recent Sales Orders</h2>
              <p className="text-sm text-gray-500">Operational view for fulfillment and finance teams.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-950">{order.id}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">{order.customer}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">{order.amount}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          {order.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Approvals Queue</h2>
            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <div key={task.title} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-950">{task.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{task.owner} - Due {task.due}</p>
                    </div>
                    <StatusBadge value={task.status} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Inventory Alerts</h2>
            <div className="mt-4 space-y-3">
              {stockAlerts.map((item) => (
                <div key={item.code} className="flex items-center justify-between gap-4 rounded-md bg-gray-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-950">{item.item}</p>
                    <p className="text-sm text-gray-500">{item.code} - {item.stock}</p>
                  </div>
                  <StatusBadge value={item.level} />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Activity Feed</h2>
            <div className="mt-4 space-y-4">
              {activity.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
