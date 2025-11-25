"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Input from "@/components/ui/Input";
import MainNavbar from "@/components/layout/MainNavbar";
import Book from "@/components/ui/Book"

import Dropdown from "@/components/ui/Dropdown";

import Card from "@/components/ui/Card";
import { MdEmail, MdDelete, MdSearch, MdCheckCircle } from "react-icons/md";

type TestCategory =
  | "buttons"
  | "inputs"
  | "iconButtons"
  | "layout"
  | "utilities";

export default function TestPage() {
  const [activeCategory, setActiveCategory] = useState<TestCategory>("buttons");
  const [email, setEmail] = useState<string>("");

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const categories = [
    { id: "buttons" as TestCategory, label: "Buttons" },
    { id: "inputs" as TestCategory, label: "Inputs" },
    { id: "iconButtons" as TestCategory, label: "Icon Buttons" },
    { id: "layout" as TestCategory, label: "Layout Components" },
    { id: "utilities" as TestCategory, label: "Utility Functions" },
  ];

  return (
    <div className="min-h-screen bg-white-light">
      {/* Header */}
      <header className="bg-white-base border-b-2 border-outline-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-secondary-dark">
            Component Testing Lab
          </h1>
          <p className="text-sm text-secondary-dark/70 mt-1">
            Test and preview all UI components and utilities
          </p>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white-base border-r-2 border-outline-light min-h-screen sticky top-[73px] self-start">
          <nav className="p-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-md transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary-base text-white-base font-medium"
                        : "text-secondary-dark hover:bg-neutral-light"
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeCategory === "buttons" && (
            <ButtonTests handleClick={handleClick} />
          )}
          {activeCategory === "inputs" && (
            <InputTests email={email} handleEmailChange={handleEmailChange} />
          )}
          {activeCategory === "iconButtons" && <IconButtonTests />}
          {activeCategory === "layout" && <LayoutTests />}
          {activeCategory === "utilities" && <UtilityTests />}
        </main>
      </div>
    </div>
  );
}

// Button Tests Component
function ButtonTests({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="space-y-12">
      <TestSection title="Color Variants">
        <div className="space-y-8">
          <SubSection title="Primary">
            <div className="flex gap-4 flex-wrap">
              <Button variant="text" onClick={handleClick}>
                Text
              </Button>
              <Button variant="contained" onClick={handleClick}>
                Contained
              </Button>
              <Button variant="outlined" onClick={handleClick}>
                Outlined
              </Button>
            </div>
          </SubSection>

          <SubSection title="Secondary">
            <div className="flex gap-4 flex-wrap">
              <Button color="secondary" variant="text" onClick={handleClick}>
                Text
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClick}
              >
                Contained
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClick}
              >
                Outlined
              </Button>
            </div>
          </SubSection>

          <SubSection title="Tertiary">
            <div className="flex gap-4 flex-wrap">
              <Button color="tertiary" variant="text" onClick={handleClick}>
                Text
              </Button>
              <Button
                color="tertiary"
                variant="contained"
                onClick={handleClick}
              >
                Contained
              </Button>
              <Button color="tertiary" variant="outlined" onClick={handleClick}>
                Outlined
              </Button>
            </div>
          </SubSection>

          <SubSection title="Success">
            <div className="flex gap-4 flex-wrap">
              <Button color="success" variant="text" onClick={handleClick}>
                Text
              </Button>
              <Button color="success" variant="contained" onClick={handleClick}>
                Contained
              </Button>
              <Button color="success" variant="outlined" onClick={handleClick}>
                Outlined
              </Button>
            </div>
          </SubSection>

          <SubSection title="Error">
            <div className="flex gap-4 flex-wrap">
              <Button color="error" variant="text" onClick={handleClick}>
                Text
              </Button>
              <Button color="error" variant="contained" onClick={handleClick}>
                Contained
              </Button>
              <Button color="error" variant="outlined" onClick={handleClick}>
                Outlined
              </Button>
            </div>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Sizes">
        <div className="flex flex-col gap-4 items-start">
          <Button size="small" onClick={handleClick}>
            Small Button
          </Button>
          <Button size="medium" onClick={handleClick}>
            Medium Button
          </Button>
          <Button size="large" onClick={handleClick}>
            Large Button
          </Button>
          <Button size="full" onClick={handleClick}>
            Full Width Button
          </Button>
        </div>
      </TestSection>

      <TestSection title="States & Icons">
        <div className="flex flex-col gap-4 items-start">
          <Button onClick={handleClick} disabled>
            Disabled Button
          </Button>
          <Button onClick={handleClick} startIcon={<MdDelete />}>
            With Start Icon
          </Button>
          <Button onClick={handleClick} endIcon={<MdCheckCircle />}>
            With End Icon
          </Button>
          <Button
            onClick={handleClick}
            startIcon={<MdDelete />}
            endIcon={<MdCheckCircle />}
          >
            Both Icons
          </Button>
        </div>
      </TestSection>
    </div>
  );
}

// Input Tests Component
function InputTests({
  email,
  handleEmailChange,
}: {
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-12">
      <TestSection title="Basic Inputs">
        <div className="space-y-6 max-w-md">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="Password must be at least 8 characters"
          />
          <Input label="Search" type="search" placeholder="Search..." />
        </div>
      </TestSection>

      <TestSection title="Input Sizes">
        <div className="space-y-6 max-w-md">
          <Input label="Small" size="small" placeholder="Small input" />
          <Input label="Medium" size="medium" placeholder="Medium input" />
          <Input label="Large" size="large" placeholder="Large input" />
        </div>
      </TestSection>

      <TestSection title="With Icons">
        <div className="space-y-6 max-w-md">
          <Input
            label="Email with Start Icon"
            type="email"
            startIcon={<MdEmail />}
            placeholder="email@example.com"
          />
          <Input
            label="Search with End Icon"
            type="search"
            endIcon={<MdSearch />}
            placeholder="Search..."
          />
        </div>
      </TestSection>

      <TestSection title="States">
        <div className="space-y-6 max-w-md">
          <Input
            label="Required Field"
            required
            placeholder="This field is required"
          />
          <Input label="Disabled Input" disabled value="Cannot edit this" />
          <Input
            label="Error State"
            error
            errorMessage="This field has an error"
            value="Invalid input"
          />
          <Input
            label="With Helper Text"
            helperText="This is helpful information"
            placeholder="Type here"
          />
        </div>
      </TestSection>

      <TestSection title="Full Width">
        <Input
          label="Full Width Input"
          fullWidth
          placeholder="This input spans the full width"
        />
      </TestSection>
    </div>
  );
}

// Icon Button Tests Component
function IconButtonTests() {
  return (
    <div className="space-y-12">
      <TestSection title="Variants">
        <div className="space-y-6">
          <SubSection title="Standard">
            <div className="flex gap-4 items-center">
              <IconButton variant="standard" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="standard" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="standard" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="standard" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Filled">
            <div className="flex gap-4 items-center">
              <IconButton variant="filled" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="filled" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="filled" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="filled" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Tonal">
            <div className="flex gap-4 items-center">
              <IconButton variant="tonal" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="tonal" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="tonal" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="tonal" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Outlined">
            <div className="flex gap-4 items-center">
              <IconButton variant="outlined" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="outlined" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="outlined" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton variant="outlined" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Shapes">
        <div className="space-y-6">
          <SubSection title="Square (Rounded)">
            <div className="flex gap-4 items-center">
              <IconButton shape="square" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="square" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="square" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="square" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Round (Circle)">
            <div className="flex gap-4 items-center">
              <IconButton shape="round" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="round" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="round" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton shape="round" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Widths">
        <div className="space-y-6">
          <SubSection title="Narrow">
            <div className="flex gap-4 items-center">
              <IconButton width="narrow" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="narrow" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="narrow" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="narrow" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Default">
            <div className="flex gap-4 items-center">
              <IconButton width="default" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="default" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="default" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="default" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Wide">
            <div className="flex gap-4 items-center">
              <IconButton width="wide" size="small" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="wide" size="medium" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="wide" size="large" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton width="wide" size="extralarge" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Colors">
        <div className="space-y-6">
          <SubSection title="Primary">
            <div className="flex gap-4 items-center">
              <IconButton color="primary" variant="standard" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="primary" variant="filled" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="primary" variant="tonal" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="primary" variant="outlined" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Secondary">
            <div className="flex gap-4 items-center">
              <IconButton color="secondary" variant="standard" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="secondary" variant="filled" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="secondary" variant="tonal" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="secondary" variant="outlined" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>

          <SubSection title="Error">
            <div className="flex gap-4 items-center">
              <IconButton color="error" variant="standard" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="error" variant="filled" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="error" variant="tonal" altText="delete">
                <MdDelete />
              </IconButton>
              <IconButton color="error" variant="outlined" altText="delete">
                <MdDelete />
              </IconButton>
            </div>
          </SubSection>
        </div>
      </TestSection>
    </div>
  );
}

// Layout Tests Component (Placeholder for future)
function LayoutTests() {
  return (
    <div className="space-y-12">
      <TestSection title="Coming Soon">
        <div className="bg-neutral-light p-8 rounded-lg text-center">
          <p className="text-secondary-dark text-lg mb-4">
            Layout components will be tested here
          </p>
          <div className="space-y-2 text-secondary-dark/70">
            <p>• Navbar</p>
            <p>• Footer</p>
            <p>• Card</p>
            <p>• Grid/Flex Layouts</p>
            <p>• Modals</p>
            <p>• Drawers</p>
          </div>
        </div>
      </TestSection>

      <TestSection title="Book">
        <div className="space-y-6">
          <SubSection title="Book Parts">
                <Book title="Untitled Book"/>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Dropdown">
        <div className="space-y-6">
          <SubSection title="Basic Drop down">
            <div className="flex justify-center">
              <Dropdown>
                <Dropdown.Button>
                  <p className="rounded-md bg-white-input px-3 py-2 hover:bg-secondary-dark/10">
                    Settings
                  </p>
                </Dropdown.Button>
                <Dropdown.Menu>
                  <Dropdown.Option onClick={() => console.log("hi")} startIcon={<MdEmail size={16}/>}>
                    Profile
                  </Dropdown.Option>
                  <Dropdown.Option startIcon={<MdEmail size={16}/>}>Settings</Dropdown.Option>
                  <Dropdown.Divider/>
                  <Dropdown.Option startIcon={<MdEmail size={16}/>} danger>Logout</Dropdown.Option>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="NavBar">
        <div className="space-y-6">
          <SubSection title="Main Navbar">
            <MainNavbar />
          </SubSection>
        </div>
      </TestSection>

      <TestSection title="Card">
        <div className="space-y-6">
          <SubSection title="Stats Card">
            <Card>
              <h1 className="font-semibold text-secondary-dark pb-4">
                Chapters
              </h1>
              <p className="text-secondary-dark text-3xl pb-1">12</p>
              <p className="text-primary-dark text-xs">10 total versions</p>
            </Card>
          </SubSection>
        </div>
      </TestSection>
    </div>
  );
}

// Utility Tests Component (Placeholder for future)
function UtilityTests() {
  return (
    <div className="space-y-12">
      <TestSection title="Coming Soon">
        <div className="bg-neutral-light p-8 rounded-lg text-center">
          <p className="text-secondary-dark text-lg mb-4">
            Utility functions will be tested here
          </p>
          <div className="space-y-2 text-secondary-dark/70">
            <p>• Date formatting</p>
            <p>• String manipulation</p>
            <p>• Validation helpers</p>
            <p>• API utilities</p>
            <p>• Form helpers</p>
          </div>
        </div>
      </TestSection>
    </div>
  );
}

// Reusable Section Components
function TestSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white-base rounded-lg p-6 border-2 border-outline-light">
      <h2 className="text-xl font-semibold text-secondary-dark mb-6 pb-3 border-b-2 border-outline-light">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-secondary-dark/80 mb-3 uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}
