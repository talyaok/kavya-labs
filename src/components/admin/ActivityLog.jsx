export default function ActivityLog({ activities }) {
    return (
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-400">
            Latest account and administrative activity.
          </p>
        </div>
  
        {activities.length > 0 ? (
          <div className="mt-6 divide-y divide-white/10">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="flex flex-col gap-2 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">
                    {formatAction(activity.action)}
                  </p>
  
                  <p className="mt-1 text-sm text-slate-400">
                    {activity.details || "No additional details."}
                  </p>
                </div>
  
                <time
                  dateTime={activity.created_at}
                  className="shrink-0 text-xs text-slate-500"
                >
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(activity.created_at))}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
            <p className="font-medium text-slate-300">No recent activity</p>
            <p className="mt-1 text-sm text-slate-500">
              Administrative actions will appear here.
            </p>
          </div>
        )}
      </section>
    );
  }
  
  function formatAction(action) {
    const labels = {
      user_created: "User created",
      user_enabled: "User enabled",
      user_disabled: "User disabled",
      role_changed: "Role changed",
      user_login: "User signed in",
    };
  
    return labels[action] || "Account activity";
  }