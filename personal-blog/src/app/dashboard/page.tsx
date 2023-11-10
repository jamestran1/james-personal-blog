import { redirect } from "next/navigation";

export default function Dashboard() {
    redirect(process.env.NEXT_PUBLIC_SITE_URL + "/ui/CMS")
}