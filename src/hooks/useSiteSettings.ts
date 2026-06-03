import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_site_settings");
      if (error) throw error;
      return Array.isArray(data) ? data[0] : data;
    },
  });
