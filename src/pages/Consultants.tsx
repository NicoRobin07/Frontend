import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ConsultantTable } from "@/components/consultants/ConsultantTable";
import { ConsultantFilters } from "@/components/consultants/ConsultantFilters";
import { AddConsultantModal, NewConsultant } from "@/components/consultants/AddConsultantModal";
import { mockConsultants } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List, Search, X } from "lucide-react";
import { Consultant } from "@/types";
import { cn } from "@/lib/utils";

export default function Consultants() {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [visaFilter, setVisaFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [consultants, setConsultants] = useState<Consultant[]>(mockConsultants);

  const filteredConsultants = consultants.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesVisa = visaFilter === "all" || c.visaStatus === visaFilter;
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesVisa && matchesSearch;
  });

  const handleAddConsultant = (newConsultant: NewConsultant) => {
    const consultant: Consultant = {
      id: String(consultants.length + 1),
      name: `${newConsultant.firstName} ${newConsultant.lastName}`,
      email: newConsultant.email || "",
      phone: newConsultant.phone || "",
      visaStatus: newConsultant.visaStatus,
      skills: newConsultant.skills,
      rate: newConsultant.rate,
      status: newConsultant.status,
      location: newConsultant.location,
      experience: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setConsultants([consultant, ...consultants]);
  };

  return (
    <MainLayout
      title="Consultants"
      subtitle={`Manage your ${consultants.length} consultants`}
      action={{ label: "Add Consultant", onClick: () => setAddModalOpen(true) }}
      showBackButton={false}
    >
      <Tabs defaultValue="table" className="space-y-4">
        {/* Search + Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search consultants..."
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
            <span className="text-xs text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredConsultants.length}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <ConsultantFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              visaFilter={visaFilter}
              setVisaFilter={setVisaFilter}
            />

            <TabsList>
              <TabsTrigger value="table" className="gap-2">
                <List className="w-4 h-4" />
                Table
              </TabsTrigger>
              <TabsTrigger value="grid" className="gap-2">
                <Grid3X3 className="w-4 h-4" />
                Grid
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Table View */}
        <TabsContent value="table">
          <ConsultantTable consultants={filteredConsultants} />
        </TabsContent>

        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConsultants.map((c) => (
              <div
                key={c.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition"
              >
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.location}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {c.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddConsultantModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddConsultant}
      />
    </MainLayout>
  );
}
