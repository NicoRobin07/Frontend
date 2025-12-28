import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VendorTable } from "@/components/vendors/VendorTable";
import { AddVendorModal, NewVendor } from "@/components/vendors/AddVendorModal";
import { ImportVendorModal } from "@/components/vendors/ImportVendorModal";
import { mockVendors } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Building2,
  Trophy,
  Mail,
  Search,
  X,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showImportVendor, setShowImportVendor] = useState(false);

  const filteredVendors = mockVendors.filter((vendor: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    return (
      vendor?.companyName?.toLowerCase().includes(query) ||
      vendor?.recruiterName?.toLowerCase().includes(query) ||
      vendor?.email?.toLowerCase().includes(query) ||
      vendor?.phone?.includes(query)
    );
  });

  const totalSubmissions = filteredVendors.reduce(
    (acc: number, v: any) => acc + (v?.totalSubmissions || 0),
    0
  );

  const totalPlacements = filteredVendors.reduce(
    (acc: number, v: any) => acc + (v?.placements || 0),
    0
  );

  const handleAddVendor = (vendor: NewVendor) => {
    console.log("New vendor:", vendor);
    toast.success("Vendor added successfully!");
  };

  const handleImportVendors = (vendors: any[]) => {
    console.log("Imported vendors:", vendors);
    toast.success(`${vendors.length} vendors imported successfully!`);
  };

  return (
    <MainLayout
      title="Vendors"
      subtitle="Manage your vendor relationships"
      action={{ label: "Add Vendor", onClick: () => setShowAddVendor(true) }}
      showBackButton={false}
    >
      {/* Search Bar */}
      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor name, contact, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm bg-background"
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

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowImportVendor(true)}
        >
          <Upload className="w-4 h-4" />
          Import Vendor List
        </Button>

        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Found{" "}
          <span className="font-semibold text-foreground">
            {filteredVendors.length}
          </span>{" "}
          vendors
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Building2 className="w-6 h-6 text-primary" />}
          label="Total Vendors"
          value={filteredVendors.length}
        />
        <StatCard
          icon={<Mail className="w-6 h-6 text-info" />}
          label="Total Submissions"
          value={totalSubmissions}
        />
        <StatCard
          icon={<Trophy className="w-6 h-6 text-success" />}
          label="Total Placements"
          value={totalPlacements}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-warning" />}
          label="Conversion Rate"
          value={
            totalSubmissions > 0
              ? `${((totalPlacements / totalSubmissions) * 100).toFixed(1)}%`
              : "0%"
          }
        />
      </div>

      {/* Vendors Table */}
      <VendorTable vendors={filteredVendors} />

      {/* Modals */}
      <AddVendorModal
        open={showAddVendor}
        onClose={() => setShowAddVendor(false)}
        onAdd={handleAddVendor}
      />
      <ImportVendorModal
        open={showImportVendor}
        onClose={() => setShowImportVendor(false)}
        onImport={handleImportVendors}
      />
    </MainLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*                               STAT CARD                                    */
/* -------------------------------------------------------------------------- */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
