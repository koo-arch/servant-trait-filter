import { getClasses } from "@/features/search/lib/fetcher";
import { revalidateTag } from "next/cache";
import { TAG } from "@/features/search/lib/fetcher";

export async function GET() {
    const t0 = Date.now();
    const classes = await getClasses();
    const took = Date.now() - t0;
    return Response.json({
        count: classes.length,
        tookMs: took,
        at: new Date().toISOString(),
    })
}

export async function POST(req: Request) {
    const { tag }=  (await req.json().catch(() => ({}))) as { tag: string };
    if (tag) {
        revalidateTag(tag, {});
        return Response.json({ ok: true, revalidated: [tag], at: new Date().toISOString() });
    }
    const tags = Object.values(TAG);
    tags.forEach(tag => revalidateTag(tag, {}));

    return Response.json({ ok: true, revalidated: tags, at: new Date().toISOString() });
}
