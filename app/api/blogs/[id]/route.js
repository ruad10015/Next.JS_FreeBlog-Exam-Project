import { createClient } from "@/utils/supabase/server";

export async function GET(req, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data, error } = await supabase
    .from("blogs")
    .select(`*,authors(*),categories(id,name)`)
    .eq("id", id)
    .single();

  return new Response(
    JSON.stringify({
      blog: data,
      message: "Blog with id returned succesfully!",
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}