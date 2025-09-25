'use client';

import { AuditLog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Shield, Clock, User, Globe, FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AuditTrailProps {
  logs: AuditLog[];
  compliance: string[];
}

export function AuditTrail({ logs, compliance }: AuditTrailProps) {
  const getActionIcon = (action: string) => {
    if (action.includes('Created')) return FileText;
    if (action.includes('Signed')) return Shield;
    if (action.includes('Added')) return User;
    if (action.includes('Completed')) return Shield;
    return AlertCircle;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Compliance & Security
            </div>
            <div className="flex gap-2">
              {compliance.map((comp) => (
                <Badge key={comp} variant="info">
                  {comp}
                </Badge>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-success" />
                <span className="text-gray-600">Encryption:</span>
                <span className="ml-2 font-medium">AES-256</span>
              </div>
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-success" />
                <span className="text-gray-600">Signature:</span>
                <span className="ml-2 font-medium">PKI-based</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-info" />
                <span className="text-gray-600">Region:</span>
                <span className="ml-2 font-medium">US-East</span>
              </div>
              <div className="flex items-center text-sm">
                <AlertCircle className="h-4 w-4 mr-2 text-warning" />
                <span className="text-gray-600">Risk Level:</span>
                <span className="ml-2 font-medium">Low</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No activity recorded yet
              </p>
            ) : (
              logs.map((log) => {
                const Icon = getActionIcon(log.action);
                return (
                  <div
                    key={log.id}
                    className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <time className="text-xs text-gray-500">
                          {format(new Date(log.timestamp), 'MMM d, HH:mm')}
                        </time>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{log.details}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {log.userName}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {log.ipAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}