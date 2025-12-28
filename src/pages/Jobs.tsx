import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { AddJobModal, NewJob } from "@/components/jobs/AddJobModal";
import { SubmitToVendorModal } from "@/components/jobs/SubmitToVendorModal";
import { mockJobs } from "@/data/mockData";
import { mockJobMatches, JobMatch } from "@/data/mockJobMatches";
import { JobRequirement } from "@/types";
import { useSubmissions } from "@/context/SubmissionsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RefreshCw,
  Search,
  X,
  Filter,
  Briefcase,
  CheckCircle,
  Users,
  Globe,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                CONFIG DATA                                 */
/* -------------------------------------------------------------------------- */

const allSources = [
  "Dice",
  "LinkedIn",
  "Indeed",
  "Monster",
  "CareerBuilder",
  "Referral",
  "Direct Client",
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function Jobs() {
  const navigate = useNavigate();
  const { addSubmission } = useSubmissions();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showAddJob, setShowAddJob] = useState(false);
  const [activeFilters, setActiveFilters] = useState<
    Set<"open" | "filled">
  >(new Set());
  const [sourceTypeFilter, setSourceTypeFilter] = useState<
    "all" | "portal" | "vendor_email"
  >("all");

  const [submitToVendorModalOpen, setSubmitToVendorModalOpen] =
    useState(false);
  const [selectedJobForSubmission, setSelectedJobForSubmission] =
    useState<JobRequirement | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                 FILTERING                                  */
  /* -------------------------------------------------------------------------- */

  const toggleStatusFilter = (status: "open" | "filled") => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  };

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSource =
      selectedSources.length === 0 ||
      selectedSources.includes(job.source);

    const matchesStatus =
      activeFilters.size === 0 ||
      activeFilters.has(job.status as "open" | "filled");

    const matchesSourceType =
      sourceTypeFilter === "all" ||
      job.sourceType === sourceTypeFilter;

    return (
      matchesSearch &&
      matchesSource &&
      matchesStatus &&
      matchesSourceType
    );
  });

  /* -------------------------------------------------------------------------- */
  /*                                  STATS                                     */
  /* -------------------------------------------------------------------------- */

  const openJobs = mockJobs.filter((j) => j.status === "open").length;
  const filledJobs = mockJobs.filter((j) => j.status === "filled").length;
  const totalMatches = mockJobs.reduce(
    (acc, j) => acc + j.matchedConsultants,
    0
  );
  const portalJobs = mockJobs.filter(
    (j) => j.sourceType === "portal"
  ).length;
  const vendorEmailJobs = mockJobs.filter(
    (j) => j.sourceType === "vendor_email"
  ).length;

  /* -------------------------------------------------------------------------- */
  /*                                 HANDLERS                                   */
  /* -------------------------------------------------------------------------- */

  const handleAddJob = (job: NewJob) => {
    console.log("New job:", job);
    toast.success("Job added successfully!");
  };

  const handleSubmitToVendor = (job: JobRequirement) => {
    setSelectedJobForSubmission(job);
    setSubmitToVendorModalOpen(true);
  };

  const handleConfirmVendorSubmission = (matches: JobMatch[]) => {
    if (!selectedJobForSubmission || matches.length === 0) return;

    const job = selectedJobForSubmission;
    const candidate = matches[0];

    addSubmission({
      id: `sub-${Date.now()}`,
      consultantId: candidate.consultant.id,
      consultantName: candidate.consultant.name,
      vendorId: job.vendorName || "",
      vendorName: job.vendorName || "Vendor",
      vendorContact: job.vendorEmail || "",
      jobId: job.id,
      jobTitle: job.title,
      client: job.client,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "applied",
      appliedRate: candidate.consultant.rate,
      rate: candidate.consultant.rate,
      notes: "Applied via vendor submission",
      rateHistory: [],
    });

    toast.success("Candidate marked as Applied!");
    navigate("/emails");
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <MainLayout
      title="Job Requirements"
      subtitle="Active job openings from all sources"
      action={{
        label: "Add New Job",
        onClick: () => setShowAddJob(true),
      }}
      showBackButton={false}
    >
      {/* Search & Filters */}
      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-3 h-3" />
              Source
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {allSources.map((source) => (
              <DropdownMenuCheckboxItem
                key={source}
                checked={selectedSources.includes(source)}
                onCheckedChange={() => toggleSource(source)}
              >
                {source}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            index={index}
            onSubmitToVendor={handleSubmitToVendor}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No jobs found
        </div>
      )}

      {/* Modals */}
      <AddJobModal
        open={showAddJob}
        onClose={() => setShowAddJob(false)}
        onAdd={handleAddJob}
      />

      {selectedJobForSubmission && (
        <SubmitToVendorModal
          open={submitToVendorModalOpen}
          onClose={() => {
            setSubmitToVendorModalOpen(false);
            setSelectedJobForSubmission(null);
          }}
          job={selectedJobForSubmission}
          matches={mockJobMatches[selectedJobForSubmission.id] || []}
          onConfirmSubmit={handleConfirmVendorSubmission}
        />
      )}
    </MainLayout>
  );
}
