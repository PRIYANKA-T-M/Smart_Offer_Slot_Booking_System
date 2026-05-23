import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-400">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableHeaderCell = ({ children }: { children: React.ReactNode }) => {
  return <th className="px-6 py-3 font-medium">{children}</th>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/50">{children}</tr>;
};

export const TableCell = ({ children, className = '', colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) => {
  return <td className={`px-6 py-4 ${className}`} colSpan={colSpan}>{children}</td>;
};
