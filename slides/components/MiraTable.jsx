import React from 'react';
import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from 'spectacle';

/**
 * Reusable styled table component with MIRA theme (borders, header styling).
 *
 * @param {Object} props
 * @param {string[]} props.headers - Column headers
 * @param {Array<Array<string|React.ReactNode>>} props.rows - Row data, each row is an array of cell values
 * @param {number[]} [props.highlightRows] - Zero-based row indices to apply bold styling (e.g. last row)
 * @param {string} [props.fontSize] - Font size for the table (default: '0.85rem')
 * @param {boolean} [props.compact] - Reduce padding for tables with many rows (default: false)
 */
export function MiraTable({
  headers,
  rows,
  highlightRows = [],
  fontSize = '0.85rem',
  compact = false,
}) {
  const isHighlighted = (rowIndex) => highlightRows.includes(rowIndex);
  const headerPadding = compact ? '8px 12px' : '12px 16px';
  const cellPadding = compact ? '6px 12px' : '10px 16px';

  return (
    <Box
      border="1px solid #e2e8f0"
      borderRadius={8}
      overflow="hidden"
      boxShadow="0 1px 3px rgba(0,0,0,0.08)"
    >
      <Table
        fontSize={fontSize}
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell
                key={i}
                bg="#00a3a3"
                color="white"
                fontWeight="bold"
                padding={headerPadding}
                borderBottom="2px solid #008f8f"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  padding={cellPadding}
                  borderBottom={
                    rowIndex < rows.length - 1
                      ? '1px solid #e2e8f0'
                      : 'none'
                  }
                  fontWeight={isHighlighted(rowIndex) ? 'bold' : undefined}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
