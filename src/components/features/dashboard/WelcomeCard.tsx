"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config";

export function WelcomeCard() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Welcome to {config.app.name}!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          You have successfully logged in and been redirected to your dashboard.
          {config.app.description}
        </p>
        <div className="text-xs text-muted-foreground">
          Version {config.app.version} • By {config.app.author}
        </div>
      </CardContent>
    </Card>
  );
}
