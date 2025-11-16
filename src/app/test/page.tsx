"use client";

import Button from "../../components/ui/Button";

export default function Test() {

    const handleClick = () => {
    console.log("Button clicked!");
    // Add your desired logic here
    };

    return (
        <div className="p-8">
        {/* Variants Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
            <div className="flex gap-4">
            <Button variant="primary" onClick={handleClick}>Continue Writing</Button>
            <Button variant="secondary" onClick={handleClick}>Continue Writing</Button>
            <Button variant="outlinePrimary" onClick={handleClick}>Continue Writing</Button>
            <Button variant="outlineSecondary" onClick={handleClick}>Continue Writing</Button>
            </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
            <div className="flex flex-col gap-4 items-start">
            <Button size="small" onClick={handleClick}>Continue Writing</Button>
            <Button size="medium" onClick={handleClick}>Continue Writing</Button>
            <Button size="large" onClick={handleClick}>Continue Writing</Button>
            <Button size="full" onClick={handleClick}>Continue Writing</Button>
            </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Button Styles</h2>
            <div className="flex flex-col gap-4 items-start">
            <Button onClick={handleClick} disabled>Continue Writing</Button>
            </div>
        </section>
        </div>
    );
}
