"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/lib/contexts/UserContext";
import Image from "next/image";

export function UserProfileCard() {
  const { user } = useUser();

  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {user?.picture?.medium && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={user.picture.medium}
                  alt={`${user.name.first} ${user.name.last}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">
                {user?.name ? `${user.name.first} ${user.name.last}` : "User"}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p className="text-muted-foreground">
              <strong>Location:</strong> {user?.location?.city},{" "}
              {user?.location?.state}
            </p>
            <p className="text-muted-foreground">
              <strong>Phone:</strong> {user?.phone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
