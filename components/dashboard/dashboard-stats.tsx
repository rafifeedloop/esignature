'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText, Users, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats?: {
    totalDocuments: number;
    pendingSignatures: number;
    completedToday: number;
    activeUsers: number;
  };
}

export function DashboardStats({ stats = {
  totalDocuments: 156,
  pendingSignatures: 23,
  completedToday: 8,
  activeUsers: 42,
} }: DashboardStatsProps) {
  const cards = [
    {
      title: 'Total Documents',
      value: stats.totalDocuments,
      icon: FileText,
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Pending Signatures',
      value: stats.pendingSignatures,
      icon: Clock,
      change: '-5%',
      changeType: 'positive',
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
      icon: CheckCircle,
      change: '+23%',
      changeType: 'positive',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      change: '+18%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                {card.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-error mr-1" />
                )}
                <span className={card.changeType === 'positive' ? 'text-success' : 'text-error'}>
                  {card.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}