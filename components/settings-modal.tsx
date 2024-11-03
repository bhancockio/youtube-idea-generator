"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { getChannelsForUser } from "@/server/queries";
import { YouTubeChannelType } from "@/server/db/schema";
import { addChannelForUser, removeChannelForUser } from "@/server/mutations";

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [channels, setChannels] = useState<YouTubeChannelType[]>([]);
  const [newChannel, setNewChannel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchChannels();
    }
  }, [isOpen]);

  const fetchChannels = async () => {
    setIsLoading(true);
    try {
      const fetchedChannels = await getChannelsForUser();
      setChannels(fetchedChannels);
    } catch (error) {
      console.error("Failed to fetch channels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addChannel = async () => {
    if (newChannel) {
      setIsLoading(true);
      try {
        const addedChannel = await addChannelForUser(newChannel);
        setChannels([...channels, addedChannel]);
        setNewChannel("");
      } catch (error) {
        console.error("Failed to add channel:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeChannel = async (id: string) => {
    setIsLoading(true);
    try {
      await removeChannelForUser(id);
      setChannels(channels.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to remove channel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-primary hover:text-red-500 transition-all">
          Settings
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="text-lg font-medium">Saved Channels</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{channel.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChannel(channel.id)}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-medium">Add New Channel</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Channel name"
                value={newChannel}
                onChange={(e) => setNewChannel(e.target.value)}
              />
              <Button onClick={addChannel} disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
