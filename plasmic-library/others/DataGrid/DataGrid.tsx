import type React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import dynamic from 'next/dynamic';
import styles from './DataGrid.module.css';

interface Row {
  [key: string]: string | null | undefined;
}

interface ColumnStyle {
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
}

interface ColumnHeader {
  label: string;
}

interface DataGridTheme {
  headerBgColor?: string;
  rowBgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  textColor?: string;
  fontSize?: string;
}

interface ResponsiveConfig {
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  horizontalOverflow?: 'auto' | 'scroll' | 'hidden';
  verticalOverflow?: 'auto' | 'scroll' | 'hidden';
  stickyHeader?: boolean;
  compactOnMobile?: boolean;
}

interface DataGridProps {
  data: Row[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  onRowClick?: (rowId: string) => void;
  onEditClick?: (rowId: string) => void;
  onDeleteClick?: (rowId: string) => void;
  onCopyClick?: (rowId: string) => void;
  columnLabels?: { [key: string]: string };
  visibleColumns?: string[];
  columnOrder?: string[];
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  columnStyles?: { [key: string]: ColumnStyle };
  enableExport?: boolean;
  exportFormats?: 'csv' | 'excel';
  exportIcon?: React.ReactNode;
  onExport?: (format: string) => void;
  isLoading?: boolean;
  error?: Error;
  emptyStateMessage?: string;
  loadingComponent?: React.ReactNode;
  columnHeaders?: { [key: string]: ColumnHeader };
  theme?: DataGridTheme;
  responsive?: ResponsiveConfig;
}

type SortField = string;
type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  field: SortField;
  direction: SortDirection;
}

const DEFAULT_LABELS: { [key: string]: string } = {
  id: 'ID',
  title: 'Title',
  status: 'Status',
  type: 'Type',
  budget: 'Budget',
  date_start: 'Start Date',
  date_end: 'End Date',
  comments: 'Comments',
  created_at: 'Created At',
  updated_at: 'Updated At',
  last_updated_by: 'Last Updated By',
  model: 'Model'
};

const DEFAULT_THEME: DataGridTheme = {
  headerBgColor: '#f6f3ef',
  rowBgColor: '#ffffff',
  hoverBgColor: '#f9f5ff',
  borderColor: '#d9cdbf',
  textColor: '#333333',
  fontSize: '14px'
};

const DEFAULT_PAGE_SIZE = 10;

const DataGrid: React.FC<DataGridProps> = ({
  data = [],
  className = "",
  headerClassName = "",
  rowClassName = "",
  onRowClick,
  onEditClick,
  onDeleteClick,
  onCopyClick,
  columnLabels = DEFAULT_LABELS,
  visibleColumns,
  columnOrder,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = 1,
  onPageChange,
  totalItems,
  columnStyles = {},
  enableExport = false,
  exportFormats = 'csv',
  exportIcon,
  onExport,
  isLoading = false,
  error,
  emptyStateMessage = "Aucune donnée disponible",
  loadingComponent,
  columnHeaders = {},
  theme: customTheme,
  responsive
}) => {
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<SortState>({ field: 'id', direction: null });

  const theme = useMemo(() => ({
    ...DEFAULT_THEME,
    ...customTheme
  }), [customTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allColumns = useMemo(() => {
    if (data.length === 0) return [];
    const cols = Object.keys(data[0]);
    if (columnOrder) {
      return columnOrder.filter(col => cols.includes(col));
    }
    return cols;
  }, [data, columnOrder]);

  const columns = useMemo(() => {
    if (!visibleColumns) return allColumns;
    return visibleColumns.filter(col => allColumns.includes(col));
  }, [allColumns, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sort.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (sort.field === 'created_at') {
        if (!aValue && !bValue) return 0;
        if (!aValue) return sort.direction === 'asc' ? 1 : -1;
        if (!bValue) return sort.direction === 'asc' ? -1 : 1;

        const dateA = new Date(String(aValue)).getTime();
        const dateB = new Date(String(bValue)).getTime();
        return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sort.direction === 'asc' ? 1 : -1;
      if (bValue === null) return sort.direction === 'asc' ? -1 : 1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [data, sort]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil((totalItems ?? sortedData.length) / pageSize);

  const handleExport = async (format: 'csv' | 'excel') => {
    if (!enableExport) return;

    const dataToDisplay = sortedData.map(sortedRow => {
      const row: { [key: string]: any } = {};
      columns.forEach(col => {
        row[columnLabels[col] || col] = sortedRow[col];
      });
      return row;
    });

    if (format === 'csv') {
      const csv = columns.map(col => columnLabels[col] || col).join(',') + '\n' +
        dataToDisplay.map(row => columns.map(col => `"${row[columnLabels[col] || col] || ''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'export.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    onExport?.(format);
  };

  const handleSort = (field: SortField) => {
    setSort(prevSort => ({
      field,
      direction:
        prevSort.field === field
          ? prevSort.direction === 'asc'
            ? 'desc'
            : prevSort.direction === 'desc'
              ? null
              : 'asc'
          : 'asc'
    }));
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sort.field !== field) {
      return (
        <svg className={styles.sortIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
        </svg>
      );
    }

    if (sort.direction === 'asc') {
      return (
        <svg className={styles.sortIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 15l5 5 5-5"/>
        </svg>
      );
    }

    if (sort.direction === 'desc') {
      return (
        <svg className={styles.sortIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 9l5-5 5 5"/>
        </svg>
      );
    }

    return null;
  };

  const renderActionButtons = (row: Row) => {
    if (!mounted) return null;
    
    return (
      <div className={styles.dataGridActions} style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div 
          role="button"
          tabIndex={0}
          className={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            onEditClick?.(row.id as string);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onEditClick?.(row.id as string);
            }
          }}
          style={{
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Modifier"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          className={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            if (row.id) {
              onCopyClick?.(row.id as string);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              if (row.id) {
                onCopyClick?.(row.id as string);
              }
            }
          }}
          style={{
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Copier l'ID"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          className={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.(row.id as string);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onDeleteClick?.(row.id as string);
            }
          }}
          style={{
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Supprimer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </div>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      const date = parseISO(dateString);
      return format(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    } catch (e) {
      return dateString || 'N/A';
    }
  };

  const renderCell = (column: string, value: string | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';

    switch (column) {
      case 'date_start':
      case 'date_end':
      case 'created_at':
      case 'updated_at':
        return formatDate(value as string);
      case 'budget':
        return value.toString();
      case 'type':
        return (
          <span className={styles.typeTag}>
            {value}
          </span>
        );
      case 'status':
        return (
          <span className={styles.statusTag}>
            {value}
          </span>
        );
      default:
        return value;
    }
  };

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <div className={styles.dataGridError}>
        <h3>Erreur</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return loadingComponent || (
      <div className={styles.dataGridLoading}>
        <div className={styles.dataGridSpinner} />
        <p>Chargement...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.dataGridEmpty}>
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div className={`${styles.dataGridWrapper} ${className}`} 
      style={{ 
        position: 'relative',
        height: responsive?.height,
        maxHeight: responsive?.maxHeight,
        '--table-min-width': responsive?.minWidth,
        '--table-max-width': responsive?.maxWidth,
      } as React.CSSProperties}
      data-sticky-header={responsive?.stickyHeader}
      data-overflow-x={responsive?.horizontalOverflow}
      data-overflow-y={responsive?.verticalOverflow}
      data-compact={responsive?.compactOnMobile}
    >
      {enableExport && mounted && (
        <div className={styles.dataGridToolbar} style={{
          position: 'static',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '8px'
        }}>
          <div className={styles.dataGridExport}>
            <div
              role="button"
              tabIndex={0}
              className={styles.dataGridButton}
              onClick={() => handleExport(exportFormats)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleExport(exportFormats);
                }
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                marginRight: '0px'
              }}
            >
              {exportIcon || (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      )}

      <table className={styles.dataGridTable}>
        <thead>
          <tr className={`${styles.dataGridHeader} ${headerClassName}`}
            style={{
              backgroundColor: theme.headerBgColor,
              color: theme.textColor,
              fontSize: theme.fontSize,
              borderColor: theme.borderColor
            }}>
            {columns.map(column => (
              <th
                key={column}
                className={styles.headerCell}
                onClick={() => handleSort(column)}
                style={{
                  borderColor: theme.borderColor,
                  textAlign: 'center',
                  width: columnStyles[column]?.width,
                  minWidth: columnStyles[column]?.minWidth
                }}
              >
                <span className={styles.headerContent} style={{ justifyContent: 'center' }}>
                  {columnHeaders[column]?.label || columnLabels[column] || column}
                  <SortIcon field={column} />
                </span>
              </th>
            ))}
            <th 
              className={styles.headerCell} 
              style={{ 
                width: '120px', 
                minWidth: '120px',
                textAlign: 'center' 
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: Row) => (
            <tr
              key={row.id as string}
              className={`${styles.dataGridRow} ${rowClassName}`}
              onClick={() => onRowClick?.(row.id as string)}
              style={{
                backgroundColor: theme.rowBgColor,
                color: theme.textColor,
                fontSize: theme.fontSize,
                borderColor: theme.borderColor,
                cursor: onRowClick ? 'pointer' : 'default'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = theme.hoverBgColor || '';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = theme.rowBgColor || '';
              }}
            >
              {columns.map((column) => (
                <td
                  key={column}
                  className={styles.dataGridCell}
                  style={{ 
                    textAlign: columnStyles[column]?.align || 'left',
                    borderColor: theme.borderColor,
                    width: columnStyles[column]?.width,
                    minWidth: columnStyles[column]?.minWidth
                  }}
                >
                  <p>
                    {renderCell(column, row[column])}
                  </p>
                </td>
              ))}
              <td 
                className={styles.dataGridCell} 
                style={{ 
                  borderColor: theme.borderColor,
                  width: '120px',
                  minWidth: '120px'
                }}
              >
                {renderActionButtons(row)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && mounted && (
        <div className={styles.dataGridPagination}>
          <div className={styles.paginationInfo}>
            Page {currentPage} sur {totalPages}
          </div>
          <div className={styles.paginationControls}>
            <div
              role="button"
              tabIndex={0}
              className={styles.paginationButton}
              onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && currentPage > 1) {
                  onPageChange?.(currentPage - 1);
                }
              }}
              aria-disabled={currentPage === 1}
            >
              Précédent
            </div>
            <div
              role="button"
              tabIndex={0}
              className={styles.paginationButton}
              onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && currentPage < totalPages) {
                  onPageChange?.(currentPage + 1);
                }
              }}
              aria-disabled={currentPage === totalPages}
            >
              Suivant
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DataGrid), {
  ssr: false
});
