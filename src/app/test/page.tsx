"use client";

import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

import { MdDelete } from "react-icons/md";

export default function Test() {
  const handleClick = () => {
    console.log("Button clicked!");
    // Add your desired logic here
  };

  return (
    <div className="flex flex-col p-8 gap-10">
      {/* Variants Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Primary Variants</h2>
        <div className="flex gap-4">
          <Button variant="text" onClick={handleClick}>
            Button
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Button
          </Button>
          <Button variant="outlined" onClick={handleClick}>
            Button
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Secondary Variants</h2>
        <div className="flex gap-4">
          <Button color="secondary" variant="text" onClick={handleClick}>
            Button
          </Button>
          <Button color="secondary" variant="contained" onClick={handleClick}>
            Button
          </Button>
          <Button color="secondary" variant="outlined" onClick={handleClick}>
            Button
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tertiary Variants</h2>
        <div className="flex gap-4">
          <Button color="tertiary" variant="text" onClick={handleClick}>
            Button
          </Button>
          <Button color="tertiary" variant="contained" onClick={handleClick}>
            Button
          </Button>
          <Button color="tertiary" variant="outlined" onClick={handleClick}>
            Button
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Error Variants</h2>
        <div className="flex gap-4">
          <Button color="error" variant="text" onClick={handleClick}>
            Button
          </Button>
          <Button color="error" variant="contained" onClick={handleClick}>
            Button
          </Button>
          <Button color="error" variant="outlined" onClick={handleClick}>
            Button
          </Button>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-col gap-4 items-start">
          <Button size="small" onClick={handleClick}>
            Continue Writing
          </Button>
          <Button size="medium" onClick={handleClick}>
            Continue Writing
          </Button>
          <Button size="large" onClick={handleClick}>
            Continue Writing
          </Button>
          <Button size="full" onClick={handleClick}>
            Continue Writing
          </Button>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button Styles</h2>
        <div className="flex flex-col gap-4 items-start">
          <Button onClick={handleClick} disabled>
            Continue Writing
          </Button>
          <Button size="small" onClick={handleClick} startIcon={<MdDelete />}>
            Delete
          </Button>
          <Button size="small" onClick={handleClick} endIcon={<MdDelete />}>
            Delete
          </Button>
        </div>
      </section>


      {/* Icon Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button Styles</h2>
        <div className="flex flex-col gap-4 items-start">
            <div className="flex gap-4 items-start">
                <IconButton variant="outlined" width="narrow" size="small">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined" width="narrow" size="medium">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined" width="narrow" size="large">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined" width="narrow" size="extralarge">
                    <MdDelete />
                </IconButton>
            </div>

            <div className="flex gap-4 items-start">
                <IconButton variant="outlined" size="small" shape="round">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  size="medium" shape="round">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  size="large" shape="round">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  size="extralarge" shape="round">
                    <MdDelete />
                </IconButton>
            </div>

            <div className="flex gap-4 items-start">
                <IconButton variant="outlined" width="wide" size="small">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  width="wide"size="medium">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  width="wide" size="large">
                    <MdDelete />
                </IconButton>
                <IconButton variant="outlined"  width="wide" size="extralarge">
                    <MdDelete />
                </IconButton>
            </div>
        </div>
      </section>
    </div>
  );
}
