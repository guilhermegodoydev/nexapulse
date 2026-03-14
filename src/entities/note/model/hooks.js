import { useQuery } from "@tanstack/react-query";
import { getCompanyNotes } from "../api/api";
import { noteViewSchema } from "./schema";
import { z } from "zod";

export function useCompanyNotes(companyId, limit = 5, enabled = true) {
  return useQuery({
    queryKey: ["company-notes", companyId, { limit }],
    queryFn: async () => {
        const data = await getCompanyNotes(companyId, limit);
        const validate = z.array(noteViewSchema).parse(data);
        return validate;
    },
    enabled: !!companyId && enabled,
  });
}
