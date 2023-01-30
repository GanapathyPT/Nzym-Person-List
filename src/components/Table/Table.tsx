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

interface Props<T> {
  loading?: boolean;
  columns: Column<T>[];
  data: T[];
}

function Table<T>({ columns, data, loading }: Props<T>) {
  const [tableData, setTableData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState({
    key: "",
    order: "asc",
  });

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sortData = (column: Column<T>) => {
    console.log("SORT");
    if (sortedColumn?.key === column.key) {
      setTableData([...tableData].reverse());
      setSortedColumn((old) => ({
        ...old,
        order: old.order === "asc" ? "desc" : "asc",
      }));
      return;
    }

    const sortedData = [...tableData].sort(column.sorter);
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
          {tableData.map((item: any) => (
            <tr key={item.key}>
              {columns.map(({ key, dataIndex, render, className }) => (
                <td key={key} className={className}>
                  {render ? render(item) : item[dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Loader open={loading} />
      <Empty show={data.length === 0} />
    </div>
  );
}

export { Table };
