import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Subscribes to realtime changes on shop tables and invalidates relevant
 * react-query caches so the UI updates instantly without a reload.
 */
export function useRealtimeShop() {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("shop-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
        qc.invalidateQueries({ queryKey: ["products"] });
        qc.invalidateQueries({ queryKey: ["product"] });
        qc.invalidateQueries({ queryKey: ["admin-products"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "categories" }, () => {
        qc.invalidateQueries({ queryKey: ["categories"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "testimonials" }, () => {
        qc.invalidateQueries({ queryKey: ["testimonials"] });
        qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);
}
