import React from 'react';
import {
  useTable,
  useSortBy,
  Column,
  TableInstance,
  UseSortByColumnProps,
  ColumnInstance,
} from 'react-table';
import styles from './Table.module.scss';
import classNames from 'classnames';

type Data = object;

type TableProps = {
  columns: Column<Data>[];
  data: Data[];
  rowClick?: (data: object) => void;
};

interface TableColumn<D extends object = {}>
  extends ColumnInstance<D>,
    UseSortByColumnProps<D> {}

const Table: React.FC<TableProps> = ({columns, data, rowClick}) => {
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable<
    Data
  >(
    {
      columns,
      data,
    },
    useSortBy,
  ) as TableInstance<object>;

  const firstPageRows = rows.slice(0, 5);

  return (
    <>
      <table className={styles.table} {...getTableProps()}>
        <thead className={styles.table__head}>
          {headerGroups.map((headerGroup) => (
            <tr
              className={styles.table__head__row}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((c) => {
                const column = (c as unknown) as TableColumn<Data>;
                return (
                  <th
                    className={styles.table__head__row__header}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      <i
                        className={classNames(styles.arrow, {
                          [styles.arrow__down]: column.isSortedDesc,
                          [styles.arrow__up]: !column.isSortedDesc,
                        })}
                      />
                    ) : (
                      ''
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={styles.table__body__row}
                {...row.getRowProps()}
                onClick={() => (rowClick ? rowClick(row.original) : null)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={styles.table__body__row__data}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
