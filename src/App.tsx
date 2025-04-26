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
} from "recharts";

const appointmentsPerMonth = [
  { month: "Jan", appointments: 320 },
  { month: "Feb", appointments: 280 },
  { month: "Mar", appointments: 350 },
  { month: "Apr", appointments: 410 },
  { month: "May", appointments: 390 },
  { month: "Jun", appointments: 450 },
];

const prescriptionsByDrug = [
  { drug: "Drug A", qty: 120 },
  { drug: "Drug B", qty: 95 },
  { drug: "Drug C", qty: 160 },
  { drug: "Drug D", qty: 70 },
];

const onCallByBlock = [
  { block: "1", nurses: 14 },
  { block: "2", nurses: 11 },
  { block: "3", nurses: 17 },
  { block: "4", nurses: 9 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- NAVBAR ---------- */}
      <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">Hospital DB • Insights & Optimizations</h1>
        <a
          href="#dashboard"
          className="underline underline-offset-4 hover:text-indigo-300 transition-colors"
        >
          Jump to Dashboard
        </a>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="p-6 space-y-10 max-w-5xl mx-auto">
        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Problem Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Query performance in the hospital database degraded as tables
                grew. Three <strong>problematic queries</strong> were identified:
              </p>
              <ol className="list-decimal list-inside">
                <li>Patient ↔ Appointment join with date filtering</li>
                <li>Multi‑table <code>Prescribes</code> look‑up by patient</li>
                <li>On‑call nurse search by <code>blockcode</code></li>
              </ol>
              <p>
                Each suffered sequential scans due to missing indexes or
                sub‑optimal data types.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Optimization Highlights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ul className="list-disc list-inside">
                <li>
                  Added B‑tree indexes on foreign keys and filter columns — e.g.
                  <code>CREATE INDEX idx_appointment_patient ON appointment(patient);</code>
                </li>
                <li>Converted <code>VARCHAR start_dt</code> to <code>DATE</code> type and indexed it.</li>
                <li>
                  Indexed high‑cardinality columns in <code>Prescribes</code> and
                  <code>On_Call</code> to eliminate full scans.
                </li>
              </ul>
              <p>
                These changes cut total cost of the three queries by&nbsp;
                <em>≈ 90 %</em> on a 1 million‑row synthetic benchmark.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          id="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Interactive BI Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Appointments Bar Chart */}
                <div className="w-full h-64">
                  <ResponsiveContainer>
                    <BarChart data={appointmentsPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="appointments" barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Prescriptions by Drug */}
                <div className="w-full h-64">
                  <ResponsiveContainer>
                    <BarChart data={prescriptionsByDrug} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="drug" type="category" />
                      <Tooltip />
                      <Bar dataKey="qty" barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* On‑Call Nurses */}
                <div className="w-full h-64">
                  <ResponsiveContainer>
                    <BarChart data={onCallByBlock}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="block" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="nurses" barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Power BI Embed Placeholder */}
                <div className="w-full h-64 flex flex-col items-center justify-center">
                  <p className="mb-2 font-medium text-gray-700 text-center">
                    Need richer ad‑hoc analytics? Embed your live Power BI or
                    Tableau report below — simply replace the <code>src</code>
                    URL.
                  </p>
                  <div className="w-full h-full border rounded-2xl overflow-hidden shadow">
                    <iframe
                      title="Power BI Report"
                      src="https://app.powerbi.com/view?r=YOUR_REPORT_ID"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
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
          <Button
            asChild
            className="text-lg px-8 py-6 rounded-2xl shadow-xl"
          >
            <a href="mailto:data-team@example.com?subject=Hospital%20DB%20Insights">
              Contact Data Team
            </a>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
