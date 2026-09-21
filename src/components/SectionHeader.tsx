interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <span className="inline-block font-mono text-sm text-primary mb-3 tracking-wider uppercase">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
      )}
    </div>
  );
}
