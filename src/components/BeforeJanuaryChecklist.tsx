import type { ChecklistItem } from "@/lib/types";
import { StoredCheckbox } from "./fields";

export function BeforeJanuaryChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item.id}>
          <StoredCheckbox field={item.id} id={item.id} />
          <label htmlFor={item.id}>{item.text}</label>
        </li>
      ))}
    </ul>
  );
}
