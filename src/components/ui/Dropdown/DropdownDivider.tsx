/**
 * Dropdown.Divider:
 * Horizontal line separator
 */
export default function DropdownDivider({size=2}: {size?: number}) {

  return (
    <div className={`border-b-${size} my-1 border-[917F74]/15`}></div>
  )
}