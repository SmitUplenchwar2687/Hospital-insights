import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";

const appointmentsPerMonth = [
  { month: "Jan", appointments: 320 },
  { month: "Feb", appointments: 280 },
  { month: "Mar", appointments: 350 },
  { month: "Apr", appointments: 410 },
  { month: "May", appointments: 390 },
  { month: "Jun", appointments: 450 },
];

const prescriptionsByDrug = [
  { drug: "Drug A", qty: 120 },
  { drug: "Drug B", qty: 95 },
  { drug: "Drug C", qty: 160 },
  { drug: "Drug D", qty: 70 },
];

const onCallByBlock = [
  { block: "1", nurses: 14 },
  { block: "2", nurses: 11 },
  { block: "3", nurses: 17 },
  { block: "4", nurses: 9 },
];

const triggerData = [
  { label: "Attempted Inserts", value: 1 },
  { label: "Log Entries After Rollback", value: 0 },
];

const patientsPerDepartment = [
  { department: "Dept 1", count: 320 },
  { department: "Dept 2", count: 280 },
  { department: "Dept 3", count: 150 },
  { department: "Dept 4", count: 90 },
  { department: "Dept 5", count: 60 },
];

const appointmentsByPhysician = [
  { physician: "Dr. Smith", count: 45 },
  { physician: "Dr. Lee", count: 38 },
  { physician: "Dr. Patel", count: 30 },
  { physician: "Dr. Chen", count: 25 },
];

const medsPerPatientTop5 = [
  { patient: "Patient 101", meds: 8 },
  { patient: "Patient 256", meds: 7 },
  { patient: "Patient 342", meds: 6 },
  { patient: "Patient 119", meds: 5 },
  { patient: "Patient 478", meds: 5 },
];

const roomAvailability = [
  { status: "Available", value: 2300 },
  { status: "Unavailable", value: 700 },
];
const COLORS = ["#4A90E2", "#E94E77"];

export default function App() {
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* NAVBAR */}
      <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">
          Hospital DB • Insights & Optimizations
        </h1>
        <a
          href="#dashboard"
          className="underline underline-offset-4 hover:text-indigo-300 transition-colors"
        >
          Jump to Dashboard
        </a>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 space-y-10 max-w-full mx-auto">
        {/* Problem Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Problem Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                As hospital data scaled to millions of rows, key queries—like
                patient‐appointment joins, prescription look‐ups, and nurse
                schedules—became prohibitively slow due to sequential scans.
              </p>
              <ul className="list-disc list-inside">
                <li>
                  We added B-tree indexes on critical foreign‐key and filter
                  columns to reduce scan cost by ~90%.
                </li>
                <li>
                  Converted string dates to native <code>DATE</code> types and
                  indexed them for efficient range queries.
                </li>
                <li>
                  Implemented a PostgreSQL trigger to audit inserts and
                  demonstrate full-transaction atomicity.
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Optimization Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Optimization Highlights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                After indexing, our expensive department‐patient join dropped
                from a full‐table cost of ~5,000 to under 500 on a 1M-row
                benchmark. The atomicity demo ensures rollback cleans up both
                data and audit logs, preventing orphan entries.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive BI Dashboard */}
        <motion.div
          id="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Interactive BI Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table of Row Counts */}
              <div className="mb-6 overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Table</th>
                      <th className="px-4 py-2">Row Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2">Patients</td>
                      <td className="px-4 py-2">3,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Appointments</td>
                      <td className="px-4 py-2">3,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Prescriptions</td>
                      <td className="px-4 py-2">3,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Nurses</td>
                      <td className="px-4 py-2">3,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Departments</td>
                      <td className="px-4 py-2">3,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dashboard Intro and Toggle */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Use hover tooltips for exact values and toggle series via the
                  legend. These charts illustrate:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  <li>Monthly appointment volume trends.</li>
                  <li>Drug prescription counts by category.</li>
                  <li>Nurse on‐call distribution per block.</li>
                  <li>Departmental patient loads and physician workloads.</li>
                  <li>Transaction atomicity via trigger audit.</li>
                  <li>Room availability ratios.</li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTrigger(!showTrigger)}
                >
                  {showTrigger ? "Hide" : "Show"} Atomicity Chart
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Chart 1: Appointments */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentsPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="appointments"
                        name="Appointments"
                        barSize={32}
                        fill="#4A90E2"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Monthly appointment volumes**—peaks indicate high-demand
                    months for clinic resources.
                  </p>
                </div>

                {/* Chart 2: Prescriptions */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prescriptionsByDrug} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="drug" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="qty"
                        name="Prescriptions"
                        barSize={24}
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Prescribed quantities** per drug—use this to spot high-
                    usage medications.
                  </p>
                </div>

                {/* Chart 3: Nurses On Call */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={onCallByBlock}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="block" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="nurses"
                        name="On-Call Nurses"
                        barSize={32}
                        fill="#ffc658"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Nurse allocation** by block—helps balance staffing across
                    floors.
                  </p>
                </div>

                {/* Chart 4: Atomicity (toggle) */}
                {showTrigger && (
                  <div className="w-full h-80 min-h-0 flex flex-col">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={triggerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="value"
                          name="Count"
                          barSize={32}
                          fill="#E94E77"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                      **Transaction atomicity**—trigger logs undone on rollback,
                      so both tables end empty.
                    </p>
                  </div>
                )}

                {/* Chart 5: Patients per Dept */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientsPerDepartment}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Patients"
                        barSize={20}
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Patient distribution** across departments—identify capacity
                    imbalances.
                  </p>
                </div>

                {/* Chart 6: Appt per Physician */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={appointmentsByPhysician}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="physician" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Appointments"
                        barSize={20}
                        fill="#a4de6c"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Appointment load** by physician—spot overbooked providers.
                  </p>
                </div>

                {/* Chart 7: Top 5 Patients by Meds */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={medsPerPatientTop5}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="patient" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="meds"
                        name="Medications"
                        barSize={20}
                        fill="#d0ed57"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Top 5 patients** by distinct medication counts—monitor
                    high-utilization cases.
                  </p>
                </div>

                {/* Chart 8: Room Availability */}
                <div className="w-full h-80 min-h-0 flex flex-col">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomAvailability}
                        dataKey="value"
                        nameKey="status"
                        innerRadius={50}
                        outerRadius={80}
                        label
                      >
                        {roomAvailability.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-sm text-gray-600 text-center whitespace-normal">
                    **Room availability**—ratio of free vs. occupied rooms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button asChild className="text-lg px-8 py-6 rounded-2xl shadow-xl">
            <a href="mailto:data-team@example.com?subject=Hospital%20DB%20Insights">
              Contact Data Team
            </a>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
