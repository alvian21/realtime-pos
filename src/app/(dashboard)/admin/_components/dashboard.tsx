'use client';

import LineCharts from '@/components/common/line-chart';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
 
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Create Per Week</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}