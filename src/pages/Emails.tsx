import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Send,
  Users,
  Paperclip,
  Save,
  Trash2,
  CheckCircle,
  Percent,
  XCircle,
  Wand2,
} from "lucide-react";

const templates = [
  { id: 1, label: "Candidate Hotlist", icon: Users },
  { id: 2, label: "Vendor Submission", icon: Mail },
  { id: 3, label: "Rate Confirmation", icon: CheckCircle },
  { id: 4, label: "Follow-up", icon: Mail },
];

const recentCampaigns = [
  { id: "1", name: "Weekly Hotlist – Java", status: "completed" },
  { id: "2", name: "Urgent Salesforce Roles", status: "completed" },
  { id: "3", name: "DevOps Consultants", status: "draft" },
];

export default function Emails() {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <MainLayout
      title="Email Automation"
      subtitle="Compose and manage email campaigns"
      showBackButton={false}
    >
      {/* PAGE GRID */}
      <div className="space-y-6 max-w-[1100px]">

        {/* RIGHT CONTENT */}
        <div className="space-y-6 max-w-[1100px]">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Templates */}
  <Card className="p-4 rounded-xl">
    <h3 className="font-semibold mb-3">Templates</h3>
    <div className="space-y-1">
      {templates.map((t) => (
        <Button
          key={t.id}
          variant="ghost"
          className="w-full justify-start gap-2 h-9"
        >
          <t.icon className="w-4 h-4 text-primary" />
          {t.label}
        </Button>
      ))}
    </div>
  </Card>

  {/* Email Stats */}
  <Card className="p-4 rounded-xl space-y-3">
    <h3 className="font-semibold">Email Stats</h3>

    <div className="flex justify-between text-sm">
      <span>Emails Sent</span>
      <Badge>234</Badge>
    </div>

    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-1">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        Open Rate
      </span>
      <span>52%</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-1">
        <Percent className="w-4 h-4 text-yellow-400" />
        Reply Rate
      </span>
      <span>8.5%</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-1">
        <XCircle className="w-4 h-4 text-red-400" />
        Bounced
      </span>
      <span>2</span>
    </div>
  </Card>
</div>


          {/* ACTION BAR */}
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="gap-2 h-9">
              <Send className="w-4 h-4" /> Send Hotlist
            </Button>
            <Button variant="outline" className="gap-2 h-9">
              <Mail className="w-4 h-4" /> Follow-ups
            </Button>
            <Button variant="outline" className="gap-2 h-9">
              <Wand2 className="w-4 h-4" /> AI Generate
            </Button>
          </div>

          {/* COMPOSER */}
          <Card className="p-5 rounded-xl space-y-4">
            <Input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Cc" value={cc} onChange={(e) => setCc(e.target.value)} />
              <Input placeholder="Bcc" value={bcc} onChange={(e) => setBcc(e.target.value)} />
            </div>

            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Textarea
              rows={7}
              placeholder="Write your email or choose a template..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <Button variant="outline" className="gap-2 h-9">
                <Paperclip className="w-4 h-4" />
                Attachments (0)
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 h-9">
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 h-9 text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Discard
                </Button>
                <Button className="gap-2 h-9">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>

          {/* RECENT CAMPAIGNS */}
          <Card className="p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Recent Campaigns</h3>
            <div className="space-y-2">
              {recentCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <span>{c.name}</span>
                  <span
                    className={
                      c.status === "completed"
                        ? "text-emerald-400 text-sm"
                        : "text-muted-foreground text-sm"
                    }
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
