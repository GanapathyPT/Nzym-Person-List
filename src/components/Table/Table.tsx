import { ReactNode, useEffect, useState } from "react";
import {
  IoChevronUpCircleOutline,
  IoChevronUpCircleSharp,
  IoChevronDownCircleSharp,
} from "react-icons/io5";
import { Empty } from "../Empty/Empty";
import { Loader } from "../Loader/Loader";
import styles from "./Table.module.scss";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: string | number;
  className?: string;
  render?: (data: T) => ReactNode;
  sorter?: (a: T, b: T) => number;
}

interface Row<T> {
  data: T;
  expanded: boolean;
}

interface Props<T> {
  loading?: boolean;
  columns: Column<T>[];
  expandRow?: {
    render: (data: T) => ReactNode;
    condition: (data: T) => boolean;
  };
  data: T[];
}

function Table<T>({ columns, data, loading, expandRow }: Props<T>) {
  const [tableData, setTableData] = useState<Row<T>[]>(
    data.map((item) => ({
      data: item,
      expanded: false,
    }))
  );
  const [sortedColumn, setSortedColumn] = useState({
    key: "",
    order: "asc",
  });

  useEffect(() => {
    setTableData(
      data.map((item) => ({
        data: item,
        expanded: false,
      }))
    );
  }, [data]);

  const sortData = (column: Column<T>) => {
    if (sortedColumn?.key === column.key) {
      setTableData([...tableData].reverse());
      setSortedColumn((old) => ({
        ...old,
        order: old.order === "asc" ? "desc" : "asc",
      }));
      return;
    }

    const sortedData = [...tableData].sort((a, b) =>
      (column.sorter as any)(a.data, b.data)
    );
    setTableData(sortedData);
    setSortedColumn({
      key: column.key,
      order: "asc",
    });
  };

  const getSortingIcon = (column: Column<T>) => {
    if (!column.sorter) return null;

    if (sortedColumn?.key === column.key) {
      if (sortedColumn?.order === "asc")
        return <IoChevronUpCircleSharp onClick={() => sortData(column)} />;
      return <IoChevronDownCircleSharp onClick={() => sortData(column)} />;
    }

    return <IoChevronUpCircleOutline onClick={() => sortData(column)} />;
  };

  const onExpand = (row: T) => {
    if (!expandRow) return;

    if (expandRow.condition(row)) {
      setTableData((old) =>
        old.map((item) =>
          item.data === row
            ? {
                ...item,
                expanded: !item.expanded,
              }
            : item
        )
      );
      return;
    }
  };

  return (
    <div className={styles.container}>
      <table border={1} className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} tabIndex={1}>
                <div>
                  {column.title}
                  {column.sorter && getSortingIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ data: item, expanded }: Row<any>) => (
            <>
              <tr key={item.key} tabIndex={1} onClick={() => onExpand(item)}>
                {columns.map(({ key, dataIndex, render, className }) => (
                  <td key={key} className={className}>
                    {render ? render(item) : item[dataIndex]}
                  </td>
                ))}
              </tr>
              {expanded && (
                <tr className={styles.expandedRow}>
                  <td colSpan={columns.length}>{expandRow?.render(item)}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <Loader open={loading} />
      <Empty message="No Content" show={data.length === 0} />
    </div>
  );
}

export { Table };
