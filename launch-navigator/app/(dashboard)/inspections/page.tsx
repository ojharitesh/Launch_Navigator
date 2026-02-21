"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase";
import { formatDate, getDaysUntilText, isWithinDays } from "@/lib/utils";
import {
  ClipboardCheck,
  Plus,
  Calendar,
  AlertTriangle,
  Edit2,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInspection, setEditingInspection] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [inspectionType, setInspectionType] = useState("");
  const [lastInspectionDate, setLastInspectionDate] = useState("");
  const [nextInspectionEstimate, setNextInspectionEstimate] = useState("");
  const [notes, setNotes] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("inspections")
        .select("*")
        .eq("user_id", user.id)
        .order("next_inspection_estimate", { ascending: true });

      setInspections(data || []);
    } catch (error) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (inspection?: any) => {
    if (inspection) {
      setEditingInspection(inspection);
      setInspectionType(inspection.inspection_type);
      setLastInspectionDate(inspection.last_inspection_date || "");
      setNextInspectionEstimate(inspection.next_inspection_estimate || "");
      setNotes(inspection.notes || "");
    } else {
      setEditingInspection(null);
      setInspectionType("");
      setLastInspectionDate("");
      setNextInspectionEstimate("");
      setNotes("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingInspection(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (editingInspection) {
        // Update existing inspection
        await supabase
          .from("inspections")
          .update({
            inspection_type: inspectionType,
            last_inspection_date: lastInspectionDate || null,
            next_inspection_estimate: nextInspectionEstimate || null,
            notes: notes || null,
          })
          .eq("id", editingInspection.id);
      } else {
        // Create new inspection
        await supabase.from("inspections").insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          inspection_type: inspectionType,
          last_inspection_date: lastInspectionDate || null,
          next_inspection_estimate: nextInspectionEstimate || null,
          notes: notes || null,
        });
      }

      await fetchInspections();
      closeModal();
    } catch (error) {
      console.error("Error saving inspection:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inspection?")) return;

    try {
      await supabase.from("inspections").delete().eq("id", id);
      await fetchInspections();
    } catch (error) {
      console.error("Error deleting inspection:", error);
    }
  };

  // Get upcoming inspections (within 30 days)
  const upcomingInspections = inspections.filter(
    (i) => i.next_inspection_estimate && isWithinDays(i.next_inspection_estimate, 30)
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
          <h1 className="text-3xl font-bold text-slate-900">Inspections</h1>
          <p className="text-slate-600 mt-2">
            Track upcoming inspections for your business
          </p>
        </div>
        <Button onClick={() => openModal()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Inspection
        </Button>
      </div>

      {/* Alerts */}
      {upcomingInspections.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Upcoming Inspections
          </h2>
          <div className="grid gap-3">
            {upcomingInspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      {inspection.inspection_type}
                    </p>
                    <p className="text-sm text-amber-700">
                      Due {formatDate(inspection.next_inspection_estimate)} (
                      {getDaysUntilText(inspection.next_inspection_estimate)})
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal(inspection)}
                >
                  Update
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspection List */}
      <div className="grid gap-4">
        {inspections.length > 0 ? (
          inspections.map((inspection) => {
            const isExpiringSoon =
              inspection.next_inspection_estimate &&
              isWithinDays(inspection.next_inspection_estimate, 30);

            return (
              <Card
                key={inspection.id}
                className={isExpiringSoon ? "border-amber-300" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          isExpiringSoon ? "bg-amber-100" : "bg-blue-100"
                        }`}
                      >
                        <ClipboardCheck
                          className={`h-6 w-6 ${
                            isExpiringSoon
                              ? "text-amber-600"
                              : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {inspection.inspection_type}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          {inspection.last_inspection_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Last: {formatDate(inspection.last_inspection_date)}
                            </span>
                          )}
                          {inspection.next_inspection_estimate && (
                            <span
                              className={
                                isExpiringSoon
                                  ? "text-amber-600 font-medium"
                                  : ""
                              }
                            >
                              Next: {formatDate(inspection.next_inspection_estimate)} ({getDaysUntilText(inspection.next_inspection_estimate)})
                            </span>
                          )}
                        </div>
                        {inspection.notes && (
                          <p className="text-sm text-slate-500 mt-2">
                            {inspection.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal(inspection)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(inspection.id)}
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
            <ClipboardCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">
              No inspections yet
            </h3>
            <p className="text-slate-500 mt-2">
              Add your business inspections to track upcoming schedules
            </p>
            <Button onClick={() => openModal()} className="mt-4">
              Add Your First Inspection
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
                {editingInspection ? "Edit Inspection" : "Add Inspection"}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="inspectionType">Inspection Type</Label>
                <Input
                  id="inspectionType"
                  placeholder="e.g., Health Inspection"
                  value={inspectionType}
                  onChange={(e) => setInspectionType(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="lastInspectionDate">Last Inspection Date</Label>
                <Input
                  id="lastInspectionDate"
                  type="date"
                  value={lastInspectionDate}
                  onChange={(e) => setLastInspectionDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="nextInspectionEstimate">
                  Next Inspection Estimate
                </Label>
                <Input
                  id="nextInspectionEstimate"
                  type="date"
                  value={nextInspectionEstimate}
                  onChange={(e) => setNextInspectionEstimate(e.target.value)}
                  className="mt-1"
                />
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
                  ) : editingInspection ? (
                    "Save Changes"
                  ) : (
                    "Add Inspection"
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
