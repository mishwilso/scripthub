
import { CgMathPlus } from "react-icons/cg";

import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'

export default function WorksCarousel(){
    return (
        <section>
            <h2>Your Works</h2>
            <div>
                <p>Manage your writing projects</p>
                <div>
                    <Button endIcon={<CgMathPlus />}>Add New Button</Button>
                </div>
            </div>
        </section>
    )
}