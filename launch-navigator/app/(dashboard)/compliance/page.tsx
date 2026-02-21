"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase";
import { formatDate, getDaysUntilText, isWithinDays } from "@/lib/utils";
import {
  Shield,
  Plus,
  Calendar,
  AlertTriangle,
  Edit2,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

export default function CompliancePage() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLicense, setEditingLicense] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [licenseName, setLicenseName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("annual");
  const [notes, setNotes] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("licenses")
        .select("*")
        .eq("user_id", user.id)
        .order("expiration_date", { ascending: true });

      setLicenses(data || []);
    } catch (error) {
      console.error("Error fetching licenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (license?: any) => {
    if (license) {
      setEditingLicense(license);
      setLicenseName(license.license_name);
      setExpirationDate(license.expiration_date);
      setRenewalFrequency(license.renewal_frequency);
      setNotes(license.notes || "");
    } else {
      setEditingLicense(null);
      setLicenseName("");
      setExpirationDate("");
      setRenewalFrequency("annual");
      setNotes("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLicense(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (editingLicense) {
        // Update existing license
        await supabase
          .from("licenses")
          .update({
            license_name: licenseName,
            expiration_date: expirationDate,
            renewal_frequency: renewalFrequency,
            notes: notes || null,
          })
          .eq("id", editingLicense.id);
      } else {
        // Create new license
        await supabase.from("licenses").insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          license_name: licenseName,
          expiration_date: expirationDate,
          renewal_frequency: renewalFrequency,
          notes: notes || null,
        });
      }

      await fetchLicenses();
      closeModal();
    } catch (error) {
      console.error("Error saving license:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this license?")) return;

    try {
      await supabase.from("licenses").delete().eq("id", id);
      await fetchLicenses();
    } catch (error) {
      console.error("Error deleting license:", error);
    }
  };

  // Get upcoming expirations (within 30 days)
  const upcomingExpirations = licenses.filter((l) =>
    isWithinDays(l.expiration_date, 30)
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Compliance</h1>
          <p className="text-slate-600 mt-2">
            Track licenses and permits for your business
          </p>
        </div>
        <Button onClick={() => openModal()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add License
        </Button>
      </div>

      {/* Alerts */}
      {upcomingExpirations.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Upcoming Expirations
          </h2>
          <div className="grid gap-3">
            {upcomingExpirations.map((license) => (
              <div
                key={license.id}
                className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      {license.license_name}
                    </p>
                    <p className="text-sm text-amber-700">
                      Expires {formatDate(license.expiration_date)} (
                      {getDaysUntilText(license.expiration_date)})
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal(license)}
                >
                  Renew
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* License List */}
      <div className="grid gap-4">
        {licenses.length > 0 ? (
          licenses.map((license) => {
            const daysUntil = getDaysUntilText(license.expiration_date);
            const isExpiringSoon = isWithinDays(license.expiration_date, 30);

            return (
              <Card
                key={license.id}
                className={isExpiringSoon ? "border-amber-300" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          isExpiringSoon ? "bg-amber-100" : "bg-green-100"
                        }`}
                      >
                        <Shield
                          className={`h-6 w-6 ${
                            isExpiringSoon
                              ? "text-amber-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {license.license_name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Expires {formatDate(license.expiration_date)}
                          </span>
                          <span
                            className={
                              isExpiringSoon
                                ? "text-amber-600 font-medium"
                                : ""
                            }
                          >
                            {daysUntil}
                          </span>
                          <span className="capitalize">
                            {license.renewal_frequency}
                          </span>
                        </div>
                        {license.notes && (
                          <p className="text-sm text-slate-500 mt-2">
                            {license.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal(license)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(license.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">
              No licenses yet
            </h3>
            <p className="text-slate-500 mt-2">
              Add your business licenses and permits to track their expiration
            </p>
            <Button onClick={() => openModal()} className="mt-4">
              Add Your First License
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingLicense ? "Edit License" : "Add License"}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="licenseName">License Name</Label>
                <Input
                  id="licenseName"
                  placeholder="e.g., Business License"
                  value={licenseName}
                  onChange={(e) => setLicenseName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="renewalFrequency">Renewal Frequency</Label>
                <select
                  id="renewalFrequency"
                  value={renewalFrequency}
                  onChange={(e) => setRenewalFrequency(e.target.value)}
                  className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="annual">Annual</option>
                  <option value="biennial">Biennial</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="flex w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingLicense ? (
                    "Save Changes"
                  ) : (
                    "Add License"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
