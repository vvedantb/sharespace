"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Switch, Card, CardHeader, CardBody, Divider } from "@heroui/react";
import {
  IconArrowLeft,
  IconBell,
  IconPalette,
  IconLogout,
} from "@tabler/icons-react";
import { useThemeContext } from "@/components/contexts/ThemeContext";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  return (
    <div className="px-4 py-8">
      <Button
        variant="light"
        startContent={<IconArrowLeft className="h-4 w-4" stroke={2} />}
        onPress={() => router.back()}
        className="mb-4 text-default-500"
      >
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-default-500">
          Manage your account preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card className="border border-default-200">
          <CardHeader className="flex gap-3">
            <IconPalette className="h-5 w-5 text-default-500" stroke={1.5} />
            <p className="font-semibold">Appearance</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-default-500">
                  Switch between light and dark themes
                </p>
              </div>
              {mounted && (
                <Switch
                  isSelected={theme === "dark"}
                  onValueChange={toggleTheme}
                  color="danger"
                />
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="border border-default-200">
          <CardHeader className="flex gap-3">
            <IconBell className="h-5 w-5 text-default-500" stroke={1.5} />
            <p className="font-semibold">Notifications</p>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-default-500">
                  Receive updates via email
                </p>
              </div>
              <Switch
                isSelected={emailNotifications}
                onValueChange={setEmailNotifications}
                color="danger"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-default-500">
                  Get notified in your browser
                </p>
              </div>
              <Switch
                isSelected={pushNotifications}
                onValueChange={setPushNotifications}
                color="danger"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Message Alerts</p>
                <p className="text-sm text-default-500">
                  Get notified for new messages
                </p>
              </div>
              <Switch
                isSelected={messageNotifications}
                onValueChange={setMessageNotifications}
                color="danger"
              />
            </div>
          </CardBody>
        </Card>

        <Card className="border border-default-200">
          <CardBody>
            <Button
              variant="bordered"
              startContent={<IconLogout className="h-5 w-5" stroke={1.5} />}
              fullWidth
              className="justify-start"
            >
              Sign Out
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
