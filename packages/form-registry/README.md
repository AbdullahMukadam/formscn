# @formscn/form

Runtime form rendering from Zod schemas for React.

## Installation

```bash
npm install @formscn/form
```

## Quick Start

```tsx
import { Form } from "@formscn/form";
import { z } from "zod";
import "@formscn/form/styles";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

export default function ContactForm() {
  return (
    <Form
      schema={schema}
      title="Contact Form"
      description="Fill out the form below"
      onSubmit={(values) => console.log(values)}
    >
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </Form>
  );
}
```

## Requirements

- React 18+
- Zod 3+ or 4+
- react-hook-form 7+
- Tailwind CSS (for styling)

## Configuration

### Tailwind Setup

Add @formscn/ui to your content paths:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@formscn/ui/dist/**/*.mjs",
  ],
}
```

## API

### Form Component

```tsx
import { Form } from "@formscn/form";

<Form
  schema={zodSchema}
  title="Form Title"
  description="Optional description"
  defaultValues={{ field: "default" }}
  onSubmit={(values) => {}}
  className="custom-class"
>
  {/* Custom submit button or additional content */}
</Form>
```

### zodSchemaToFields

Convert Zod schema to field configuration:

```tsx
import { zodSchemaToFields } from "@formscn/form";

const fields = zodSchemaToFields(schema);
// Returns: FormField[]
```

## Field Types

- `input` - Text, email, password, tel, url, number
- `textarea` - Multi-line text
- `select` - Dropdown selection
- `checkbox` - Boolean checkbox
- `switch` - Toggle switch
- `radio` - Radio group
- `date` - Date picker

## License

MIT