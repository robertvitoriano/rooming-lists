import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const items = [
  { id: "asc", label: "ascending" },
  { id: "desc", label: "descending" },
]
type Props = {
  checkedColor:string,
  onSave: () => void
}
export default function CutOffDateSort({checkedColor, onSave}:Props) {
  const [selected, setSelected] = useState<string[]>(["closed"])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    onSave()
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <span className="text-lg font-semibold">Sort: Cut-off Date</span>
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
