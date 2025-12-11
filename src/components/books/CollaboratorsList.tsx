
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { useBook } from "@/context/BookContext";
import { toTitleCase, capitalizeFirstLetter } from "@/lib/utils/formatString"


export default function CollaboratorsList() {

    const { collaborators } = useBook()


    return (
        <Card variant="none" className="p-4 space-y-3">
            <h3 className="text-xl font-semibold">Collaborators</h3>

            <div className="flex flex-wrap lg:gap-28 gap-10">
                {collaborators?.map((collaborator, index) => (
                <div
                    key={`${index}-${collaborator.user.name}`}
                    className="flex gap-4 h-9 items-center px-2 py-6"
                >
                    <Avatar src={collaborator.user.avatar_url} />
                    <div>
                    <p className="font-semibold text-secondary-dark">
                        {toTitleCase(collaborator.user.name)}
                    </p>
                    <p
                        className={`${
                        collaborator.role === "owner"
                            ? "text-primary-base"
                            : "text-secondary-base"
                        } text-left`}
                    >
                        {capitalizeFirstLetter(collaborator.role)}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </Card>
    )
}