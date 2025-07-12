import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const items = [
  { id: "active", label: "Active" },
  { id: "closed", label: "Closed" },
  { id: "canceled", label: "Canceled" },
]
type Props = {
  checkedColor:string
}
export default function RoomingListsFilter({checkedColor}:Props) {
  const [selected, setSelected] = useState<string[]>(["closed"])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    alert(`Selected: ${JSON.stringify(selected)}`)
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <span className="text-lg font-semibold">RFP STATUS</span>
      {items.map((item) => (
        <label key={item.id} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(item.id)}
            onCheckedChange={() => toggle(item.id)}
            checkedColor={checkedColor}
            
          />
          <span className="text-sm">{item.label}</span>
        </label>
      ))}
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
