export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/notes") {
      const { results } = await env.DB.prepare("SELECT id, body FROM notes ORDER BY id DESC LIMIT 20").all();
      return Response.json({ notes: results });
    }
    if (url.pathname === "/api/whoami") return Response.json({ worker: "prod-code" });
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
