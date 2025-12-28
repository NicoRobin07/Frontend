import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Send,
  Users,
  Sparkles,
  Clock,
  CheckCircle2,
  FileText,
  RefreshCw,
  ExternalLink,
  Paperclip,
  X,
  ChevronDown,
  User,
  DollarSign,
  Printer,
  Trash2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* ---------------- FIX 1: DEFINE THIS ---------------- */
const recentCampaigns = [
  { id: "1", name: "Weekly Hotlist", sent: 120, opened: 45, replied: 8, status: "completed" },
  { id: "2", name: "Urgent Java Roles", sent: 0, opened: 0, replied: 0, status: "draft" },
];

export default function Emails() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  /* ---------------- SAFE SEND HANDLERS ---------------- */

  const safeOpen = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleSendViaGmail = () => {
    safeOpen(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        toEmail
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
    toast.success("Opening Gmail");
  };

  const handleSendViaOutlook = () => {
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved");
  };

  const confirmDiscard = () => {
    setToEmail("");
    setSubject("");
    setBody("");
    setShowDiscardDialog(false);
    toast.success("Email discarded");
  };

  return (
    <MainLayout
      title="Email Automation"
      subtitle="Compose and manage email campaigns"
      showBackButton={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Templates</h3>
          <Button variant="outline" className="w-full gap-2">
            <User className="w-4 h-4" />
            Candidate Template
          </Button>
        </Card>

        {/* Composer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4">
            <Input placeholder="To" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <Textarea
              className="min-h-[200px]"
              placeholder="Write email..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <div className="flex justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    <Mail className="w-4 h-4" />
                    Send
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleSendViaGmail}>
                    Send via Gmail
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSendViaOutlook}>
                    Send via Outlook
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => setShowDiscardDialog(true)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Campaigns */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Campaigns</h3>
            {recentCampaigns.map((c) => (
              <div key={c.id} className="flex justify-between p-3 bg-muted rounded">
                <span>{c.name}</span>
                <Badge>{c.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Email?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDiscard}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
