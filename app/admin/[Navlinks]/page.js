export default async function Page({ params }) {
    const slug = (await params).Navlinks
    return <div className="pt-10 flex flex-col gap-10 items-center">
        <span className="font-bold text-center">{slug} Coming in Future Updates</span>
        <img src="/upcoming.gif" alt="upcoming updates"  className="w-1/2"/>
    </div>
  }