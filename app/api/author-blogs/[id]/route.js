import { createClient } from "@/utils/supabase/server";

export async function GET(req, { params }) {
  const supabase = await createClient();
  const { id } = params;
  const pageParam = req.nextUrl.searchParams.get("page");
  const page = parseInt(pageParam) || 1;
  const search = req.nextUrl.searchParams.get("search") || "";

  const limit = 3;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("blogs")
    .select(`*,authors(*),categories(id,name)`)
    .eq("author", id)
    .ilike("title", `%${search}%`)
    .range(from, to);

  const { count, error2 } = await supabase
    .from("blogs")
    .select(`*,authors(*),categories(id,name)`, { count: "exact", head: true })
    .ilike("title", `%${search}%`)
    .eq("author", id);

  const pages = count / limit;

  return new Response(
    JSON.stringify({
      blogs: data,
      totalPages: pages,
      message: "Author blogs with id returned successfully!",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
