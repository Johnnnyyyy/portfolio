import { CONTACTS } from "../components/contacts";

export default function ContactSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <ul className="space-y-3">
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent hover:underline"
            >
              <c.icon className="h-5 w-5" />
              <span>{c.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
