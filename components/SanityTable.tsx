interface SanityTableProps {
  value: {
    rows?: { cells?: string[] }[];
    hasHeaderRow?: boolean;
  };
}

export default function SanityTable({ value }: SanityTableProps) {
  const rows = value.rows || [];
  const hasHeader = value.hasHeaderRow !== false;

  return (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm font-noto-sans">
        {hasHeader && rows.length > 0 && (
          <thead>
            <tr>
              {rows[0].cells?.map((cell, i) => (
                <th
                  key={i}
                  className="border border-gray-200 bg-gray-50 px-4 py-3 text-left font-medium text-gray-700"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.slice(hasHeader ? 1 : 0).map((row, i) => (
            <tr key={i}>
              {row.cells?.map((cell, j) => (
                <td
                  key={j}
                  className="border border-gray-200 px-4 py-3 text-gray-600"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
