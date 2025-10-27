export function SuiteFloorPlan() {
    return (
        <div className="flex h-full min-h-[480px] w-full flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
            <iframe
                src="/images/Floor-plans/25FloorPlan.pdf"
                title="Floor Plan"
                className="flex-1 w-full rounded-2xl border border-slate-200"
                style={{ border: "none" }}
            />
        </div>
    );
}
