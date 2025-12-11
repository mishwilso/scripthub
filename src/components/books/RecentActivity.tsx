import Card from "@/components/ui/Card";
import Tags from "@/components/ui/Tags";

import { useState, useEffect } from "react";
import {
  getBookActivity,
  formatBookActivity,
  BookActivity,
} from "@/lib/api/bookactivity";
import { useBook } from "@/context/BookContext";

export default function RecentActivity() {
  const { book } = useBook();
  const [activities, setActivities] = useState<BookActivity[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      if (!book?.id) return;

      try {
        const data = await getBookActivity(book.id);
        setActivities(data);
      } catch (error) {
        console.error("Error loading activities:", error);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [book?.id]);

  return (
    <Card className="p-4 space-y-3" rounded="sm">
      <div>
        <h3 className="text-xl font-semibold">Recent Activity</h3>
        <p className="text-sm">Changes and updates to this book</p>
      </div>

      <ul className="space-y-1 list-none bullet-line-list [&>*:not(:last-child)]:pb-5">
        {loading && <p>Loading activities...</p>}

        {activities?.map((activity) => {
          const formatted = formatBookActivity(activity);
          const branchName = formatted.branchName;
          return (
            <li
              key={activity.id}
              className="bullet-line-list items-start gap-4 text-sm "
            >
              {/* Content */}
              <p>{formatted.message}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary-dark/90">
                  {formatted.timestamp}
                </span>

                {branchName && <Tags variant="version">{branchName}</Tags>}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
