import { useBook } from '@/context/BookContext'
import RecentActivity from './RecentActivity'
import CollaboratorsList from './CollaboratorsList'
import Card from "@/components/ui/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";

export default function OverviewTab() {
    const { stats } = useBook();

    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
            <Card className="p-4 space-y-4" rounded="sm">
                <div className="flex justify-between">
                <h3 className="font-medium">Chapters</h3>
                <IoDocumentTextOutline size={20} />
                </div>

                <div>
                <p className="font-light text-2xl">{stats?.chapterCount}</p>
                <p className="text-xs text-primary-base">
                    ~ {stats?.avgWordsPerChapter} per chapter
                </p>
                </div>
            </Card>

            <Card className="p-4 space-y-4" rounded="sm">
                <div className="flex justify-between">
                <h3 className="font-medium">Word Count</h3>
                <FaArrowTrendUp size={20} />
                </div>

                <div>
                <p className="font-light text-2xl">{stats?.totalWordCount}</p>
                <p className="text-xs text-primary-base">
                    + {stats?.recentWordCount}
                </p>
                </div>
            </Card>

            <Card className="p-4 space-y-4" rounded="sm">
                <div className="flex justify-between">
                <h3 className="font-medium">Branches</h3>
                <FaCodeBranch size={20} />
                </div>

                <div>
                <p className="font-light text-2xl">{stats?.branchCount}</p>
                <p className="text-xs text-primary-base">
                    {stats?.activeBranches} active
                </p>
                </div>
            </Card>

            <Card className="p-4 space-y-4" rounded="sm">
                <div className="flex justify-between">
                <h3 className="font-medium">Last Updated</h3>
                <FaRegCalendar size={20} />
                </div>

                <div>
                <p className="font-light text-2xl">{stats?.lastUpdatedDate}</p>
                <p className="text-xs text-primary-base">
                    {stats?.lastUpdatedTime}
                </p>
                </div>
            </Card>
            </div>

            {/* Recent Activity */}
            <RecentActivity limit={5}/>
            

            {/* Collaborators */}
            <CollaboratorsList />
        </>
    )
}