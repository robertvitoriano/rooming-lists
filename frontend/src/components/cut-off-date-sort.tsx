import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const items = [
  { id: "ASC", label: "Ascending" },
  { id: "DESC", label: "Descending" },
];

type Props = {
  checkedColor: string;
  onSave: () => void;
  setCutOffDateSort: (sort: string) => void;
  cuttOffSortSelectedValue: string;
};

export default function CutOffDateSort({
  checkedColor,
  onSave,
  setCutOffDateSort,
  cuttOffSortSelectedValue,
}: Props) {
  const [selected, setSelected] = useState(cuttOffSortSelectedValue);

  useEffect(() => {
    setSelected(cuttOffSortSelectedValue);
  }, [cuttOffSortSelectedValue]);

  const handleSubmit = () => {
    setCutOffDateSort(selected);
    onSave();
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-2"
      >
        {items.map((item) => (
          <div className="flex items-center space-x-2" key={item.id}>
            <RadioGroupItem
              value={item.id}
              id={item.id}
              style={{ accentColor: checkedColor }}
            />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        className="w-full"
        style={{ backgroundColor: checkedColor }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
}
