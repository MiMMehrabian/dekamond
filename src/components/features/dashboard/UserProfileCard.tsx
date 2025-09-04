"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/lib/contexts/UserContext";

export function UserProfileCard() {
  const { user } = useUser();

  const {
    name = { first: "", last: "" },
    email = "",
    gender = "",
    location = { city: "", state: "" },
    phone = "",
  } = user || {};

  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">
                {name.first && name.last
                  ? `${name.first} ${name.last}`
                  : "User"}
              </p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <strong>Gender:</strong> {gender}
            </p>
            <p className="text-muted-foreground">
              <strong>Location:</strong>{" "}
              {location.city && location.state
                ? `${location.city}, ${location.state}`
                : "Not specified"}
            </p>
            <p className="text-muted-foreground">
              <strong>Phone:</strong> {phone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
